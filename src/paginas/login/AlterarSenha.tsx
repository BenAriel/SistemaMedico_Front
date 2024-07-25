import { RetanguloVerde } from './componentes/RetanguloVerde';
import { RetanguloBranco } from './componentes/RetanguloBranco';


export const AlterarSenha = () => {

    const handleOnClick = () => {
    }
  const fields = [
    { id: 'password', label: 'Senha', type: 'password' },
    { id: 'confirmPassword', label: 'Confirmação de senha', type: 'password' }
  ];

  return (
    <div className="flex h-screen justify-center items-center p-1">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden m-2 min-h-[500px]">
        <RetanguloVerde />
        <RetanguloBranco titulo="Alterar senha" descricao="Altere sua senha e recupere o acesso ao sistema." fields={fields} tituloBotao="Confirmar alteração" handleOnClick={handleOnClick} />
      </div>
    </div>
  );
}
