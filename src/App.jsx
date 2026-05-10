import Home from "./paginas/Inicio";
import { CartProvider } from "./contexto/ContextoCarro";


function App(){

  return(

    <CartProvider>
      
      <Home/>

    </CartProvider>

  );

}

export default App;