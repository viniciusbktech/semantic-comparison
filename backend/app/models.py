from pydantic import BaseModel
from typing import List, Optional

class Document(BaseModel):
    id: str
    Title: str
    Content: str
    categories: str
    Url: str
    score: float | None = None  # Score de similaridade
    # Adicione outros campos conforme necessário

class ComparisonResult(BaseModel):
    selected: Document
    similar: List[Document]
