import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from 'react-modal';
import axios from 'axios';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './column.css';  

function Column({ title, status, items, setItems, selectedProjectName, setSelectedProjectName }) {
  const columnItems = items.filter((item) => item.statut__c === status);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);

  //const [modalData, setModalData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState('');
  const [selectedItemDescription, setSelectedItemDescription] = useState('');
  const [selectedItemStatut, setSelectedItemStatut] = useState('');
  const [selectedItemDate, setSelectedItemDate] = useState('');
  const [selectedItemTitle, setSelectedItemTitle] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');


  const [formData, setFormData] = useState({
    Name: 'A',
    title__c: '',
    description__c: '',
    statut__c: '',
    date__c: '',
    id_projet__c: localStorage.getItem("id_project")
  });

  const handleEditChange = (e) => {
    setSelectedItem({
      ...selectedItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveUserStory = async () => {
    try {
      await axios.put(`http://localhost:3001/update-item/${selectedItem.Id}`, selectedItem);
      const updatedItems = items.map((item) => (item.Id === selectedItem.Id ? selectedItem : item));
      setItems(updatedItems);
      closeModal();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/delete-item/${itemId}`);
      const updatedItems = items.filter((item) => item.Id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSubmitUserStory = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/insert', formData);
      console.log(response.status, response.data);
      closeModal();
    } catch (error) {
      console.error('Error:', error.response.data);
      console.error('Error:', error);
    }
  };

  const openModal = (data) => {
    setSelectedItem(data);
    setModalIsOpen(true);
    setSelectedItemId(data.Id)
    setSelectedItemDate(data.date__c)
    setSelectedItemDescription(data.description__c)
    setSelectedItemTitle(data.title__c)
    setSelectedItemStatut(data.statut__c)
    setSelectedItemName(data.Name)
    console.log('data.Id')
    console.log(data.Id)
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalIsOpen(false);
  };

  const openModal1 = (data) => {
    setSelectedItem(data);
    setModalIsOpen1(true);
  };

  const closeModal1 = () => {
    setSelectedItem(null);
    setModalIsOpen1(false);
  };

  const updateUserStory= async ()=>{
    try{
      const response = await axios.patch('https://our-dev-ed.develop.my.salesforce.com/services/data/v51.0/sobjects/User_Story__c/'+selectedItemId,
      {
        title__c:selectedItemTitle,
        description__c:selectedItemDescription,
        statut__c:selectedItemStatut,
        date__c:selectedItemDate
      }, {
        headers :{
          Authorization : 'Bearer 00D8e000000SiXZ!ARkAQEvqk4.wDcdQ86561346Ts4mT_4CyblmoJBuhHXGMVBw78z_MICrQNBwQxCDxVTPmCvPj_CgnyCTLO9c0TgkcOA_wgvG'
        }
      });
      console.log(response.data)

    }catch(error){
      console.log('error')
      console.log(error)
    }
  }

  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      {selectedProjectName === title && <p>{selectedProjectName}</p>}
      <Droppable droppableId={status}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {columnItems.map((item, index) => (
              <Draggable key={item.attributes.url} draggableId={item.attributes.url} index={index} >
                {(provided) => (
                  <div
                  
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="item"
                    onClick={() => openModal(item)}
                  >
                    <div className="item-content">
                    <div className="title-container">
                      <h3>{item.title__c} {item.Name} {item.Id}</h3>
                      </div>
                      <FontAwesomeIcon icon={faAlignLeft} className="align-icon" />
                  </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={() => openModal1({ st: status })}
          style={{
            backgroundColor: 'transparent',
            color: 'darkgrey',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#dddddd')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
        >
          + Ajouter une carte
        </button>
      </div>
      
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal" className="custom-modal1">
        {selectedItem && (
          <div>
            <label>Title</label>
            <input type='text' value={selectedItemTitle} onChange={e => setSelectedItemTitle(e.target.value)}/><br/>
            <label>Name</label>
            <input type='text' value={selectedItemName} onChange={e => setSelectedItemName(e.target.value)}/><br/>
            <label>Description</label>
            <input type='text' value={selectedItemDescription} onChange={e => setSelectedItemDescription(e.target.value)}/><br/>
            <label>Statut</label>
            <input type='text' value={selectedItemStatut} onChange={e => setSelectedItemStatut(e.target.value)}/><br/>
            <label>Date</label>
            <input type='date' value={selectedItemDate} onChange={e => setSelectedItemDate(e.target.value)}/><br/>
            <button onClick={updateUserStory}>Modifier</button>
          </div>
        )}
      </Modal>
      <Modal isOpen={modalIsOpen1} onRequestClose={closeModal1} contentLabel="Example Modal" className="custom-modal"
  overlayClassName="custom-overlay"
  shouldCloseOnOverlayClick={false}>
        <form onSubmit={handleSubmitUserStory}>
          <label>
            <br/>
            <b>Name:</b>
            <input type="text" name="Name" value={formData.Name} onChange={handleChange} className='input-field' />
          </label>
          <label>
            <b>Title:</b>
            <input type="text" name="title__c" value={formData.title__c} onChange={handleChange} className='input-field' />
          </label>
          <br />
          <label>
            <b>Description: </b>
            <textarea
              type="text"
              name="description__c"
              value={formData.description__c}
              onChange={handleChange}
              className='input-field'
            />
          </label>
          <label>
            <b>Title:</b>
            <input type="date" name="date__c" value={formData.date__c} onChange={handleChange} className='input-field' />
          </label>
          <br />
          <label></label>
          <br />
          <label>
            <b>Statut :</b>
            <select name="statut__c" value={formData.statut__c} onChange={handleChange} className='input-field'>
            <option value="to do">To do</option>
            <option value="in Progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          </label>
          <br />
          <br />
          <br />
          <button type="submit" className="submit-button">Ajouter</button>
        </form>
        <button onClick={closeModal1} className="close-button">x</button>
      </Modal>
    </div>
  );
}

export default Column;
