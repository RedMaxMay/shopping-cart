import React from "react";
import Product from "../Product";

const ShoppingCart = ({
  error,
  isLoaded,
  products,
  cartIsEmpty,
  increasePrice,
  decreasePrice,
  deleteProduct,
}) => {
  const totalProducts = products.reduce(
    (sum, item) => (sum += item.counter),
    0
  );
  const totalPrice = products.reduce(
    (sum, item) => (sum += item.price * item.counter),
    0
  );

  if (error) {
    return (
      <div>
        <div className="message">
          Unfortunately, an error occurred: {error.message}
        </div>
      </div>
    );
  } else if (cartIsEmpty) {
    return (
      <div>
        <div className="message">Your shopping cart is empty :(</div>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>
        <div className="message">Please wait, products are loading...</div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="products">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              increasePrice={increasePrice}
              decreasePrice={decreasePrice}
              deleteProduct={deleteProduct}
            />
          ))}
        </div>
        <div className="total">
          <p>
            Total products: <span>{totalProducts} </span>
          </p>
          <p>
            Grand total: <span className="total__sum">{totalPrice.toFixed(2)}</span>
          </p>
        </div>
      </div>
    );
  }
};

export default ShoppingCart;
