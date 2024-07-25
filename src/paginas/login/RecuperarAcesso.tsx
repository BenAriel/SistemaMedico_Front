import { RetanguloVerde } from './componentes/RetanguloVerde';
import { RetanguloBranco } from './componentes/RetanguloBranco';


export const RecuperarAcesso = () => {

    const handleOnClick = () => {
    }
  const fields = [
    { id: 'code', label: 'Código de verificação:', type: 'text'}
  ];

  return (
    <div className="flex h-screen justify-center items-center p-1">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden m-2 min-h-[500px]">
        <RetanguloVerde />
        <RetanguloBranco titulo="Recuperar Acesso" descricao="Informe o código de verificação enviado para seu e-mail e recupere o acesso a sua conta." fields={fields} tituloBotao="Recuperar acesso" handleOnClick={handleOnClick} />
      </div>
    </div>
  );
}
