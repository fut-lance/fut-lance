import requests
import time
from datetime import datetime

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "***REMOVED***"

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
