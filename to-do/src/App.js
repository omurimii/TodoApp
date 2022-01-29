import "./App.css";
import TodoForm from "./componenets/TodoForm";

function App() {
  return (
    <div className="App">
      <div className="to-do">
        <h1>What are you going to do today?</h1>
        <TodoForm />
      </div>
    </div>
  );
}

export default App;
