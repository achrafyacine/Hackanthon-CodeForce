import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Column from './Column';


import './addproject.css';  
function Home() {
  const [data, setData] = useState([]);
  const [newName, setNewName] = useState('');
  const [selectedProjectName, setSelectedProjectName] = useState('');
  //const navigate = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigate = (id, name) => {
    localStorage.setItem('id_project', id);
    localStorage.setItem('name_project', name);
    setSelectedProjectName(name);
    window.location.href = '/kanban';
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/execute-query1');
      const records = response.data.records;
      setData(records);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const getRandomDescription = () => {
    const randomDescriptions = [
      'Collaboratively administrate empowered markets via plug-and-play networks.',
      'Dramatically engage seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing.',
      'Completely synergize resource taxing relationships via premier niche markets.',
      'Imagine jumping into that boat, and just letting it sail wherever the wind takes you...',
      'Holisticly predominate extensible testing procedures for reliable supply chains.',
      'Objectively innovate empowered manufactured products whereas parallel platforms.',
      'Proactively envisioneer enabled benefits after collaborative partnerships.',
      // Add more random descriptions as needed
    ];

    return randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)];
  };

  const generateRandomTexts = () => {
    const randomTexts = [];
    for (let i = 0; i < 200; i++) {
      randomTexts.push(getRandomDescription());
    }
    return randomTexts;
  };

  const handleNewNameSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/create-project', {
        name: newName,
      });

      fetchData();

      setNewName('');
    } catch (error) {
      console.error('Error inserting name:', error.message);
    }
  };

  return (
    <div className="" style={{ overflowY: 'scroll', height: '100vh' }}>
      <main className="">
        <div className="">
          <form className="" onSubmit={handleNewNameSubmit} style={{paddingTop:'30px'}}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Entrer un nom"
            />
            <button type="submit">Ajouter</button>
          </form>
        </div>

        <div><br /></div>

        <div
          className="Ncols"
          style={{
            columnCount: 3, // Adjust the number of columns as needed
            columnGap: '20px',
          }}
        >
          {data.map((item, index) => (
            <div
              className="cardsgrid"
              key={item.Name}
              onClick={() => handleNavigate(item.Id,item.Name)}
            >
              <img
                src={`https://img.freepik.com/free-vector/project-management-design-concept-symbolizing-analysis-solving-problems-isometric-vector-illustration_1284-77122.jpg`} // Replace with your image URL or file path
                alt="Project"
                className="cardimg"
              />
              <h3>{item.Name}</h3><br></br>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faAngleDoubleRight} style={{ width: '11px' }} />
                <p style={{ marginLeft: '5px' }}>Voir kanban</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
