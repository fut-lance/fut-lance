import requests
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
print("ETAPA 3 — LIMPEZA")
print("=" * 60)
print(f"Data/Hora: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
print()

# IDs to delete (from backup)
noticias_ids = [
    "di0aha7f8afh1zort3yesjvs",  # Seleção Feminina Sub-20
    "s9dmewuu7yhs7j9d7an33w8h",  # Coritiba x Athletico
    "hal149hwi9q4csvmllsz5mbk",  # Jogos de hoje
    "cakeqkp7rqscuj59vxbntl3x",  # Real Madrid x Rayo Vallecano
    "maeb4t84yk2yu7pp8rpa13fd",  # Boca x Central Córdoba
]

print(f"Excluindo {len(noticias_ids)} notícias...")
for i, nid in enumerate(noticias_ids):
    try:
        resp = requests.delete(f"{STRAPI_URL}/api/noticias/{nid}", headers=headers, timeout=60)
        if resp.status_code == 200:
            print(f"  [{i+1}/5] Excluída: {nid}")
        else:
            print(f"  [{i+1}/5] Erro {resp.status_code}: {nid}")
    except Exception as e:
        print(f"  [{i+1}/5] Erro: {e}")
    time.sleep(3)

# Verify
print("\nVerificando...")
try:
    resp = requests.get(f"{STRAPI_URL}/api/noticias?pagination[pageSize]=10", headers=headers, timeout=60)
    if resp.status_code == 200:
        remaining = resp.json().get("data", [])
        print(f"Notícias restantes: {len(remaining)}")
except:
    print("Não foi possível verificar")

print("\nETAPA 3 CONCLUÍDA")
