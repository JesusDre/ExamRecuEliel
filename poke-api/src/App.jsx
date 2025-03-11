import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const[pokemonList, setPokemonList]= useState([]);
  const [offset, setOffset]= useState(0);
  const limit = 10;

  useEffect (() =>{
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((reponse)=>  
    setPokemonList(reponse.data.results))
    .catch((error) => console.error["Ocurrio un error: ", error]);
  }, [offset])

  return (
   <div>
    <h1>Pokemon Lista</h1>
    <ul>
      {pokemonList.map((pokemon, index) =>(
        <li key = {index}>{pokemon.name}
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1+offset}.png`}/>
        </li>
      ) )}
    </ul>
    <button onClick={()=>setOffset((prev) => Math.max(0,prev - limit))} disabled={offset===0}>anterior</button>
    <button onClick={()=>setOffset((prev) => prev + limit)}>siguiente</button>
   </div>
  )
}

export default App
