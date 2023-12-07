function NavbarLink({ href, children }) {
  return (<a href={href ?? '#'} className="block py-3 px-4 min-w-[80px] text-center rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-primary">
    {children}
  </a>);
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-sm shadow-lg ">
      <nav className="py-4">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div>
            <img src="logo.jpg" alt="Logo of Ristoria Pizzorante" className="h-11" />
          </div>

          <div>
            <ul className="flex">
              <li><NavbarLink>Home</NavbarLink></li>
              <li><NavbarLink>Menu</NavbarLink></li>
              <li><NavbarLink>Contatti</NavbarLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </header >
  );
}