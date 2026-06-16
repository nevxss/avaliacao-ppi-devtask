import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORTA = 3000;

// Configuração de Middlewares exigidos [cite: 244, 254]
app.use(cors());
app.use(express.json());

// Interface do contrato de software (Entidade do domínio de negócio) [cite: 232, 233]
export interface IChamado {
    id: string;
    titulo: string;
    descricao: string;
    dataCriacao: string;
}

// Banco de dados em memória [cite: 58, 236]
const bancoDadosMemoria: IChamado[] = [
    {
        id: "1718112000000",
        titulo: "Redefinição de Senha",
        descricao: "Usuário do portal interno não consegue acessar a plataforma operacional.",
        dataCriacao: new Date().toISOString()
    }
];

// Rota GET: Retornar o array de objetos armazenados [cite: 236]
app.get('/chamados', (req: Request, res: Response) => {
    res.status(200).json(bancoDadosMemoria);
});

// Rota POST: Receber, validar e adicionar ao array [cite: 237]
app.post('/chamados', (req: Request, res: Response): void => {
    const { titulo, descricao } = req.body;

    if (!titulo || !descricao) {
        res.status(400).json({ erro: "Campos obrigatórios ausentes: 'titulo' e 'descricao'." }); // Status code 400 [cite: 244]
        return;
    }

    const novoChamado: IChamado = {
        id: Date.now().toString(),
        titulo: String(titulo),
        descricao: String(descricao),
        dataCriacao: new Date().toISOString()
    };

    bancoDadosMemoria.push(novoChamado);
    res.status(201).json(novoChamado); // Status code 201 [cite: 244]
});

app.listen(PORTA, () => {
    console.log(`[SERVIDOR] API de Chamados rodando em http://localhost:${PORTA}`);
});