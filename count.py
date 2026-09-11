import requests
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/noticias?pagination[pageSize]=1", 
    headers={"Authorization": "Bearer ***REMOVED***"})
total = r.json()["meta"]["pagination"]["total"]
print(f"Total de noticias: {total}")
