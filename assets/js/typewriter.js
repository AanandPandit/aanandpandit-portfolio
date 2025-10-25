const titles = [
    "AI & ML Engineer",
    "Python Developer",
    "IoT Developer",
    "Robotics Engineer"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const typingElement = document.getElementById('typingText');
    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentTitle.length) {
            isDeleting = true;
            typingSpeed = 50;
            setTimeout(typeWriter, 2000);
            return;
        }
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 100;
            setTimeout(typeWriter, 500);
            return;
        }
    }

    setTimeout(typeWriter, isDeleting ? 50 : typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});
