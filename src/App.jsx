import { useEffect, useState } from "react";
import FabButton from "./components/FabButton";
import { NewPizzaOverlay } from "./components/NewPizzaOverlay";
import { PizzasList } from "./components/PizzasList";
import TheFooter from "./components/TheFooter";
import TheNavbar from "./components/TheNavbar";
import { PlusIcon } from '@heroicons/react/24/solid';

function App() {
  const [showNewPizzaOverlay, setShowNewPizzaOverlay] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', showNewPizzaOverlay);
    document.body.classList.toggle('pr-4', showNewPizzaOverlay);
  }, [showNewPizzaOverlay]);

  return (
    <>
      <TheNavbar></TheNavbar>

      <main className="min-h-[50vh]">
        <PizzasList></PizzasList>
      </main>

      <TheFooter></TheFooter>

      <FabButton onClick={() => setShowNewPizzaOverlay(true)}><PlusIcon className="group-hover:rotate-180 group-hover:scale-125 duration-500"></PlusIcon></FabButton>

      <NewPizzaOverlay show={showNewPizzaOverlay} onClose={() => setShowNewPizzaOverlay(false)}></NewPizzaOverlay>
    </>
  );
}

export default App;
