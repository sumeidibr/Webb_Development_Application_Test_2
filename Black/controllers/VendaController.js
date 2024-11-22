import db from '../models/index.js';
const Venda = db.Venda;
const ItemVenda = db.ItemVenda;
const Livro = db.Livro; // Supondo que você tenha um modelo Livro para o estoque

const finalizarCompra = async (req, res) => {
  // Recupera os itens e o userId do corpo da requisição
  const { itens, userId } = req.body; // Recebe o userId diretamente do corpo da requisição

  // Validação dos dados
  if (!itens || itens.length === 0) {
    return res.status(400).json({
      message: "Itens ausentes. O carrinho de compras está vazio.",
    });
  }
  if (!userId) {
    return res.status(400).json({
      message: "Usuário não autenticado. Você precisa estar logado para finalizar a compra.",
    });
  }

  // Valida cada item no carrinho
  for (const item of itens) {
    if (!item.id_livro || !item.quantidade) {
      return res.status(400).json({
        message: "Dados incompletos para um ou mais itens. Verifique os detalhes do carrinho.",
      });
    }
  }

  // Inicia a transação no banco de dados
  const transaction = await db.sequelize.transaction();

  try {
    // 1. Criar a venda com id_user
    const venda = await Venda.create(
      {
        id_user: userId, // Agora inclui o id_user
        data: new Date(),
      },
      { transaction }
    );

    // 2. Processar os itens no carrinho
    for (const item of itens) {
      const livro = await Livro.findByPk(item.id_livro, { transaction });

      if (!livro) {
        throw new Error(`Livro com ID ${item.id_livro} não encontrado.`);
      }

      if (livro.quantidade < item.quantidade) {
        throw new Error(
          `Estoque insuficiente para o livro ${livro.titulo}. Disponível: ${livro.quantidade}, Solicitado: ${item.quantidade}`
        );
      }

      // Criar o item da venda
      await ItemVenda.create(
        {
          id_venda: venda.id_venda,
          id_livro: item.id_livro,
          quantidade: item.quantidade,
        },
        { transaction }
      );

      // Atualizar estoque do livro
      await Livro.update(
        { quantidade: livro.quantidade - item.quantidade },
        { where: { id_livro: item.id_livro }, transaction }
      );
    }

    // 3. Confirmar a transação
    await transaction.commit();
    res.status(201).json({ message: "Compra finalizada com sucesso!" });
  } catch (error) {
    // Se ocorrer um erro, desfaz a transação
    await transaction.rollback();
    console.error("Erro ao finalizar compra:", error.message);
    res.status(500).json({ message: error.message });
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
