import { useState, useEffect, useContext } from "react";
import { Context } from "../../../context/Context";
import NavBar from "../../../components/NavBar/NavBar";
import Loading from "../../../components/Loading/Loading";
import Chart from "react-google-charts";
import Footer from "../../../components/Footer/Footer";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";

function DashBoard() {

    const { loadingApi, apiFetch } = useContext(Context);
    const [dados, setDados] = useState([]);

    useEffect(() => {

        async function getDados() {
            let response = await apiFetch("admin/dashBoard", "get")
            if (response.data != undefined) {
                setDados(response.data);
            }
        }

        getDados();

    }, []);

    const data = [
        ["", ""],
        ["Quantidade de Usuários", dados.usuario],
        ["Quantidade de Animais", dados.animal],
        ["Quantidade de Animais Denunciados", dados.animaisQtdDenuncias],
        ["Quantidade de Animais Não Adotados", dados.animaisNaoAdotados],
        ["Quantidade de Animais Machos", dados.animaisMasculinos],
        ["Quantidade de Animais Fêmeas", dados.animaisFemininos],
    ];

    const options = {
        title: "Animais",
        is3D: true,
    };

    return (
        <>

            <NavBar />

            <HeaderPages tituloPagina="Administrador DashBoard"/>

            <div className="w-[100%] h-screen flex justify-center items-start">

                {/* {loadingApi ? <Loading /> : ( */}

                <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"700px"}
                />

                {/* )} */}

            </div>

            {/* {loadingApi ? <Loading /> : (
                <>
                    <p>Quantidade de Usuários: {dados.usuario}</p>
                    <p>Quantidade de Animais {dados.animal}</p>
                    <p>Quantidade de Animais Denunciados: {dados.animaisQtdDenuncias}</p>
                    <p>Quantidade de Animais Adotados: {dados.animaisAdotados}</p>
                    <p>Quantidade de Animais Não Adotados: {dados.animaisNaoAdotados}</p>
                    <p>Quantidade de Animais Masculinos: {dados.animaisMasculinos}</p>
                    <p>Quantidade de Animais Femininos: {dados.animaisFemininos}</p>
                </>
            )} */}

            <Footer/>

        </>
    )


}

export default DashBoard;
