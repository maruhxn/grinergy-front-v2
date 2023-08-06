const BASE_URL = process.env.REACT_APP_DEV_SERVER_URL;

const API = {
  NEWS: `${BASE_URL}/news`,
  NOTICE: `${BASE_URL}/notice`,
  AUTH: `${BASE_URL}/auth`,
  SEARCH_NOTICE: `${BASE_URL}/search/notice`,
  SEARCH_NEWS: `${BASE_URL}/search/news`,
};

export default API;
