"use strict";
var _a;
function validateForm(event) {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const feedbackDiv = document.getElementById('feedback');
    const age = document.getElementById('age');
    let errors = [];
    if (!nameInput.value) {
        errors.push('Name is required.');
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value || !emailPattern.test(emailInput.value)) {
        errors.push('A valid email is required.');
    }
    if (!age.value || isNaN(Number(age.value)) || Number(age.value) <= 0) {
        errors.push('A valid age is required.');
    }
    if (errors.length > 0) {
        feedbackDiv.innerHTML = errors.join('<br>');
        feedbackDiv.style.color = 'red';
    }
    else {
        feedbackDiv.innerHTML = 'Form submitted successfully!';
        feedbackDiv.style.color = 'green';
    }
}
(_a = document.getElementById('myForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', validateForm);
