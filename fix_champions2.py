import requests
import time

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
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
