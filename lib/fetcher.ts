const fetcher: <T>(url: string, init?: RequestInit) => Promise<T> = async (
  url,
  init,
) => {
  const response = await fetch(url, init);

  return await response.json();
};

export default fetcher;
