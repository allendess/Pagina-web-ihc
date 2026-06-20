const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

function updateMobileMenuPosition() {
    const rect = menuBtn.getBoundingClientRect();
    mobileMenu.style.top = `${rect.bottom + 10}px`;
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