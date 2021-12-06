import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Aside from '../../component/AsideBar';
import Header from '../../component/Header';
import { RouterList } from '../../routes';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="app-inside">
        <Aside />
        <div className="container">
          <div className="container-inside">
            <Header />
            <div className="content">
              <h1>Instruções</h1>
              <h2>1. Adicionar as cidades na página de <a onClick={() => navigate(RouterList.NewCity)}><u><i>definições</i></u></a></h2>
              <h2>2. Usufruir da informação proporcionada através do
                <a onClick={() => navigate(RouterList.ChartBar)}> <u><i>gráfico</i></u> </a>
                e da
                <a onClick={() => navigate(RouterList.Table)}> <u><i>tabela</i></u></a>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}