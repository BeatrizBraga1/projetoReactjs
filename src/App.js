import {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {

  const[input, setInput] = useState('');
  const[cep, setcep] = useState({});

  async function handleSearch(){
    // 01310930/json/

    if(input === ''){
      alert("Preencha algum CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setcep(response.data)
      setInput("");

    }catch{
      alert("Ops erro ao buscar");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e)=> setInput(e.target.value)}
         />

         <button className="buttonSearch" onClick={handleSearch}>
           <FiSearch size={25} color="#FFF"/>
         </button>

      </div>
         
         {Object.keys(cep).length > 0 &&(
           <main className="main">
              <h2>CEP: {cep.cep}</h2>

              <span>Logradouro: {cep.logradouro}</span>
              <span>Bairro: {cep.bairro}</span>
              <span>Localidade: {cep.localidade} - {cep.uf}</span>

            </main>
         )}      

    </div>
  );
}

export default App;
