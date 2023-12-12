import { useEffect, useState } from 'react';
import styles from '../css/modules/NewPizzaOverlay.module.css';

const initialFormData = {
  name: '',
  description: '',
  price: 0,
  vegan: false,
  glutenFree: false,
  available: false,
  image: '',
  ingredients: []
};

export function NewPizzaOverlay({ show, data, onClose }) {
  const inputClasses = "w-full border-2 border-gray-300 rounded-lg px-4 py-2 transition-colors focus:outline-none focus:border-primary";
  const [closing, setClosing] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [ingredientsList, setIngredientsList] = useState([]);

  // Ascolto quando data cambia e aggiorno il formData
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        description: data.dettaglio?.descrizione ?? '',
        price: data.price,
        vegan: data.vegan,
        glutenFree: data.glutenFree,
        available: data.available,
        image: data.dettaglio?.image ?? '',
        ingredients: data.ingredients
      });
    }
  }, [data]);

  function handleClose() {
    setClosing(true);
    // resetto il formData ad ogni chiusura nel overlay
    setFormData(initialFormData);

    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 500);
  }

  function handleInputChange(e, key) {
    const value = e.target.value;
    const checked = e.target.checked;

    let newValue = e.target.type === 'checkbox' ? checked : value;

    /*
    Quando gestiamo un input di tipo file, il valore che dobbiamo salvare non è il value, 
    ma i singoli file scelti che troviamo dentro la proprietà "files" dell'input
    */
    if (e.target.type === 'file') {
      // prendo il primo file selezionato che è un istanza della classe File.
      newValue = e.target.files[0];
    }

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

    /*
    Quando vogliamo eseguire l'upload di un file in JS,
    dobbiamo usare un oggetto di tipo FormData
    al quale, tramite il metodo append, passiamo i dati da inviare
    */
    const formDataToSend = new FormData();

    // formDataToSend.append("image", formData.image);
    // formDataToSend.append("name", formData.name);

    // Ottengo un array di tutte le chiavi dell'oggetto formData
    // prendo ogni chiave dell'oggetto collegato al form e la appendo all'oggetto formDataToSend con il relativo valore
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    const editMode = !!data;

    const response = await fetch("http://localhost:3005/pizzas/" + (editMode ? data.id : ''), {
      method: editMode ? "put" : "post",
      headers: {
        // Quando il body è un istanza di FormData, non dobbiamo specificare il content type
        // "Content-Type": "multipart/form-data"
      },
      // body: JSON.stringify(formData)
      // nel caso di upload di file, passiamo nel body tutto l'oggetto FormData insieme al content type multipart/form-data
      body: formDataToSend
    });

    if (!response.ok) {
      alert("Errore durante l'invio dei dati: " + await response.text());
    } else {
      handleClose();
    }
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  function getImagePreview() {
    return typeof formData.image !== 'string' ? URL.createObjectURL(formData.image) : formData.image;
  }

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
          <input type="checkbox" checked={formData.vegan} onChange={e => handleInputChange(e, "vegan")} id="vegan_input" className={''} />
          <label htmlFor="vegan_input" className='ml-2'>Vegana</label>
        </div>
        <div className='mb-4'>
          <input type="checkbox" checked={formData.glutenFree} onChange={e => handleInputChange(e, "glutenFree")} id="glutenFree_input" className={''} />
          <label htmlFor="glutenFree_input" className='ml-2'>Senza glutine</label>
        </div>
        <div className='mb-4'>
          <input type="checkbox" checked={formData.available} onChange={e => handleInputChange(e, "available")} id="available_input" className={''} />
          <label htmlFor="available_input" className='ml-2'>Disponibile</label>
        </div>
        <div className='mb-4'>
          <label htmlFor="image_input" className='mb-1 block'>Immagine</label>
          <input type="file" accept='image/*' onChange={e => handleInputChange(e, "image")} id="image_input" />
          {getImagePreview() && <img src={getImagePreview()} alt="" className='w-32 h-32 object-cover' />}
        </div>
        <div className='mb-4'>
          <label>Ingredienti</label>

          <div className='flex gap-4 flex-wrap'>
            {ingredientsList.map(ingredient => {
              return <label key={ingredient.id}>
                <input type="checkbox" value={ingredient.id} onChange={e => handleInputChange(e, "ingredients")}
                  id="ingredients_input" checked={ingredientsList.find(i => i.id === ingredient.id)} />
                <span className='ml-1'>{ingredient.name}</span>
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