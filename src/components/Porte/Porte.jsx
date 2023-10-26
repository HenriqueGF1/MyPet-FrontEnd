import { useState, useEffect, useContext } from "react";
// import { Context } from "../../context/apiContext";
import api from "../../services/axiosInstance";

function Porte({ label, register, name }) {

    // const { authenticated, loading, setLoading } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [portes, setPortes] = useState();
    const [erros, setErros] = useState([]);

    useEffect(() => {

        async function getData() {
            setLoading(true);
            await api
                .get("porteAnimais")
                .then(function (response) {
                    setPortes(response.data.data);
                    setLoading(false);
                })
                .catch(function (error) {
                    setErros(error);
                    setLoading(false);
                });
        }

        getData();

    }, []);

    return (
        <div className="form-group">
            <label>{label}</label><br></br>
            <select {...register} >
                {portes ? portes.map((porte) => {
                    return (
                        <option
                            key={porte.id_porte}
                            value={porte.id_porte}
                        >
                            {porte.descricao}
                        </option>
                    )
                }) : null}
            </select>
            {
                erros?.name?.map((message, index) => {
                    return (
                        <p key={index} className="error-message">{message}</p>
                    )
                })
            }
        </div>
    )
}

export default Porte;