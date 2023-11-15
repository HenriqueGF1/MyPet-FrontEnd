import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/apiContext";
import NavBar from "../../components/NavBar/NavBar";
import AnimaisCards from "../../components/Animais/AnimaisCards";

function Animais() {

    const [animais, setAnimais] = useState([]);
    const [erros, setErros] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);


    useEffect(() => {

        async function getAnimais() {
            let response = await apiFetch("animais", "get")
            console.log("🚀 ~ file: Animais.jsx:19 ~ getAnimais ~ response:", response)
            if (response.data != undefined) {
                setAnimais(response.data);
            }
        }

        getAnimais();

    }, []);


    if (loadingApi) {
        return <h1>Carregando....................</h1>
    }

    return (
        <>
            <h1>Animais</h1>

            <NavBar />

            {
                animais.length == 0 ? "Sem Animais" :
                    animais.map((animal) => {
                        return (
                            <div key={animal.id_animal}>
                                <AnimaisCards animal={animal} />
                            </div>
                        )
                    })
            }
        </>
    )


}

export default Animais;
