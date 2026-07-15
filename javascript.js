// ================= ANIMATIONS & OBSERVERS =================
document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => observer.observe(el));
});

// ================= NAV SCROLL TRACKING =================
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');
const container = document.querySelector('.scroll-container');

if (container) {
    container.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(sec => {
            if (container.scrollTop >= (sec.offsetTop - sec.clientHeight / 2)) {
                current = sec.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').includes(current));
        });
    });
}

// ================= LIGHTBOX SYSTEM =================
const galleryData = {
    photo: ["my works/CI4A2300.JPG", "my works/CI4A2713.JPG", "my works/CI4A2739.JPG", "my works/CI4A2765.JPG", "my works/CI4A3102.JPG", "my works/CI4A3208.JPG", "my works/CI4A3248.JPG", "my works/CI4A3285.JPG", "my works/CI4A3375.JPG", "my works/CI4A3393.JPG", "my works/CI4A3408.JPG", "my works/CI4A3418.JPG", "my works/CI4A3531.JPG", "my works/CI4A3562.JPG", "my works/CI4A3578.jpg", "my works/CI4A3592.JPG", "my works/CI4A3615.JPG", "my works/CI4A3623.JPG", "my works/CI4A3680.JPG", "my works/CI4A3681.JPG", "my works/CI4A3696 copy.jpg", "my works/CI4A4034.JPG", "my works/CI4A7525.JPG", "my works/CI4A7540.JPG", "my works/CI4A7585 (3).JPG", "my works/CI4A7699.JPG", "my works/CI4A7821.JPG", "my works/CI4A7963 (4).JPG", "my works/CI4A8129 (4).JPG", "my works/IMG_6653 copy.jpg", "my works/IMG_7120.JPG", "my works/IMG_9536.JPG", "my works/IMG_9538.JPG", "my works/f.jpg"],
    video: ["my works/IMG_9796.MP4"]
};
let currentCategory = 'photo', currentMediaIndex = 0;

function openGallery(cat) {
    currentCategory = cat; currentMediaIndex = 0; showMedia();
    document.getElementById('box').classList.replace('hidden', 'flex');
}
function showMedia() {
    const list = galleryData[currentCategory], src = list[currentMediaIndex], isVid = currentCategory === 'video';
    const imgEl = document.getElementById('box-img'), vidEl = document.getElementById('box-vid'), counter = document.getElementById('box-counter');
    vidEl.pause();
    imgEl.classList.toggle('hidden', isVid);
    vidEl.classList.toggle('hidden', !isVid);
    if (isVid) { imgEl.src = ''; vidEl.src = src; vidEl.play().catch(e => { }); }
    else { vidEl.removeAttribute('src'); vidEl.load(); imgEl.src = src; }
    if (counter) counter.innerHTML = `<span class="text-[#E6C79C] font-bold">${currentCategory.toUpperCase()}</span> &nbsp;|&nbsp; ${currentMediaIndex + 1} of ${list.length}`;
}
function prevItem(e) { if (e) e.stopPropagation(); const list = galleryData[currentCategory]; currentMediaIndex = (currentMediaIndex - 1 + list.length) % list.length; showMedia(); }
function nextItem(e) { if (e) e.stopPropagation(); const list = galleryData[currentCategory]; currentMediaIndex = (currentMediaIndex + 1) % list.length; showMedia(); }
function closeBox() { document.getElementById('box').classList.replace('flex', 'hidden'); const v = document.getElementById('box-vid'); v.pause(); v.src = ''; }

document.getElementById('box').addEventListener('click', e => { if (e.target === document.getElementById('box')) closeBox(); });
document.addEventListener('keydown', e => {
    if (!document.getElementById('box').classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') prevItem(); else if (e.key === 'ArrowRight') nextItem(); else if (e.key === 'Escape') closeBox();
    }
});

// ================= CONTACT FORM — MAILTO =================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name    = document.getElementById('contact-name').value.trim();
        const email   = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        const subject = encodeURIComponent('New Portfolio Message from ' + name);
        const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        // Opens the user's default email client pre-filled with the message
        window.location.href = `mailto:danielgebremedhin477@gmail.com?subject=${subject}&body=${body}`;

        showToast('✅ Opening your email app to send the message...', 'success');
        form.reset();
    });
});


function showToast(msg, type) {
    const ex = document.getElementById('toast-notify'); if (ex) ex.remove();
    const toast = document.createElement('div');
    toast.id = 'toast-notify'; toast.textContent = msg;
    toast.style.cssText = `position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:${type === 'success' ? '#1a2e1a' : '#2e1a1a'};border:1px solid ${type === 'success' ? '#4ade80' : '#f87171'};color:${type === 'success' ? '#4ade80' : '#f87171'};padding:14px 28px;border-radius:999px;font-size:13px;font-weight:600;z-index:9999;transition:opacity 0.5s;white-space:nowrap;`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 600); }, 5000);
}