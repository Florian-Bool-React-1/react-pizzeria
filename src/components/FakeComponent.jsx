import { useEffect, useState } from "react";

export default function FakeComponent({ show }) {
  const [datiForm, setDatiForm] = useState({ name: "ciao" });

  let timer;

  useEffect(() => {
    console.log("componente FAKE creato. UseEffect senza dipendenze invocato");

    timer = setInterval(() => {
      console.log("tik tak" + Date.now());
    }, 1000);

    return () => {
      console.log("componente distrutto");
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!show) {
      setDatiForm({ name: "ciao" });
    }
  }, [show]);

  return (<div className={!show ? 'hidden' : ''}>Sono un Fake Component {datiForm.name}</div>);
}