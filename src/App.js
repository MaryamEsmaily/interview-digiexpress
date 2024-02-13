import logo from "./logo.svg";
import "./App.css";
import { observer } from "mobx-react";
import useStores from "./useStores";

// TODO - feel free to modify "App" content and develope the solution
const App = observer(() => {
  const { TasksStore } = useStores();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://www.digiexpress.ir/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {TasksStore.label}
        </a>
      </header>
    </div>
  );
});

export default App;
