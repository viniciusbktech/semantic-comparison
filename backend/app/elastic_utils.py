from elasticsearch import Elasticsearch
from .models import Document, ComparisonResult
from typing import List
import os
from dotenv import load_dotenv

# Suprimir warning de certificado inválido
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

load_dotenv()


ELASTIC_URL = os.getenv("ELASTIC_URL")
ELASTIC_INDEX = os.getenv("ELASTIC_INDEX")
ELASTIC_USER = os.getenv("ELASTIC_USER")
ELASTIC_PASSWORD = os.getenv("ELASTIC_PASSWORD")
ELASTIC_VERIFY_CERTS = os.getenv("ELASTIC_VERIFY_CERTS")

# Campos e modelo parametrizáveis via .env
FIELD_CATEGORY = os.getenv("FIELD_CATEGORY", "categories")
FIELD_CONTENT_VEC = os.getenv("FIELD_CONTENT_VEC", "Content_vec")
FIELD_TITLE_VEC = os.getenv("FIELD_TITLE_VEC", "Title_vec")
FIELD_TITLE = os.getenv("FIELD_TITLE", "Title")
INFERENCE_ID = os.getenv("INFERENCE_ID", "cohere-multilingual-rerank")

es = Elasticsearch(
    ELASTIC_URL,
    basic_auth=(ELASTIC_USER, ELASTIC_PASSWORD),
    verify_certs=ELASTIC_VERIFY_CERTS
)

def list_documents(page: int, size: int) -> List[Document]:
    resp = es.search(
        index=ELASTIC_INDEX,
        body={
            "from": (page - 1) * size,
            "size": size,
            "query": {"match_all": {}}
        }
    )
    return [Document(**hit["_source"], id=hit["_id"]) for hit in resp["hits"]["hits"]]

def get_document_by_id(doc_id: str) -> Document:
    resp = es.get(index=ELASTIC_INDEX, id=doc_id, ignore=[404])
    if not resp.get("found"):
        return None
    return Document(**resp["_source"], id=resp["_id"])

def hybrid_search(doc_id: str) -> ComparisonResult:
    doc = get_document_by_id(doc_id)
    if not doc:
        raise Exception("Document not found")
    category = getattr(doc, FIELD_CATEGORY, None)
    content = getattr(doc, "Content", None)
    title = getattr(doc, FIELD_TITLE, None)
    query = {
    "min_score": 0.01,
    "retriever": {
        "text_similarity_reranker": {
            "retriever": {
                "rrf": {
                    "retrievers": [
                        {
                            "standard": {
                                "query": {
                                    "bool": {
                                        "filter": [
                                            {"term": {"categories": category}}
                                        ],
                                        "must": [
                                            {
                                                "semantic": {
                                                    "field": FIELD_CONTENT_VEC,
                                                    "query": content
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "standard": {
                                "query": {
                                    "bool": {
                                        "filter": [
                                            {"term": {"categories": category}}
                                        ],
                                        "must": [
                                            {
                                                "semantic": {
                                                    "field": FIELD_TITLE_VEC,
                                                    "query": title
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            },
            "field": FIELD_TITLE,
            "inference_id": INFERENCE_ID,
            "inference_text": title
        }
    }
    }
    resp = es.search(index=ELASTIC_INDEX, body=query)
    all_hits_from_es = resp["hits"]["hits"]

    self_match_es_score = None
    potential_similar_hits = []

    for hit in all_hits_from_es:
        if hit["_id"] == doc.id:
            self_match_es_score = hit.get("_score", 0)
        else:
            potential_similar_hits.append(hit)

    normalization_denominator = 1.0  # Default fallback
    if self_match_es_score is not None and self_match_es_score > 0:
        normalization_denominator = self_match_es_score
    elif potential_similar_hits: # Fallback if self-match score isn't usable
        max_other_score = max(h.get("_score", 0) for h in potential_similar_hits)
        if max_other_score > 0:
            normalization_denominator = max_other_score
    # Ensure normalization_denominator is positive to prevent division by zero
    if normalization_denominator <= 0:
        normalization_denominator = 1.0

    similar_docs_for_result = []
    for hit_data in potential_similar_hits:
        original_es_score = hit_data.get("_score", 0)
        normalized_score = original_es_score / normalization_denominator
        similar_docs_for_result.append(
            Document(**hit_data["_source"], id=hit_data["_id"], score=normalized_score)
        )

    selected_doc_data = doc.dict()
    selected_doc_data['score'] = 1.0
    selected_doc_for_result = Document(**selected_doc_data)

    return ComparisonResult(selected=selected_doc_for_result, similar=similar_docs_for_result)
