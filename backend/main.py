from fastapi import FastAPI
from routes.upload import router
from fastapi.middleware.cors import CORSMiddleware
from routes.history import router as history_router
from routes.report import router as report_router
from routes.case import router as case_router
from routes.stats import router as stats_router
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(router)
app.include_router(history_router)
app.include_router(report_router)
app.include_router(case_router)
app.include_router(stats_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/reports",
    StaticFiles(directory="reports"),
    name="reports"
)

@app.get("/")
async def home():
    return {"message": "SnapRecover Backend Running"}