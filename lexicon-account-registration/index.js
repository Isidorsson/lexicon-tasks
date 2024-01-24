const form = document.querySelector('form');
const submitButton = document.querySelector('button[type="submit"]');
const messageDiv = document.querySelector('.message');


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

form.addEventListener('submit', function (event) { // 1st event listener
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

