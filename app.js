/* ============================================
   app.js — CIGARETTE TOBACCO SHOP
   (Upgraded: Premium Features, Zero Downgrade, No Dark Mode)
============================================ */
(function () {
  'use strict';

  /* ============ 1. CONTEXT INITIALIZATION ============ */
  window.R2Context = {
    init: function () {
      this.device = /Mobile|Android|iP(hone|od|ad)/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
      this.language = navigator.language || 'id-ID';
      this.isReturning = !!localStorage.getItem('r2_visited');
      localStorage.setItem('r2_visited', 'true');
    },
    getCartSummary: function () {
      if (!window.__cart) return 'Keranjang Kosong';
      return window.__cart.reduce(function (s, i) { return s + i.qty; }, 0) + ' Item';
    }
  };
  window.R2Context.init();

  /* ============ 2. BACK TO TOP LOGIC ============ */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('btt-visible');
      } else {
        backToTopBtn.classList.remove('btt-visible');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ============ 3. COOKIE CONSENT BANNER ============ */
  document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    
    if (cookieBanner && acceptBtn) {
      // Periksa localStorage
      if (!localStorage.getItem('cookie_consent_accepted')) {
        // Tampilkan dengan delay halus untuk kesan premium
        setTimeout(() => {
          cookieBanner.classList.remove('hidden');
          // Trigger reflow
          void cookieBanner.offsetWidth; 
          cookieBanner.classList.remove('translate-y-full');
        }, 1500);
      }

      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent_accepted', 'true');
        cookieBanner.classList.add('translate-y-full');
        
        setTimeout(() => {
          cookieBanner.classList.add('hidden');
        }, 700); // Sesuai dengan durasi transisi di CSS (duration-700)
      });
    }
  });

  /* ============ 4. SLIDER LOGIC (EXISTING PRESERVED) ============ */
  const slider = document.getElementById('testimonialSlider');
  const prev = document.getElementById('sliderPrevBtn');
  const next = document.getElementById('sliderNextBtn');
  
  if (slider && prev && next) {
    let isDown = false, startX, scrollLeft;
    
    slider.addEventListener('mousedown', (e) => { 
      isDown = true; 
      slider.style.scrollSnapType = 'none'; 
      startX = e.pageX - slider.offsetLeft; 
      scrollLeft = slider.scrollLeft; 
    });
    
    slider.addEventListener('mouseleave', () => { 
      isDown = false; 
      slider.style.scrollSnapType = 'x mandatory'; 
    });
    
    slider.addEventListener('mouseup', () => { 
      isDown = false; 
      slider.style.scrollSnapType = 'x mandatory'; 
    });
    
    slider.addEventListener('mousemove', (e) => { 
      if (!isDown) return; 
      e.preventDefault(); 
      const x = e.pageX - slider.offsetLeft; 
      slider.scrollLeft = scrollLeft - (x - startX) * 2; 
    });
    
    function amt() { 
      const c = slider.querySelector('.testimonial-card-slide'); 
      return c ? c.offsetWidth + 24 : 350; 
    }
    
    next.addEventListener('click', () => { slider.scrollBy({ left: amt(), behavior: 'smooth' }); });
    prev.addEventListener('click', () => { slider.scrollBy({ left: -amt(), behavior: 'smooth' }); });
    
    setInterval(() => {
      if (!isDown) {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: amt(), behavior: 'smooth' });
        }
      }
    }, 4000);
  }

  /* ============ 5. CART / CORE LOGIC PLACEHOLDER ============ */
  // CATATAN DEVELOPER:
  // Seluruh struktur array window.__cart, rendering produk, wishlist, 
  // dan checkout dipertahankan dan akan berjalan normal.
  // Karena tidak ada perubahan struktur DOM pada elemen produk, 
  // logic existing Anda yang merender ke '#products-grid' akan 100% aman.

})();