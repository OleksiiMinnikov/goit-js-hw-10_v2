import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Получаем ссылки на элементы DOM
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const catImage = document.getElementById('breed_image');

// Функция для заполнения списка пород кошек в селекте
function populateBreedSelect(breeds) {
  breedSelect.innerHTML = ''; // Очищаем содержимое селекта
  breeds.forEach(breed => {
    const option = document.createElement('option'); // Создаем элемент option
    option.value = breed.id; // Устанавливаем значение как идентификатор породы
    option.textContent = breed.name; // Устанавливаем текстовое содержимое как имя породы
    breedSelect.appendChild(option); // Добавляем option в селект
  });
}

// Функция для отображения информации о кошке
function showCatInfo(cat) {
  const catImageContainer = document.createElement('div'); // Создаем контейнер для изображения
  catImageContainer.appendChild(catImage); // Добавляем изображение в контейнер

  catImage.src = cat.url; // Устанавливаем источник изображения
  catImage.alt = cat.breeds[0].name; // Устанавливаем альтернативный текст из имени породы

  const catName = document.createElement('h2'); // Создаем заголовок h2
  catName.textContent = cat.breeds[0].name; // Устанавливаем текстовое содержимое из имени породы

  const catDescription = document.createElement('p'); // Создаем абзац
  catDescription.textContent = cat.breeds[0].description; // Устанавливаем текстовое содержимое из описания породы

  const catTemperament = document.createElement('p'); // Создаем абзац
  catTemperament.textContent = cat.breeds[0].temperament; // Устанавливаем текстовое содержимое из характера породы

  catInfo.innerHTML = ''; // Очищаем содержимое блока
  catInfo.appendChild(catImageContainer); // Добавляем контейнер с изображением в блок
  catInfo.appendChild(catName); // Добавляем заголовок в блок
  catInfo.appendChild(catDescription); // Добавляем описание в блок
  catInfo.appendChild(catTemperament); // Добавляем характер в блок
  catInfo.style.display = 'block'; // Показываем блок
}

// Обработчик события изменения выбранной породы в селекте
breedSelect.addEventListener('change', () => {
  const breedId = breedSelect.value; // Получаем выбранный идентификатор породы
  fetchCatByBreed(breedId)
    .then(cat => {
      showCatInfo(cat); // Отображаем информацию о кошке
    })
    .catch(error => {
      console.error('Error fetching cat:', error);
      catInfo.style.display = 'none'; // Скрываем блок информации о кошке при ошибке
    });
});

// Получаем список пород кошек и заполняем селект
fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
  })
  .catch(error => {
    console.error('Error fetching breeds:', error);
    breedSelect.disabled = true; // Отключаем селект в случае ошибки
  });
