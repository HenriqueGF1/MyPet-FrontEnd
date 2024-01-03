const MessageValidation = (label, type) => {
  const mensagem = {
    required: `Esse campo ${label} e obrigatório`,
  };

  return <p className="error-message">{mensagem[type] || ""}</p>;
};

export default MessageValidation;
