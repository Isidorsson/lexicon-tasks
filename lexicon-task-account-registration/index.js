const form = document.querySelector('form');
const submitButton = document.querySelector('button[type="submit"]');
const messageDiv = document.querySelector('.message');
const togglePassword = document.querySelector('#togglePassword');
const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
const passwordField = document.querySelector('#password');
const confirmPasswordField = document.querySelector('#confirm-password');



const fields = {
  name: document.getElementById('name'),
  username: document.getElementById('username'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  confirmPassword: document.getElementById('confirm-password'),
};

function getInputValues() {
  return Object.keys(fields).reduce((values, key) => {
    values[key] = fields[key].value;
    return values;
  }, {});
}

function validatePasswords() {
  if (fields.password.value !== fields.confirmPassword.value) {
    fields.confirmPassword.classList.add('error');
    messageDiv.textContent = 'Passwords do not match';
  } else {
    fields.confirmPassword.classList.remove('error');
    messageDiv.textContent = '';
  }
}

function checkFormCompletion() {
  const values = getInputValues();
  const allFieldsFilled = Object.values(values).every(value => value);
  const passwordsMatch = fields.password.value === fields.confirmPassword.value;

  if (allFieldsFilled && passwordsMatch) {
    submitButton.disabled = false;
    submitButton.style.backgroundColor = 'green';
  } else {
    submitButton.disabled = true;
    submitButton.style.backgroundColor = 'red';
  }
}

function togglePasswordField(field, toggleButton) {
  const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
  field.setAttribute('type', type);
  toggleButton.classList.toggle('fa-eye-slash');
}

togglePassword.addEventListener('click', function (event) {
  togglePasswordField(passwordField, this);
  togglePasswordField(confirmPasswordField, toggleConfirmPassword);
});

toggleConfirmPassword.addEventListener('click', function (event) {
  togglePasswordField(passwordField, togglePassword);
  togglePasswordField(confirmPasswordField, this);
});
form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log(getInputValues());
});

// form.addEventListener('submit', function (event) {  // its for alert but disabled it cus i dont like alers:D
//   event.preventDefault();
//   alert(JSON.stringify(getInputValues()));
// });

Object.values(fields).forEach(input => {
  input.addEventListener('input', () => {
    validatePasswords();
    checkFormCompletion();
  });
});

checkFormCompletion();

