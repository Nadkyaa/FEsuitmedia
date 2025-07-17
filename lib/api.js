
const BASE_URL = 'https://suitmedia-backend.suitdev.com/api/ideas';

export async function fetchIdeas(pageNumber = 1, pageSize = 10, sortOrder = '-published_at') {
  const params = new URLSearchParams({
    'page[number]': pageNumber.toString(),
    'page[size]': pageSize.toString(),
    append: 'small_image,medium_image',
    sort: sortOrder
  });

  const url = `${BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorBody = await response.text();
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
          const errorJson = JSON.parse(errorBody);
          if (errorJson.message) {
              errorMessage += `, message: ${errorJson.message}`;
          }
      } catch (e) {
          errorMessage += `, response: ${errorBody.substring(0, 100)}...`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal mengambil ide:", error);
    throw error;
  }
}