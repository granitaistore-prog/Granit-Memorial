const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
    });
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phone || !message) {
      formMessage.textContent = "Будь ласка, заповніть усі поля.";
      return;
    }

    formMessage.textContent = "Дякуємо! Ваша заявка готова до інтеграції з Telegram, email або CRM.";
    form.reset();
  });
}
