import React from "react";
import { Link } from "react-router-dom";



const App = () => {
  return (
    <div>
      <h1>product Api</h1>
      <Link to="/"> Home</Link>
      <Link to="/products">products</Link>
    </div>
  );
};

export default App;
