import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ServicosProps } from "../../types/servicos";
import { CardServico } from "../../components/Card";

export const Servicos = () => {
  const [servicos, setServicos] = useState<ServicosProps[]>();

  async function buscarServicos() {
    const { data } = await axios.get("http://localhost:3000/servicos");
    setServicos(data);
  }

  useEffect(() => {
    buscarServicos();
  }, []);
  return (
    <>
      <div>
        <h2>Lista de Serviços</h2>
        <Link to={"/servicos/cadastrar"}>Adicionar novo Serviço</Link>
      </div>
      <section>
        {servicos &&
          servicos.map((element) => {
            return <CardServico pro />;
          })}
      </section>
    </>
  );
};
