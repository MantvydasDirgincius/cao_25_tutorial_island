const gridEl = document.querySelector('.grid');
const BASE_URL = 'http://localhost:3000';

const token = localStorage.getItem('userToken');
console.log(token);

if (!token) {
  fetchTutorials(`${BASE_URL}/v1/public-tutorial`);
} else {
  fetchTutorials(`${BASE_URL}/v1/all-tutorial`);
}

function createCard(title, content, mode, author) {
  console.log(title, content, mode, author);
  const cardEl = document.createElement('div');
  cardEl.className = 'card';
  const h3El = document.createElement('h3');
  h3El.textContent = title;
  const pEl = document.createElement('p');
  pEl.textContent = content;
  const pEl2 = document.createElement('p');
  pEl2.textContent = mode;
  const pEl3 = document.createElement('p');
  pEl3.textContent = author;
  cardEl.append(h3El, pEl, pEl2, pEl3);
  return cardEl;
}

function generateCard(dest, arr) {
  dest.innerHTML = '';
  arr.forEach((tutObj) => {
    const card = createCard(tutObj.title, tutObj.content, tutObj.private, tutObj.user_id);
    dest.appendChild(card);
  });
}

async function fetchTutorials(endpoint) {
  try {
    const { data } = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    generateCard(gridEl, data.tutorials);
  } catch (error) {
    console.log(error);
  }
}
