/*
 * Orion contact form handler.
 * - Submits via fetch (AJAX) to Netlify Forms instead of a full page POST.
 * - Fires the GA4 conversion event ("form_submit_success") ONLY after Netlify
 *   confirms a successful submission, so bot attempts that Netlify's spam
 *   filtering (honeypot / reCAPTCHA) rejects no longer inflate GA4 key events.
 * - Works with the Netlify-managed reCAPTCHA v2 widget: the widget injects a
 *   hidden g-recaptcha-response field inside the <form>, which is picked up
 *   automatically by FormData.
 * - Localized error copy is read from the form's data-error-msg attribute.
 */
(function () {
  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function encode(data) {
    return Object.keys(data)
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');
  }

  onReady(function () {
    var form = document.querySelector('form[data-netlify="true"]');
    if (!form) return;

    var statusEl = document.createElement('p');
    statusEl.className = 'form-status-msg';
    statusEl.setAttribute('role', 'alert');
    statusEl.style.display = 'none';
    statusEl.style.color = '#b00020';
    statusEl.style.marginTop = '0.75rem';
    form.appendChild(statusEl);

    var defaultErrorMsg = 'There was a problem sending your message. Please try again, or reach us directly via WhatsApp.';
    var errorMsg = form.getAttribute('data-error-msg') || defaultErrorMsg;
    var submitBtn = form.querySelector('button[type="submit"]');
    var formName = form.getAttribute('name') || 'form';
    var successUrl = (form.getAttribute('action') || '/thank-you').replace(/\.html$/, '');

    function resetRecaptcha() {
      if (window.grecaptcha && typeof window.grecaptcha.reset === 'function') {
        try { window.grecaptcha.reset(); } catch (e) { /* no-op */ }
      }
    }

    function showError() {
      statusEl.textContent = errorMsg;
      statusEl.style.display = 'block';
      if (submitBtn) submitBtn.disabled = false;
      resetRecaptcha();
    }

    // Shown when the reCAPTCHA box has not been ticked. Without this check the
    // request reaches Netlify with an empty g-recaptcha-response, Netlify
    // discards it without storing the submission, and the visitor would still
    // land on the "thank you" page.
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
    var lang = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
    var captchaMsg = form.getAttribute('data-captcha-msg') || captchaMsgs[lang] || captchaMsgs.en;

    // Shown when the reCAPTCHA widget never loaded (script blocked by an
    // extension, network or VPN). The form has no g-recaptcha-response field in
    // that case, and Netlify would silently discard the submission.
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
    var captchaLoadMsg = captchaLoadMsgs[lang] || captchaLoadMsgs.en;

    // Returns the message to show when the form must not be sent yet, or ''.
    function captchaProblem() {
      var field = form.querySelector('[name="g-recaptcha-response"]');
      if (!field) return captchaLoadMsg;
      return field.value.trim() !== '' ? '' : captchaMsg;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.style.display = 'none';

      var problem = captchaProblem();
      if (problem) {
        statusEl.textContent = problem;
        statusEl.style.display = 'block';
        var widget = form.querySelector('.g-recaptcha-wrap');
        if (widget && widget.scrollIntoView) widget.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }

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
          showError();
        });
    });
  });
})();
