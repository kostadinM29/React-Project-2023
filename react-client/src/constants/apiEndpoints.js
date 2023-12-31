export const ENDPOINTS = {
  BASE_URL: 'https://localhost:5001/',
  BASE_API_URL: 'https://localhost:5001/api/',
  LOGIN: 'user/login',
  REGISTER: 'user/register',
  REFRESH_TOKEN: 'user/refresh-token',
  LOGOUT: 'user/logout',
  LISTING_CREATE: 'listings/create',
  LISTING_EDIT: 'listings/edit',
  LISTING_DELETE: 'listings/delete',
  LISTINGS_LATEST: 'listings/latest',
  LISTINGS_ALL: 'listings/all',
  LISTINGS_ALL_BY_USER: 'listings/all-by-user',
  LISTING_BY_USER: 'listings/one-by-user', // Used for editing.
  LISTING_BY_ID: 'listings/one', // Used for details - where everyone can view the specific listing.
  LISTING_UPDATE_VIEWS: 'listings/update-views',
  CHATS_BY_USER: 'chats/get-chats-by-user',
  STATS: 'stats/get-stats',
};