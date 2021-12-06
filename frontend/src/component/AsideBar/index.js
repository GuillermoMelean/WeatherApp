import React from 'react';
import logo from '../../assets/sp.png';
import transparent from '../../assets/transparent.png';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/fontawesome-free-solid'
import { RouterList } from '../../routes';

export default function Aside() {
    const navigate = useNavigate();
    const location = useLocation();

    function GoTo(page) {
        if (location.pathname !== page)
            navigate(page)
    }

    return (
        <aside className="aside">
            <img src={logo} className="logo" alt="logo" />

            <div className="aside-menu">
                <FontAwesomeIcon
                    alt="Ver dashboards"
                    icon="home"
                    className={location.pathname === RouterList.Principal ? "selected" : ""}
                    onClick={() => { GoTo(RouterList.Principal) }} />

                <br />
                <br />
                <FontAwesomeIcon
                    alt="Ver gráfico de barras"
                    icon="chart-bar"
                    className={location.pathname === RouterList.ChartBar ? "selected" : ""}
                    onClick={() => { GoTo(RouterList.ChartBar) }} />

                <br />
                <br />
                <FontAwesomeIcon
                    alt="Tabela"
                    icon="table"
                    className={location.pathname === RouterList.Table ? "selected" : ""} 
                    onClick={() => { GoTo(RouterList.Table) }} />
                <br />
                <br />
                <br />
                <br />
                <FontAwesomeIcon
                    alt="Adicionar nova cidade"
                    icon="cog"
                    className={location.pathname === RouterList.NewCity ? "selected" : ""} 
                    onClick={() => { GoTo(RouterList.NewCity) }} />
            </div>
            <img src={transparent} className="logo"  />
        </aside>
    )
}