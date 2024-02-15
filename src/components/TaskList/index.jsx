import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faChevronDown,
  faChevronRight,
  faPlusSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import useStores from "../../useStores";
import { v4 as uuidv4 } from "uuid";
const TaskList = observer(() => {
  //
  const store = useStores();
  //
  const tasks = toJS(store.TasksStore.tasks);
  // collapse: not complete
  const [open, setOpen] = useState();
  //
  const renderTasks = (task) => {
    return (
      <div key={task.id} className="task-container">
        <div className="task-box">
          <div className="flex" style={{ gap: "16px" }}>
            {task?.subTasks?.length ? (
              <button
                style={{ width: "20px" }}
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              >
                {open ? (
                  <FontAwesomeIcon icon={faChevronDown} />
                ) : (
                  <FontAwesomeIcon icon={faChevronRight} />
                )}
              </button>
            ) : (
              <></>
            )}

            <input
              placeholder="Title"
              className="styled-input"
              value={task?.title}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className="flex" style={{ gap: "8px" }}>
            <button className="flex action-box">
              <FontAwesomeIcon icon={faAngleDoubleDown} />
            </button>
            <button
              className="flex action-box"
              onClick={() => store.TasksStore.getTaskById(task.id)}
            >
              <FontAwesomeIcon icon={faAngleDoubleUp} />
            </button>
            <button
              className="flex action-box"
              onClick={() => store.TasksStore.deleteTask(task.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button
              className="flex action-box"
              onClick={() =>
                store.TasksStore.addTask({
                  id: uuidv4(),
                  title: "Title",
                  parentId: task.id,
                  subTasks: [],
                })
              }
            >
              <FontAwesomeIcon icon={faPlusSquare} />
            </button>
          </div>
        </div>
        {open ? (
          <div>
            {task?.subTasks?.length
              ? task?.subTasks.map((item) => renderTasks(item))
              : null}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      {tasks.map((task) => {
        return renderTasks(task);
      })}
    </div>
  );
});

export default TaskList;
