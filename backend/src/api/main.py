from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from routes import asistente

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def ping():
    return {"ping": "pong!"}


# app.asistente_router(asistente.router)