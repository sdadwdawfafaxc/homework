const addBtn = document.getElementById('addHomeworkBtn');
const modal = document.getElementById('modal');
const cancelBtn = document.getElementById('cancelBtn');
const homeworkForm = document.getElementById('homeworkForm');
const homeworkList = document.getElementById('homeworkList');
const downloadBtn = document.getElementById('downloadBtn');
const uploadBtn = document.getElementById('uploadBtn');
const uploadFile = document.getElementById('uploadFile');

let homeworkData = [];

async function loadHomeworkData() {
  try {
    const response = await fetch('homework-data.json');
    if (response.ok) {
      homeworkData = await response.json();
    }
  } catch (err) {
    console.warn('ไม่พบไฟล์ homework-data.json หรือเกิดข้อผิดพลาด');
  }
  renderHomework();
}

function renderHomework() {
  homeworkList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  homeworkData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="homework image">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <small>ส่งภายใน: ${item.dueDate}</small>
    `;
    fragment.appendChild(card);
  });
  homeworkList.appendChild(fragment);
}

addBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

homeworkForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;
  const imageFile = document.getElementById('image').files[0];

  if (!imageFile) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const newHomework = {
      title,
      description,
      dueDate,
      image: event.target.result // Data URL base64
    };

    homeworkData.push(newHomework);
    renderHomework();

    modal.classList.add('hidden');
    homeworkForm.reset();
  };

  reader.readAsDataURL(imageFile);
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(homeworkData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'homework-data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

uploadBtn.addEventListener('click', () => {
  uploadFile.click();
});

uploadFile.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      if (Array.isArray(importedData)) {
        homeworkData = importedData;
        renderHomework();
      } else {
        alert('ไฟล์ไม่ถูกต้อง');
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการโหลดไฟล์');
    }
  };

  reader.readAsText(file);
});

loadHomeworkData();
