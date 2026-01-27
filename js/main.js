// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobilePanel = document.getElementById('mobilePanel');
if (hamburger && mobilePanel) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    mobilePanel.style.display = isOpen ? 'none' : 'block';
  });
}

// Services dropdown aria state (desktop)
const dropBtn = document.querySelector('.dropbtn');
const dropMenu = document.querySelector('.dropdown-menu');
if (dropBtn && dropMenu) {
  const setExpanded = (v) => dropBtn.setAttribute('aria-expanded', String(v));
  dropBtn.addEventListener('focus', () => setExpanded(true));
  dropBtn.addEventListener('blur', () => setTimeout(() => setExpanded(false), 150));
}

// Quote form submit (Basin / other endpoint) — keep users on the same page
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const action = quoteForm.getAttribute('action');
    if (!action) {
      alert('Quote form is missing a submission endpoint.');
      return;
    }

    try {
      const formData = new FormData(quoteForm);
      const res = await fetch(action, {
        method: 'POST',
        body: formData
      });

      // Some form backends respond with an opaque response (CORS). Treat that as success.
      if (res.ok || res.type === 'opaque') {
        quoteForm.reset();
        alert('Thanks! Your quote request was sent. We\'ll reply soon.');
      } else {
        let msg = 'Could not send your request. Please try again.';
        // Optional: if backend returns JSON with errors, surface it
        try {
          const text = await res.text();
          if (text && text.length < 500) msg = text;
        } catch (_) {}
        alert(msg);
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  });
}
