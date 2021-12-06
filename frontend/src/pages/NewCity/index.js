import React, { useState, useEffect } from 'react';
import './styles.css';
import Aside from '../../component/AsideBar';
import Header from '../../component/Header';

export default function Dashboard() {
  const citiesStr = localStorage.getItem('cities');
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState(undefined);

  useEffect(() => {
    if (citiesStr != null)
      setCities(citiesStr.split("|"));
  }, []);

  useEffect(() => {
    console.log(cities);
    localStorage.setItem('cities', cities.join("|"))
  }, [cities]);

  function handleAdd(e) {
    e.preventDefault();

    if (newCity === "")
      return;

    if (cities.filter(s => s === newCity).length > 0)
      return;

    if (cities.length === 0) {
      setCities([newCity])
    } else {
      setCities([...cities, newCity])
    }

    setNewCity("")
  }

  function handleRemove(cityStr) {
    setCities(cities.filter(city => city !== cityStr));
  }

  return (
    <div className="app">
      <div className="app-inside">
        <Aside />
        <div className="container">
          <div className="container-inside">
            <Header />
            <div className="content">
              <h1>Adicionar uma nova cidade</h1>
              <form onSubmit={handleAdd}>
                <input
                  placeholder="Ex: Madrid, Spain ..."
                  value={newCity}
                  className=""
                  onChange={e => setNewCity(e.target.value)} />
                <button className="button" type="submit">Adicionar</button>
              </form>
              <div className="cities">
                {cities.filter(s => s !== "").map(s => (
                  <div key={s} className="city">
                    <input className="label" value={s} disabled={true} />
                    <input className="x" defaultValue="X" onClick={() => { handleRemove(s) }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}