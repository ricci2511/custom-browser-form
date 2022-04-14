const startsWithVowel = (str) => {
    const vowelRegex = new RegExp('^[aeiou].*', 'i');
    return vowelRegex.test(str);
};

const checkPasswordsMatch = () => {
    const password = document.querySelector('#passw');
    const confirmPassw = document.querySelector('#confirmPassw');

    if (confirmPassw.value !== password.value) {
        // when not matching with the other password input turn this input invalid to trigger css styling
        return confirmPassw.setCustomValidity('Invalid');
    }

    return confirmPassw.setCustomValidity('');
};

const handleValidationOnInput = (field, fieldLabel, fieldErrorMessage) => {
    if (field.id === 'confirmPassw' || field.id === 'passw') {
        checkPasswordsMatch();
        return fieldErrorMessage.textContent = `The two password fields must match`;
    } 

    return fieldErrorMessage.textContent = `Please enter a valid ${fieldLabel}`;
};

const checkAndDisplayValidationError = (field) => {
    // get only the text of each field label and format it
    const fieldLabel = field.parentElement.querySelector('label')
        .childNodes[0].textContent.toLowerCase().trim();
    // get the correct article to later display the error message string with correct grammar
    const correctArticleForFieldLabel = startsWithVowel(fieldLabel) ? 'an' : 'a';
    const fieldErrorMessage = field.parentElement.querySelector('.error-message');

    if (field.validity.valueMissing) {
        fieldErrorMessage.textContent = `You must enter ${correctArticleForFieldLabel} ${fieldLabel}`;
        fieldErrorMessage.classList.add('active');
    }

    // remove the error message to have a cleaner and more positive UI when interacting with the inputs
    field.addEventListener('focus', () => fieldErrorMessage.classList.remove('active'));
    field.addEventListener('input', () => handleValidationOnInput(field, fieldLabel, fieldErrorMessage));
};

const form = document.querySelector('.browser-form');

const validateRequiredFields = (e) => {
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.validity.valid) {
            e.preventDefault();
            checkAndDisplayValidationError(field);
        } 
    });
};

form.addEventListener('submit', validateRequiredFields);

document.addEventListener('input', (e) => {
    if (e.target.matches('#passw') || e.target.matches('#confirmPassw')) {
        checkPasswordsMatch();
    }
});
