import urllib.request
import re

url = 'http://blackbr.fun:80/get.php?username=031532627&password=513117897&type=m3u_plus&output=m3u8'
req = urllib.request.Request(url, headers={'User-Agent': 'VLC/3.0.20'})
r = urllib.request.urlopen(req, timeout=60)
content = r.read().decode('utf-8', errors='replace')

lines = content.split('\n')
results = []
for i, line in enumerate(lines):
    if 'EXTINF' in line and ('caze' in line.lower() or 'cazetv' in line.lower() or 'record' in line.lower()):
        if i+1 < len(lines):
            next_line = lines[i+1].strip()
            if next_line.startswith('http'):
                name_match = re.search(r'tvg-name="([^"]+)"', line)
                group_match = re.search(r'group-title="([^"]+)"', line)
                name = name_match.group(1) if name_match else 'Unknown'
                group = group_match.group(1) if group_match else 'Unknown'
                id_match = re.search(r'/(\d+)\.m3u8', next_line)
                ch_id = id_match.group(1) if id_match else 'N/A'
                results.append(f'ID: {ch_id} | Name: {name} | Group: {group} | URL: {next_line[:80]}')

with open('D:/open code/fut-lance/channels2.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(results))
print(f'Found {len(results)} channels. Saved to channels2.txt')
