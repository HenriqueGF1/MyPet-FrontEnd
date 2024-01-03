import { useState, useEffect, useContext } from "react";
import { Context } from "../../../context/Context";
import NavBar from "../../../components/NavBar/NavBar";
import Loading from '../../../components/Loading/Loading'

import { toast } from 'react-toastify';
import CategoriasList from "../../../components/Adm/Categorias/CategoriasList";

function AdmCategorias() {

    const [categorias, setCategorias] = useState([]);
    const [erros, setErros] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    useEffect(() => {

        async function getCategorias() {
            let response = await apiFetch("admin/categoriasAnimal", "get")
            if (response.data != undefined) {
                setCategorias(response.data);
            }
        }

        getCategorias();

    }, []);

    const handleDelete = async (id_categoria) => {

        let response = await apiFetch(`admin/categoriasAnimal/${id_categoria}`, "delete")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.data === 1) {
            alert('Excluído com Sucesso !!')
            setCategorias((prev) => prev.filter((animal) => animal.id_categoria != id_categoria))
        }

    }

    const handleDesativar = async (id_categoria) => {

        let response = await apiFetch(`admin/categoriasAnimal/desativar/${id_categoria}`, "patch")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.code === 200) {

            const categoria = categorias.map(categoria =>
                categoria.id_categoria === id_categoria
                    ? { ...categoria, dt_inativacao: response.data.data.dt_inativacao }
                    : categoria
            );

            setCategorias(
                prev => categoria
            );

            toast.success("Desativado com Sucesso !!");
        }

    }

    const handleAtivar = async (id_categoria) => {

        let response = await apiFetch(`admin/categoriasAnimal/ativar/${id_categoria}`, "patch")

        if (response.data.code == 400) {
            toast.warning(response.data.message);
        }

        if (response.code === 200) {

            const categoria = categorias.map(categoria =>
                categoria.id_categoria === id_categoria
                    ? { ...categoria, dt_inativacao: response.data.data.dt_inativacao }
                    : categoria
            );

            setCategorias(
                prev => categoria
            );

            toast.success("Ativado com Sucesso !!");
        }

    }

    return (
        <>
            <h1>Minhas Categorias</h1>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : categorias.length > 0 ? (
                categorias.map((categoria) => (
                    <div key={categoria.id_categoria}>
                        <CategoriasList
                            id_categoria={categoria.id_categoria}
                            descricao={categoria.descricao}
                            dt_registro={categoria.dt_registro}
                            dt_inativacao={categoria.dt_inativacao}
                            dt_exclusao={categoria.dt_exclusao}
                            handleDesativar={handleDesativar}
                            handleAtivar={handleAtivar}
                            handleDelete={handleDelete}
                        />
                    </div>
                ))
            ) : (
                <h1>Sem Categorias</h1>
            )}
        </>
    )


}

export default AdmCategorias;
