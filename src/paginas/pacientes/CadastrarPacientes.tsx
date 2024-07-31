import { useState } from 'react';
import { Header } from "../agendamentos/componentes/Header";
import IMGpessoa from '../../imagens/pessoa.png';
import { Bar } from "../agendamentos/componentes/Bar";
import oitavaRosado from '../../imagens/oitava_rosado_logo.png';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../autenticar/UseAuth';

interface Paciente {
    nomeCompleto: string;
    sexo: string;
    dataNascimento: string;
    cpf: string;
    rg: string;
    orgaoEmissor: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    telefone: string;
    email: string;
    observacoes: string;
}

export const CadastrarPacientes = () => {
    const { user } = UseAuth();
    const navegar = useNavigate();
    const [paciente, setPaciente] = useState<Paciente>({
        nomeCompleto: '',
        sexo: '',
        dataNascimento: '',
        cpf: '',
        rg: '',
        orgaoEmissor: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: 'AC',
        cep: '',
        telefone: '',
        email: '',
        observacoes: ''
    });

    const [erros, setErros] = useState<Partial<Record<keyof Paciente, boolean>>>({});
    const [cpfError, setCpfError] = useState<string | null>(null);

    const estadosBrasil = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPaciente((prevPaciente) => ({ ...prevPaciente, [name]: value }));
        setErros((prevErros) => ({ ...prevErros, [name]: false }));

        if (name === 'cpf') {
            setCpfError(null); 
        }
    };
     const handleSair = () => {
        navegar('/pacientes');
     }
    const handleOnClick = async () => {
        const novosErros: Partial<Record<keyof Paciente, boolean>> = {};
        let hasError = false;

        if (!paciente.nomeCompleto.trim()) {
            novosErros.nomeCompleto = true;
            hasError = true;
        }
        if (!paciente.sexo.trim()) {
            novosErros.sexo = true;
            hasError = true;
        }
        if (!paciente.dataNascimento.trim()) {
            novosErros.dataNascimento = true;
            hasError = true;
        }
        if (!paciente.cpf.trim()) {
            novosErros.cpf = true;
            hasError = true;
        }
        if (!paciente.rg.trim()) {
            novosErros.rg = true;
            hasError = true;
        }
        if (!paciente.orgaoEmissor.trim()) {
            novosErros.orgaoEmissor = true;
            hasError = true;
        }
        if (!paciente.logradouro.trim()) {
            novosErros.logradouro = true;
            hasError = true;
        }
        if (!paciente.bairro.trim()) {
            novosErros.bairro = true;
            hasError = true;
        }
        if (!paciente.cidade.trim()) {
            novosErros.cidade = true;
            hasError = true;
        }
        if (!paciente.uf.trim()) {
            novosErros.uf = true;
            hasError = true;
        }
        if (!paciente.cep.trim()) {
            novosErros.cep = true;
            hasError = true;
        }
        if (!paciente.telefone.trim()) {
            novosErros.telefone = true;
            hasError = true;
        }
        if (!paciente.email.trim()) {
            novosErros.email = true;
            hasError = true;
        }
        if (!paciente.observacoes.trim()) {
            novosErros.observacoes = true;
            hasError = true;
        }

        if (hasError) {
            setErros(novosErros);
            alert('Todos os campos são obrigatórios.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/cadastrarPaciente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paciente)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                if (response.status === 409) {
                    setCpfError('CPF já cadastrado');
                    setErros((prevErros) => ({ ...prevErros, cpf: true }));
                    return;
                }
                throw new Error(`Erro: ${response.status} - ${errorData.message}`);
            }

            const data = await response.json();
            console.log('Paciente cadastrado com sucesso:', data);
            alert('Paciente cadastrado com sucesso.');
            navegar('/pacientes');

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
                    <p className="text-white text-sm ml-20">Home{'>'}Pacientes{'>'}Criar novo paciente</p>
                </div>
            </div>
            <Bar img={oitavaRosado} />
            <div className="p-8 bg-white rounded shadow-md mx-auto mt-10 max-w-4xl">
                <div className="mb-4">
                    <h2 className="text-xl font-bold">Criar Novo Paciente</h2>
                    <p className="text-sm text-gray-600">Preencha os campos abaixo para criar um novo paciente no sistema.</p>
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
                            value={paciente.nomeCompleto}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <select
                            name="sexo"
                            className={`border p-2 rounded ${erros.sexo ? 'border-red-500' : ''}`}
                            value={paciente.sexo}
                            onChange={handleChange}
                        >
                            <option value="">Selecione o Sexo</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="date"
                            name="dataNascimento"
                            className={`border p-2 rounded ${erros.dataNascimento ? 'border-red-500' : ''}`}
                            value={paciente.dataNascimento}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="cpf"
                            placeholder="CPF"
                            className={`border p-2 rounded ${erros.cpf ? 'border-red-500' : ''}`}
                            value={paciente.cpf}
                            onChange={handleChange}
                        />
                        {cpfError && <p className="text-red-500 text-xs mt-1">{cpfError}</p>}
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="rg"
                            placeholder="RG"
                            className={`border p-2 rounded ${erros.rg ? 'border-red-500' : ''}`}
                            value={paciente.rg}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="orgaoEmissor"
                            placeholder="Órgão Emissor"
                            className={`border p-2 rounded ${erros.orgaoEmissor ? 'border-red-500' : ''}`}
                            value={paciente.orgaoEmissor}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <hr className="mb-6" />
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#0F8982]">Endereço</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="logradouro"
                            placeholder="Logradouro"
                            className={`border p-2 rounded ${erros.logradouro ? 'border-red-500' : ''}`}
                            value={paciente.logradouro}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="bairro"
                            placeholder="Bairro"
                            className={`border p-2 rounded ${erros.bairro ? 'border-red-500' : ''}`}
                            value={paciente.bairro}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="cidade"
                            placeholder="Cidade"
                            className={`border p-2 rounded ${erros.cidade ? 'border-red-500' : ''}`}
                            value={paciente.cidade}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <select
                            name="uf"
                            className={`border p-2 rounded ${erros.uf ? 'border-red-500' : ''}`}
                            value={paciente.uf}
                            onChange={handleChange}
                        >
                            {estadosBrasil.map((estado) => (
                                <option key={estado} value={estado}>{estado}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="cep"
                            placeholder="CEP"
                            className={`border p-2 rounded ${erros.cep ? 'border-red-500' : ''}`}
                            value={paciente.cep}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <hr className="mb-6" />
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#0F8982]">Contato</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="telefone"
                            placeholder="Telefone"
                            className={`border p-2 rounded ${erros.telefone ? 'border-red-500' : ''}`}
                            value={paciente.telefone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={`border p-2 rounded ${erros.email ? 'border-red-500' : ''}`}
                            value={paciente.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#0F8982]">Observações</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="observacoes"
                            placeholder="Escreva aqui suas Observações"
                            className={`border p-2 rounded ${erros.observacoes ? 'border-red-500' : ''}`}
                            value={paciente.observacoes}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button onClick={handleSair} className="text-red-600 ">Cancelar</button>
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
