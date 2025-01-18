// src/index.ts

interface ReportData {
  message: string;
  url: string;
  userAgent: string;
}

// Импортируем стили
import "./src/style.css";

// Создаём кнопку "Report Bug"
const button: HTMLButtonElement = document.createElement("button");
button.innerText = "Report Bug";
button.classList.add("bugspot-button");

// Создаём затемнение для модального окна
const modalOverlay: HTMLDivElement = document.createElement("div");
modalOverlay.classList.add("bugspot-modal-overlay");

// Создаём само модальное окно
const modal: HTMLDivElement = document.createElement("div");
modal.classList.add("bugspot-modal");

const title: HTMLHeadingElement = document.createElement("h2");
title.innerText = "Describe the issue";

const textarea: HTMLTextAreaElement = document.createElement("textarea");
textarea.classList.add("bugspot-textarea");
textarea.placeholder = "What went wrong?";

const buttonContainer: HTMLDivElement = document.createElement("div");
buttonContainer.classList.add("bugspot-button-container");

const submitBtn: HTMLButtonElement = document.createElement("button");
submitBtn.innerText = "Submit";
submitBtn.classList.add("bugspot-submit-btn");

const closeBtn: HTMLButtonElement = document.createElement("button");
closeBtn.innerText = "Close";
closeBtn.classList.add("bugspot-close-btn");

// Логика открытия/закрытия модалки
button.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

submitBtn.addEventListener("click", () => {
  const reportData: ReportData = {
    message: textarea.value,
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  // Отправляем POST-запрос на сервер
  fetch("http://localhost:3000/api/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reportData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data);
      modalOverlay.style.display = "none";
      textarea.value = "";
    })
    .catch((err) => {
      console.error("Error sending report:", err);
      // Можно уведомить пользователя об ошибке, если нужно
    });
});

closeBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

// Сборка элементов
buttonContainer.appendChild(submitBtn);
buttonContainer.appendChild(closeBtn);

modal.appendChild(title);
modal.appendChild(textarea);
modal.appendChild(buttonContainer);
modalOverlay.appendChild(modal);

document.body.appendChild(button);
document.body.appendChild(modalOverlay);
