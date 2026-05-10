import { useContext, useState, useRef } from "react";
import { CartContext } from "../contexto/ContextoCarro";

function ProductCard({ product }) {

  const { addToCart } = useContext(CartContext);

  const [imgIndex, setImgIndex] = useState(0);

  const imgRef = useRef(null);

  const nextImage = () => {
    setImgIndex((imgIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setImgIndex(
      (imgIndex - 1 + product.images.length) % product.images.length
    );
  };

  const [selectedSize, setSelectedSize] = useState(product.talla[0]);

  const animarProductoAlCarrito = (imgElement) => {

    const cart = document.getElementById("cart-icon");

    if (!cart || !imgElement) return;

    const img = imgElement.cloneNode(true);

    const rect = imgElement.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    img.style.position = "fixed";
    img.style.left = rect.left + "px";
    img.style.top = rect.top + "px";
    img.style.width = rect.width + "px";
    img.style.height = rect.height + "px";
    img.style.transition = "all 0.7s ease";
    img.style.zIndex = "2000";
    img.style.pointerEvents = "none";

    document.body.appendChild(img);

    setTimeout(() => {
      img.style.left = cartRect.left + "px";
      img.style.top = cartRect.top + "px";
      img.style.width = "20px";
      img.style.height = "20px";
      img.style.opacity = "0.5";
    }, 10);

    setTimeout(() => {
      img.remove();
    }, 700);
  };

  const handleAddToCart = () => {

    animarProductoAlCarrito(imgRef.current);

    addToCart({
      ...product,
      talla: selectedSize
    });

  };

  return (
    <div className="product-card" style={{ border: "1px solid #ccc", padding: 10 }}>

      <button onClick={prevImage}>◀</button>

      <img
        ref={imgRef}
        src={product.images[imgIndex]}
        width="250"
        height="400"
      />

      <button onClick={nextImage}>▶</button>

      <h3>{product.name}</h3>

      <h4>Precio: ${product.price}</h4>

      <h4>Color: {product.color}</h4>

      <h4>
        Talla:&nbsp;
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          {product.talla.map((talla) => (
            <option key={talla}>{talla}</option>
          ))}
        </select>
      </h4>

      <button onClick={handleAddToCart}>
        Agregar al carrito
      </button>

    </div>
  );
}

export default ProductCard;