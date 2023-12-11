import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams, useSearchParams } from "react-router-dom";

export default function Show() {
  const {id} = useParams();

  // Ottengo uno state con i query string presenti
  const [searchParams, setSearchParams] = useSearchParams();
  const [pizza, setPizza] = useState({});
  const navigation = useNavigate();

  console.log(searchParams);

  async function fetchData() {
    setPizza(await (await (fetch('http://localhost:3005/pizzas/' + id))).json());
  }

  useEffect(() => {
    fetchData();

    // se non esiste il parametro "nome", reindirizzo l'utente alla homepage
    // if (!searchParams.get("nome")) {
    //   navigation("/");
    // }
  }, []);

  return (
    <div>
      <button onClick={() => navigation(-1)}>Indietro</button>
      <h1>Dettagli pizza #{id} - {pizza?.name}</h1>
    </div>
  );
}