from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from .elastic_utils import list_documents, get_document_by_id, hybrid_search
from .models import Document, ComparisonResult

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/documents", response_model=List[Document])
def get_documents(page: int = 1, size: int = 10):
    return list_documents(page, size)

@app.get("/documents/{doc_id}", response_model=Document)
def get_document(doc_id: str):
    doc = get_document_by_id(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

@app.get("/compare/{doc_id}", response_model=ComparisonResult)
def compare_document(doc_id: str):
    return hybrid_search(doc_id)

