import React from "react";
import { useHistory } from "react-router-dom";
import Container from "../../components/Container/container.component";
import Form from "../../components/Form/form.component";
import api from "../../utils/api";
import { INSERT_CUSTOMERS } from "../../utils/endpoints";
import {MdKeyboardBackspace} from "react-icons/md";

export default function Customers() {
    const history = useHistory();

    function onSubmit(data: any) {
        api.post(INSERT_CUSTOMERS, data)
        .then(response => {
            if(response.status === 201) {
                alert("Cadastrado com sucesso!");
                history.push("/customers");
            }
        })
        .catch(error => alert(error));
    };

    const goBack = () => {
        history.goBack();
    }

    return (
        <Container>
            <li onClick={goBack} style={{cursor: "pointer"}}>
                <MdKeyboardBackspace size={20}/>
                <span>voltar</span>
            </li>
            <div className="formGroup">
                <h1>Clientes</h1>
                <Form 
                    fields={[
                        {type: "text", placeholder: "Nome", name: "name"},
                        {type: "date", placeholder: "Data Nasc.", name: "birthdate"},
                        {type: "text", placeholder: "Endereço", name: "address"},
                    ]}
                    titleSubmit="Salvar"
                    submit={onSubmit}
                />
            </div>
        </Container>
    );
}