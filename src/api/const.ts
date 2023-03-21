export const API_HOST = 'https://strapi.cleverland.by';

export const API = {
  booksUrl: `${API_HOST}/api/books`,
  categoriesUrl: `${API_HOST}/api/categories`,
  registrationUrl: `${API_HOST}/api/auth/local/register`,
  loginUrl: `${API_HOST}/api/auth/local`,
  emailUrl: `${API_HOST}/api/auth/forgot-password`,
  passwordUrl: `${API_HOST}/api/auth/reset-password`,
  reviewUrl: `${API_HOST}/api/comments`,
  bookingUrl: `${API_HOST}/api/bookings`,
  userUrl: `${API_HOST}/api/users`,
};
