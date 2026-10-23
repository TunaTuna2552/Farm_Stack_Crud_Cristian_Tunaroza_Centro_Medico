import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCita, createCita, updateCita, deleteCita } from "../api/citas";

function TaskForm() {
  const [paciente, setPaciente] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [fecha_hora, setFechaHora] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!params.id) {
        const res = await createCita({ paciente, especialidad, fecha_hora });
        console.log(res);
      } else {
        const res = await updateCita(params.id, {
          paciente,
          especialidad,
          fecha_hora,
        });
        console.log(res);
      }
      e.target.reset();
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Error al procesar la cita médica");
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchCita(params.id)
        .then((res) => {
          setPaciente(res.data.paciente);
          setEspecialidad(res.data.especialidad);
          setFechaHora(res.data.fecha_hora);
        })
        .catch((err) => console.log(err));
    }
  }, [params.id]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div>
        <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold my-4">
            {params.id ? "Actualizar Cita Médica" : "Agendar Cita Médica"}
          </h1>
          {error && (
            <p className="bg-red-500 text-white p-2 mb-4 rounded text-sm">
              {error}
            </p>
          )}
          <input
            type="text"
            placeholder="Nombre del paciente"
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setPaciente(e.target.value)}
            value={paciente}
            autoFocus
            required
          />
          <input
            type="text"
            placeholder="Especialidad (ej. Medicina General)"
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setEspecialidad(e.target.value)}
            value={especialidad}
            required
          />
          <input
            type="text"
            placeholder="Fecha y Hora (ej. 2026-10-25 09:00 AM)"
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setFechaHora(e.target.value)}
            value={fecha_hora}
            required
          />
          <button className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 px-4 rounded">
            {params.id ? "Actualizar Cita" : "Guardar Cita"}
          </button>
        </form>
        {params.id && (
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={async () => {
              try {
                const res = await deleteCita(params.id);
                console.log(res);
                navigate("/");
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Borrar
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskForm;