import { RetanguloVerde } from './componentes/RetanguloVerde';
import { RetanguloBranco } from './componentes/RetanguloBranco';


export const Login = () => {

    const handleOnClick = () => {
    }
  const fields = [
    { id: 'username', label: 'usuário:', type: 'text' },
    { id: 'password', label: 'Senha', type: 'password' }
  ];

  return (
    <div className="flex h-screen justify-center items-center p-1">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden m-2 min-h-[500px]">
        <RetanguloVerde />
        <RetanguloBranco titulo="Acessar Conta" descricao="Bem vindo(a)! Por favor, digite suas credenciais para ter acesso ao sistema." fields={fields} tituloBotao="entrar na conta" handleOnClick={handleOnClick} />
      </div>
    </div>
  );
}
