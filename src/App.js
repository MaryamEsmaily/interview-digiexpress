import "./App.css";
import TaskList from "./components/TaskList";
import logo from "./logo.svg";

// TODO - feel free to modify "App" content and develope the solution
const App = () => {
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <TaskList />
    </div>
  );
};

export default App;
