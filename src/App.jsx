import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contatti from "./pages/Contatti";
import PizzeShow from "./pages/pizze/Show";
import DefaultLayout from "./pages/DefaultLayout";

function App() {

return (
  <BrowserRouter>
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/contatti" element={<Contatti />}></Route>
        <Route path="/pizze/:id" element={<PizzeShow />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
}

export default App;
