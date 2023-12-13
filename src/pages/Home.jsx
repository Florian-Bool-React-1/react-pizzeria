import { useEffect, useState } from "react";
import FabButton from "../components/FabButton";
import { NewPizzaOverlay } from "../components/NewPizzaOverlay";
import { PizzasList } from "../components/PizzasList";
import TheFooter from "../components/TheFooter";
import TheNavbar from "../components/TheNavbar";
import { PlusIcon } from '@heroicons/react/24/solid';
import { PizzeProvider } from "../contexts/PizzeContext";

export default function Home() {
  const [showNewPizzaOverlay, setShowNewPizzaOverlay] = useState(false);
  const [overlayData, setOverlayData] = useState(null);

  // tolgo overflow dal body quando overlay è aperto
  useEffect(() => {
    // Devo togliere l'overflow dal body quando l'overlay è aperto
    document.body.classList.toggle('overflow-hidden', showNewPizzaOverlay);
    document.body.classList.toggle('pr-4', showNewPizzaOverlay);

    // Se il modale è stato chiuso, va resettato il overlayData
    if (!showNewPizzaOverlay) {
      setOverlayData(null);
    }

  }, [showNewPizzaOverlay]);

  function openEditOverlay(pizzaData) {
    setOverlayData(pizzaData);
    setShowNewPizzaOverlay(true);
  }

  return (
    <PizzeProvider>
      <PizzasList onEditPizza={openEditOverlay}></PizzasList>

      <FabButton onClick={() => setShowNewPizzaOverlay(true)}><PlusIcon className="group-hover:rotate-180 group-hover:scale-125 duration-500"></PlusIcon></FabButton>

      <NewPizzaOverlay show={showNewPizzaOverlay} data={overlayData} onClose={() => setShowNewPizzaOverlay(false)}></NewPizzaOverlay>
    </PizzeProvider>
  );
}