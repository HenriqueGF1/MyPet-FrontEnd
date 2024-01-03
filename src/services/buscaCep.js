// import axios from "axios";
import api from "../services/axiosInstance"
import { toast } from "react-toastify";

const buscarCep = async (cep) => {

    const response = await api.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
        .then(function (response) {
            if (response.status === 200) {
                console.log("🚀 ~ file: buscaCep.js:46 ~ response.data:", response.data)
            }
            return response.data;
        })
        .catch(function (error) {
            toast.warning('Cep não encontrado')
            return error.data
        })

    return response;
}

export default buscarCep