import React from 'react';
import profile from '../../assets/profile.png';
import './styles.css';

export default function Header() {
    return (
        <div className="header">
            <div>
                <h1>Olá, Guillermo Ferreira</h1>
                <h2>Consulte aqui a temperatura para as suas cidades preferidas</h2>
            </div>
            <div className="profile-container">
                <img src={profile} alt="user profile" className="profile-image"></img>
            </div>
        </div>
    )
}