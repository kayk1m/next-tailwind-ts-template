export async function fetcher<T = any>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw await response.json();
  }

  const contentType = response.headers.get('Content-Type');
  if (!contentType || contentType.indexOf('application/json') === -1) {
    return (await response.text()) as never;
  }

  return await response.json();
}
