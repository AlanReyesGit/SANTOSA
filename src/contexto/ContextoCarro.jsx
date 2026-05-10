import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const clearCart = () => {setCart([]);};

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existe = cart.find(
    item => item.id === product.id && item.talla === product.talla
  );

  if(existe){
    setCart(
      cart.map(item =>
        item.id === product.id && item.talla === product.talla
          ? {...item, quantity: item.quantity + 1}
          : item
      )
    );
  }else{
    setCart([...cart, {...product, quantity: 1}]);
  }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};