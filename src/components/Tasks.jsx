import NewTask from "./NewTask";
import { PropTypes } from "prop-types";

export default function Tasks({ tasks, onAdd, onDelete }) {
  console.log(tasks);
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">일정</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          이 프로젝트에는 등록된 일정이 없습니다.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.text}</span>
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => onDelete(task.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

Tasks.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  tasks: PropTypes.func.isRequired,
};
