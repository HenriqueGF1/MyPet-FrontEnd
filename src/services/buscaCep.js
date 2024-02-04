import api from "../services/axiosInstance";
import { toast } from "react-toastify";

const buscarCep = async (cep) => {
  try {
    const response = await api.get(
      `https://brasilapi.com.br/api/cep/v2/${cep}`
    );
    return response.data;
  } catch (error) {
    toast.warning("Cep não encontrado");
    const controller = new AbortController();
    controller.abort();
    return error.data;
  }
};

export default buscarCep;
