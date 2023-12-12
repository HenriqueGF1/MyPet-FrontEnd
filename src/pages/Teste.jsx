
import { useState, useEffect, useContext, useCallback } from "react";
import NavBar from "../components/NavBar/NavBar";
import { Context } from "../context/apiContext";
import { useParams } from "react-router-dom";
// import AnimaShow02 from "../components/Animais/AnimaShow03";

function Teste() {

    let { id_animal } = useParams();

    const { loadingApi, apiFetch } = useContext(Context);
    const [animal, setAnimal] = useState([]);

    const [user, setUser] = useState({ id_usuario: '', nome: "" })

    useEffect(() => {

        const getAnimais = async () => {
            let response = await apiFetch(`animais/1`, "get")
            console.log("🚀 ~ file: Teste.jsx:22 ~ getAnimais ~ response:", response)
            if (response.data != undefined) {
                setAnimal(response.data);
            }
        }

        getAnimais();

    }, []);

    function minhaFun(id_animal) {
        console.log(`Aqui ${id_animal}`)
    }

    return (
        <>
            <NavBar />

            <h1>Teste</h1><br />

            <p>Animal {animal.id}</p>

            {/* <AnimaShow02 animal={animal}>
                <ul>
                    <li onClick={() => { minhaFun(animal.id_animal) }}>Favoritar</li>
                </ul>
            </AnimaShow02> */}

        </>
    );
}

export default Teste;
