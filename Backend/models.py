from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional, Annotated

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if v is not None else v)] #Convierte el id de Mongo DB a texto para que fastapi responda en json

class Citas(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias='_id')
    paciente: str
    especialidad: str
    fecha_hora: str
    atendida: bool = False

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
        "json_encoders": {object: str}
    }#Todo lo que debe llevar la cita médica incluidos sus 4 campos

class UpdateCitas(BaseModel): #Todos sus campos son opcionales para que puedan ser actualizados
    paciente: Optional[str] = None
    especialidad: Optional[str] = None
    fecha_hora: Optional[str] = None
    atendida: Optional[bool] = None

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
        "json_encoders": {object: str}
    }