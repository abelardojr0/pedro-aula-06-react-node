import express from "express";
import cors from "cors";
import pool from "./db.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("MINHA API ESTÁ NO AR.");
});

app.get("/servicos", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM servicos ORDER BY id");
    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      mensagem: "Erro no servidor ao buscar serviços",
      error: err,
    });
  }
});

app.get("/servicos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query("SELECT * FROM servicos WHERE id = $1", [
      id,
    ]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Serviço não encontrado no banco de dados.",
      });
    }
    res.json(resultado.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      mensagem: "Erro no servidor ao buscar serviços",
      error: err,
    });
  }
});

app.post("/servicos", async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;

    const resultado = await pool.query(
      `
      INSERT INTO servicos (nome, descricao, preco)
      VALUES($1, $2, $3)
      RETURNING *
      `,
      [nome, descricao, preco],
    );
    res.status(201).json({
      mensagem: "Serviço criado com sucesso.",
      servico: resultado.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      mensagem: "Erro no servidor ao buscar serviços",
      error: err,
    });
  }
});

app.put("/servicos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;

    const resultado = await pool.query(
      `
      UPDATE servicos
      SET
        nome = $1,
        descricao = $2,
        preco = $3
      WHERE id = $4
      RETURNING *
      `,
      [nome, descricao, preco, id],
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Serviço não encontrado no banco de dados.",
      });
    }
    res.json({
      mensagem: "Serviço alterado com sucesso.",
      servico: resultado.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      mensagem: "Erro no servidor ao buscar serviços",
      error: err,
    });
  }
});

app.delete("/servicos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      `
      DELETE FROM servicos
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Serviço não encontrado no banco de dados.",
      });
    }
    res.json({
      mensagem: "Serviço removido com sucesso.",
      servico: resultado.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      mensagem: "Erro no servidor ao buscar serviços",
      error: err,
    });
  }
});

// CONTATOS --------------------------------------------------------------

app.get("/contatos", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM contatos ORDER BY id");
    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      mensagem: "Erro no servidor ao buscar contatos",
      error: err,
    });
  }
});

app.get("/contatos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query("SELECT * FROM contatos WHERE id = $1", [
      id,
    ]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Contato não encontrado no banco de dados.",
      });
    }
    res.json(resultado.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      mensagem: "Erro no servidor ao buscar contato",
      error: err,
    });
  }
});

app.post("/contato", async (req, res) => {
  try {
    const { nome, email, cpf } = req.body;

    const resultado = await pool.query(
      `
      INSERT INTO contato (nome, email, cpf)
      VALUES($1, $2, $3)
      RETURNING *
      `,
      [nome, email, cpf],
    );
    res.status(201).json({
      mensagem: "Contato criado com sucesso.",
      contato: resultado.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      mensagem: "Erro no servidor ao buscar contatos",
      error: err,
    });
  }
});

app.put("/contatos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, cpf } = req.body;

    const resultado = await pool.query(
      `
      UPDATE contatos
      SET
        nome = $1,
        email = $2,
        cpf = $3
      WHERE id = $4
      RETURNING *
      `,
      [nome, email, cpf, id],
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Contato não encontrado no banco de dados.",
      });
    }
    res.json({
      mensagem: "Contato alterado com sucesso.",
      contato: resultado.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      mensagem: "Erro no servidor ao buscar contatos",
      error: err,
    });
  }
});

app.delete("/contatos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      `
      DELETE FROM contatos
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Contato não encontrado no banco de dados.",
      });
    }
    res.json({
      mensagem: "Contato removido com sucesso.",
      contato: resultado.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      mensagem: "Erro no servidor ao buscar contatos",
      error: err,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
