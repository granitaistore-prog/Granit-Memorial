const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// Мобільне меню
if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });
}

// Обробка форми
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    formMessage.textContent = "Надсилаємо вашу заявку...";

    try {
      const response = await fetch(event.target.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formMessage.style.color = "green";
        formMessage.textContent = "Дякуємо! Заявка надіслана на granit.ai.store@gmail.com.";
        form.reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      formMessage.style.color = "red";
      formMessage.textContent = "Помилка відправки. Спробуйте ще раз.";
    }
  });
}
