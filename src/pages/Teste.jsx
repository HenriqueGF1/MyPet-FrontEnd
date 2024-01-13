import { useState } from "react"


function Teste() {

    const [mostrar, setMostrar] = useState(true)


    function handleClick() {
        setMostrar(prev => !mostrar)
    }


    return (
        <div>
            <h1>Hello World</h1>
            <h1 id="msg" className={mostrar ? 'show' : 'hidden'}>Mensagem</h1>
            <button onClick={handleClick}>Clique</button>
        </div >
    )
}

export default Teste