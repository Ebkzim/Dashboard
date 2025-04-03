// dashboard.js - Funcionalidades gerais do dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados iniciais
    inicializarDados();
    
    // Configurar interatividade da barra lateral
    configurarBarraLateral();
    
    // Adicionar efeito de loading para simular carregamento de dados
    simulaCarregamento();
});

// Inicializa os dados do dashboard
function inicializarDados() {
    // Dados das métricas já estão no HTML para esta versão estática
    
    // Carregar dados da tabela
    carregarDadosTabela();
}

// Carrega os dados da tabela de produtos
function carregarDadosTabela() {
    // Dados de exemplo para a tabela
    const dadosTabela = {
        rows: [
            {id: '001', produto: 'Notebook Pro', categoria: 'Eletrônicos', preco: 'R$ 4.299,00', vendas: '32', estoque: '18'},
            {id: '002', produto: 'Monitor UltraWide', categoria: 'Eletrônicos', preco: 'R$ 1.849,00', vendas: '28', estoque: '12'},
            {id: '003', produto: 'Teclado Mecânico', categoria: 'Periféricos', preco: 'R$ 349,00', vendas: '64', estoque: '45'},
            {id: '004', produto: 'Mouse Sem Fio', categoria: 'Periféricos', preco: 'R$ 129,00', vendas: '86', estoque: '38'},
            {id: '005', produto: 'Headset Gamer', categoria: 'Áudio', preco: 'R$ 399,00', vendas: '47', estoque: '23'},
            {id: '006', produto: 'SSD 1TB', categoria: 'Armazenamento', preco: 'R$ 699,00', vendas: '51', estoque: '29'},
            {id: '007', produto: 'Webcam HD', categoria: 'Periféricos', preco: 'R$ 249,00', vendas: '38', estoque: '14'}
        ]
    };
    
    const tbody = document.getElementById('tabelaProdutosBody');
    
    // Limpar tabela
    tbody.innerHTML = '';
    
    // Preencher dados
    dadosTabela.rows.forEach(row => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.produto}</td>
            <td>${row.categoria}</td>
            <td>${row.preco}</td>
            <td>${row.vendas}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="progress flex-grow-1 me-2" style="height: 5px;">
                        <div class="progress-bar ${getEstoqueClass(row.estoque)}" 
                             style="width: ${getEstoquePercentage(row.estoque)}%" 
                             role="progressbar"></div>
                    </div>
                    <span>${row.estoque}</span>
                </div>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    document.getElementById('itensMostrados').textContent = dadosTabela.rows.length;
    document.getElementById('totalItens').textContent = dadosTabela.rows.length;
}

// Determina a classe de cor baseada no nível de estoque
function getEstoqueClass(estoque) {
    const nivel = parseInt(estoque, 10);
    if (nivel <= 20) return 'bg-danger';
    if (nivel <= 40) return 'bg-warning';
    return 'bg-success';
}

// Calcula a porcentagem de estoque para a barra de progresso
function getEstoquePercentage(estoque) {
    const nivel = parseInt(estoque, 10);
    return Math.min(nivel * 2, 100); // Estoque máximo considerado como 50 unidades
}

// Configuração da interatividade da barra lateral
function configurarBarraLateral() {
    // Adicionar classe ativa ao item de menu clicado
    const navLinks = document.querySelectorAll('.barraLateral .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover 'active' de todos os links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Adicionar 'active' ao link clicado
            this.classList.add('active');
            
            // Ocultar barra lateral em dispositivos móveis ao clicar
            if (window.innerWidth < 768) {
                document.getElementById('sidebar').classList.remove('show');
            }
        });
    });
    
    // Responsividade para dispositivos móveis
    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.add('collapse');
        document.getElementById('sidebar').classList.add('navbar-collapse');
    }
}

// Função para exibir mensagens de erro
function mostrarErro(mensagem) {
    // Criar elemento de alerta temporário
    const alerta = document.createElement('div');
    alerta.className = 'alert alert-danger alert-dismissible fade show mensagemErro';
    alerta.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    `;
    
    // Adicionar ao topo da área de conteúdo
    const conteudo = document.querySelector('.conteudoPrincipal');
    conteudo.insertBefore(alerta, conteudo.firstChild);
    
    // Remover após 5 segundos
    setTimeout(() => {
        alerta.classList.remove('show');
        setTimeout(() => alerta.remove(), 150);
    }, 5000);
}

// Simular carregamento de dados com um pequeno delay
function simulaCarregamento() {
    const metricasElements = document.querySelectorAll('.valorMetrica');
    
    metricasElements.forEach(el => {
        el.classList.add('carregando');
        setTimeout(() => {
            el.classList.remove('carregando');
        }, 1000);
    });
}

// Adiciona funcionalidade aos botões de filtro
document.addEventListener('click', function(e) {
    if (e.target.closest('.filtrosGrafico')) {
        const buttons = e.target.closest('.filtrosGrafico').querySelectorAll('button');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        if (e.target.tagName === 'BUTTON') {
            e.target.classList.add('active');
        }
    }
});