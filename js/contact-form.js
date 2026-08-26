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

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.style.display = 'none';
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
