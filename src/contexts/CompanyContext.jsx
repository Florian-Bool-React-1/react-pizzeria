import { createContext, useContext, useState } from "react";

const CompanyContext = createContext();

/**
 * Crea un wrapper attorno al provider del context
 */
export function CompanyProvider({ children }) {

  // Creo gli stati o funzioni che voglio rendere disponibili
  const [company, setCompany] = useState({
    name: 'Pizzeria da Mario',
    address: 'Via Roma 1, 20100 Milano',
    claim: "Se non ci vieni sei ignurante!"
  });

  const [contacts, setContacts] = useState({
    phone: '02 12345678',
    email: 'info@ristoria_pizzorange.it'
  });

  const [menu, setMenu] = useState([{
    label: "Home",
    url: "/",
  }, {
    label: "Menu",
    url: "/menu",
  }, {
    label: "Contatti",
    url: "/contatti",
  }]);

  const [logo, setLogo] = useState({
    url: "/logo.jpg",
    alt: "Logo della pizzeria"
  });

  return (
    <CompanyContext.Provider value={{ company, contacts, menu, logo }}>
      {children}
    </CompanyContext.Provider>
  );
}

/**
 * Hook per recuperare il context
 */
export function useCompany() {
  return useContext(CompanyContext);
}