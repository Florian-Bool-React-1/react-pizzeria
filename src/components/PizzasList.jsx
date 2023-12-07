import { useEffect } from "react";

export function PizzasList() {
  let initiated = false;

  useEffect(() => {
    if (initiated) {
      return;
    }

    console.log("App.js: useEffect");

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log("App.js: fetch", data);
      });

    initiated = true;

  }, []);

  return (
    <>
      <section className="py-8">
        <div className="container px-4 mx-auto">
          <h1 className="text-6xl text-center mb-8">Benvenuti!</h1>

          <PizzaSection></PizzaSection>
          <PizzaSection reverse></PizzaSection>

        </div>
      </section>
    </>
  );
}

function PizzaSection({ reverse }) {
  return (
    <div className={"w-full py-24 border-b flex " + (reverse && 'flex-row-reverse')}>
      <div className="aspect-square w-1/3">
        <img src="logo.jpg" alt="" className="w-full h-full object-cover" />
      </div>

      <div className={"flex flex-col gap-6  w-2/3 " + (reverse ? 'pr-24 text-right' : 'pl-24') }>
        <h2 className="text-4xl font-semibold mb-4">Margherita</h2>

        {/* descrizione */}
        <p className="text-xl text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur maxime corrupti sed laborum nemo quod est voluptatem. In cumque consequuntur temporibus saepe excepturi accusamus, voluptate maiores iste sunt inventore provident.</p>

        {/* ingredienti */}
        <p className="text-gray-500 text-sm">Pomodoro, mozzarella, basilico</p>
      </div>
    </div>
  );
}