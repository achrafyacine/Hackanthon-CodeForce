import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let url =
          'https://our-dev-ed.develop.my.salesforce.com/services/data/v51.0/query?q=SELECT+Id,Name,SmallPhotoUrl+FROM+User';

        if (searchQuery) {
          url += `+WHERE+Name+LIKE+'%${searchQuery}%'`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization:
              'Bearer 00D8e000000SiXZ!ARkAQEvqk4.wDcdQ86561346Ts4mT_4CyblmoJBuhHXGMVBw78z_MICrQNBwQxCDxVTPmCvPj_CgnyCTLO9c0TgkcOA_wgvG',
          },
        });

        setUsers(response.data.records);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value.trim();
    setSearchQuery(searchValue);
  };

  return (
    <div className="users">
      <h1>Utilisateurs Salesforce</h1>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="Search users..."
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
  
      <br />
      <div className="user-list-container">
      <div className="user-list">
        {users.map((user) => (
          <div key={user.Id} className="user-item">
            <img src={user.SmallPhotoUrl} alt={user.Name} />
            <span>{user.Name}</span>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
  
  
};

export default Users;
