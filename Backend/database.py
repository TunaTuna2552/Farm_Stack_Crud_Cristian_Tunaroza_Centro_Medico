from motor.motor_asyncio import AsyncIOMotorClient
from models import Citas, UpdateCitas
from bson import ObjectId

cliente = AsyncIOMotorClient('mongodb://localhost')
database = cliente.centromedico_db
coleccion = database.citas

async def get_one_cita_id(id):
    cita = await coleccion.find_one({'_id': ObjectId(id)})
    if cita:
        cita['_id'] = str(cita['_id'])
    return cita

async def get_cita_por_paciente_fecha(paciente: str, fecha_hora: str): #Evita que se dupliquen las citas para el mismo paciente a la misma fecha y hora
    cita = await coleccion.find_one({'paciente': paciente, 'fecha_hora': fecha_hora})
    return cita

async def create_cita(cita):
    new_cita = await coleccion.insert_one(cita)
    created_cita = await coleccion.find_one({'_id': new_cita.inserted_id})
    if created_cita:
        created_cita['_id'] = str(created_cita['_id'])
    return created_cita

async def get_todas_citas():
    citas = []
    cursor = coleccion.find({})
    async for document in cursor:
        document['_id'] = str(document['_id'])
        citas.append(Citas(**document))
    return citas

async def update_cita(id: str, data: UpdateCitas):
    cita = data.model_dump(by_alias=True, exclude_none=True)
    cita.pop('_id', None)
    await coleccion.update_one({'_id': ObjectId(id)}, {'$set': cita})
    document = await coleccion.find_one({'_id': ObjectId(id)})
    if document:
        document['_id'] = str(document['_id'])
    return document

async def delete_cita(id: str):
    await coleccion.delete_one({'_id': ObjectId(id)})
    return True

#Realiza las operaciones sin interrumpir el flujo del código (asíncronas) - Parecido a las promesas, realizan las búsquedas, se crean, se actualizan y se borran