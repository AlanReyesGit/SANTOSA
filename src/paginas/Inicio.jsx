import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import santosa_logo from '../imagenes/Santosa_logo.jpg'
import contactanos from '../imagenes/Contactanos.jpg'

import '../App.css'
import products from "../datos/Productos";
import ProductCard from "../componentes/CartaProducto";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

import { useState, useContext } from "react";
import Cart from "../componentes/Carro";
import { CartContext } from "../contexto/ContextoCarro";

function Home() {

const [cartOpen, setCartOpen] = useState(false);
const { cart } = useContext(CartContext);
const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (      
    <>
      <section id="center" className="center">
        <div>
          <img src={santosa_logo} className="santosa" alt="Santosa logo" />
        </div>
        <div>
          <h1 className="titulo">Santosa  Style</h1>
          <p className="lema">
            Ropa que acompaña a tu movimiento, clases que equilibran tu energía 🧘🏻‍♀️💖
          </p>
        </div>
      </section>
      
    
      <section id="catalogo" className="catalogo">
        <div>
          <h1 className="titulo_catalogo">Catálogo</h1>
          <div style={{display:"grid", gridTemplateColumns: "repeat(3, 1fr)", gap:20}}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p}/>
            ))}
          </div>
        </div>  
      </section>


      <div>
        <button id="cart-icon" onClick={() => setCartOpen(true)} className="cart-button">
          🛒{totalItems > 0 && (
            <span className="contador-carrito">{totalItems}</span>
          )}
        </button>
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)}/>
      </div>
      

      <div className="ticks"></div>

      <section id="next-steps" className="center">
        <div id="social">
          {/*<svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>*/}
          <img src={contactanos} className="icon" alt="contactanos" />
          <h2 className="lema">Contáctanos</h2>
          <ul>
            <li>
              <a href="https://www.instagram.com/santosafit/" target="_blank">
                <FaInstagram size={24} />
                Instagram
              </a>
            </li>
            <li>
              <a href="https://wa.me/0983726057" target="_blank">
                <FaWhatsapp size={24} />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      {/*<section id="spacer" className="center"></section>*/}
    </>
  )
}


export default Home;
