import { useState } from "react";
import { PropTypes } from "prop-types";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") {
      return;
    }
    onAdd(enteredTask);
    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 border-b border-black bg-stone-50"
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        새 일정 추가
      </button>
    </div>
  );
}
NewTask.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
