/*
 * Orion contact form handler.
 * - Submits via fetch (AJAX) to Netlify Forms instead of a full page POST.
 * - Fires the GA4 conversion event ("form_submit_success") ONLY after Netlify
 *   confirms a successful submission, so bot attempts that Netlify's spam
 *   filtering (honeypot / reCAPTCHA) rejects no longer inflate GA4 key events.
 * - Works with the Netlify-managed reCAPTCHA v2 widget: the widget injects a
 *   hidden g-recaptcha-response field inside the <form>, which is picked up
 *   automatically by FormData.
 * - Never sends a submission without a solved captcha: Netlify discards those
 *   without storing them, yet the visitor would still see the "thank you" page.
 * - The handler is attached to the document (event delegation), so it also
 *   covers forms that the page creates or replaces after this script has run
 *   (client-side navigation, re-renders).
 * - Localized error copy is read from the form's data-error-msg attribute.
 */
(function () {
  if (window.__orionFormHandler) return;
  window.__orionFormHandler = true;

  var defaultErrorMsg = 'There was a problem sending your message. Please try again, or reach us directly via WhatsApp.';

  // Shown when the reCAPTCHA box has not been ticked.
  var captchaMsgs = {
    en: 'Please tick the “I’m not a robot” box before sending.',
    it: 'Spunti la casella “Non sono un robot” prima di inviare.',
    de: 'Bitte bestätigen Sie vor dem Senden das Kästchen „Ich bin kein Roboter“.',
    fr: 'Veuillez cocher la case « Je ne suis pas un robot » avant d’envoyer.',
    es: 'Marque la casilla «No soy un robot» antes de enviar.',
    pt: 'Marque a caixa «Não sou um robô» antes de enviar.',
    ru: 'Перед отправкой поставьте галочку «Я не робот».',
    uk: 'Перед надсиланням поставте позначку «Я не робот».',
    ar: 'يرجى تحديد خانة «لست روبوتًا» قبل الإرسال.',
    he: 'נא לסמן את התיבה «אינני רובוט» לפני השליחה.',
    zh: '发送前请勾选“我不是机器人”。',
    ja: '送信前に「私はロボットではありません」にチェックを入れてください。',
    ko: '전송하기 전에 “로봇이 아닙니다”를 선택해 주세요.',
    hi: 'भेजने से पहले “मैं रोबोट नहीं हूँ” बॉक्स पर टिक करें।'
  };

  // Shown when the reCAPTCHA widget never loaded (script blocked by an
  // extension, network or VPN, or the form was built in the browser without it).
  var captchaLoadMsgs = {
    en: 'The security check could not be loaded. Please reload the page, or contact us on WhatsApp or by email.',
    it: 'Impossibile caricare il controllo di sicurezza. Ricarichi la pagina oppure ci contatti su WhatsApp o via email.',
    de: 'Die Sicherheitsprüfung konnte nicht geladen werden. Bitte laden Sie die Seite neu oder kontaktieren Sie uns per WhatsApp oder E-Mail.',
    fr: 'Le contrôle de sécurité n’a pas pu être chargé. Rechargez la page ou contactez-nous par WhatsApp ou par e-mail.',
    es: 'No se pudo cargar la verificación de seguridad. Recargue la página o contáctenos por WhatsApp o por correo electrónico.',
    pt: 'Não foi possível carregar a verificação de segurança. Recarregue a página ou contacte-nos por WhatsApp ou por e-mail.',
    ru: 'Не удалось загрузить проверку безопасности. Обновите страницу или свяжитесь с нами через WhatsApp или по электронной почте.',
    uk: 'Не вдалося завантажити перевірку безпеки. Оновіть сторінку або зв’яжіться з нами через WhatsApp чи електронною поштою.',
    ar: 'تعذّر تحميل التحقق الأمني. يرجى إعادة تحميل الصفحة أو التواصل معنا عبر واتساب أو البريد الإلكتروني.',
    he: 'לא ניתן היה לטעון את בדיקת האבטחה. נא לרענן את הדף או ליצור איתנו קשר בוואטסאפ או בדוא״ל.',
    zh: '无法加载安全验证。请刷新页面，或通过 WhatsApp 或电子邮件联系我们。',
    ja: 'セキュリティチェックを読み込めませんでした。ページを再読み込みするか、WhatsApp またはメールでご連絡ください。',
    ko: '보안 확인을 불러오지 못했습니다. 페이지를 새로고침하거나 WhatsApp 또는 이메일로 문의해 주세요.',
    hi: 'सुरक्षा जाँच लोड नहीं हो सकी। कृपया पेज रीलोड करें या WhatsApp अथवा ईमेल से हमसे संपर्क करें।'
  };

  function encode(data) {
    return Object.keys(data)
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');
  }

  function pageLang() {
    return (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
  }

  function getStatusEl(form) {
    var el = form.querySelector('.form-status-msg');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-status-msg';
      el.setAttribute('role', 'alert');
      el.style.display = 'none';
      el.style.color = '#b00020';
      el.style.marginTop = '0.75rem';
      form.appendChild(el);
    }
    return el;
  }

  function showMessage(form, text) {
    var el = getStatusEl(form);
    el.textContent = text;
    el.style.display = 'block';
  }

  // Returns the message to show when the form must not be sent yet, or ''.
  function captchaProblem(form) {
    var lang = pageLang();
    var field = form.querySelector('[name="g-recaptcha-response"]');
    if (!field) return captchaLoadMsgs[lang] || captchaLoadMsgs.en;
    if (field.value.trim() !== '') return '';
    return form.getAttribute('data-captcha-msg') || captchaMsgs[lang] || captchaMsgs.en;
  }

  function resetRecaptcha() {
    if (window.grecaptcha && typeof window.grecaptcha.reset === 'function') {
      try { window.grecaptcha.reset(); } catch (e) { /* no-op */ }
    }
  }

  // Capture phase: runs before any other submit handler on the page.
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !form.matches || !form.matches('form[data-netlify="true"]')) return;

    e.preventDefault();
    getStatusEl(form).style.display = 'none';

    var problem = captchaProblem(form);
    if (problem) {
      showMessage(form, problem);
      var widget = form.querySelector('.g-recaptcha-wrap');
      if (widget && widget.scrollIntoView) widget.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    var formName = form.getAttribute('name') || 'form';
    var successUrl = (form.getAttribute('action') || '/thank-you').replace(/\.html$/, '');
    var errorMsg = form.getAttribute('data-error-msg') || defaultErrorMsg;

    if (submitBtn) submitBtn.disabled = true;

    var data = {};
    new FormData(form).forEach(function (value, key) {
      data[key] = value;
    });

    fetch(window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(data)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Netlify form submit failed: ' + res.status);
        if (typeof gtag === 'function') {
          gtag('event', 'form_submit_success', { form_name: formName });
        }
        window.location.href = successUrl;
      })
      .catch(function () {
        showMessage(form, errorMsg);
        if (submitBtn) submitBtn.disabled = false;
        resetRecaptcha();
      });
  }, true);
})();
