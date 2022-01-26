import { useState, useCallback, useEffect } from "react";
function useFetch(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState([]);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetch(url);
      const data = await result.json();

      if (result.ok) {
        setPayload(data);
      } else {
        setError(new Error(JSON.stringify(data)));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);
  return { loading, error, payload };
}
export default useFetch;
