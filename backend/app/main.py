from fastapi import FastAPI
from app.routes.resume import router as resume_router

app = FastAPI(title="Resume Analyzer API")

app.include_router(resume_router, prefix="/api/resume")

@app.get("/")
def root():
    return {"status": "Backend running successfully"}
