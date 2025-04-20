from fastapi import APIRouter, UploadFile, File
import pandas as pd
from logic.kpi_logic import calculer_kpi
from io import BytesIO

router = APIRouter()

@router.post("/upload")
async def upload_excel(file: UploadFile = File(...)):
    try:
        content = await file.read()
        df = pd.read_excel(BytesIO(content), header=2)
        results = calculer_kpi(df)
        return results
    except Exception as e:
        return {"error": str(e)}
