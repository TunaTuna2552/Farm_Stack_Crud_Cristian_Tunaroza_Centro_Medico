import TaskCard from "./TaskCard";

function TaskList({ citas }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {citas.map((cita) => (
        <TaskCard cita={cita} key={cita._id} />
      ))}
    </div>
  );
}

export default TaskList;