import React, { useEffect } from "react";
import { useCart } from "../Context/cartProvider";
import { FaTrashAlt } from "react-icons/fa";

export default function RenderCart() {
  const { removeItemInCart, cartItems, clearCart } = useCart()
  const [price, setPrice] = React.useState(0);

  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const cartElements = cartItems.map((item) => {
    
    
    function handleRemove(item) {
      removeItemInCart(item.id)
    }

    return (
      <div className="cart-item">
        <div className="cart-item-header">
          <h4>{item.name}</h4>
          <FaTrashAlt onClick={() => handleRemove(item.id)} />
        </div>
        <p>{dollarUS.format(item.price)}</p>
        <p>{item.description}</p>
        {item.choice && (
          <ul>
            <li>{item.choice} </li>
            <li>{item.spice}</li>
            <li>{item.rice}</li>
          </ul>
        )}
      </div>
    );
  });

  useEffect(() => {
    const cartTotal = cartItems.reduce((acc, curr) => acc + curr.price, 0);
    setPrice(dollarUS.format(cartTotal));
  }, [cartItems, dollarUS]);

  return (
    <div>
      <button onClick={clearCart}>clear cart</button>
      {cartItems.length > 0 ? cartElements : <h3>nothing in cart</h3>}
      {cartItems.length > 0 && <p>Subtotal: {price}</p>}
    </div>
  );
}
