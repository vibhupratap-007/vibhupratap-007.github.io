/*========================================== Toggle Icon Navbar ====================================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon && (menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

/*========================================== Scroll Section Active Links ====================================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            const activeLink = document.querySelector('header nav a[href*="#' + id + '"]');
            activeLink && activeLink.classList.add('active');
        }
    });

    /*========================================== Sticky Navbar ====================================*/
    let header = document.querySelector('header');
    header && header.classList.toggle('sticky', window.scrollY > 100);

    /*================================== Remove Toggle Icon and Navbar when click navbar link (scroll) ====================================*/
    menuIcon && menuIcon.classList.remove('bx-x');
    navbar && navbar.classList.remove('active');
};

/*================================== ScrollReveal (guarded if lib present) ====================================*/
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
        reset: true,
        distance: '80px',
        duration: 2000,
        delay: 200
    });
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
}

/*================================== Typed.js (guarded if lib present) ====================================*/
if (typeof Typed !== 'undefined') {
    const typed = new Typed('.multiple-text', {
        strings: ['AIML Engineer', 'Full Stack Developer', 'UI/UX Designer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

/*---------------------------------- Contact Form JS (fetch + forced redirect) --------------------------*/
/*
  Requirements:
  - Your <form> must have id="contact-form"
  - The form's action must point to your Formspree endpoint (e.g. https://formspree.io/f/xnnborqj)
  - _next hidden input can exist but we force redirect client-side to your thank-you page
*/
(function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');
        submitBtn && (submitBtn.disabled = true);

        let status = document.getElementById('form-status');
        if (!status) {
            status = document.createElement('div');
            status.id = 'form-status';
            status.style.marginTop = '12px';
            status.style.color = '#fff';
            form.appendChild(status);
        }
        status.textContent = 'Sending…';

        try {
            const res = await fetch(form.action, {
                method: (form.method || 'POST').toUpperCase(),
                body: new FormData(form),
                headers: { 'Accept': 'application/json' } // <-- tells Formspree to return JSON (no redirect)
            });

            if (res.ok) {
                form.reset();
                window.location.href = 'https://vibhupratap.me/thank-you.html';
                return;
            }

            const data = await res.json().catch(() => null);
            status.textContent = data?.error || 'Submission failed. Try again later.';
        } catch (err) {
            console.error('Fetch/network error:', err);
            status.textContent = 'Network error — please try again.';
        } finally {
            submitBtn && (submitBtn.disabled = false);
            setTimeout(() => { status.textContent = ''; }, 5000);
        }
    });
})();
