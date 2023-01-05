import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

const KanbanBoard = ({ children }) => {
  return (
    <main className='kanban-board'>{children}</main>
  );
};

const KanbanColumn = ({children, className, title}) => {
  const combinedClassName = `kanban-column ${className}`;
  return (
    <section className={combinedClassName}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};

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
      <KanbanBoard>
        <KanbanColumn className="column-todo" title={
          <>
          待处理
          <button onClick={handleAdd} disabled={showAdd}>&#8853;添加新卡片</button>
          </>
        }>
          { showAdd && <AddKanbanCard onSubmit={handleSubmit} />}
          { todoList.map(props => <KanbanCard key={props.id} {...props} />) }
        </KanbanColumn>
        <KanbanColumn className="column-in-progress" title="进行中">
          {inprogressList.map(props => <KanbanCard key={props.id} {...props} />)}
        </KanbanColumn>
        <KanbanColumn className="column-done" title="已完成">
          {doneList.map(props => <KanbanCard key={props.id} {...props} />)}
        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}

export default App;
