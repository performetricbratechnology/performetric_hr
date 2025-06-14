import { useState, useCallback } from "react";

type FetchResponse<T> = {
  response: Response | null;
  json: T | null;
};

const useFetch = <T = unknown,>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (url: string, options?: RequestInit): Promise<FetchResponse<T>> => {
      let response: Response | null = null,
        json: T | null = null;

      try {
        setLoading(true);
        setError(null);

        response = await fetch(url, options);
        json = await response.json();
      } catch (erro: unknown) {
        json = null;
        if (erro instanceof Error) setError(erro.message);
      } finally {
        setData(json);
        setLoading(false);
      }
      return { response, json };
    },
    []
  );

  return { request, error, data, loading };
};

export default useFetch;
