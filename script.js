const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(".fade-in").forEach(el => {
    observer.observe(el);
});

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

function updateMobileMenuPosition() {
    const rect = menuBtn.getBoundingClientRect();
    mobileMenu.style.top = `${rect.bottom + 8}px`;
    mobileMenu.style.right = `${window.innerWidth - rect.right}px`;
}

menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    updateMobileMenuPosition();
    mobileMenu.classList.toggle("active");
});

mobileMenu.addEventListener("click", (event) => {
    event.stopPropagation();
});

document.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
});

window.addEventListener("resize", () => {
    if (mobileMenu.classList.contains("active")) {
        updateMobileMenuPosition();
    }
});

mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
});

const navLinks = document.querySelectorAll(".primary-nav a");
const scrollSections = document.querySelectorAll("section[id]");

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute("id");
            navLinks.forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
            });
        }
    });
}, {
    threshold: 0.5
});

scrollSections.forEach(section => {
    navObserver.observe(section);
});

let audioContext;

function playHoverSound() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(330, now);
    gainNode.gain.setValueAtTime(0.0, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.18);
}

const hoverCards = document.querySelectorAll('.feature-card, .benefit');
hoverCards.forEach(card => {
    card.addEventListener('mouseenter', playHoverSound);
});