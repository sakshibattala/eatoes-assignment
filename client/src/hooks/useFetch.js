import { useEffect, useState } from "react";

export const useFetch = (apiFunc, params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (overrideParams = params) => {
    try {
      setLoading(true);
      const res = await apiFunc(overrideParams);
      setData(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(params);
  }, []);

  return { data, loading, error, refetch: fetchData, setData };
};
