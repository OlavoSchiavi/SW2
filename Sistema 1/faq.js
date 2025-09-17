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

    // Funcionalidade para busca no FAQ (opcional)
    function criarBuscaFAQ() {
        const container = document.querySelector('.faq-container');
        const searchDiv = document.createElement('div');
        searchDiv.className = 'faq-search';
        searchDiv.innerHTML = `
            <input type="text" id="faq-search" placeholder="Buscar nas perguntas frequentes...">
        `;
        
        container.parentNode.insertBefore(searchDiv, container);
        
        const searchInput = document.getElementById('faq-search');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = searchTerm === '' ? 'block' : 'none';
                }
            });
        });
    }
    
    // Descomente a linha abaixo se quiser adicionar busca
    // criarBuscaFAQ();
});

