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
      let response = await apiFetch("admin/dashBoard", "get");
      if (response.data != undefined) {
        setDados(response.data);
      }
    }

    getDados();
  }, []);

  const dataSexo = [
    ["", ""],
    ["Porcentagem de Animais Machos", dados.animaisMasculinos],
    ["Porcentagem de Animais Fêmeas", dados.animaisFemininos],
  ];

  const options = {
    title: "Animais",
    is3D: true,
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Administrador DashBoard" />

      <div className="w-[100%] h-screen flex flex-col sm:flex-row justify-center items-center">
        <div className="w-[50%]">
          <>
            <p>
              <b>Quantidade de Usuários:</b> {dados.usuario}
            </p>
            <p>
              <b>Quantidade de Animais</b> {dados.animal}
            </p>
            <p>
              <b>Quantidade de Animais Denunciados:</b>{" "}
              {dados.animaisQtdDenuncias}
            </p>
            <p>
              <b>Quantidade de Animais Adotados:</b> {dados.animaisAdotados}
            </p>
            <p>
              <b>Quantidade de Animais Não Adotados:</b>{" "}
              {dados.animaisNaoAdotados}
            </p>
          </>
        </div>

        <div className="w-[40%]">
          <Chart
            chartType="PieChart"
            data={dataSexo}
            options={options}
            width={"100%"}
            height={"700px"}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashBoard;
