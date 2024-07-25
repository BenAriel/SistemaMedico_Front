import { RetanguloVerde } from './componentes/RetanguloVerde';
import { RetanguloBranco } from './componentes/RetanguloBranco';

export const Cadastro = () => {
    const handleOnClick = () => {
    }
  const fields = [
    { id: 'name', label: 'Nome', type: 'text' },
    { id: 'email', label: 'E-mail', type: 'text'},
    { id: 'password', label: 'E-mail', type: 'password'},
    { id: 'confirmPassword', label: 'Confirme a senha', type: 'password'}
  ];

  return (
    <div className="flex h-screen justify-center items-center p-1">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden m-2 min-h-[500px]">
        <RetanguloVerde />
        <RetanguloBranco titulo="Criar conta" descricao="Preencha as informações abaixo para criar uma nova conta no sistema." fields={fields} tituloBotao="Finalizar cadastro" handleOnClick={handleOnClick}/>
      </div>
    </div>
  );
}
