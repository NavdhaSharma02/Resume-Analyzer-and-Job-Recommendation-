from fastapi import APIRouter, UploadFile, File
from app.services.parser import extract_text_from_pdf
from app.utils.scoring import match_resume_with_jd

router = APIRouter()

@router.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = ""
):
    resume_text = extract_text_from_pdf(resume)
    result = match_resume_with_jd(resume_text, job_description)

    return result
