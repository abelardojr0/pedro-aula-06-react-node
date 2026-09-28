import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { Home } from "./pages/Home";
import { Contatos } from "./pages/Contatos";
import { Servicos } from "./pages/Servicos";
import { Page404 } from "./pages/Page404";
import { GlobalStyles } from "./styles/globalStyle";
import { CadastrarServico } from "./pages/Servicos/Cadastrar";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contatos" element={<Contatos />} />
            <Route path="servicos" element={<Servicos />} />
            <Route path="servicos/cadastrar" element={<CadastrarServico />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
