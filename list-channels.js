const https = require('https');
const http = require('http');

const url = 'http://radiogolive.site:80/get.php?username=031532627&password=513117897&type=m3u_plus&output=m3u8';

function fetch(u) {
  return new Promise((resolve, reject) => {
    const mod = u.startsWith('https') ? https : http;
    mod.get(u, { headers: { 'User-Agent': 'VLC/3.0.20' }, timeout: 30000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  try {
    const content = await fetch(url);
    const lines = content.split('\n');
    
    const channels = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('#EXTINF:')) {
        const nameMatch = line.match(/,(.+)$/);
        if (nameMatch) {
          const name = nameMatch[1].trim();
          const nextLine = (lines[i + 1] || '').trim();
          channels.push({ name, url: nextLine });
        }
      }
    }

    console.log(`Total de canais: ${channels.length}\n`);
    
    // Procurar canais com palavras-chave
    const keywords = ['PARAMOUNT', 'AMAZON', 'FOX', 'CAZE', 'CAZÉ', 'PRIME', 'STAR', 'SPORTV', 'ESPN', 'PREMIERE', 'COMBATE', 'DAZN', 'BAND'];
    
    console.log('--- CANAIS COM PALAVRAS-CHAVE ---\n');
    for (const ch of channels) {
      const upper = ch.name.toUpperCase();
      for (const kw of keywords) {
        if (upper.includes(kw)) {
          console.log(`  [${kw}] ${ch.name}`);
          console.log(`    URL: ${ch.url}`);
          break;
        }
      }
    }

    console.log('\n--- TODOS OS CANAIS ---\n');
    for (const ch of channels) {
      console.log(`  ${ch.name}`);
    }

  } catch (err) {
    console.error('Erro:', err.message);
  }
}

main();
