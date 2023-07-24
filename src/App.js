import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import KanbanBoard from './KanbanBoard';
import Home from './Home';
import Users from './users';
import Dashboard from './Dashboard';
import ContactForm from './ContactForm';
import './kanban.css';
//import Sidebar from './Sidebar';
import Sidebar from './components/Sidebar';
function App() {
  //const projectName = 'CodeForce';

  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/kanban" component={KanbanBoard} />
            <Route path="/users" component={Users} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/contact" component={ContactForm} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
