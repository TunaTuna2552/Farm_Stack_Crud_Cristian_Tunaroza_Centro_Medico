import { useNavigate } from "react-router-dom";
import { updateCita } from "../api/citas";

function TaskCard({ cita }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gray-950 rounded"
      onClick={() => {
        navigate(`/citas/${cita._id}`);
      }}
    >
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">{cita.paciente}</h2>
        <button
          onClick={async (e) => {
            e.stopPropagation();
            const res = await updateCita(cita._id, {
              atendida: !cita.atendida,
            });
            if (res.status === 200) {
              window.location.reload();
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${cita.atendida ? "text-green-500" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </button>
      </div>
      <p className="text-slate-300">Especialidad: {cita.especialidad}</p>
      <p className="text-slate-400 text-sm mt-1">
        Fecha y Hora: {cita.fecha_hora}
      </p>
    </div>
  );
}

export default TaskCard;