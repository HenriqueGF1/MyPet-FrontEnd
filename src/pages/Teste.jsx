
import { useState, useEffect, useContext, useCallback } from "react";
import NavBar from "../components/NavBar/NavBar";

function Teste() {

    const [count, setCount] = useState(1);

    const innerFunction = useCallback(() => {
        console.log("Chamou a função")
        setCount(count + 1);
    });

    useEffect(() => {
        // innerFunction();

    }, [count]);

    return (
        <>
            <NavBar />
            <h1>Teste</h1><br />
            <h1>Contador {count}</h1><br />
            <button onClick={innerFunction}>Count ++</button>
        </>
    );
}

export default Teste;
