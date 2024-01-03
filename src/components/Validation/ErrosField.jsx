const ErrosField = ({ errosApi, field }) => {
    return (
        errosApi.erro?.[field]?.map((message, index) => (
            <p key={index} className="error-message">
                {message}
            </p>
        ))
    );
};

export default ErrosField;