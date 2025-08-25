// Seleciona os elementos necessários
const btnsAdicionar = document.querySelectorAll('.adicionarNoCarrinho');
const itensCarrinho = document.getElementById('itens-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const btnFinalizar = document.getElementById('btn-finalizar');

// Variável para armazenar os itens do carrinho
let carrinho = [];

// Função para atualizar o carrinho na interface
function atualizarCarrinho() {
    // Limpa os itens do carrinho na interface
    itensCarrinho.innerHTML = '';

    // Atualiza os itens no carrinho
    carrinho.forEach((item, index) => {
        const cardCart = document.createElement('div');
        cardCart.classList.add('cardCart');
        cardCart.innerHTML = `
            <div>
                <h2>${item.nome}</h2>
                <h3>${item.descricao}</h3>
                <p>RS ${item.preco.toFixed(1)}</p>
            </div>
            <div class="counter">
                <button class="decrementar" data-index="${index}">-</button>
                <p id="contador-quantidade">${item.quantidade}</p>
                <button class="incrementar" data-index="${index}">+</button>
            </div>
        `;
        itensCarrinho.appendChild(cardCart);
    });

    // Atualiza o total
    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    totalCarrinho.textContent = `RS ${total.toFixed(2)}`;

    // Adiciona eventos de incrementar e decrementar
    const btnsIncrementar = document.querySelectorAll('.incrementar');
    const btnsDecrementar = document.querySelectorAll('.decrementar');

    btnsIncrementar.forEach(btn => {
        btn.addEventListener('click', incrementarQuantidade);
    });

    btnsDecrementar.forEach(btn => {
        btn.addEventListener('click', decrementarQuantidade);
    });
}

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(event) {
    const cardProduto = event.target.closest('.cardProduto');
    const nome = cardProduto.querySelector('.nomeDoProduto').textContent.trim();
    const descricao = cardProduto.querySelector('.descricaoDoProduto').textContent.trim();
    const precoTexto = cardProduto.querySelector('.preco').textContent.trim();
    const preco = parseFloat(precoTexto.replace('R$', '').replace('.', '').replace(',', '.'));

    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        // Adiciona o item ao carrinho
        carrinho.push({ nome, descricao, preco, quantidade: 1 });
    }

    // Atualiza o carrinho na interface
    atualizarCarrinho();
}

// Função para incrementar a quantidade de um item
function incrementarQuantidade(event) {
    const index = event.target.dataset.index;
    carrinho[index].quantidade += 1;

    // Atualiza o carrinho na interface
    atualizarCarrinho();
}

// Função para decrementar a quantidade de um item
function decrementarQuantidade(event) {
    const index = event.target.dataset.index;
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade -= 1;
    } else {
        // Remove o item se a quantidade for 0
        carrinho.splice(index, 1);
    }

    // Atualiza o carrinho na interface
    atualizarCarrinho();
}

// Adiciona eventos aos botões de adicionar ao carrinho
btnsAdicionar.forEach(btn => {
    btn.addEventListener('click', adicionarAoCarrinho);
});

// Adiciona evento ao botão de finalizar
btnFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    alert('Compra finalizada com sucesso!');
    carrinho = [];
    atualizarCarrinho();
});