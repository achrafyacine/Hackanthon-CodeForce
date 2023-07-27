import React, { useEffect, useState } from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import axios from 'axios';
import Column from './Column';

function KanbanBoard() {
  const [items, setItems] = useState([]);
  const [idPr, setIdPr] = useState('');
  const [columns, setColumns] = useState([
    { id: 'column1', title: 'To Do', status: 'to do' },
    { id: 'column2', title: 'In Progress', status: 'in Progress' },
    { id: 'column3', title: 'Done', status: 'done' }
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/execute-query',{
          params: {
            idPr: localStorage.getItem("id_project")
          }
        });
        setItems(response.data.records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setIdPr(localStorage.getItem("id_project"))

    fetchData();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = [...items];
    const [removed] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, removed);

    setItems(updatedItems);
  };

  const addNewColumn = async () => {
    const columnName = window.prompt('Enter column name :');
    if (columnName) {
      try {
        await axios.post('http://localhost:3001/create-column', { columnName });
        const newColumn = { id: `column${columns.length + 1}`, title: columnName, status: columnName.toLowerCase().replace(' ', '-') };
        setColumns([...columns, newColumn]);
      } catch (error) {
        console.error('Error creating column:', error);
      }
    }
  };
  

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>{localStorage.getItem("name_project")}</h1>
      <div className="kanban-board">
        {columns.map((column, index) => (
          <Column key={column.id} title={column.title} status={column.status} items={items} setItems={setItems} />
        ))}
        
        
        <div style={{ display: '-moz-initial', justifyContent: 'center', alignItems: 'center' }}>
          <br/>
        <button
          onClick={addNewColumn}
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
          + Add Column
        </button>
      </div>
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
