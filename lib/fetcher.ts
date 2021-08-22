import ky from 'ky';

export async function fetcher<T = any>(url: string, init?: RequestInit): Promise<T> {
  const extKy =  ky.extend({
    hooks: {
      afterResponse: [
        async (_req, _opt, res) => {
          if (!res.ok) {
              const contentType = res.headers.get('Content-Type');
              if (!contentType || contentType.indexOf('application/json') === -1) 
                throw await res.text();
              throw await res.json();
          }
        },
      ],
    },
  });
  
  const response = await extKy(url,init)

  const contentType = response.headers.get('Content-Type');
  if (!contentType || contentType.indexOf('application/json') === -1) {
    return (await response.text()) as never;
  }

  return await response.json();
}


