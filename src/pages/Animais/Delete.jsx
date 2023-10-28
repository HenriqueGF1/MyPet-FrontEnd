
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/apiContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../services/axiosInstance";

const Delete = async (idAnimal) => {

    let navigate = useNavigate();

    const [erros, setErros] = useState([])
    const { loading, setLoading } = useContext(Context)

    await api
        .delete(`animais/${idAnimal}`)
        .then(function (response) {

            console.log("🚀 ~ file: Delete.jsx:18 ~ response:", response)

            // if (response.status == 201) {
            //     navigate("/animais");
            // } else {
            //     setErros(response.data.errors);
            // }

        })
        .catch(function (error) {
            console.log("🚀 ~ file: Delete.jsx:27 ~ Delete ~ error:", error)
            setErros(error.response.data.errors)
            // setLoading(false);
        });
}

export default Delete;