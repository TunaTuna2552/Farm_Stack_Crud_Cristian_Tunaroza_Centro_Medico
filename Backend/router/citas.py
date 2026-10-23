from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import (get_todas_citas, get_one_cita_id, get_cita_por_paciente_fecha, create_cita, update_cita, delete_cita)
from models import Citas, UpdateCitas

cita = APIRouter()

@cita.get('/api/citas')
async def get_citas():
    citas = await get_todas_citas()
    return citas

@cita.post('/api/citas')
async def save_citas(nueva_cita: Citas):
    cita_existente = await get_cita_por_paciente_fecha(nueva_cita.paciente, nueva_cita.fecha_hora)

    if cita_existente:
        raise HTTPException(status_code=400, detail="El paciente ya tiene una cita en esa fecha y hora")

    dict_cita = nueva_cita.model_dump()
    if dict_cita.get('id') is None:
        del dict_cita['id']

    responsive = await create_cita(dict_cita)
    return responsive

@cita.get('/api/citas/{id}', response_model=Citas)
async def get_cita(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es inválido")

    cita_db = await get_one_cita_id(id)
    if cita_db:
        return cita_db
    raise HTTPException(404, f"Cita {id} no encontrada")

@cita.put('/api/citas/{id}', response_model=Citas)
async def put_citas(id: str, datos_cita: UpdateCitas):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es inválido")

    response = await update_cita(id, datos_cita)
    if response:
        return response
    raise HTTPException(404, f"Cita {id} no encontrada")

@cita.delete('/api/citas/{id}')
async def remove_cita(id: str):
    response = await delete_cita(id)
    if response:
        return "Cita borrada satisfactoriamente"
    raise HTTPException(404, f"Cita {id} no encontrada")