# 🪦 Вічна Пам'ять — Сайт продажу пам'ятників

Сучасний адаптивний сайт для продажу пам'ятників з інтеграцією сповіщень у Telegram. Працює на GitHub Pages.

## 🚀 Швидкий старт

### 1️⃣ Створіть репозиторій на GitHub
- Назва: `monuments-site` (або ваша)
- Публічний
- Ініціалізувати з README

### 2️⃣ Завантажте файли
Додайте в репозиторій ці 4 файли:
- `index.html`
- `config.js`
- `app.js`
- `README.md`

### 3️⃣ Налаштуйте Telegram-бота
1. Відкрийте [@BotFather](https://t.me/BotFather) в Telegram
2. Відправьте `/newbot`, слідуйте інструкціям
3. Скопіюйте отриманий **токен**
4. Відкрийте [@getmyid_bot](https://t.me/getmyid_bot) → дізнайтесь свій **Chat ID**
5. Відредагуйте `config.js`:
```javascript
export const TELEGRAM_CONFIG = {
    BOT_TOKEN: "123456789:AAH...ваш_токен",
    CHAT_ID: "987654321",
    USE_PROXY: false
};
