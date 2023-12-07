import { useEffect, useState } from 'react';
import styles from '../css/modules/NewPizzaOverlay.module.css';

const initialFormData = {
  name: 'asdasd',
  description: '',
  price: 0,
  vegan: false,
  glutenFree: false,
  available: false,
  image: '',
  ingredients: []
};



export function NewPizzaOverlay({ show, onClose }) {
  const inputClasses = "w-full border-2 border-gray-300 rounded-lg px-4 py-2 transition-colors focus:outline-none focus:border-primary";
  const [closing, setClosing] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [ingredientsList, setIngredientsList] = useState([]);

  function handleClose() {
    setClosing(true);

    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 500);
  }

  function handleInputChange(e, key) {
    const value = e.target.value;
    const checked = e.target.checked;

    let newValue = e.target.type === 'checkbox' ? checked : value;

    // controllo se sto assegnando il valore alla proprietà ingredients
    // se si, devo gestire il valore come se fosse un array
    if (key === "ingredients") {
      let currentIngredients = formData.ingredients;

      if (checked) {
        currentIngredients.push(value);
      } else {
        currentIngredients = currentIngredients.filter(ingredient => ingredient !== value);
      }

      newValue = currentIngredients;
    }

    setFormData(prev => {
      return {
        ...prev,
        [key]: newValue
      };
    });
  }

  async function fetchIngredients() {
    const ingredients = await (await fetch("http://localhost:3005/ingredients/")).json();

    setIngredientsList(ingredients);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:3005/pizzas/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    handleClose()
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  if (!show) return null;

  return (<div className={styles.newPizzaOverlay + (closing ? " " + styles.closing : '')} onClick={handleClose}>
    <div className={styles.panelOverlay} onClick={e => e.stopPropagation()}>
      <h1 className="text-2xl mb-12">Aggiungi una nuova pizza!</h1>

      <form className='mb-8 flex-grow' onSubmit={handleFormSubmit} id="pizzaForm">
        <div className='mb-4'>
          <label htmlFor="name_input">Titolo</label>
          <input type="text" value={formData.name} onChange={e => handleInputChange(e, "name")} id="name_input" className={inputClasses} />
        </div>
        <div className='mb-4'>
          <label htmlFor="description_input">Descrizione</label>
          <input type="text" value={formData.description} onChange={e => handleInputChange(e, "description")} id="description_input" className={inputClasses} />
        </div>
        <div className='mb-4'>
          <label htmlFor="price_input">Prezzo</label>
          <input type="text" value={formData.price} onChange={e => handleInputChange(e, "price")} id="price_input" className={inputClasses} />
        </div>
        <div className='mb-4'>
          <label htmlFor="vegan_input">Vegana</label>
          <input type="checkbox" value={formData.vegan} onChange={e => handleInputChange(e, "vegan")} id="vegan_input" className={inputClasses} />
        </div>
        <div className='mb-4'>
          <label htmlFor="glutenFree_input">Senza glutine</label>
          <input type="checkbox" value={formData.glutenFree} onChange={e => handleInputChange(e, "glutenFree")} id="glutenFree_input" className={inputClasses} />
        </div>
        <div className='mb-4'>
          <label htmlFor="available_input">Disponibile</label>
          <input type="checkbox" value={formData.available} onChange={e => handleInputChange(e, "available")} id="available_input" className={inputClasses} />
        </div>
        <div className='mb-4'>
          <label htmlFor="image_input">Immagine</label>
          <input type="text" value={formData.image} onChange={e => handleInputChange(e, "image")} id="image_input" className={inputClasses} />
        </div>
        <div className='mb-4'>
          <label>Ingredienti</label>

          <div className='flex gap-3 flex-wrap'>
            {ingredientsList.map(ingredient => {
              return <label key={ingredient.id}>
                <input type="checkbox" value={ingredient.id} onChange={e => handleInputChange(e, "ingredients")} id="ingredients_input" />
                {ingredient.name}
              </label>;
            })}
          </div>
        </div>
      </form>

      <div className='flex gap-4'>
        <button className='w-full bg-primary hover:bg-primaryDark px-8 py-4 rounded-lg text-white transition-colors'
          form="pizzaForm" type='submit'>
          Aggiungi
        </button>
        <button className="w-full bg-gray-200 hover:bg-gray-400 px-8 py-4 rounded-lg text-gray-800 transition-colors"
          onClick={handleClose}>
          Annulla
        </button>
      </div>
    </div>
  </div>);
}