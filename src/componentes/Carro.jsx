import { useContext, useState } from "react";
import { CartContext } from "../contexto/ContextoCarro";
import Checkout from "../paginas/Verificacion";


function Cart({ isOpen, onClose }) {

  const { cart, removeFromCart, total } = useContext(CartContext);
  const [mostrarCheckout, setMostrarCheckout] = useState(false);
  
  return (
    <div className={`cart-panel ${isOpen ? "open" : ""}`}>
      
      <button className="close-cart" onClick={() => {
      setMostrarCheckout(false);
      onClose();
      }}>
        ✖
      </button>

      <h2 className="titulo_carrito">Carrito</h2>

      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={index}>
            {item.name} {item.talla} x{item.quantity} - ${item.price * item.quantity}
            <button onClick={() => {
              removeFromCart(index);
              if (cart.length === 1) {
                setMostrarCheckout(false);
                onClose();
              }
            }}>X</button>
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: "20px" }}>Total: ${total}</h3>

      <button className="boton_carrito" 
      onClick={() => setMostrarCheckout(true)}
      disabled={cart.length === 0}>
        Llenar datos para finalizar compra
      </button>
      
      {cart.length === 0 && (
        <p style={{color:"gray", textAlign:"center", marginTop:"20px"}}>
          Tu carrito está vacío 
        </p>
      )}

      {mostrarCheckout && (
        <div>
          <Checkout onClose={() => setMostrarCheckout(false)}
            closeCart={onClose}/>
        </div>
      )}

    </div>
    
  );
}

export default Cart;