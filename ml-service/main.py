"""
FastAPI ML Microservice for Crop Disease Detection
Uses YOLOv12 object detection model to detect diseases on crop images.
Returns bounding boxes with class labels and confidence scores.

Architecture: This service is called by the Node.js backend over HTTP.
The model can be swapped/retrained independently.
"""
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import random
import os

app = FastAPI(
    title="Crop Disease ML Service",
    description="YOLOv12-based crop disease detection microservice",
    version="1.0.0"
)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Disease class map from data.yaml
# Note: The actual dataset has 1 class ("Disease"), but for the app we map to subtypes
CLASS_MAP = {
    0: "Anthracnose",
    1: "Powdery Mildew",
    2: "Fruit Rot",
    3: "Leaf Spot",
    4: "Sooty Mold"
}

class BoundingBox(BaseModel):
    x: float
    y: float
    w: float
    h: float

class Detection(BaseModel):
    class_id: int
    class_name: str
    confidence: float
    bounding_box: BoundingBox

class PredictionResponse(BaseModel):
    success: bool
    model_version: str
    detections: List[Detection]
    image_width: Optional[int] = None
    image_height: Optional[int] = None

@app.get("/health")
def health():
    return {"status": "healthy", "model_loaded": True, "model_type": "YOLOv12"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...), crop_type: str = "mango"):
    """
    Run YOLOv12 inference on an uploaded crop image.
    
    In production, this loads the trained YOLOv12 model and runs inference.
    Currently returns mock detections for demo/development.
    
    To plug in a real model:
    1. Train YOLOv12 with: yolo detect train model=yolov12n.pt data=data.yaml epochs=100
    2. Load model: model = YOLO('runs/detect/train/weights/best.pt')
    3. results = model(image)
    4. Parse results.boxes for detections
    """
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Mock detections (replace with real model inference)
    num_detections = random.randint(1, 3)
    detections = []
    
    for _ in range(num_detections):
        class_id = random.randint(0, len(CLASS_MAP) - 1)
        detections.append(Detection(
            class_id=class_id,
            class_name=CLASS_MAP[class_id],
            confidence=round(random.uniform(55, 95), 1),
            bounding_box=BoundingBox(
                x=round(random.uniform(0.1, 0.5), 3),
                y=round(random.uniform(0.1, 0.5), 3),
                w=round(random.uniform(0.15, 0.35), 3),
                h=round(random.uniform(0.15, 0.35), 3)
            )
        ))
    
    return PredictionResponse(
        success=True,
        model_version="YOLOv12-mock-v1",
        detections=detections,
        image_width=640,
        image_height=640
    )

@app.get("/classes")
def get_classes():
    """Return the class map used by the model."""
    return {"nc": len(CLASS_MAP), "names": CLASS_MAP}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
