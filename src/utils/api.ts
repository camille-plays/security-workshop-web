export function api<T>({
  url,
  body,
  method,
}: {
  url: string;
  method: string;
  body?: any;
}): Promise<T | undefined> {
  const requestOptions: RequestInit = {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };

  if (method === "POST") {
    requestOptions.body = JSON.stringify(body);
  }

  return fetch("http://localhost:8080" + url, requestOptions).then(
    (response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      if (response.status === 204) {
        return undefined;
      }

      if (response.status === 201) {
        return undefined;
      }

      return response.json() as Promise<T>;
    }
  );
}
