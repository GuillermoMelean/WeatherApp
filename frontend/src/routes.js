import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Principal from './pages/Principal';
import ChartBar from './pages/ChartBar';
import NewCity from './pages/NewCity';
import Table from './pages/Table';

export const RouterList = {
    Principal: "/",
    ChartBar: "/chart",
    NewCity: "/city/new",
    Table: "/table"
  };

export default function Router(){
    return (
        <BrowserRouter >
            <Routes>
                <Route path={RouterList.Principal} element={<Principal />}></Route>
                <Route path={RouterList.ChartBar} element={<ChartBar />}></Route>
                <Route path={RouterList.Table} element={<Table />}></Route>
                <Route path={RouterList.NewCity} element={<NewCity />}></Route>
            </Routes>
        </BrowserRouter>
    )
}