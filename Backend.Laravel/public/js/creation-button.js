let continueButtons = document.querySelectorAll('.continue-button');
let descriptionForm = document.querySelector('.discription-form'); 
let registrationForm = document.querySelector('.registration-form');
let publicationForm = document.querySelector('.publication');

let tabButton1 = document.querySelector('.tab-button-1');
let tabButton2 = document.querySelector('.tab-button-2');
let tabButton4 = document.querySelector('.tab-button-4'); // Используем 4-ю кнопку для публикации

continueButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (descriptionForm.classList.contains('active')) {
            // Переход с описания на регистрацию
            descriptionForm.classList.remove('active');
            registrationForm.classList.add('active');
            tabButton1.classList.remove('active');
            tabButton2.classList.add('active');
        } else if (registrationForm.classList.contains('active')) {
            // Пропускаем раздел с билетами, сразу на публикацию
            registrationForm.classList.remove('active');
            publicationForm.classList.add('active');
            tabButton2.classList.remove('active');
            tabButton4.classList.add('active');
        }
    });
});

// Обработчики для кнопок табов
tabButton1.addEventListener('click', function() {
    descriptionForm.classList.add('active');
    registrationForm.classList.remove('active');
    publicationForm.classList.remove('active');
    tabButton1.classList.add('active');
    tabButton2.classList.remove('active');
    tabButton4.classList.remove('active');
});

tabButton2.addEventListener('click', function() {
    descriptionForm.classList.remove('active');
    registrationForm.classList.add('active');
    publicationForm.classList.remove('active');
    tabButton1.classList.remove('active');
    tabButton2.classList.add('active');
    tabButton4.classList.remove('active');
});

tabButton4.addEventListener('click', function() {
    descriptionForm.classList.remove('active');
    registrationForm.classList.remove('active');
    publicationForm.classList.add('active');
    tabButton1.classList.remove('active');
    tabButton2.classList.remove('active');
    tabButton4.classList.add('active');
});