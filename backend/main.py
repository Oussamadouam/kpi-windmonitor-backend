import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials

# 1. Initialiser Firebase à partir d'une variable d'env
firebase_creds = os.getenv("FIREBASE_CREDENTIALS")
if not firebase_creds:
    raise RuntimeError("FIREBASE_CREDENTIALS environment variable is not set")

try:
    cred_dict = json.loads(firebase_creds)
    cred = credentials.Certificate(cred_dict)
    firebase_admin.initialize_app(cred)
except Exception as e:
    raise RuntimeError(f"Failed to initialize Firebase Admin SDK: {e}")

# 2. Créer l'app FastAPI
app = FastAPI(title="KPI Windmonitor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Enregistrer vos routes
from routes.kpi_routes import router as kpi_router
app.include_router(kpi_router, prefix="/api/kpi", tags=["kpi"])

# 4. Optional: root endpoint
@app.get("/")
async def root():
    return {"message": "KPI Windmonitor API is up ✅"}
