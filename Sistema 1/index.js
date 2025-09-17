// Seleciona os elementos necessários
const btnsAdicionar = document.querySelectorAll('.adicionarNoCarrinho');
const itensCarrinho = document.getElementById('itens-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const btnFinalizar = document.getElementById('btn-finalizar');

// Seleciona o botão e o carrinho
const btnCarrinhoLateral = document.getElementById('carrinhobtn');
const carrinhoLateral = document.getElementById('carrinho-lateral');
const maincontent = document.getElementById('maincontent');

// Adiciona o evento de clique
btnCarrinhoLateral.addEventListener('click', () => {
    carrinhoLateral.classList.toggle('hidden');
    maincontent.classList.toggle('sided');
});

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





const carrossel = document.querySelector('#carrossel');
const slides = carrossel.querySelector('.slides');
const slideItems = carrossel.querySelectorAll('.slide');
const prevButton = carrossel.querySelector('.prev');
const nextButton = carrossel.querySelector('.next');

let currentIndex = 0;

function updateCarrossel() {
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slideItems.length - 1;
    updateCarrossel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < slideItems.length - 1) ? currentIndex + 1 : 0;
    updateCarrossel();
});

// Funcionalidade FAQ
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// Funcionalidade SAC - Formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação dos campos obrigatórios
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value.trim();
            
            if (!nome || !email || !assunto || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios (*)');
                return;
            }
            
            // Validação básica de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido');
                return;
            }
            
            // Coleta dos dados do formulário
            const formData = {
                nome: nome,
                email: email,
                telefone: document.getElementById('telefone').value.trim(),
                assunto: assunto,
                numeroPedido: document.getElementById('numero-pedido').value.trim(),
                mensagem: mensagem,
                dataEnvio: new Date().toLocaleString('pt-BR')
            };
            
            // Simula o envio do formulário
            // Em um projeto real, aqui você enviaria os dados para um servidor
            console.log('Dados do formulário:', formData);
            
            // Feedback para o usuário
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            
            // Limpa o formulário
            contactForm.reset();
        });
    }
});

// Função para validar telefone (opcional)
function validarTelefone(telefone) {
    const telefoneRegex = /^[\(\)\s\-\+\d]+$/;
    return telefoneRegex.test(telefone);
}

// Máscara para telefone (opcional)
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('telefone');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 6) {
                    value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
                } else if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }
});

