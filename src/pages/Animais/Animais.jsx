import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import NavBar from "../../components/NavBar/NavBar";
import AnimaisCards from "../../components/Animais/AnimaisCards";
import Loading from "../../components/Loading/Loading";
import Filtro from "../../components/Filtro/Filtro";
import Footer from "../../components/Footer/Footer";

function Animais() {
    const [animais, setAnimais] = useState([]);
    const [animaisTodos, setAnimaisTodos] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);
    const [categorias, setCategorias] = useState([]);
    const [portes, setPortes] = useState([]);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
    const [portesSelecionados, setPortesSelecionados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [animaisResponse, categoriasResponse, portesResponse] = await Promise.all([
                    apiFetch("animais", "get"),
                    apiFetch("categoriasAnimal", "get"),
                    apiFetch("porteAnimais", "get"),
                ]);

                if (animaisResponse.data !== undefined) {
                    setAnimais(prev => animaisResponse.data);
                    setAnimaisTodos(prev => animaisResponse.data);
                }

                if (categoriasResponse.data !== undefined) {
                    setCategorias(prev => categoriasResponse.data);
                }

                if (portesResponse.data !== undefined) {
                    setPortes(prev => portesResponse.data);
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filtrarItens();
    }, [categoriasSelecionadas, portesSelecionados]);

    const handleFiltroCategoria = (categoriaSelecionada) => {
        setAnimais(animaisTodos);
        if (categoriasSelecionadas.includes(categoriaSelecionada)) {
            let filtro = categoriasSelecionadas.filter((item) => item !== categoriaSelecionada);
            setCategoriasSelecionadas(prev => filtro);
        } else {
            setCategoriasSelecionadas(prev => [...categoriasSelecionadas, categoriaSelecionada]);
        }
    };

    const handleFiltroPorte = (porteSelecionado) => {
        setPortesSelecionados([]);
        setAnimais(animaisTodos);
        if (portesSelecionados.includes(porteSelecionado)) {
            let filtro = portesSelecionados.filter((item) => item !== porteSelecionado);
            setPortesSelecionados(prev => filtro);
        } else {
            setPortesSelecionados(prev => [...portesSelecionados, porteSelecionado]);
        }
    };

    const filtrarItens = () => {
        let animaisFiltrados = [];

        if (categoriasSelecionadas.length > 0) {
            let animaisFiltradosCategoria = animais.filter((animal) => categoriasSelecionadas.includes(animal.id_categoria));
            animaisFiltrados.push(animaisFiltradosCategoria);
        }

        if (portesSelecionados.length > 0) {
            let animaisFiltradosPorte = animais.filter((animal) => portesSelecionados.includes(animal.id_porte));
            animaisFiltrados.push(animaisFiltradosPorte);
        }

        if (animaisFiltrados.length > 0) {
            // Remove duplicados
            const resultado = [...new Set(animaisFiltrados.flatMap((grupo) => grupo))];
            setAnimais(prev => resultado);
        } else {
            setAnimais(prev => animais);
        }
    };
    const renderizarFiltros = () => (
        <div className="m-2 flex flex-col md:flex-row">
            <div className="my-3 mr-3">
                <Filtro
                    combo={categorias}
                    id_combo="id_categoria"
                    handleFiltro={handleFiltroCategoria}
                    comboOpcaoSelecionada={categoriasSelecionadas}
                />
            </div>
            <div className="my-3 mr-3">
                <Filtro
                    combo={portes}
                    id_combo="id_porte"
                    handleFiltro={handleFiltroPorte}
                    comboOpcaoSelecionada={portesSelecionados}
                />
            </div>
        </div>
    );

    const renderizarListaAnimais = () => (
        <div className=" w-[100%] py-5 flex justify-evenly flex-wrap">
            {animais.map((animal) => (
                <div key={animal.id_animal}>
                    <AnimaisCards animal={animal} />
                </div>
            ))}
        </div>
    );

    return (
        <>
            <NavBar />

            <h1 className="text-lg font-bold p-3 my-5">Animais</h1>

            {loadingApi ? (
                <Loading />
            ) : (
                <>
                    {renderizarFiltros()}
                    {animais.length > 0 ? renderizarListaAnimais() : (
                        <div className="flex w-[100%] h-screen justify-center items-center">
                            <h1 className="text-lg font-bold p-3 my-5">Sem Animais...</h1>
                        </div>
                    )}
                </>
            )}

            <Footer/>
        </>
    );
}

export default Animais;
