import React, { useState } from "react";

const TaskTitleInput = ({ initialTitle, onUpdateTitle }) => {
  const [newTitle, setNewTitle] = useState(initialTitle);

  const handleInputChange = (event) => {
    setNewTitle(event.target.value);
    // We can use debounce for this function.
    onUpdateTitle(event.target.value);
  };

  return (
    <input
      placeholder="Title"
      className="styled-input"
      value={newTitle}
      onChange={handleInputChange}
    />
  );
};

export default TaskTitleInput;
