import ShoppingCart from "../ShoppingCart";
import { useState, useEffect } from "react";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [prodId, setProdId] = useState();
  const [cartIsEmpty, setCartIsEmpty] = useState(true);

  useEffect(() => {
    if (prodId) {
      fetch(`https://fakestoreapi.com/products/${prodId}`)
        .then((resp) => resp.json())
        .then(
          (data) => {
            setCartIsEmpty(false);
            setIsLoaded(true);
            data.counter = 1;
            setProducts([...products, data]);
          },
          (error) => {
            setCartIsEmpty(false);
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [prodId]);

  const createProduct = (e) => {
    e.preventDefault();
    let id = e.target.id.value;
    if (id < 20 && id > 0) {
      setProdId(id);
    } else {
      alert("To add a product write the ID number from 1 to 20!");
    }
    e.target.id.value = "";
  };

  const decreasePrice = (id) => {
    const target = products.find((item) => item.id === id);
    if (target.counter > 1) {
      target.counter--;
      setProducts([...products]);
    } else if (target.counter === 1) {
      if (window.confirm("Do you want to delete a product?")) {
        deleteProduct(id);
      }
    }
  };

  const increasePrice = (id) => {
    const target = products.find((item) => item.id === id);
    target.counter++;
    setProducts([...products]);
  };

  const deleteProduct = (id) => {
    const newArr = products.filter((product) => product.id !== id);
    setProducts(newArr);
    if (newArr.length === 0) {
      setCartIsEmpty(true);
    }
  };

  return (
    <main>
      <header>FakeStoreAPI-shop</header>
      <h1>Shopping cart</h1>

      <form onSubmit={createProduct} className="add-product-form">
        <label htmlFor="product-id" className="label">
          To add a product write the ID number from 1 to 20:
        </label>
        <input
          type="text"
          name="id"
          className="product-id"
          id="product-id"
          placeholder="Product's ID number..."
          required=""
        ></input>
        <button className="add-btn">Add product</button>
      </form>

      <ShoppingCart
        error={error}
        isLoaded={isLoaded}
        products={products}
        cartIsEmpty={cartIsEmpty}
        decreasePrice={decreasePrice}
        increasePrice={increasePrice}
        deleteProduct={deleteProduct}
      />
      <footer>
        <p>©MaxMay</p>
      </footer>
    </main>
  );
}

export default App;
