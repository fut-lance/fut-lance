import requests
import json
import time

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept-Charset": "utf-8"
}

# Buscar todas as noticias
print("Buscando noticias existentes...")
try:
    resp = requests.get(f"{STRAPI_URL}/api/noticias?pagination[pageSize]=100", headers=headers, timeout=30)
    if resp.status_code == 200:
        noticias = resp.json().get("data", [])
        print(f"Encontradas {len(noticias)} noticias")
        for n in noticias:
            print(f"  - {n['titulo'][:60]} (id: {n['documentId']})")
    else:
        print(f"Erro: {resp.status_code}")
        noticias = []
except Exception as e:
    print(f"Erro: {e}")
    noticias = []

# Deletar todas as noticias antigas
print(f"\nDeletando {len(noticias)} noticias antigas...")
for n in noticias:
    try:
        resp = requests.delete(
            f"{STRAPI_URL}/api/noticias/{n['documentId']}",
            headers=headers,
            timeout=30
        )
        if resp.status_code in [200, 204]:
            print(f"  Deletado: {n['titulo'][:50]}")
        else:
            print(f"  Erro ao deletar {n['documentId']}: {resp.status_code}")
    except Exception as e:
        print(f"  Erro: {e}")
    time.sleep(2)

print("\nLimpeza concluida!")
