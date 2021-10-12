import React from "react";
import Sidebar from "../Sidebar/sidebar.component";
import "./container.styles.css";

interface HeaderProps {
    title?: string;
    children: React.ReactNode;
}

export default function Container({title, children}: HeaderProps) {
    return (
        <div className="containerPage">
            <div className="sideBar">
                <Sidebar />
            </div>
            {children}
        </div>
    );
}