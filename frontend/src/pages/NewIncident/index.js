import React, {useState} from 'react';
import './style.css';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
        async function handleRegisterNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };
        try{
            await api.post('incidents',data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        }catch(err){
            alert('Erro ao tentar criar caso, tente novamente')
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    
                        <img src={logoImg} alt="Logo"/>
                        <h1>
                            Create New Case
                        </h1>
                        <p>
                            Put one case to people help you!
                        </p>

                        <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color= "#ff0101"/>
                            Back to home page
                        </Link>
                </section>        
                    <form onSubmit={handleRegisterNewIncident}>
                        <input placeholder="Title of case"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        />
                        <textarea placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />
                        <input placeholder="Price to Help in $"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        />
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                
            </div>
        </div>
    );
}