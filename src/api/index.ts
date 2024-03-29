const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

export const logIn = async (formData: FormData, options = {}) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
    ...options,
  });
  const data = await response.json();

  return data;
};
