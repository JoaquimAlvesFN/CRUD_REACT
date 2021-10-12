import React from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import api from "../../utils/api";
import { LOGOUT } from "../../utils/endpoints";
import { MdOutlineAttachMoney, MdSupervisorAccount, MdOutlineRadioButtonChecked, MdOutlineLogout } from "react-icons/md";
import "./sidebar.styles.css";

export default function Sidebar() {
    const history = useHistory();
    const { pathname } = useLocation();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Confirme sua saída.');

        if (confirmLogout) {
            api.post(LOGOUT)
            .then(() => {
                localStorage.removeItem("@CRUD:token");
                history.push("/");
            })
            .catch(error => console.log(error))
        } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
        }
        
    }

    const itemsMenu = [
        {
            name: "Vendas",
            route: "/sales",
            icon: <MdOutlineAttachMoney size={20} color="#1C1D5C" />,
            click: null
        },
        {
            name: "Produtos",
            route: "/products",
            icon: <MdOutlineRadioButtonChecked size={20} color="#1C1D5C" />,
            click: null
        },
        {
            name: "Clientes",
            route: "/customers",
            icon: <MdSupervisorAccount size={20} color="#1C1D5C" />,
            click: null
        }
    ]

    return (
        <div className="sidebar-div">
            <span>LOGO</span>
            {
                itemsMenu.map(item => (
                    <li style={pathname.includes(item.route) ? {borderRight: 1, borderRightColor: "#1C1D5C"} : {}}>
                        {/* {item.route.includes(pathname) && console.log(pathname)} */}
                        <span>{item.icon}</span>
                        <Link to={item.route}>{item.name}</Link>
                    </li>

                ))
            }
            <li>
                <MdOutlineLogout size={20} color="#1C1D5C" />
                <Link onClick={handleLogout} to="#">Sair</Link>
            </li>
        </div>
    );
}