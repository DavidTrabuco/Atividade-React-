import './App.css';
import Product from './components/Product';
import { useEffect, useState } from 'react';

function App() {
    const API = "https://crudcrud.com/api/e7f2fc4c365e4802ab438998705e8533/tarefas"; 
    const [products, setProducts] = useState([]);
    const [addProduct, setAddProduct] = useState({
        nome: '',
        preco: '',
        descricao: '',
    });

    // Buscar produtos ao carregar o componente
    const fetchProducts = () => {
        fetch(API)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Erro ao buscar dados:', error));
    };

    useEffect(() => {
    fetchProducts();
  }, []);

    // Manipulador de mudanças nos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddProduct({ ...addProduct, [name]: value });
    };

    // Manipulador de envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!addProduct.nome || !addProduct.preco || !addProduct.descricao) {" "
            alert('Por favor, preencha todos os campos.');
            return;
        }
     

        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...addProduct,
                preco: parseFloat(addProduct.preco), 
            }),
        })
            .then((response) => response.json())
            .then(() => {
                setAddProduct({ nome: '', preco: '', descricao: '' });
                fetchProducts(); 
            })
            .catch((error) => console.error('Erro ao adicionar produto:', error));
    };



    // Manipulador de remoção de produto
    const handleRemove = (id) => {
        return () => {
            fetch(`${API}/${id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    fetchProducts();
                })
                .catch((error) => console.error('Erro ao remover produto:', error));
        };
    };

    return (
        <>
            <h1>Product Card</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nome"
                    value={addProduct.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                    required
                />
                <input
                    type="number"
                    name="preco"
                    value={addProduct.preco}
                    onChange={handleChange}
                    placeholder="Preço"
                    min="0"
                    step="0.01"
                    required
                />
                <input
                    type="text"
                    name="descricao"
                    value={addProduct.descricao}
                    onChange={handleChange}
                    placeholder="Descrição"
                    required
                />
                <button type="submit">Adicionar Produto</button>
            </form>

            <ul className='product-list'>
                {products.map((product) => (
                    <Product
                        key={product._id}
                        nome={product.nome}
                        preco={product.preco}
                        descricao={product.descricao}
                        id={product._id}
                        handleRemove={ handleRemove(product._id)}
                        
                    />
                ))}
            </ul>
        </>
    );
}

export default App;