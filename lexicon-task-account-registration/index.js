document.addEventListener('DOMContentLoaded', function () {
  const MIN_PASSWORD_LENGTH = 8;

  const form = document.querySelector('form');
  const submitBtn = document.querySelector('button[type="submit"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const confirmPasswordInput = document.querySelectorAll('input[type="password"]')[1];
  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

  function getFormData() {
    const name = form.querySelector('input[name="name"]').value;
    const username = form.querySelector('input[name="username"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    return { name, username, email, password, confirmPassword };
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const registrationData = getFormData();

    console.log(registrationData);
  });

  form.addEventListener('input', function () {
    const { name, username, email, password, confirmPassword } = getFormData();

    const isAnyInputEmpty = !name || !username || !email || !password || !confirmPassword;
    const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
    const doPasswordsMatch = password === confirmPassword;

    passwordInput.classList.toggle('error', !isPasswordValid);
    confirmPasswordInput.classList.toggle('error', !doPasswordsMatch);
    submitBtn.disabled = isAnyInputEmpty || !isPasswordValid || !doPasswordsMatch;
  });

  togglePassword.addEventListener('click', function () {
    togglePasswordVisibility(passwordInput, togglePassword);
    togglePasswordVisibility(confirmPasswordInput, toggleConfirmPassword);
  });

  const labels = form.querySelectorAll('label');
  labels.forEach(label => {
    label.addEventListener('click', function () {
      const input = label.querySelector('input');
      input.focus();
    });
  });
});

function togglePasswordVisibility(inputElement, eyeIcon) {
  const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
  inputElement.setAttribute('type', type);
}

function togglePasswordVisibility(inputElement, eyeIcon) {
  const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
  inputElement.setAttribute('type', type);

  // Toggle the eye icon slash class
  if (type === 'password') {
    eyeIcon.classList.add('fa-eye-slash');
    eyeIcon.classList.remove('fa-eye');
  } else {
    eyeIcon.classList.add('fa-eye');
    eyeIcon.classList.remove('fa-eye-slash');
  }
}


  // togglePassword.addEventListener('click', function () {
  //   togglePasswordVisibility(passwordInput);
  // });

  // toggleConfirmPassword.addEventListener('click', function () {
  //   togglePasswordVisibility(confirmPasswordInput);
  // });

  


// function togglePasswordVisibility(inputElement) {
//   const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
//   inputElement.setAttribute('type', type);
// }
