const URL_API = 'http://localhost:3000/chamados';

// Mapeamento tipado do DOM [cite: 149]
const form = document.getElementById('formCadastro') as HTMLFormElement;
const inputTitulo = document.getElementById('txtTitulo') as HTMLInputElement;
const inputDescricao = document.getElementById('txtDescricao') as HTMLTextAreaElement;
const listaContainer = document.getElementById('listaContainer') as HTMLDivElement;

// Função Fetch de leitura (GET) com async/await [cite: 249]
async function carregarElementos(): Promise<void> {
    try {
        const resposta = await fetch(URL_API);
        if (!resposta.ok) throw new Error("Erro na listagem.");
        
        const chamados = await resposta.json();
        listaContainer.innerHTML = "";

        if (chamados.length === 0) {
            listaContainer.innerHTML = "<p>Nenhum chamado aberto no momento.</p>";
            return;
        }

        chamados.forEach((item: any) => {
            const card = document.createElement('div');
            card.className = 'card-item';
            card.innerHTML = `
                <h3>${item.titulo}</h3>
                <p>${item.descricao}</p>
                <small>Ticket aberto em: ${new Date(item.dataCriacao).toLocaleString()}</small>
            `;
            listaContainer.appendChild(card);
        });
    } catch (erro) {
        console.error("Erro no cliente:", erro);
        listaContainer.innerHTML = "<p style='color:red;'>Erro de conexão com o servidor de suporte.</p>";
    }
}

// Função Fetch de envio (POST) capturando o evento do formulário 
form.addEventListener('submit', async (evento: SubmitEvent) => {
    evento.preventDefault(); 

    const cargaUtil = {
        titulo: inputTitulo.value.trim(),
        descricao: inputDescricao.value.trim()
    };

    try {
        const resposta = await fetch(URL_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cargaUtil)
        });

        if (resposta.status === 201) {
            form.reset();
            await carregarElementos(); // Atualiza a lista dinamicamente [cite: 254]
        } else {
            alert("Erro ao registrar o ticket de suporte.");
        }
    } catch (erro) {
        alert("Servidor offline. Verifique o terminal do Node.js.");
    }
});

// Inicialização automática [cite: 202, 203]
carregarElementos();