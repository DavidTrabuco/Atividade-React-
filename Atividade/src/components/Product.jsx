import './Product.css';

function Product({ nome, preco, descricao, handleRemove }) {
    const handleRemoveClick = () => {
        if (window.confirm('Você tem certeza que deseja remover este produto?')) {
            handleRemove();
        }
    }

    return (
        <div className="product-card">
            <h2>{nome}</h2>
            <p>{descricao}</p>
            <span>{preco}</span>
            <button className='remove-button' onClick={handleRemoveClick}>Remover Produto</button>
        </div>
    );
}

export default Product;