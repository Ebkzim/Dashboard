// graficos.js - Configuração e renderização dos gráficos

let graficoVendas;
let graficoPizza;

document.addEventListener('DOMContentLoaded', function() {
    inicializarGraficos();
});

// Inicializa todos os gráficos
function inicializarGraficos() {
    carregarGraficoVendas();
    carregarGraficoUsuariosPorRegiao();
}

// Carrega e configura o gráfico de linha (vendas)
function carregarGraficoVendas() {
    // Dados de exemplo para o gráfico de vendas
    const dadosVendas = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
            {
                label: 'Vendas 2023',
                data: [65, 59, 80, 81, 56, 55],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)'
            },
            {
                label: 'Vendas 2022',
                data: [28, 48, 40, 19, 86, 27],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)'
            }
        ]
    };
    
    const ctx = document.getElementById('graficoVendas').getContext('2d');
    
    // Destruir gráfico anterior se existir
    if (graficoVendas) {
        graficoVendas.destroy();
    }
    
    graficoVendas = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dadosVendas.labels,
            datasets: dadosVendas.datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            },
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 0.5,
                    to: 0.3,
                }
            }
        }
    });
}

// Carrega e configura o gráfico de pizza (usuários por região)
function carregarGraficoUsuariosPorRegiao() {
    // Dados de exemplo para o gráfico de usuários
    const dadosUsuarios = {
        labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
        datasets: [{
            data: [15, 30, 10, 35, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ],
            borderWidth: 1
        }]
    };
    
    const ctx = document.getElementById('graficoPizza').getContext('2d');
    
    // Destruir gráfico anterior se existir
    if (graficoPizza) {
        graficoPizza.destroy();
    }
    
    graficoPizza = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: dadosUsuarios.labels,
            datasets: dadosUsuarios.datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const sum = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / sum) * 100);
                            return `${label}: ${percentage}%`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
}

// Função para mostrar mensagem de erro em um gráfico
function mostrarErroGrafico(canvasId, mensagem) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    
    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar mensagem de erro
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '16px Arial';
    ctx.fillStyle = '#dc3545';
    ctx.fillText(mensagem, canvas.width / 2, canvas.height / 2);
    
    // Ícone de erro (X)
    ctx.beginPath();
    ctx.strokeStyle = '#dc3545';
    ctx.lineWidth = 2;
    const x = canvas.width / 2;
    const y = canvas.height / 2 - 30;
    const size = 20;
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.moveTo(x + size, y - size);
    ctx.lineTo(x - size, y + size);
    ctx.stroke();
}

// Adicionar função para atualizar o gráfico ao trocar o período
document.addEventListener('click', function(e) {
    if (e.target.closest('.filtrosGrafico')) {
        if (e.target.tagName === 'BUTTON') {
            const periodo = e.target.textContent.trim().toLowerCase();
            atualizarGraficoPorPeriodo(periodo);
        }
    }
});

// Função para simular atualização do gráfico por período
function atualizarGraficoPorPeriodo(periodo) {
    // Aqui você poderia fazer uma nova chamada à API com o período atualizado
    // Para este exemplo, apenas simulamos uma atualização visual
    if (graficoVendas) {
        graficoVendas.data.datasets.forEach((dataset) => {
            // Simular novos dados com base no período
            const novosDados = Array.from({length: 6}, () => Math.floor(Math.random() * 100));
            dataset.data = novosDados;
        });
        graficoVendas.update();
    }
}