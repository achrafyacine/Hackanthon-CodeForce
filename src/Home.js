import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';


import './addproject.css';  
function Home() {
  const [data, setData] = useState([]);
  const [newName, setNewName] = useState('');
  //const navigate = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigate = (id) => {
    localStorage.setItem('id_project', id);
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
    <div className="page-container" style={{ overflowY: 'scroll', height: '100vh' }}>
      <main className="grid">
        <div className="custom-form-container">
          <form className="custom-form" onSubmit={handleNewNameSubmit}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter a new name"
            />
            <button type="submit">Add Project</button>
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
              onClick={() => handleNavigate(item.Id)}
            >
              <img
                src={`https://img.freepik.com/free-vector/project-management-design-concept-symbolizing-analysis-solving-problems-isometric-vector-illustration_1284-77122.jpg`} // Replace with your image URL or file path
                alt="Project"
                className="cardimg"
              />
              <h3>{item.Name}</h3>
              <div>
                <FontAwesomeIcon icon={faAngleDoubleRight} style={{ width: '11px' }} />
                <p>View kanban</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
