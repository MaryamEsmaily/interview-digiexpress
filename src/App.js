import { observer } from "mobx-react";
import "./App.css";
import useStores from "./useStores";
import { toJS } from "mobx";
import logo from "./logo.svg";
import TaskList from "./components/taskList";

// TODO - feel free to modify "App" content and develope the solution
const App = observer(() => {
  //
  const { TasksStore } = useStores();
  const tasks = toJS(TasksStore.tasks);
  //
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <TaskList tasks={tasks} />
    </div>
  );
});

export default App;
