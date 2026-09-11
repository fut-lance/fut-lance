import requests
import time

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "***REMOVED***"
CATEGORIA_CHAMPIONS_DOCID = "swyvj5yli1z4v5x51y0ijoj4"

headers = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json", "Accept-Charset": "utf-8"}

# Find Champions League news
r = requests.get(f"{STRAPI_URL}/api/noticias?pagination[pageSize]=10&populate=*", headers=headers, timeout=60)
for n in r.json().get("data", []):
    if "Champions" in n.get("titulo", ""):
        doc_id = n["documentId"]
        print(f"Found: {n['titulo'][:50]}")
        print(f"  documentId: {doc_id}")
        
        # First, get the raw data to see what we need
        raw = requests.get(f"{STRAPI_URL}/api/noticias/{doc_id}?populate=*", headers=headers, timeout=60)
        print(f"  Raw status: {raw.status_code}")
        
        # Update with correct category using documentId format
        update_data = {
            "data": {
                "categoria": CATEGORIA_CHAMPIONS_DOCID
            }
        }
        
        resp = requests.put(
            f"{STRAPI_URL}/api/noticias/{doc_id}",
            headers=headers,
            json=update_data,
            timeout=60
        )
        print(f"  Update status: {resp.status_code}")
        print(f"  Response: {resp.text[:300]}")
        time.sleep(3)
        break

print("Done!")
