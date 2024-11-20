import db from '../models/index.js';
const Venda = db.Venda;
const ItemVenda = db.ItemVenda;
const Livro = db.Livro; // Supondo que você tenha um modelo Livro para o estoque

const finalizarCompra = async (req, res) => {
  const { itens } = req.body; // Itens será um array de objetos { id_livro, quantidade, preco }

  const userId = req.userId; // Recupera o id do usuário, assumindo que está autenticado

  if (!numeroCelular || !itens || itens.length === 0) {
    return res.status(400).json({ message: "Preencha todos os dados corretamente" });
  }

  const transaction = await db.sequelize.transaction(); // Inicia uma transação para garantir que tudo ou nada seja realizado

  try {
    // 1. Criar a venda
    const venda = await Venda.create(
      {
        id_user: userId,
        data: new Date(),
      },
      { transaction }
    );

    // 2. Criar os itens da venda e atualizar o estoque
    for (const item of itens) {
      const livro = await Livro.findByPk(item.id_livro, { transaction });

      if (!livro || livro.quantidade < item.quantidade) {
        throw new Error(`Estoque insuficiente para o livro ${livro.titulo}`);
      }

      // 2.1. Criar o item de venda
      await ItemVenda.create(
        {
          id_venda: venda.id_venda,
          id_livro: item.id_livro,
          quantidade: item.quantidade,
          preco: item.preco,
        },
        { transaction }
      );

      // 2.2. Atualizar o estoque do livro
      await Livro.update(
        { quantidade: livro.quantidade - item.quantidade },
        { where: { id_livro: item.id_livro }, transaction }
      );
    }

    // 3. Confirmar a transação
    await transaction.commit();

    res.status(201).json({ message: "Compra finalizada com sucesso!" });
  } catch (error) {
    // Se algo der errado, desfaz tudo o que foi feito na transação
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};



const createVenda = async (req, res) => {
  try {
    const venda = await Venda.create(req.body);
    res.status(201).json(venda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllVendas = async (req, res) => {
  try {
    const vendas = await Venda.findAll();
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVendaById = async (req, res) => {
  try {
    const venda = await Venda.findByPk(req.params.id);
    if (venda) {
      res.status(200).json(venda);
    } else {
      res.status(404).json({ message: 'Venda not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVenda = async (req, res) => {
  try {
    const [updated] = await Venda.update(req.body, {
      where: { id_venda: req.params.id },
    });
    if (updated) {
      const updatedVenda = await Venda.findByPk(req.params.id);
      res.status(200).json(updatedVenda);
    } else {
      res.status(404).json({ message: 'Venda not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVenda = async (req, res) => {
  try {
    const deleted = await Venda.destroy({
      where: { id_venda: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Venda deleted' });
    } else {
      res.status(404).json({ message: 'Venda not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createVenda,
  getAllVendas,
  getVendaById,
  updateVenda,
  deleteVenda,
  finalizarCompra
};
