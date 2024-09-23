export const signOut = () => {
  // Clear user data from local storage or cookies
  localStorage.removeItem('userToken');
  localStorage.removeItem('userData');

  // Redirect to login page or home page
  window.location.href = '/login';
};
