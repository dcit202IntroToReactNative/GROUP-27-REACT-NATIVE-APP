// ../services/useFetch.js

import { useEffect, useState } from "react";

export function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, []);

  // Include a getProduct function to get a single product by ID
  function getProduct(productId) {
    return data.find((product) => product.id === productId) || null;
  }

  return { data, loading, error, getProduct };
}
