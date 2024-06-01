import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const params = useParams();
  const fetchProduct = async () => {
    const response = await axios.get(
      `https://dummyjson.com/product/${params.id}`
    );
    return response.data;
  };

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", params.id],
    queryFn: fetchProduct,
    staleTime: 10000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default Product;
