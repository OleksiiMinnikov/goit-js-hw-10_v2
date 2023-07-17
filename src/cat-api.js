import axios from 'axios';

// Установка заголовка 'x-api-key' для всех запросов с помощью Axios
axios.defaults.headers.common['x-api-key'] =
    'live_FKODWTLPidV9Vi5VFGbdH174LaEiofgOurSPDcDvsAxK3Pw3ECyTM87A6njT2uTJ';

// Функция для получения списка пород кошек
export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      // Проверяем, является ли ответ действительным массивом данных
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response');
      }
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

// Функция для получения случайной фотографии кошки по идентификатору породы
export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      // Проверяем, является ли ответ действительным массивом данных
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response');
      }
      return response.data[0]; // Возвращаем первый элемент массива
    })
    .catch(error => {
      console.error('Error fetching cat:', error);
      throw error;
    });
}
