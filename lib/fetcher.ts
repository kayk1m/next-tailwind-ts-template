export async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  return await response.json();
}
