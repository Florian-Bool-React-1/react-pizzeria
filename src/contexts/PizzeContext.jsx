import { createContext, useContext, useState } from "react";

// creazione dell context
const PizzeContext = createContext();

// creazione di un elemento custom attorno al provider
export function PizzeProvider({ children }) {
  const [pizzasList, setPizzasList] = useState([]);

  async function fetchData() {
    const jsonData = await (await fetch('http://localhost:3005/pizzas')).json();

    setPizzasList(jsonData.data);
  }

  return (
    <PizzeContext.Provider value={{pizzasList, fetchData}}>
      {children}
    </PizzeContext.Provider>
  );
}

// creazione di un custom hook per accedere al context
export function usePizze() {
  return useContext(PizzeContext);
}