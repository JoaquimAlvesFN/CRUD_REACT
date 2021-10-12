import React from "react";
import Container from "../../components/Container/container.component";
import { UPDATE_PRODUCTS } from "../../utils/endpoints";
import Form from "../../components/Form/form.component";
import api from "../../utils/api";
import { useHistory, useLocation } from "react-router-dom";
import {MdKeyboardBackspace} from "react-icons/md";

export default function Products() {
    const history = useHistory();
    const {state}: any = useLocation();

    function onUpdate(data: any) {
        api.patch(`${UPDATE_PRODUCTS}?id=eq.${state.item.id}`, data)
        .then(response => {
            alert("Atualizado com sucesso!");
            history.push("/products");
        })
        .catch(error => alert(error));
    }

    const updateFields = {
        name: state.item.name,
        price: state.item.price,
        quantity: state.item.quantity
    }

    const goBack = () => {
        history.goBack();
    }

    return (
        <Container>
            {/* <div style={{display: "flex", justifyContent: "center", width: "100vw", height: "100vh"}}> */}
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
                    submit={onUpdate}
                    stateField={updateFields}
                />
            </div>
        </Container>
    );
}