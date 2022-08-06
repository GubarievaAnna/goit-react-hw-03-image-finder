import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const api = (query, page = 1) => {
  const searchParams = new URLSearchParams({
    q: query,
    page,
    key: '28571023-8e49c7f94aea826d37a546ac4',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  return axios.get(`?${searchParams}`).then(response => response.data);
};

export default api;
