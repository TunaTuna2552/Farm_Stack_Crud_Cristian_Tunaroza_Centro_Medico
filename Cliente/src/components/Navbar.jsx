import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="flex justify-between items-center my-7">
      <Link to={"/"}>
        <h1 className="text-3xl font-bold">Centro Médico - Citas</h1>
      </Link>
      <Link
        to="/citas/new"
        className="bg-zinc-950 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded"
      >
        Agendar Cita
      </Link>
    </header>
  );
}

export default Navbar;  