import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Container from "../../components/Container/container.component";
import Form from "../../components/Form/form.component";
import api from "../../utils/api";
import { CUSTOMERS, PRODUCTS, SALES } from "../../utils/endpoints";
import "./sale.styles.css";
import {MdKeyboardBackspace} from "react-icons/md";

export default function Sale() {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);

    const history = useHistory();

    function onSubmit(data: any) {
        api.post(SALES, data)
        .then(response => {
            if(response.status === 201) {
                alert("Cadastrado com sucesso!");
                history.push("/sales");
            }
        })
        .catch(error => alert(error));
    }

    const goBack = () => {
        history.goBack();
    }

    useEffect(() => {
        api.get(CUSTOMERS).then(response => setCustomers(response.data))
        api.get(PRODUCTS).then(response => setProducts(response.data))
    }, []);

    return (
        <Container>
            <li onClick={goBack} style={{cursor: "pointer"}}>
                <MdKeyboardBackspace size={20}/>
                <span>voltar</span>
            </li>
            <div className="formGroup">
                <h1>Vendas</h1>
                <Form 
                    fields={[
                        {
                            type: "select", 
                            placeholder: "Cliente", 
                            name: "customer_id",
                            options: customers
                        },
                        {
                            type: "select", 
                            placeholder: "Produto", 
                            name: "product_id",
                            options: products
                        },
                        {
                            type: "text", 
                            placeholder: "Quantidade", 
                            name: "quantity_product"
                        },
                    ]}
                    titleSubmit="Salvar"
                    submit={onSubmit}
                />
            </div>
        </Container>
    );
}