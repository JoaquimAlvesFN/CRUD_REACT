import React from "react";
import Container from "../../components/Container/container.component";
import { PRODUCTS } from "../../utils/endpoints";
import Form from "../../components/Form/form.component";
import api from "../../utils/api";
import { useHistory } from "react-router-dom";
import {MdKeyboardBackspace} from "react-icons/md";
import "./product.styles.css";

export default function Products() {
    const history = useHistory();

    function onSubmit(data: any) {
        api.post(PRODUCTS, data)
        .then(response => {
            if(response.status === 201) {
                alert("Cadastrado com sucesso!");
                history.push("/products");
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
                <h1> Produtos</h1>
                <Form 
                    fields={[
                        {type: "text", placeholder: "Nome", name: "name"},
                        {type: "text", placeholder: "Preço", name: "price"},
                        {type: "text", placeholder: "Quantidade", name: "quantity"},
                    ]}
                    titleSubmit="Salvar"
                    submit={onSubmit}
                />
            </div>
        </Container>
    );
}