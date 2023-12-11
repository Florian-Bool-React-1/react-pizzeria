import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function PizzasList({ onEditPizza }) {
  let initiated = false;
  const [pizzasList, setPizzasList] = useState([]);

  async function fetchData() {
    const jsonData = await (await fetch('http://localhost:3005/pizzas')).json();

    setPizzasList(jsonData.data);
  }

  async function handleEditClick(id) {
    const pizzaData = await (await (fetch('http://localhost:3005/pizzas/' + id))).json();

    // apriamo l'overlay
    onEditPizza(pizzaData);
  }

  // All'avvio dell'applicazione, fetchiamo i dati
  useEffect(() => {
    if (initiated) {
      return;
    }

    fetchData();

    initiated = true;
  }, []);

  return (
    <>
      <section className="py-8">
        <div className="container px-4 mx-auto">
          <h1 className="text-6xl text-center mb-8">Benvenuti!</h1>

          {pizzasList.map((pizza, index) => <PizzaSection key={pizza.id} pizza={pizza} reverse={index % 2 !== 0} handleEditClick={handleEditClick}></PizzaSection>)}

        </div>
      </section>
    </>
  );
}

function PizzaSection({ pizza, reverse, handleEditClick }) {
  function getImgUrl() {
    // se pizza.dettaglio.image non esiste, mettiamo il placeholder
    if (!pizza.dettaglio?.image) {
      return "/pizza_placeholder.webp";
    }

    if (pizza.dettaglio.image.startsWith("http") || pizza.dettaglio.image.startsWith("data:")) {
      return pizza.dettaglio.image;
    }

    return "http://localhost:3005/" + pizza.dettaglio.image;
  }

  return (
    <>
      <div className={"w-full py-24 border-b flex " + (reverse && 'flex-row-reverse')}>
        <div className="aspect-square w-1/3">
          <img src={getImgUrl()} alt="" className="w-full h-full object-cover" />
        </div>

        <div className={"flex flex-col gap-6  w-2/3 " + (reverse ? 'pr-24 text-right' : 'pl-24')}>
          <h2 className="text-4xl font-semibold mb-4">{pizza.name}</h2>

          {/* descrizione */}
          <p className="text-xl text-gray-500">{pizza.dettaglio?.descrizione ?? 'Descrizione non disponibile'}</p>

          {/* ingredienti */}
          <p className="text-gray-500 text-sm ">{pizza.ingredienti.length ? pizza.ingredienti.map(ingredient => <span key={ingredient.id} className="px-2">{ingredient.name}</span>) : 'Ingredienti non disponibili'}</p>

          <div className="flex gap-4">
            <Link to={'/pizze/' + pizza.id} className='w-full bg-blue-500 hover:bg-blue-800 px-8 py-4 rounded-lg text-white transition-colors'>
              Visualizza
            </Link>
            <button className='w-full bg-blue-500 hover:bg-blue-800 px-8 py-4 rounded-lg text-white transition-colors'
              onClick={() => handleEditClick(pizza.id)}>
              Modifica
            </button>
          </div>
        </div>
      </div>
    </>
  );
}