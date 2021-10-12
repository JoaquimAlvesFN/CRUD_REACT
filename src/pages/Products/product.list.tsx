import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Container from "../../components/Container/container.component";
import api from "../../utils/api";
import { DELETE_PRODUCTS, PRODUCTS } from "../../utils/endpoints";
import Datatable from "../../components/DataTable/datatable.component";
import {MdNoteAdd} from "react-icons/md";
import "./product.styles.css";
import { formatNumberToBRL } from "../../utils/formatNumber";

const columns = [
    {headerName: "ID", field: "id", width: 50},
    {headerName: "Nome", field: "name", width: 200},
    {headerName: "Preço", field: "price", width: 150},
    {headerName: "Quantidade", field: "quantity", width: 200},
    {headerName: "Ações", field: "actions", width: 30}
];

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleDelete = (id: number): void => {
        const deleteProduct = window.confirm('Confirma exclusão do produto?');

        if (deleteProduct) {
            api.delete(`${DELETE_PRODUCTS}?id=eq.${id}`)
            .then(response => {
                if (response.status === 204) {
                    const productsFilter = products.filter((p: any) => id !== p.id);
                    setProducts(productsFilter);
                }
            })
            .catch(error => alert(error))
        } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
        }
    }

    const handleEdit = (item: any) => {
        history.push("/products/update", {item})
    }

    const renderBody = (products: Array<{}>) => {
        return products.map((product: any) => (
            <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{formatNumberToBRL(product.price)}</td>
                <td>{product.quantity}</td>
                <tr>
                    <td className="fieldActions" onClick={() => handleEdit(product)}>Editar</td>
                    <td 
                        className="fieldActions" onClick={() => handleDelete(product.id)}>Deletar</td>
                </tr>
            </tr>
        ))
    }

    useEffect(() => {
        setLoading(true);
        api.get(PRODUCTS)
        .then(response => {
            if (response.status === 200){
                setProducts(response.data);
                setLoading(false);
            }
        })
        .catch(error => alert(error));
    }, []);

    return (
        <Container>
            <div>
                <Link className="linkNewProduct" to="/products/create">
                    <MdNoteAdd size={20}/>
                    Adicionar Produto
                </Link>
                <Datatable 
                    tableName="Produtos" 
                    head={columns} 
                    body={renderBody(products)}
                    loading={loading}
                />
            </div>
        </Container>
    )
}