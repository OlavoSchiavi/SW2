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
            const aceitoTermos = document.getElementById('aceito-termos').checked;
            
            if (!nome || !email || !assunto || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios (*)');
                return;
            }
            
            if (!aceitoTermos) {
                alert('Você deve aceitar receber comunicações por email para prosseguir');
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
                aceitoTermos: aceitoTermos,
                dataEnvio: new Date().toLocaleString('pt-BR')
            };
            
            // Simula o envio do formulário
            // Em um projeto real, aqui você enviaria os dados para um servidor
            console.log('Dados do formulário SAC:', formData);
            
            // Feedback para o usuário
            mostrarMensagemSucesso();
            
            // Limpa o formulário
            contactForm.reset();
        });
    }
    
    // Máscara para telefone
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
    
    // Contador de caracteres para a mensagem
    const mensagemTextarea = document.getElementById('mensagem');
    if (mensagemTextarea) {
        const maxLength = 1000;
        
        // Cria contador
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = `0/${maxLength} caracteres`;
        mensagemTextarea.parentNode.appendChild(counter);
        
        mensagemTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            counter.textContent = `${currentLength}/${maxLength} caracteres`;
            
            if (currentLength > maxLength * 0.9) {
                counter.style.color = '#ff6b6b';
            } else {
                counter.style.color = '#666';
            }
        });
        
        mensagemTextarea.setAttribute('maxlength', maxLength);
    }
});

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucesso() {
    // Remove mensagem anterior se existir
    const mensagemAnterior = document.querySelector('.success-message');
    if (mensagemAnterior) {
        mensagemAnterior.remove();
    }
    
    // Cria nova mensagem
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <h3>✅ Mensagem enviada com sucesso!</h3>
            <p>Recebemos sua solicitação e entraremos em contato em até 24 horas.</p>
            <p>Você receberá uma confirmação por email em breve.</p>
        </div>
    `;
    
    // Insere a mensagem no topo da seção SAC
    const sacSection = document.getElementById('sac');
    sacSection.insertBefore(successDiv, sacSection.firstChild);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    // Scroll para o topo para mostrar a mensagem
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Função para validar telefone
function validarTelefone(telefone) {
    const telefoneRegex = /^[\(\)\s\-\+\d]+$/;
    return telefoneRegex.test(telefone);
}

