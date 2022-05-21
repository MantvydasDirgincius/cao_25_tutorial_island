const formEl = document.forms[0];
const BASE_URL = 'http://localhost:3000';

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const logInInfo = {
    email: formEl.elements.email.value,
    password: formEl.elements.password.value,
  };

  const resp = await axios.post(`${BASE_URL}/v1/login`, logInInfo)
  console.log(resp);
});
