import { Link } from "react-router-dom";
import { useCompany } from "../contexts/CompanyContext";
import { useContext } from "react";
import { GlobalContext } from "../App";

function FooterLink({ href, children }) {
  return (<Link to={href} className="text-white text-sm border-b border-transparent hover:border-white duration-300 transition-all">
    {children}
  </Link>);
}

export default function TheFooter() {
  const { theme, setTheme } = useContext(GlobalContext);
  const { logo, menu, company, contacts } = useCompany();

  return (
    <footer className="bg-primary pt-24 pb-12">
      <div className="container mx-auto px-4 pb-12 flex">

        <div className="bg-white py-12 rounded-lg text-center w-1/3">
          <img src={logo.url} alt={logo.alt} className="inline-block mb-4" />

          <div className="italic text-base">
            {company.claim}
          </div>

          <div className="mt-4">
            Tema corrente: {theme}

            <div>
              <button onClick={() => setTheme('light')}>Chiaro</button>
              <button onClick={() => setTheme('dark')}>Scuro</button>
            </div>
          </div>
        </div>

        <div className="w-1/3 px-4 lg:px-10">
          <h3 className="font-bold text-white text-xl border-b pb-2 mb-4">Link</h3>
          <ul className="">
            {menu.map((el, i) => <li key={i}><FooterLink href={el.url}>{el.label}</FooterLink></li>)}
          </ul>
        </div>

        <div className="w-1/3 px-4 lg:px-10">
          <h3 className="font-bold text-white text-xl border-b pb-2 mb-4">Contatti</h3>
          <ul className="text-white">
            <li><FooterLink href="#">{company.address}</FooterLink></li>
            <li><FooterLink href="#">{contacts.phone}</FooterLink></li>
            <li><FooterLink href="#">{contacts.email}</FooterLink></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto py-4 text-center border-t">
        <span className="text-gray-400">Powered by</span> <FooterLink href="#" >Classe ExperisReact#1</FooterLink>
      </div>
    </footer>
  );
}