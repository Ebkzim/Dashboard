

document.addEventListener('DOMContentLoaded', function() {
    
    inicializarDados();
    
    
    configurarBarraLateral();
    
    
    simulaCarregamento();
});


function inicializarDados() {

    
    
    carregarDadosTabela();
}


function carregarDadosTabela() {

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
    

    tbody.innerHTML = '';
    
  
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


function getEstoqueClass(estoque) {
    const nivel = parseInt(estoque, 10);
    if (nivel <= 20) return 'bg-danger';
    if (nivel <= 40) return 'bg-warning';
    return 'bg-success';
}


function getEstoquePercentage(estoque) {
    const nivel = parseInt(estoque, 10);
    return Math.min(nivel * 2, 100); 
}


function configurarBarraLateral() {
    
    const navLinks = document.querySelectorAll('.barraLateral .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            
            navLinks.forEach(item => item.classList.remove('active'));
            
            
            this.classList.add('active');
            
            
            if (window.innerWidth < 768) {
                document.getElementById('sidebar').classList.remove('show');
            }
        });
    });
    
    
    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.add('collapse');
        document.getElementById('sidebar').classList.add('navbar-collapse');
    }
}


function mostrarErro(mensagem) {
   
    const alerta = document.createElement('div');
    alerta.className = 'alert alert-danger alert-dismissible fade show mensagemErro';
    alerta.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    `;
    
   
    const conteudo = document.querySelector('.conteudoPrincipal');
    conteudo.insertBefore(alerta, conteudo.firstChild);
    
    
    setTimeout(() => {
        alerta.classList.remove('show');
        setTimeout(() => alerta.remove(), 150);
    }, 5000);
}


function simulaCarregamento() {
    const metricasElements = document.querySelectorAll('.valorMetrica');
    
    metricasElements.forEach(el => {
        el.classList.add('carregando');
        setTimeout(() => {
            el.classList.remove('carregando');
        }, 1000);
    });
}


document.addEventListener('click', function(e) {
    if (e.target.closest('.filtrosGrafico')) {
        const buttons = e.target.closest('.filtrosGrafico').querySelectorAll('button');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        if (e.target.tagName === 'BUTTON') {
            e.target.classList.add('active');
        }
    }
});