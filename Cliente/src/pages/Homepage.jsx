import { useEffect, useState } from "react";
import { fetchCitas } from "../api/citas";
import TaskList from "../components/TaskList";

function Homepage() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    fetchCitas()
      .then((res) => {
        setCitas(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <TaskList citas={citas} />;
}

export default Homepage;