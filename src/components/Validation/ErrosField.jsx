const ErrosField = ({ errosApi, field }) => {
    return (
        errosApi.erro?.[field]?.map((message, index) => (
            <p key={index} className="erro-mensagem">
                {message}
            </p>
        ))
    );
};

export default ErrosField;