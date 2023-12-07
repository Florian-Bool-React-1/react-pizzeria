import { useState } from 'react';
import styles from '../css/modules/NewPizzaOverlay.module.css';

export function NewPizzaOverlay({ show, onClose }) {
  const [closing, setClosing] = useState(false);

  function handleClose() {
    setClosing(true);

    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 500);
  }

  if (!show) return null;

  return (<div className={styles.newPizzaOverlay + (closing ? " " + styles.closing : '')} onClick={handleClose}>
    <div className={styles.panelOverlay} onClick={e => e.stopPropagation()}>
      <h1 className="text-2xl mb-12">Aggiungi una nuova pizza!</h1>

      <form className='mb-8 flex-grow'>
        <input type="text" value="red" />
      </form>

      <div className='flex gap-4'>
        <button className='w-full bg-primary hover:bg-primaryDark px-8 py-4 rounded-lg text-white transition-colors'>
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