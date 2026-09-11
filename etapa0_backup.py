import requests
import json
import time
from datetime import datetime

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept-Charset": "utf-8"
}

print("=" * 60)
print("ETAPA 0 — PREPARAÇÃO E BACKUP")
print("=" * 60)
print(f"Data/Hora: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
print()

# 1. Buscar todas as notícias
print("1. Buscando todas as notícias no Strapi...")
noticias = []
for attempt in range(3):
    try:
        resp = requests.get(f"{STRAPI_URL}/api/noticias?pagination[pageSize]=100&populate=*", headers=headers, timeout=60)
        if resp.status_code == 200:
            data = resp.json()
            noticias = data.get("data", [])
            print(f"   Total encontrado: {len(noticias)} notícias")
            break
        else:
            print(f"   Tentativa {attempt+1}: Erro {resp.status_code}")
    except Exception as e:
        print(f"   Tentativa {attempt+1}: {e}")
    time.sleep(5)

# 2. Buscar categorias
print("\n2. Buscando categorias...")
categorias = []
try:
    resp = requests.get(f"{STRAPI_URL}/api/categorias", headers=headers, timeout=60)
    if resp.status_code == 200:
        categorias = resp.json().get("data", [])
        print(f"   Total: {len(categorias)} categorias")
        for cat in categorias:
            print(f"   - {cat['nome']} (id: {cat['documentId']})")
except Exception as e:
    print(f"   Erro: {e}")

# 3. Salvar backup
print("\n3. Salvando backup...")
backup = {
    "data_backup": datetime.now().isoformat(),
    "total_noticias": len(noticias),
    "categorias": categorias,
    "noticias": []
}

for n in noticias:
    backup["noticias"].append({
        "documentId": n.get("documentId"),
        "titulo": n.get("titulo"),
        "slug": n.get("slug"),
        "resumo": n.get("resumo"),
        "conteudo": n.get("conteudo"),
        "imagem_url": n.get("imagem_url"),
        "data_publicacao": n.get("data_publicacao"),
        "autor": n.get("autor"),
        "categoria": n.get("categoria", {}).get("nome") if n.get("categoria") else None,
        "created_at": n.get("createdAt"),
        "updated_at": n.get("updatedAt"),
    })

with open("D:/open code/fut-lance/backup_noticias.json", "w", encoding="utf-8") as f:
    json.dump(backup, f, ensure_ascii=False, indent=2)

print(f"   Backup salvo em: backup_noticias.json")
print(f"   Total: {len(backup['noticias'])} notícias")

print("\n" + "=" * 60)
print("ETAPA 0 CONCLUÍDA")
print("=" * 60)
