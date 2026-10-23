from fastapi import FastAPI
from router.citas import cita
from fastapi.middleware.cors import CORSMiddleware
from decouple import config

app = FastAPI()

origins = [
    config('FRONTEND_URL')
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get('/')
def welcome():
    return {'message': 'Bienvenido a mi FastAPI API - Centro Médico'}

app.include_router(cita)