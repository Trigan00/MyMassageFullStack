import { useState, useCallback } from "react";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: any = null,
      headers: any = {}
    ) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
          // headers["CSRF-Token"] = cookies.get("XSRF-TOKEN");
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(JSON.stringify(data) || "Something went wrong");
        }

        setLoading(false);

        return data;
      } catch (e: any) {
        setLoading(false);
        setError(JSON.parse(e.message));
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
