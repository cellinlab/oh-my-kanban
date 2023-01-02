import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

const KanbanCard = ({ title, status }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  );
};

const AddKanbanCard = ({ onSubmit }) => {
  const [ title, setTitle ] = useState('');
  const handleChange = (evt) => {
    setTitle(evt.target.value);
  };
  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSubmit(title);
    }
  };
  return (
    <li className="kanban-card add-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input type="text" placeholder="请输入标题"
          onChange={handleChange}
          onKeyDown={handleKeyDown} />
      </div>
    </li>
  );
};

function App() {
  const [ showAdd, setShowAdd ] = useState(false);
  const [ todoList, setTodoList ] = useState([]);
  const [ inprogressList, setInprogressList ] = useState([]);
  const [ doneList, setDoneList ] = useState([]);
  const handleAdd = (evt) => {
    setShowAdd(true);
  };
  const handleSubmit = (title) => {
    setTodoList(currentList => [
      { title, status: new Date().toDateString(), id: Date.now() },
      ...currentList,
    ]);
    setShowAdd(false);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className='kanban-board'>
        <section className="kanban-column column-todo">
          <h2>
            待处理
            <button onClick={handleAdd} disabled={showAdd}>&#8853;添加新卡片</button>
          </h2>
          <ul>
            { showAdd && <AddKanbanCard onSubmit={handleSubmit} />}
            { todoList.map(props => <KanbanCard key={props.id} {...props} />) }
          </ul>
        </section>
        <section className="kanban-column column-in-progress">
          <h2>进行中</h2>
          <ul>
            {inprogressList.map(props => <KanbanCard key={props.id} {...props} />)}
          </ul>
        </section>
        <section className="kanban-column column-done">
          <h2>已完成</h2>
          <ul>
            {doneList.map(props => <KanbanCard key={props.id} {...props} />)}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
