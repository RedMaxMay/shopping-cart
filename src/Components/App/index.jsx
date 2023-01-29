import { useState, useEffect } from "react";
import AddProductForm from "../AddProductForm";
import Product from "../Product";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/`)
      .then((resp) => resp.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setProducts(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return (
      <div>
        <header>FakeStoreAPI-shop</header>
        <div className="message">
          К сожалению, возникла ошибка: {error.message}
        </div>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>
        <header>FakeStoreAPI-shop</header>
        <div className="message">
          Пожалуйста, ожидайте, идет загрузка товаров...
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <header>FakeStoreAPI-shop</header>
        <h1>Shopping cart</h1>

        <AddProductForm />

        <div className="products">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>


        <footer>
          <p>©MaxMay</p>
        </footer>
      </div>
    );
  }
}

export default App;
