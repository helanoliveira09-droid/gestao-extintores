// 📡 URL DO SEU WEB SERVICE (Substitua com o link em azul que o Render te deu no Back-end)
const API_URL = 'https://gestao-extintores-1.onrender.com';

// Aguarda a tela carregar para escutar o formulário
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formExtintor');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede a página de recarregar

            // Captura os dados digitados nos inputs do HTML
            const dadosExtintor = {
                numCilindro: document.getElementById('numCilindro').value,
                tipo: document.getElementById('tipo').value,
                capacidade: Number(document.getElementById('capacidade').value),
                unidade: document.getElementById('unidade').value,
                local: document.getElementById('local').value,
                dataManutencao: document.getElementById('dataManutencao').value,
                obs: document.getElementById('obs').value
            };

            try {
                // O FETCH envia os dados via rede em formato JSON para o seu backend
                const resposta = await fetch(`${API_URL}/extintores`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosExtintor)
                });

                if (!resposta.ok) {
                    throw new Error('Falha ao salvar dados no servidor.');
                }

                const resultado = await resposta.json();
                alert('🚀 Extintor cadastrado com sucesso no MongoDB Atlas!');
                form.reset(); // Limpa os campos da tela
            } catch (erro) {
                console.error('Erro na requisição:', erro);
                alert('❌ Erro ao cadastrar extintor: ' + erro.message);
            }
        });
    }
});