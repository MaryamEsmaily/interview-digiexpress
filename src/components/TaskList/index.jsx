import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faChevronDown,
  faChevronRight,
  faPlusSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const TaskList = ({ tasks }) => {
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
            />
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
};

export default TaskList;
