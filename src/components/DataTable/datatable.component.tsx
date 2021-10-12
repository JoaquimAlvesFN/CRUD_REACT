import React from "react";
import "./datatable.styles.css";

interface DatatableProps {
    tableName: string;
    head: Array<{}>;
    body?: any | undefined;
    loading?: boolean;
}

export default function Datatable({
    tableName, 
    head, 
    body, 
    loading}: DatatableProps) {

    return (
        <div>
            <h1>{tableName}</h1>
            <table id="frontend">
            <thead>
                <tr>
                    {
                        head.map((tr: any) => (
                            <th style={{width: tr.width}}>{tr.headerName}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    !body && <tr><td>Sem registros.</td></tr>
                }
                {
                    loading ? <span>Carregando...</span> :
                    body
                }
            </tbody>
            </table>
        </div>
    );
}