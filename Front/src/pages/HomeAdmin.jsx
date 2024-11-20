import React, { useState, useEffect } from 'react';
import "../assets/style/homeAdmin.css"; // Importando o arquivo de estilo

const BookForm = () => {
  const [categories, setCategories] = useState([]); // Estado para armazenar as categorias
  const [bookData, setBookData] = useState({
    titulo: '',
    autor: '',
    preco: '',
    quantidade: '',
    categoria_id: ''
  });
  const [error, setError] = useState(null); // Estado para armazenar erros da requisição
  const [successMessage, setSuccessMessage] = useState('');

  // Carregar as categorias da API quando o componente for montado
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/categorias');
        if (!response.ok) {
          throw new Error('Erro ao carregar categorias');
        }
        const data = await response.json();
        setCategories(data); // Armazena as categorias no estado
      } catch (error) {
        setError(error.message); // Armazena o erro, se houver
      }
    };

    fetchCategories(); // Chama a função para carregar as categorias
  }, []); // O array vazio significa que o efeito será executado apenas uma vez, quando o componente for montado

  // Função para lidar com as mudanças nos campos do formulário
  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value
    });
  };

  // Função para enviar os dados do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Validação básica
    if (!bookData.titulo || !bookData.autor || !bookData.preco || !bookData.quantidade || !bookData.categoria_id) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    // Enviar os dados para a API
    try {
      const response = await fetch('http://localhost:3005/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao salvar livro');
      } else {
        const data = await response.json();
        setSuccessMessage('Livro adicionado com sucesso!');
        setError(null); // Limpa qualquer erro anterior
        setBookData({
          titulo: '',
          autor: '',
          preco: '',
          quantidade: '',
          categoria_id: '', // Limpa os campos após o sucesso
        });
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>Adicionar Livro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
<div>
  
        <input
          type="text"
          name="titulo"
          value={bookData.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <input
          type="text"
          name="autor"
          value={bookData.autor}
          onChange={handleChange}
          placeholder="Autor"
          required
        />
        <textarea
          name="descricao"
          value={bookData.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          required
        />
        <input
          type="number"
          name="preco"
          value={bookData.preco}
          onChange={handleChange}
          placeholder="Preço"
          required
        />
        <input
          type="number"
          name="quantidade"
          value={bookData.quantidade}
          onChange={handleChange}
          placeholder="Quantidade"
          required
        />
</div>

      {/* Campo para selecionar a Categoria */}
      <select
        name="categoria_id"
        value={bookData.categoria_id}
        onChange={handleChange}
        required
      >
        <option value="">Selecione a Categoria</option>
        {categories.map((category) => (
          <option key={category.categoria_id} value={category.categoria_id}>
            {category.nome}
          </option>
        ))}
      </select>

      <button type="submit">Salvar</button>
    </form>
  );
};

export default BookForm;
