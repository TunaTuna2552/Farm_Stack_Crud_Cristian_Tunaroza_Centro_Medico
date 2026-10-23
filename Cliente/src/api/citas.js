import axios from "axios";

const URL = "http://localhost:8000";
const endpoint = `${URL}/api/citas`;

export const fetchCitas = () => axios.get(endpoint);

export const fetchCita = (id) => axios.get(`${endpoint}/${id}`);

export const createCita = (newCita) => axios.post(endpoint, newCita);

export const updateCita = (id, cita) => axios.put(`${endpoint}/${id}`, cita);

export const deleteCita = (id) => axios.delete(`${endpoint}/${id}`);