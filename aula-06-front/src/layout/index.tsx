import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header>
        <h1>Aula 06</h1>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/contatos"}>Contatos</Link>
            </li>
            <li>
              <Link to={"/servicos"}>Serviços</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Aula 06 - Direitos Reservados.</p>
      </footer>
    </>
  );
};
