import { useState, useEffect, useContext } from "react";
// import { Context } from "../../context/apiContext";
import api from "../../services/axiosInstance";

function Categoria({ label, register, name,validationErros }) {

    // const { authenticated, loading, setLoading } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState();
    const [erros, setErros] = useState([]);

    useEffect(() => {

        async function getData() {
            setLoading(true);
            await api
                .get("categoriasAnimal")
                .then(function (response) {
                    setCategorias(response.data.data);
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
                {categorias ? categorias.map((categoria) => {
                    return (
                        <option
                            key={categoria.id_categoria}
                            value={categoria.id_categoria}
                        >
                            {categoria.descricao}
                        </option>
                    )
                }) : null}
            </select>
            {/* {
                validationErros?.name?.map((message, index) => {
                    return (
                        <p key={index} className="error-message">{message}</p>
                    )
                })
            } */}
        </div>
    )
}

export default Categoria;
