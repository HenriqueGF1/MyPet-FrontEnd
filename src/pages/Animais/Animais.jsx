import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/apiContext";
import NavBar from "../../components/NavBar/NavBar";
import AnimaisCards from "../../components/Animais/AnimaisCards";
import Loading from "../../components/Loading/Loading";

function Animais() {

    const [animais, setAnimais] = useState([]);
    const [erros, setErros] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);


    useEffect(() => {

        async function getAnimais() {
            let response = await apiFetch("animais", "get")
            if (response.data != undefined) {
                setAnimais(response.data);
            }
        }

        getAnimais();

    }, []);

    return (
        <>
            <h1>Animais</h1>

            <NavBar />

            {/* <Loading /> */}

            <br /><br />

            {loadingApi ? <Loading /> : (
                animais.length > 0
                    ? animais.map(animal => (
                        <div key={animal.id_animal}>
                            <AnimaisCards animal={animal} />
                        </div>
                    ))
                    : "Sem Animais"
            )}
        </>
    )


}

export default Animais;
