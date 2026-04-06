const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchPosts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Erro ao buscar posts: ${response.status}`);
  }
  return response.json();
}
