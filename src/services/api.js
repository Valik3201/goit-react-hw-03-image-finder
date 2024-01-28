import axios from 'axios';

const API_KEY = '41006597-e52c63fe5093395ccafd50f48';

axios.defaults.baseURL = 'https://pixabay.com/api';

const PER_PAGE = 12;

const fetchImages = async (searchQuery, currentPage) => {
  const params = {
    q: searchQuery,
    page: currentPage,
    keyy: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: PER_PAGE,
    safesearch: true,
  };

  const response = await axios.get('/', { params });

  return response.data;
};

export default fetchImages;
