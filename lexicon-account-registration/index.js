const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirm-password');


passwordField.addEventListener('input', validatePasswords);
confirmPasswordField.addEventListener('input', validatePasswords);

const messageDiv = document.querySelector('.message');
const submitButton = document.querySelector('button[type="submit"]');

function validatePasswords() {
  if (passwordField.value !== confirmPasswordField.value) {
    confirmPasswordField.classList.add('error');
    messageDiv.textContent = 'Passwords do not match';
    submitButton.disabled = true;
  } else {
    confirmPasswordField.classList.remove('error');
    messageDiv.textContent = '';
    submitButton.disabled = false;
  }
}