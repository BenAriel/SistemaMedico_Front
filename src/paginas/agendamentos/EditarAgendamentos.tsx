import { useEffect, useState } from 'react';
import { Header } from "./componentes/Header";
import IMGpessoa from '../../imagens/pessoa.png';
import { Bar } from "./componentes/Bar";
import oitavaRosado from '../../imagens/oitava_rosado_logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { UseAuth } from '../autenticar/UseAuth';

interface Agendamento {
    id: number;
    medico: any;
    paciente: any;
    motivoConsulta: string;
    dataConsulta: string;
    horaConsulta: string;
    localConsulta: string;
    observacoes: string;
}

interface Medico {
    id: number;
    nomeCompleto: string;
}

interface Paciente {
    id: number;
    nomeCompleto: string;
}

export const EditarAgendamentos = () => {
    const location = useLocation();
    const { user } = UseAuth();
    const navigate = useNavigate();

    const agendamentoInicial: Agendamento = location.state?.agendamento || {
        id: 0,
        medico: { id: '', nomeCompleto: '' },
        paciente: { id: '', nomeCompleto: '' },
        motivoConsulta: '',
        dataConsulta: '',
        horaConsulta: '',
        localConsulta: '',
        observacoes: ''
    };

    const [agendamento, setAgendamento] = useState<Agendamento>(agendamentoInicial);
    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [erros, setErros] = useState<Partial<Record<keyof Agendamento, boolean>>>({});

    useEffect(() => {
        fetchMedicos();
        fetchPacientes();
    }, []);

    const fetchMedicos = async () => {
        try {
            const response = await fetch('http://localhost:8080/listarMedicos');
            if (!response.ok) throw new Error('Erro ao buscar médicos');
            const data = await response.json();
            setMedicos(data);
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar médicos');
        }
    };

    const fetchPacientes = async () => {
        try {
            const response = await fetch('http://localhost:8080/listarPacientes');
            if (!response.ok) throw new Error('Erro ao buscar pacientes');
            const data = await response.json();
            setPacientes(data);
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar pacientes');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'medico' || name === 'paciente') {
            const selectedEntity = name === 'medico'
                ? medicos.find(medico => medico.id.toString() === value)
                : pacientes.find(paciente => paciente.id.toString() === value);

            setAgendamento((prevAgendamento) => ({
                ...prevAgendamento,
                [name]: selectedEntity ? selectedEntity : { id: '', nomeCompleto: '' }
            }));
        } else {
            setAgendamento((prevAgendamento) => ({ ...prevAgendamento, [name]: value }));
        }
        setErros((prevErros) => ({ ...prevErros, [name]: false }));
    };

    const handleOnClick = async () => {
        const novosErros: Partial<Record<keyof Agendamento, boolean>> = {};
        let hasError = false;
    
        if (!agendamento.medico.id) {
            novosErros.medico = true;
            hasError = true;
        }
        if (!agendamento.paciente.id) {
            novosErros.paciente = true;
            hasError = true;
        }
        if (!agendamento.motivoConsulta.trim()) {
            novosErros.motivoConsulta = true;
            hasError = true;
        }
        if (!agendamento.dataConsulta.trim()) {
            novosErros.dataConsulta = true;
            hasError = true;
        }
        if (!agendamento.horaConsulta.trim()) {
            novosErros.horaConsulta = true;
            hasError = true;
        }
        if (!agendamento.localConsulta.trim()) {
            novosErros.localConsulta = true;
            hasError = true;
        }
        if (!agendamento.observacoes.trim()) {
            novosErros.observacoes = true;
            hasError = true;
        }
    
        if (hasError) {
            setErros(novosErros);
            alert('Todos os campos são obrigatórios.');
            return;
        }
    
        const agendamentoPayload = {
            id: agendamento.id,
            medico: agendamento.medico.id,
            paciente: agendamento.paciente.id,
            motivoConsulta: agendamento.motivoConsulta,
            dataConsulta: agendamento.dataConsulta,
            horaConsulta: agendamento.horaConsulta,
            localConsulta: agendamento.localConsulta,
            observacoes: agendamento.observacoes,
        };
    
        try {
            const response = await fetch('http://localhost:8080/alterarAgendamento', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agendamentoPayload)
            });
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Erro: ${response.status} - ${errorData.message}`);
            }
    
            const data = await response.json();
            alert('Agendamento alterado com sucesso.');
            navigate('/agendamentos');
    
        } catch (error: any) {
            console.error('Houve um problema com a requisição:', error.message);
            alert('Houve um problema com a requisição: ' + error.message);
        }
    };
    return (
        <div>
            <Header nome={user || "usuário"} img={IMGpessoa} />
            <div className="bg-[#0F8982] w-full py-20 flex justify-between items-center">
                <div className="ml-4">
                    <p className="text-white text-sm ml-20">Home{'>'}Agendamentos{'>'}Editar agendamento</p>
                </div>
            </div>
            <Bar img={oitavaRosado} />
            <div className="p-8 bg-white rounded shadow-md mx-auto mt-10 max-w-4xl">
                <div className="mb-4">
                    <h2 className="text-xl font-bold">Editar Agendamento</h2>
                    <p className="text-sm text-gray-600">Preencha os campos abaixo para editar o agendamento no sistema.</p>
                </div>
                <hr className="mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <select
                        name="medico"
                        className="border p-2 rounded"
                        value={agendamento.medico?.id || ''}
                        onChange={handleChange}
                    >
                        <option value="">Selecione um Médico</option>
                        {medicos.map((medico) => (
                            <option key={medico.id} value={medico.id}>{medico.nomeCompleto}</option>
                        ))}
                    </select>
                    <select
                        name="paciente"
                        className="border p-2 rounded"
                        value={agendamento.paciente?.id || ''}
                        onChange={handleChange}
                    >
                        <option value="">Selecione um Paciente</option>
                        {pacientes.map((paciente) => (
                            <option key={paciente.id} value={paciente.id}>{paciente.nomeCompleto}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="motivoConsulta"
                        placeholder="Motivo da Consulta"
                        className={`border p-2 rounded ${erros.motivoConsulta ? 'border-red-500' : ''}`}
                        value={agendamento.motivoConsulta}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="dataConsulta"
                        placeholder="Data da Consulta(dd-mm-aaaa)"
                        className={`border p-2 rounded ${erros.dataConsulta ? 'border-red-500' : ''}`}
                        value={agendamento.dataConsulta}
                        onChange={handleChange}
                    />
                    <input
                        type="time"
                        name="horaConsulta"
                        placeholder="Hora da Consulta"
                        className={`border p-2 rounded ${erros.horaConsulta ? 'border-red-500' : ''}`}
                        value={agendamento.horaConsulta}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="localConsulta"
                        placeholder="Local da Consulta"
                        className={`border p-2 rounded ${erros.localConsulta ? 'border-red-500' : ''}`}
                        value={agendamento.localConsulta}
                        onChange={handleChange}
                    />
                </div>
                <hr className="mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
                    <textarea
                        name="observacoes"
                        placeholder="Observações"
                        className={`border p-2 rounded h-24 ${erros.observacoes ? 'border-red-500' : ''}`}
                        value={agendamento.observacoes}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button className="text-red-600">Cancelar</button>
                    <button
                        onClick={handleOnClick}
                        className="bg-[#0F8982] text-white p-2 rounded shadow-md hover:bg-[#0A5F58]"
                    >
                        salvar
                    </button>
                </div>
            </div>
        </div>
    );
};
