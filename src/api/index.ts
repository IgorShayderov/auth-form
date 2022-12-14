const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

export default (formData: FormData, options = {}) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
    ...options,
  });
};
