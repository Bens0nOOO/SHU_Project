import { useState } from "react";
import CreateForm from "./CreateForm";
import ToDo from "./ToDo";

function ToDoWrapper() {
  const [todos, setTodos] = useState([
    {content: "打掃廁所", id: Math.random(),
    isCompleted: true, isEditing: false},
    {content: "寫作業", id: Math.random(),
    isCompleted: false, isEditing: false},
  ]);
  const addTodo = (content) => {
    setTodos([...todos, {content : content, id: Math.random() }]);
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => {
      return todo.id !== id
    }));
  }

  const toggleCompleted = (id) => {
    setTodos(todos.map((todo) => {
        return todo.id === id ?
        {...todo, isCompleted: !todo.isCompleted} 
        : todo
    }))
  }

  const toggleIsEditing = (id) =>{
    setTodos( todos.map((todo) => {
      return todo.id === id ?
      {...todo, isEditing: !todo.isEditing}
      : todo
    }))
  }

  const editTodo = (id, newContent) => {
    setTodos(todos.map((todo) => {
        return todo.id === id ?
        {...todo, content: newContent, isEditing: false}
        : todo
    }))
  }

  return (
    <div className="wrapper">
      <h1>待辦事項</h1>
      <CreateForm addTodo={addTodo}/>
      {todos.map((todo) => {
        return <ToDo toggleCompleted={toggleCompleted}
        toggleIsEditing = {toggleIsEditing} editTodo={editTodo}
         todo={todo} key={todo.id} deleteTodo={deleteTodo}/>;
      })}
    </div>
  );
}
export default ToDoWrapper;
