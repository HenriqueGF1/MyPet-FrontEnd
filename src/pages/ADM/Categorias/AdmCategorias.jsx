import CategoriasList from "../../../components/Adm/Categorias/CategoriasList";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";
import Loading from "../../../components/Loading/Loading";
import NavBar from "../../../components/NavBar/NavBar";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";

function AdmCategorias() {
  const [categorias, setCategorias] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  useEffect(() => {
    async function getCategorias() {
      let response = await apiFetch("admin/categoriasAnimal", "get");
      if (response.data != undefined) {
        setCategorias(response.data);
      }
    }

    getCategorias();
  }, []);

  const handleDelete = async (id_categoria) => {
    let response = await apiFetch(
      `admin/categoriasAnimal/${id_categoria}`,
      "delete"
    );

    if (response.data.code == 400) {
      toast.warning(response.data.message);
      return;
    }
    if (response.code === 200) {
      const categoria = categorias.map((categoria) =>
        
        categoria.id_categoria === id_categoria
          ? { ...categoria, dt_exclusao: response.data.dt_exclusao }
          : categoria
      );

      setCategorias((prev) => categoria);

      toast.success("Excluído com Sucesso !!");
    }
  };

  const handleDesativar = async (id_categoria) => {
    let response = await apiFetch(
      `admin/categoriasAnimal/desativar/${id_categoria}`,
      "patch"
    );

    if (response.data.code == 400) {
      toast.warning(response.data.message);
      return;
    }

    if (response.code === 200) {
      const categoria = categorias.map((categoria) =>
        categoria.id_categoria === id_categoria
          ? { ...categoria, dt_inativacao: response.data.data.dt_inativacao }
          : categoria
      );

      setCategorias((prev) => categoria);

      toast.success("Desativado com Sucesso !!");
    }
  };

  const handleAtivar = async (id_categoria) => {
    let response = await apiFetch(
      `admin/categoriasAnimal/ativar/${id_categoria}`,
      "patch"
    );

    if (response.data.code == 400) {
      toast.warning(response.data.message);
      return;
    }

    if (response.code === 200) {
      const categoria = categorias.map((categoria) =>
        categoria.id_categoria === id_categoria
          ? { ...categoria, dt_inativacao: response.data.data.dt_inativacao }
          : categoria
      );

      setCategorias((prev) => categoria);

      toast.success("Ativado com Sucesso !!");
    }
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Categorias" />

      {loadingApi ? (
        <Loading />
      ) : categorias.length > 0 ? (
        <div className="w-[100%] p-3">
          <div className="w-[100%] mb-3 flex justify-end">
            <Link
              to={`/admin/categorias/cadastrar`}
              className="botao btn-group text-white bg-[--color-03] hover:bg-[--color-02]"
              type="submit"
            >
              Cadastrar Categorias
            </Link>
          </div>

          {categorias.map((categoria) => (
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
          ))}
        </div>
      ) : (
        <div className="flex w-[100%] h-screen justify-center items-center">
          <h1 className="text-lg font-bold p-3 my-5">Sem Categorias</h1>
        </div>
      )}
    </>
  );
}

export default AdmCategorias;
