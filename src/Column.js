import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from 'react-modal';
import axios from 'axios';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './column.css';  

function Column({ title, status, items, setItems }) {
  const columnItems = items.filter((item) => item.statut__c === status);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);

  //const [modalData, setModalData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    Name: 'A',
    title__c: '',
    description__c: '',
    statut__c: '',
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

  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {columnItems.map((item, index) => (
              <Draggable key={item.attributes.url} draggableId={item.attributes.url} index={index}>
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
                      <h3>{item.title__c}</h3>
                      <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteItem(item.Id)} className="delete-icon" /></div>
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
    <table class="styled-table">
        <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{selectedItem.title__c}</td>
            <td>{selectedItem.description__c}</td>
            <td>{selectedItem.date__c}</td>
        </tr>
    </tbody>
</table>
        )}
      </Modal>
      <Modal isOpen={modalIsOpen1} onRequestClose={closeModal1} contentLabel="Example Modal" className="custom-modal"
  overlayClassName="custom-overlay"
  shouldCloseOnOverlayClick={false}>
        <form onSubmit={handleSubmitUserStory}>
          <label>
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
