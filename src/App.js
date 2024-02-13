import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faChevronDown,
  faChevronRight,
  faPlusSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import "./App.css";
import useStores from "./useStores";

// TODO - feel free to modify "App" content and develope the solution
const App = observer(() => {
  const { TasksStore } = useStores();

  return (
    <div className="App flex">
      <div className="task-box">
        <div className="flex" style={{ gap: "16px" }}>
          <button>
            <FontAwesomeIcon icon={faChevronDown} />
            {/* <FontAwesomeIcon icon={faChevronRight} /> */}
          </button>

          <input placeholder="Title" className="styled-input" />
        </div>
        <div className="flex" style={{ gap: "8px" }}>
          <button className="flex action-box">
            <FontAwesomeIcon icon={faAngleDoubleDown} />
          </button>
          <button className="flex action-box">
            <FontAwesomeIcon icon={faAngleDoubleUp} />
          </button>
          <button className="flex action-box">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <button className="flex action-box">
            <FontAwesomeIcon icon={faPlusSquare} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default App;
