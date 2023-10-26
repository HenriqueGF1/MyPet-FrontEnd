import { useContext } from "react";
import { Context } from "../context/apiContext";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

function Teste() {
    const { authenticated } = useContext(Context);

    return (
        <>
            <h1>Teste</h1>
            
            <NavBar/>
        </>
    );
}

export default Teste;
