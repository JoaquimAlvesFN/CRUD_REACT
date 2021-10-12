import React from "react";
import Form from "../../components/Form/form.component";
import api from "../../utils/api";
import { SIGN_IN } from "../../utils/endpoints";
import { useHistory } from "react-router-dom";
import "./login.styles.css";

export default function Login() {
    const history = useHistory();

    function onSubmit(data: any) {
        api.post(SIGN_IN, data)
        .then(response => {
            if(response.status === 200) {
                localStorage.setItem("@CRUD:token", response.data.access_token);
                history.push("/sales");
            }
        })
        .catch(error => alert(error));
    };

    return (
        <div className="loginPage">
            <span style={{marginBottom: 20}}>LOGO</span>
            <Form
                fields={[
                    {type: "text", placeholder: "Email", name: "email"},
                    {type: "password", placeholder: "Senha", name: "password"},
                ]}
                titleSubmit="Entrar"
                submit={onSubmit}
            />
        </div>
    );
}