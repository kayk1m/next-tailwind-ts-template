const fetcher: (url: string, init?: RequestInit) => Promise<any> = async (url, init) => {
  const response = await fetch(url, init);

  return await response.json();
}

export default fetcher;