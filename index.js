let currentScreen = 0;

const screens = document.querySelectorAll(".newform-wrapper form > div");
currentScreen = 0;

function showScreen(index) {
    screens.forEach((screen, i) => {
        if (i === index) {
            screen.classList.add("active");
        } else {
            screen.classList.remove("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    currentScreen = 0;


    const startBtn = document.querySelector(".form-start");
    if (startBtn) {
        startBtn.addEventListener("click", function (e) {
            e.preventDefault();
            currentScreen = 1;
            showScreen(currentScreen);

            document.querySelector(".newform-wrapper").style.backgroundColor = "#fff";
        });
    }

    const nextBtns = document.querySelectorAll(".next");
    nextBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentScreen < screens.length - 1) {
                currentScreen++;
                showScreen(currentScreen);
            }
        });
    });

    const backBtns = document.querySelectorAll(".back");
    backBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentScreen > 0) {
                currentScreen--;
                showScreen(currentScreen);
            }
        });
    });

    showScreen(currentScreen);
});


const form = document.getElementById("quiz-form");
const messageBox = document.getElementById("form-success");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch("https://formspree.io/f/xzzvboeb", {
        method: "POST",
        headers: {
            Accept: "application/json"
        },
        body: formData
    });

    if (response.ok) {
        messageBox.textContent = "✅ Your form has been submitted successfully!";
        messageBox.style.color = "green";
        messageBox.style.display = "block";
        form.reset();
    } else {
        messageBox.textContent = "❌ There was an error sending your form. Please try again.";
        messageBox.style.color = "red";
        messageBox.style.display = "block";
    }
});

document.getElementById("next-to-availability").addEventListener("click", function (e) {
    e.preventDefault();


    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const website = document.getElementById("website").value.trim();
    const where = document.getElementById("where").value.trim();

    if (!name || !email || !website || !where) {
        alert("⚠️ Please fill in all fields before continuing.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("⚠️ Please enter a valid email address.");
        return;
    }

    currentScreen++;
    showScreen(currentScreen);
});

const range = document.getElementById('rangeInput');
const thumbValue = document.getElementById('thumbValue');

function updateThumbPosition() {
    const rangeWidth = range.offsetWidth;
    const min = parseInt(range.min);
    const max = parseInt(range.max);
    const val = parseInt(range.value);
    const percent = (val - min) / (max - min);
    const thumbX = percent * rangeWidth;

    thumbValue.style.left = `${thumbX}px`;
    thumbValue.textContent = `Your budget: ${val}$`;
}

range.addEventListener('input', updateThumbPosition);
window.addEventListener('load', updateThumbPosition);

document.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Ukloni sve elemente koji u klasi imaju "desktop"
        document.querySelectorAll('[class*="desktop"]').forEach(el => {
            el.remove();
        });
    }
});
