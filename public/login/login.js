import { clearErrorsArr, errorsArr, checkInput } from '../modules/validation.js';

const BASE_URL = 'http://localhost:3000';
const formEl = document.forms[0];

const errSpanEl = document.querySelectorAll('.errorSpan');

const emailInpEL = formEl.elements.email;
const passwordInpEL = formEl.elements.password;

emailInpEL.addEventListener('blur', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4']);
  handleError(errorsArr);
});

passwordInpEL.addEventListener('blur', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'maxLength-10']);
  handleError(errorsArr);
});

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const logInInfo = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };

  clearErrors();

  checkInput(logInInfo.email, 'email', ['required', 'minLength-4', 'email']);

  checkInput(logInInfo.password, 'password', ['required', 'minLength-4', 'maxLength-10']);

  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }

  try {
    const { data } = await axios.post(`${BASE_URL}/v1/login`, logInInfo);
    if (data.success) {
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userId', data.paylod.userId);
      window.location.replace('../tutorials/tutorials.html');
    }
  } catch (error) {
    handleError(error.response.data.message);
  }
});

function clearErrors() {
  clearErrorsArr();

  errSpanEl.forEach((htmlElement) => {
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
function handleError(msg) {
  errSpanEl.textContent = '';
  if (typeof msg === 'string') {
    errSpanEl.forEach((elements) => {
      elements.textContent = msg;
    });
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}
