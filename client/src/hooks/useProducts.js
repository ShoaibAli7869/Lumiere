import { useState, useEffect } from "react";
import { productService } from "@/services/productService";

export function useProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const key = JSON.stringify(params);

  useEffect(() => {
    setLoading(true);
    productService
      .getAll(params)
      .then(({ data }) => {
        setProducts(data.products);
        setTotal(data.total);
        setPages(data.pages);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [key]);

  return { products, total, pages, loading, error };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productService
      .getOne(id)
      .then(({ data }) => setProduct(data.product))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
