import React, { useEffect, useState } from "react";
import Container from "../../components/Container/container.component";
import api from "../../utils/api";
import { CUSTOMERS, DELETE_CUSTOMERS } from "../../utils/endpoints";
import Datatable from "../../components/DataTable/datatable.component";
import {Link, useHistory} from "react-router-dom";
import {MdPersonAdd} from "react-icons/md";

const columns = [
    {headerName: "ID", field: "id", width: 150},
    {headerName: "Nome", field: "name", width: 150},
    {headerName: "Endereço", field: "address", width: 150},
    {headerName: "Data Nasc.", field: "birthdate", width: 200},
    {headerName: "Ações", field: "actions", width: 200}
];

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleDelete = (id: number): void => {
        const deleteClient = window.confirm('Confirma exclusão do Cliente?');

        if (deleteClient) {
            api.delete(`${DELETE_CUSTOMERS}?id=eq.${id}`)
            .then(response => {
                if (response.status === 204) {
                    const customersFilter = customers.filter((p: any) => id !== p.id);
                    setCustomers(customersFilter);
                }
            })
            .catch(error => alert(error))
        } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
        }
    }

    const handleEdit = (item: any) => {
        history.push("/customers/update", {item})
    }

    const renderBody = (customers: Array<{}>) => {
        return customers.map((customer: any) => (
            <tr>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.birthdate}</td>
                <tr>
                    <td className="fieldActions" onClick={() => handleEdit(customer)}>Editar</td>
                    <td 
                        className="fieldActions" onClick={() => handleDelete(customer.id)}>Deletar</td>
                </tr>
            </tr>
        ))
    }

    useEffect(() => {
        setLoading(true);
        api.get(CUSTOMERS)
        .then(response => {
            if (response.status === 200){
                setCustomers(response.data);
                setLoading(false);
            }
        })
        .catch(error => alert(error));
    }, []);

    return (
        <Container>
            <div>
                <Link className="linkNewProduct" to="/customers/create">
                    <MdPersonAdd size={20}/>
                    Novo Cliente
                </Link>
                <Datatable
                    head={columns}
                    tableName="Clientes"
                    body={renderBody(customers)}
                    loading={loading}
                />
            </div>
        </Container>
    );
}