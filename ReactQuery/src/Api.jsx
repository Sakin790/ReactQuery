import React, { useEffect, useState } from "react";

import axios from "axios";
const App = () => {
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (Loading) {
    return (
      <div>
        <h3>Loading....</h3>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h3>Error: {error.message}</h3>
      </div>
    );
  }
  return (
    <div>
      <h1>Products</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
