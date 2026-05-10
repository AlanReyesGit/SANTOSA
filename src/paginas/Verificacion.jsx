import { useContext, useState } from "react";
import { CartContext } from "../contexto/ContextoCarro";
import "../App.css";
import Swal from 'sweetalert2'


function validarCedula(cedula){

  if(!/^\d{10}$/.test(cedula)) return false;

  const provincia = parseInt(cedula.substring(0,2));
  const tercerDigito = parseInt(cedula[2]);

  if(provincia < 1 || provincia > 24) return false;
  if(tercerDigito >= 6) return false;

  let suma = 0;

  for(let i = 0; i < 9; i++){
    let num = parseInt(cedula[i]);

    if(i % 2 === 0){
      num = num * 2;
      if(num > 9) num -= 9;
    }

    suma += num;
  }

  const decena = Math.ceil(suma / 10) * 10;
  const digitoValidador = decena - suma === 10 ? 0 : decena - suma;

  return digitoValidador === parseInt(cedula[9]);
}

function Checkout({ onClose, closeCart }) {

  const { cart, total, clearCart  } = useContext(CartContext);

  const [form,setForm] = useState({
    nombre:"",
    cedula:"",
    celular:"",
    correo:""
  });

  const formularioCompleto =
  form.nombre.trim() !== "" &&
  form.cedula.length === 10 &&
  form.celular.length >= 10;

  const handleChange = (e)=>{
    const { name, value } = e.target;

  if(name === "nombre"){
    const soloLetras = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    setForm({
      ...form,
      [name]: soloLetras
    });
  }

  else if(name === "cedula" || name === "celular"){
    const soloNumeros = value.replace(/\D/g, "");
    setForm({
      ...form,
      [name]: soloNumeros
    });
  }

  else{
    setForm({
      ...form,
      [name]: value
    });
  }
  };

  const [enviando, setEnviando] = useState(false);

  const enviarCompra = async (e) => {
    e.preventDefault();

    if(enviando) return; 
    setEnviando(true);

    if(!validarCedula(form.cedula)){
      Swal.fire({
        title: 'Cédula inválida',
        text: 'La cédula ingresada no es válida',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setEnviando(false);
      return;
    }
    if(!/^\d{10,13}$/.test(form.celular)){
      Swal.fire({
        title: 'Número de celular inválido',
        text: 'El número de celular debe tener entre 10 y 13 dígitos',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setEnviando(false);
      return;
    }



    const pedido = {
    nombre: form.nombre,
    cedula: form.cedula,
    celular: form.celular,
    correo: form.correo,
    productos: cart.map(p => `${p.name} ${p.talla} x${p.quantity}`).join(", "),
    total: total
  };

  await fetch("https://script.google.com/macros/s/AKfycbzA5rnrDsW93TnIiXjhjZj17QKRQBp1ny5oR9_aA7ONTeO8xd5droYHoOAy6A2g1REe4g/exec", {
    method: "POST",
    body: JSON.stringify(pedido)
  });


    Swal.fire({
      title: 'Santosa agradece tu compra🙏',
      html: 'Su pedido fue registrado con éxito. <br><br> Nos comunicaremos contigo lo antes posible😊',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      clearCart();   
      closeCart(); 
      onClose(); 
    });

  
    console.log({
      cliente:form,
      total
    });

  };

const soloLetras = (e) => {
  const tecla = e.key;

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(tecla) &&
      tecla !== "Backspace" &&
      tecla !== "Tab" &&
      tecla !== "ArrowLeft" &&
      tecla !== "ArrowRight") {
    e.preventDefault();
  }
};

const soloNumeros = (e) => {
  const tecla = e.key;

  if (!/^\d$/.test(tecla) &&
      tecla !== "Backspace" &&
      tecla !== "Tab" &&
      tecla !== "ArrowLeft" &&
      tecla !== "ArrowRight") {
    e.preventDefault();
  }
};

  return(

    <div className="overlay"> 
      <div className="cuadro_verificacion">

        <button className="close-checkout" onClick={onClose}>
          ✖
        </button>

        <h1 className="titulo_verificacion">DATOS</h1>

        <h2 className="lema">Total: ${total}</h2>

        <form onSubmit={enviarCompra} className="formulario">

          <input
          name="nombre"
          className="input_form"
          value={form.nombre}
          placeholder="Nombre completo"
          required
          onChange={handleChange}
          onKeyDown={soloLetras}
          />

          <br/>

          <input
          name="cedula"
          className="input_form"
          value={form.cedula}
          placeholder="Cédula"
          required
          maxLength="10"
          onChange={handleChange}
          onKeyDown={soloNumeros}
          />

          <br/>

          <input
          name="celular"
          className="input_form"
          value={form.celular}
          placeholder="Celular"
          required
          maxLength="13"
          onChange={handleChange}
          onKeyDown={soloNumeros}
          />
        

          <br/>

          <input
          name="correo"
          className="input_form"
          value={form.correo}
          placeholder="Correo (opcional)"
          onChange={handleChange}
          />

          <br/>

          <button type="submit" className="boton_carrito" disabled={!formularioCompleto || enviando}>
            Confirmar Compra
          </button>

        </form>

      </div>
    </div>
    

  );

}

export default Checkout;