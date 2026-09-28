import type { ServicosProps } from "../../types/servicos";

export const CardServico = ({ servico }) => {
  return (
    <div key={servico.id}>
      <h3>{servico.nome}</h3>
      <p>R${servico.preco}</p>
    </div>
  );
};
