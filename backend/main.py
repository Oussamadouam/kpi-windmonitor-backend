from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.firebase_admin import initialize_firebase
from routes.kpi_routes import router as kpi_router

# ✅ Initialiser Firebase
initialize_firebase()

# ✅ Créer l'application FastAPI
app = FastAPI()

# ✅ Autoriser les requêtes entre le front-end et le back-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Inclure les routes de KPI
app.include_router(kpi_router)
