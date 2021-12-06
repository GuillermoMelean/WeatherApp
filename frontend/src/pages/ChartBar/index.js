import React, { useState, useEffect } from 'react';
import './styles.css';
import Aside from '../../component/AsideBar';
import Header from '../../component/Header';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import api from '../../services/api';

export default function ChartBar() {
  ChartJS.register(BarElement, PointElement, LinearScale, Title, CategoryScale);
  const citiesStr = localStorage.getItem('cities');
  const [cities, setCities] = useState([]);
  const [citiesValues, setCitiesValues] = useState([]);
  const [loading, setloading] = useState(false);

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
            setCitiesValues(response.data.data.map((n) => n.temperature))
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

  return (
    <div className="app">
      <div className="app-inside">
        <Aside />
        <div className="container">
          <div className="container-inside">
            <Header />
            <div className="content">
              <h3>Gráfico de barras com temperaturas por cidade</h3>
              <Bar height="100px" data={{
                labels: cities,
                datasets: [
                  {
                    label: 'temperatura',
                    data: citiesValues,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(201, 203, 207, 0.2)'
                    ],
                  },
                ],
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}