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
import TaskTitleInput from "../taskTitleInput";

const TaskList = observer(() => {
  //
  const store = useStores();
  const tasks = toJS(store.TasksStore.tasks);

  // Collapse
  const [openTask, setOpenTask] = useState({});

  const toggleTask = (taskId) => {
    setOpenTask((prevOpenTasks) => ({
      ...prevOpenTasks,
      [taskId]: !prevOpenTasks[taskId],
    }));
  };

  // handle render tasks and subtasks
  const renderTasks = (task) => {
    // for collapse
    const isOpen = openTask[task.id];
    return (
      <div key={task.id} className="task-container">
        <div className="task-box">
          <div className="flex" style={{ gap: "16px" }}>
            {task?.subTasks?.length ? (
              <button
                style={{ width: "20px" }}
                onClick={() => toggleTask(task.id)}
              >
                {isOpen ? (
                  <FontAwesomeIcon icon={faChevronDown} />
                ) : (
                  <FontAwesomeIcon icon={faChevronRight} />
                )}
              </button>
            ) : (
              <></>
            )}
            <TaskTitleInput
              initialTitle={task?.title}
              onUpdateTitle={(newTitle) =>
                store.TasksStore.updateTask(task.id, newTitle)
              }
            />
          </div>
          <div className="flex" style={{ gap: "8px" }}>
            <button
              disabled={!task.parentId}
              className={`flex action-box ${!task.parentId ? "disabled" : ""}`}
              onClick={() =>
                store.TasksStore.moveTask(task.id, task.parentId, "down")
              }
            >
              <FontAwesomeIcon icon={faAngleDoubleDown} />
            </button>
            <button
              disabled={!task.parentId}
              className={`flex action-box ${!task.parentId ? "disabled" : ""}`}
              onClick={() =>
                store.TasksStore.moveTask(task.id, task.parentId, "up")
              }
            >
              <FontAwesomeIcon icon={faAngleDoubleUp} />
            </button>
            {/* disable delete button for main task */}
            <button
              disabled={!task.parentId}
              className={`flex action-box ${!task.parentId ? "disabled" : ""}`}
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
        {isOpen ? (
          <div>{task?.subTasks.map((item) => renderTasks(item))}</div>
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
