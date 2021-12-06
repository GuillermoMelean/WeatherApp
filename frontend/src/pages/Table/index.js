import React, { useState, useEffect } from 'react';
import './styles.css';
import Aside from '../../component/AsideBar';
import Header from '../../component/Header';
import api from '../../services/api';

import DataTable from 'react-data-table-component';

export default function Table() {
  const citiesStr = localStorage.getItem('cities');
  const [cities, setCities] = useState([]);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);

  async function loadInformation() {
    if (citiesStr != null) {
      setCities(citiesStr.split("|"));
      setloading(true);
      try {
        api.get('weather', {
          params: { cities: citiesStr }
        }).then(response => {
          setloading(false);

          if(response.data.success){
            setData(response.data.data)
          }else{
            alert('Erro: ' + response.data.errorMessage);
          }
        })
      } catch (ex) {
        alert('Erro ao apagar caso. Tente novamente.');
      }
    }
  }

  useEffect(() => {
    loadInformation();
  }, []);

  function ConvertDate(hms) {  
    const [time, abb] = hms.split(' ');
    const [hours, minutes] = time.split(':');
    const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60; 
    return totalSeconds;
  }

  const columns = [
    {
      name: 'Nome da Cidade',
      selector: row => row.cityName,
      sortable: true,
      width: 50
    },
    {
      name: 'Temperatura',
      selector: row => row.temperature,
      cell: row => <div>{row.temperature + '°'}</div>,
      sortable: true,
      width: 50
    },
    {
      name: 'Nascer do sol',
      selector: row => ConvertDate(row.sunriseHour),
      cell: row => <div>{row.sunriseHour}</div>,
      sortable: true,
      width: 50
    }, 
    {
      name: 'Pôr do sol',
      selector: row => ConvertDate(row.sunsetHour),
      cell: row => <div>{row.sunsetHour}</div>,
      sortable: true,
      width: 50
    },
    {
      name: "",
      width: 10,
      cell: row => <div><img className="weather-image" src={row.image} /></div>
    }
  ];

  return (
    <div className="app">
      <div className="app-inside">
        <Aside />
        <div className="container">
          <div className="container-inside">
            <Header />
            <div className="content">
              <h3>Tabela com cidades, temperatura, hora de início do dia e da noite com ordenação</h3>
              <DataTable
                columns={columns}
                data={data}
                pagination={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}