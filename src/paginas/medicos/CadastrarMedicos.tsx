import { useState } from 'react';
import { Header } from "../agendamentos/componentes/Header";
import IMGpessoa from '../../imagens/pessoa.png';
import { Bar } from "../agendamentos/componentes/Bar";
import oitavaRosado from '../../imagens/oitava_rosado_logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { UseAuth } from '../autenticar/UseAuth';

interface Medico {
    nomeCompleto: string;
    conselhoMedico: string;
    ufConselho: string;
    numeroConselho: string;
    cbo: string;
    cpf: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    telefone: string;
    email: string;
    executor: boolean;
}

export const CadastrarMedicos = () => {
    const location = useLocation();
    const { user } = UseAuth();
    const navegar = useNavigate();
    const [medico, setMedico] = useState<Medico>({
        nomeCompleto: '',
        conselhoMedico: 'CRM',
        ufConselho: 'AC',
        numeroConselho: '',
        cbo: '1111',
        cpf: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: 'AC',
        cep: '',
        telefone: '',
        email: '',
        executor: location.state?.executor || false,
    });

    const [erros, setErros] = useState<Partial<Record<keyof Medico, boolean>>>({});
    const [nConselho, setConselho] = useState<string | null>(null);

    const estadosBrasil = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    const handleSair = () => {
        navegar('/medicos');
     }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setMedico((prevMedico) => ({ ...prevMedico, [name]: value }));
        setErros((prevErros) => ({ ...prevErros, [name]: false }));
        if (name === 'numeroConselho') {
            setConselho(null); 
        }
    };

    const handleOnClick = async () => {
        const novosErros: Partial<Record<keyof Medico, boolean>> = {};
        let hasError = false;

        if (!medico.nomeCompleto.trim()) {
            novosErros.nomeCompleto = true;
            hasError = true;
        }
        if (!medico.conselhoMedico.trim()) {
            novosErros.conselhoMedico = true;
            hasError = true;
        }
        if (!medico.ufConselho.trim()) {
            novosErros.ufConselho = true;
            hasError = true;
        }
        if (!medico.numeroConselho.trim()) {
            novosErros.numeroConselho = true;
            hasError = true;
        }
        if (!medico.cbo.trim()) {
            novosErros.cbo = true;
            hasError = true;
        }
        if (!medico.cpf.trim()) {
            novosErros.cpf = true;
            hasError = true;
        }
        if (!medico.logradouro.trim()) {
            novosErros.logradouro = true;
            hasError = true;
        }
        if (!medico.bairro.trim()) {
            novosErros.bairro = true;
            hasError = true;
        }
        if (!medico.cidade.trim()) {
            novosErros.cidade = true;
            hasError = true;
        }
        if (!medico.uf.trim()) {
            novosErros.uf = true;
            hasError = true;
        }
        if (!medico.cep.trim()) {
            novosErros.cep = true;
            hasError = true;
        }
        if (!medico.telefone.trim()) {
            novosErros.telefone = true;
            hasError = true;
        }
        if (!medico.email.trim()) {
            novosErros.email = true;
            hasError = true;
        }

        if (hasError) {
            setErros(novosErros);
            alert('Todos os campos são obrigatórios.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/cadastrarMedico', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(medico)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                if (response.status === 409) {
                    setConselho('Número de conselho já cadstrado');
                    setErros((prevErros) => ({ ...prevErros, numeroConselho: true }));
                    return;
                }
                throw new Error(`Erro: ${response.status} - ${errorData.message}`);
            }
            const data = await response.json();
            console.log('Médico cadastrado com sucesso:', data);
            alert('Médico cadastrado com sucesso.');
            navegar('/medicos');

        } catch (error: any) {
            console.error('Houve um problema com a requisição:', error.message);
            alert('Houve um problema com a requisição: ' + error.message);
        }
    };

    return (
        <div>
            <Header nome={user || "usuario"} img={IMGpessoa} />
            <div className="bg-[#0F8982] w-full py-20 flex justify-between items-center">
                <div className="ml-4">
                    <p className="text-white text-sm ml-20">Home{'>'}Medicos{'>'}Criar novo medico</p>
                </div>
            </div>
            <Bar img={oitavaRosado} />
            <div className="p-8 bg-white rounded shadow-md mx-auto mt-10 max-w-4xl">
                <div className="mb-4">
                    <h2 className="text-xl font-bold">Criar Novo Médico</h2>
                    <p className="text-sm text-gray-600">Preencha os campos abaixo para criar um novo médico no sistema.</p>
                </div>
                <hr className="mb-6" />
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#0F8982]">Informações Gerais</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col">
                    <input
                        type="text"
                        name="nomeCompleto"
                        placeholder="Nome Completo"
                        className={`border p-2 rounded ${erros.nomeCompleto ? 'border-red-500' : ''}`}
                        value={medico.nomeCompleto}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="flex flex-col">
                    <select
                        name="conselhoMedico"
                        className={`border p-2 rounded ${erros.conselhoMedico ? 'border-red-500' : ''}`}
                        value={medico.conselhoMedico}
                        onChange={handleChange}
                    >
                        <option value="">Selecione o Conselho</option>
                        <option value="CRM">CRM</option>
                        <option value="CREMEC">CREMEC</option>
                    </select>
                    </div>
                    <div className="flex flex-col">
                    <select
                        name="ufConselho"
                        className={`border p-2 rounded ${erros.ufConselho ? 'border-red-500' : ''}`}
                        value={medico.ufConselho}
                        onChange={handleChange}
                    >
                        <option value="">Selecione o UF</option>
                        {estadosBrasil.map((estado) => (
                            <option key={estado} value={estado}>{estado}</option>
                        ))}
                    </select>
                    </div>
                    <div className="flex flex-col">
                    <input
                        type="text"
                        name="numeroConselho"
                        placeholder="Nº do Conselho"
                        className={`border p-2 rounded ${erros.numeroConselho ? 'border-red-500' : ''}`}
                        value={medico.numeroConselho}
                        onChange={handleChange}
                    />
                    {nConselho && <p className="text-red-500 text-xs mt-1">{nConselho}</p>}
                    </div>
                    <div className="flex flex-col">
                    <select
                        name="cbo"
                        className={`border p-2 rounded ${erros.cbo ? 'border-red-500' : ''}`}
                        value={medico.cbo}
                        onChange={handleChange}
                    >
                        <option value="">Selecione o CBO</option>
                        <option value="1111">1111</option>
                        <option value="2222">2222</option>
                        <option value="3333">3333</option>
                    </select>
                    </div>
                    <div className="flex flex-col">
                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF"
                        className={`border p-2 rounded ${erros.cpf ? 'border-red-500' : ''}`}
                        value={medico.cpf}
                        onChange={handleChange}
                    />
                    </div>
                </div>
                <hr className="mb-6" />
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#0F8982]">Endereço</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <input
                        type="text"
                        name="logradouro"
                        placeholder="Logradouro"
                        className={`border p-2 rounded ${erros.logradouro ? 'border-red-500' : ''}`}
                        value={medico.logradouro}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="bairro"
                        placeholder="Bairro"
                        className={`border p-2 rounded ${erros.bairro ? 'border-red-500' : ''}`}
                        value={medico.bairro}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="cidade"
                        placeholder="Cidade"
                        className={`border p-2 rounded ${erros.cidade ? 'border-red-500' : ''}`}
                        value={medico.cidade}
                        onChange={handleChange}
                    />
                    <select
                        name="uf"
                        className={`border p-2 rounded ${erros.uf ? 'border-red-500' : ''}`}
                        value={medico.uf}
                        onChange={handleChange}
                    >
                        <option value="">Selecione o UF</option>
                        {estadosBrasil.map((estado) => (
                            <option key={estado} value={estado}>{estado}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="cep"
                        placeholder="CEP"
                        className={`border p-2 rounded ${erros.cep ? 'border-red-500' : ''}`}
                        value={medico.cep}
                        onChange={handleChange}
                    />
                </div>
                <hr className="mb-6" />
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#0F8982]">Contato</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <input
                        type="text"
                        name="telefone"
                        placeholder="Telefone"
                        className={`border p-2 rounded ${erros.telefone ? 'border-red-500' : ''}`}
                        value={medico.telefone}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`border p-2 rounded ${erros.email ? 'border-red-500' : ''}`}
                        value={medico.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button  onClick={handleSair} className="text-red-600">Cancelar</button>
                    <button
                        onClick={handleOnClick}
                        className="bg-[#0F8982] text-white p-2 rounded shadow-md hover:bg-[#0A5F58]"
                    >
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    );
};

