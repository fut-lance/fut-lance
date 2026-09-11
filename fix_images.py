import requests
import time

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "***REMOVED***"
headers = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json", "Accept-Charset": "utf-8"}

# Get all news
r = requests.get(f"{STRAPI_URL}/api/noticias?pagination[pageSize]=10", headers=headers, timeout=60)
noticias = r.json().get("data", [])

for n in noticias:
    titulo = n.get("titulo", "")
    imagem = n.get("imagem_url", "")
    
    # Check for broken images
    if "photo-1522778119026-d647f0596c20" in imagem:
        print(f"Fixing broken image in: {titulo[:40]}")
        new_image = "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200"
        resp = requests.put(
            f"{STRAPI_URL}/api/noticias/{n['documentId']}",
            headers=headers,
            json={"data": {"imagem_url": new_image}},
            timeout=60
        )
        print(f"  Status: {resp.status_code}")
        time.sleep(3)

print("Done!")
