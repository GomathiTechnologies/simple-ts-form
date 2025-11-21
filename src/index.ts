// ...existing code...
function setValidityClass(el: HTMLInputElement | null, valid: boolean) {
    if (!el) return;
    el.classList.remove('is-valid', 'is-invalid');
    el.classList.add(valid ? 'is-valid' : 'is-invalid');
}

function clearValidityClasses(...els: Array<HTMLInputElement | null>) {
    els.forEach(el => { if (el) el.classList.remove('is-valid', 'is-invalid'); });
}

function validateForm(event: Event): void {
    event.preventDefault();

    const nameInput = document.getElementById('name') as HTMLInputElement | null;
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
    const ageInput = document.getElementById('age') as HTMLInputElement | null;
    const feedbackDiv = document.getElementById('feedback') as HTMLDivElement | null;

    if (!feedbackDiv) return;

    const errors: string[] = [];

    const name = nameInput?.value.trim() ?? '';
    const email = emailInput?.value.trim() ?? '';
    const phone = phoneInput?.value.trim() ?? '';
    const age = ageInput?.value.trim() ?? '';

    // Reset previous validity classes
    clearValidityClasses(nameInput, emailInput, phoneInput, ageInput);
    feedbackDiv.className = 'mt-3';
    feedbackDiv.innerHTML = '';

    // Name
    if (!name) {
        errors.push('Name is required.');
        setValidityClass(nameInput, false);
    } else {
        setValidityClass(nameInput, true);
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        errors.push('A valid email is required.');
        setValidityClass(emailInput, false);
    } else {
        setValidityClass(emailInput, true);
    }

    // Phone: allow optional +, digits, spaces, dashes (7-20 chars)
    const phonePattern = /^\+?[0-9\s-]{7,20}$/;
    if (!phone || !phonePattern.test(phone)) {
        errors.push('A valid phone number is required.');
        setValidityClass(phoneInput, false);
    } else {
        setValidityClass(phoneInput, true);
    }

    // Age
    const ageNum = Number(age);
    if (!age || isNaN(ageNum) || ageNum <= 0) {
        errors.push('A valid age is required.');
        setValidityClass(ageInput, false);
    } else {
        setValidityClass(ageInput, true);
    }

    if (errors.length > 0) {
        feedbackDiv.classList.add('alert', 'alert-danger');
        feedbackDiv.innerHTML = errors.map(e => `<div>${e}</div>`).join('');
    } else {
        feedbackDiv.classList.add('alert', 'alert-success');
        feedbackDiv.textContent = 'Form submitted successfully!';
        // Optionally clear form
        // (document.getElementById('userForm') as HTMLFormElement)?.reset();
    }
}

document.getElementById('userForm')?.addEventListener('submit', validateForm);
// ...existing code...