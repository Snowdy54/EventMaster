let continueButtons = document.querySelectorAll('.continue-button');
let descriptionForm = document.querySelector('.discription-form'); 
let registrationForm = document.querySelector('.registration-form');
let ticketOptionsForm = document.querySelector('.ticket-options');
let publicationForm = document.querySelector('.publication');

let tabButton1 = document.querySelector('.tab-button-1');
let tabButton2 = document.querySelector('.tab-button-2');
let tabButton3 = document.querySelector('.tab-button-3');
let tabButton4 = document.querySelector('.tab-button-4');
const privateButtons = document.querySelectorAll('.private-button-1, .private-button-2');

let ageButtonActive = document.querySelectorAll('.age-button');


continueButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (descriptionForm.classList.contains('active')) {
            descriptionForm.classList.remove('active');
            registrationForm.classList.add('active');
            tabButton1.classList.remove('active');
            tabButton2.classList.add('active');
        } else if (registrationForm.classList.contains('active')) {
            registrationForm.classList.remove('active');
            ticketOptionsForm.classList.add('active');
            tabButton2.classList.remove('active');
            tabButton3.classList.add('active');
        } else if (ticketOptionsForm.classList.contains('active')) {
            ticketOptionsForm.classList.remove('active');
            publicationForm.classList.add('active');
            tabButton3.classList.remove('active');
            tabButton4.classList.add('active');
        }
    });
});

tabButton1.addEventListener('click', function() {
    descriptionForm.classList.add('active');
    registrationForm.classList.remove('active');
    ticketOptionsForm.classList.remove('active');
    publicationForm.classList.remove('active');
    tabButton1.classList.add('active');
    tabButton2.classList.remove('active');
    tabButton3.classList.remove('active');
    tabButton4.classList.remove('active');
});

tabButton2.addEventListener('click', function() {
    descriptionForm.classList.remove('active');
    registrationForm.classList.add('active');
    ticketOptionsForm.classList.remove('active');
    publicationForm.classList.remove('active');
    tabButton1.classList.remove('active');
    tabButton2.classList.add('active');
    tabButton3.classList.remove('active');
    tabButton4.classList.remove('active');
});

tabButton3.addEventListener('click', function() {
    descriptionForm.classList.remove('active');
    registrationForm.classList.remove('active');
    ticketOptionsForm.classList.add('active');
    publicationForm.classList.remove('active');
    tabButton1.classList.remove('active');
    tabButton3.classList.add('active');
    tabButton2.classList.remove('active');
    tabButton4.classList.remove('active');
});

tabButton4.addEventListener('click', function() {
    descriptionForm.classList.remove('active');
    registrationForm.classList.remove('active');
    ticketOptionsForm.classList.remove('active');
    publicationForm.classList.add('active');
    tabButton1.classList.remove('active');
    tabButton2.classList.remove('active');
    tabButton3.classList.remove('active');
    tabButton4.classList.add('active');
});


ageButtonActive.forEach(button => {
    button.addEventListener('click', function() {
        // Удаляем класс active у всех кнопок
        ageButtonActive.forEach(btn => btn.classList.remove('active'));
        // Добавляем класс active только нажатой кнопке
        this.classList.add('active');
    });
});

// Добавляем обработчики клика
privateButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Удаляем активный класс у всех кнопок приватности
        privateButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс только текущей кнопке
        this.classList.add('active');
        
        // Здесь можно добавить логику для сохранения выбранного значения
        // Например: 
        // const isPublic = this.classList.contains('private-button-1');
        // console.log(isPublic ? 'Публичное событие' : 'Только по ссылке');
    });
});