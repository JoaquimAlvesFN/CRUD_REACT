import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container/container.component";
import Datatable from "../../components/DataTable/datatable.component";
import api from "../../utils/api";
import { GET_SALES } from "../../utils/endpoints";
import {MdOutlineAddShoppingCart} from "react-icons/md";
import { formatNumberToBRL } from "../../utils/formatNumber";

const columns = [
    {headerName: "ID", field: "id", width: 150},
    {headerName: "Cliente", field: "price", width: 150},
    {headerName: "Produto", field: "name", width: 200},
    {headerName: "Preço", field: "quantity", width: 200},
    {headerName: "Quantidade", field: "quantity", width: 200}
    // {headerName: "Ações", field: "actions", width: 10}
];

export default function SaleList() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);

    const renderBody = (sales: Array<{}>) => {
        return sales.map((sale: any) => (
            <tr>
                <td>{sale.id}</td>
                <td>{sale.customers.name}</td>
                <td>{sale.products.name}</td>
                <td>{formatNumberToBRL(sale.products.price)}</td>
                <td>{sale.quantity_product}</td>
                {/* <tr>
                    <td className="fieldActions" onClick={() => editAction(product)}>Editar</td>
                    <td 
                        className="fieldActions" onClick={() => deleteAction(product.id)}>Deletar</td>
                </tr> */}
            </tr>
        ))
    }

    useEffect(() => {
        setLoading(true);
        api.get(GET_SALES)
        .then(response => {
            if (response.status === 200){
                setSales(response.data);
                setLoading(false);
            }
        })
        .catch(error => alert(error));
    }, []);

    return (
        <Container>
            <div>
                <Link className="linkNewProduct" to="/sales/create">
                    <MdOutlineAddShoppingCart size={20}/>
                    Nova Venda
                </Link>
                <Datatable 
                    tableName="Vendas" 
                    head={columns} 
                    body={renderBody(sales)}
                    loading={loading}
                />
            </div>
        </Container>
    );
}