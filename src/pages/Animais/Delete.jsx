
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../services/axiosInstance";
import PropTypes from 'prop-types';

const Delete = async (idAnimal) => {

    let navigate = useNavigate();

    const [erros, setErros] = useState([])
    const { loading, setLoading } = useContext(Context)

    await api
        .delete(`animais/${idAnimal}`)
        .then(function (response) {

            // if (response.status == 201) {
            //     navigate("/");
            // } else {
            //     setErros(response.data.errors);
            // }

        })
        .catch(function (error) {
            setErros(error.response.data.errors)
            // setLoading(false);
        });
}

Delete.propTypes = {
    id_usuario: PropTypes.number.isRequired, // Assuming id_usuario is a number
    id_animal: PropTypes.number.isRequired,   // Assuming id_animal is a number
};


export default Delete;