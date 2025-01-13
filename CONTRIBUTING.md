# Contributing to EchoApp | Внесок у EchoApp

Thank you for taking the time to contribute to EchoApp! Below you will find guidelines to help you make a successful contribution.  
Дякуємо, що вирішили зробити свій внесок у EchoApp! Нижче наведено інструкції, які допоможуть вам це зробити.

---

## How to Get Started? | Як почати?

1. **Fork the repository | Форк репозиторію**  
   Create a copy of the repository in your GitHub account by clicking the "Fork" button.  
   Створіть копію репозиторію у своєму акаунті GitHub, натиснувши кнопку "Fork".

2. **Clone the repository | Клонування репозиторію**  
   Clone your fork to your local computer:  
   Клонуйте ваш форк на локальний комп’ютер:
   ```bash
   git clone https://github.com/<your_username>/echoapp.git
3. Install dependencies | Встановлення залежностей
Use the following script to install all dependencies:
Використовуйте наступний скрипт для встановлення залежностей:
npm run install:all

4. Run the development environment | Запуск локального середовища
Run both frontend and backend simultaneously:
Запустіть фронтенд і бекенд одночасно:
npm start

5. Make your changes | Розробка змін

Make changes in the appropriate directories:
Виконуйте зміни у відповідних директоріях:
Frontend: In the frontend folder.
Frontend: У папці frontend.
Backend: In the backend folder.
Backend: У папці backend.

Contribution Requirements | Вимоги до внесків
Follow the code style (use eslint for frontend; keep backend code clean and well-documented).
Дотримуйтеся стилю коду (для фронтенду — eslint, бекенду — зрозумілий і коментований код).
Write clear commit messages:
Пишіть зрозумілі коміти:
git commit -m "Fix: [what was fixed | що саме було виправлено]"

Add tests (if possible).
Додавайте тести (за можливості).

How to Create a Pull Request (PR)? | Як створити Pull Request (PR)?
Update the main branch of your fork | Оновіть основну гілку вашого форку:
git pull origin main
Create a new branch for your changes | Створіть нову гілку для своїх змін:
git checkout -b feature/your-feature-name
Add and commit your changes | Додайте та закомітьте зміни:
git add .
git commit -m "Add: Опис змін"
Push your changes to your branch | Відправте зміни у вашу гілку:
bash
git push origin feature/your-feature-name
Create a PR via the GitHub UI | Створіть PR через інтерфейс GitHub.

Reporting Issues | Повідомлення про проблеми
To report an issue or suggest an improvement, create an Issue in this repository:
Щоб повідомити про проблему або запропонувати покращення, створіть Issue у цьому репозиторії:
Open the Issues tab.
Відкрийте вкладку Issues.
Click New Issue.
Натисніть New Issue.
Provide a clear description of the problem or suggestion.
Додайте чіткий опис проблеми або пропозиції.

Useful Scripts | Корисні скрипти
Run the backend in development mode | Запуск бекенду в режимі розробки:
cd backend
npm run start-dev

Build the frontend | Білд фронтенду:
cd frontend
npm run build

Test the API via Swagger | Тестування API через Swagger:
Open http://localhost:5000/api-docs.
Відкрийте http://localhost:5000/api-docs.

Contacts | Контакти
If you have any questions, feel free to reach out via Issues.
Якщо у вас виникли питання, звертайтеся через Issues.

### Додавання файлу
1. Створіть файл `CONTRIBUTING.md` у кореневій директорії проєкту:
   ```bash
   touch CONTRIBUTING.md
Вставте вміст вище у файл.
Додайте файл у репозиторій:
git add CONTRIBUTING.md
git commit -m "Add bilingual CONTRIBUTING.md"
git push origin main
