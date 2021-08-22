import ky from 'ky';

export const fetcher = ky.extend({
  hooks: {
    afterResponse: [
      async (_req, _opt, res) => {
        const contentType = res.headers.get('Content-Type');
        if (!contentType || contentType.indexOf('application/json') === -1) 
          throw await res.text();
        if (!res.ok) throw await res.json();
      },
    ],
  },
});

export async function swrFetcher<T = any>(url: string, init?: RequestInit): Promise<T> {
  return await fetcher(url,init).json()
 
}