async function check() {
  const r = await fetch('https://fut-lance.vercel.app/ao-vivo?_=' + Date.now());
  const t = await r.text();
  
  // Find all script sources
  const re = /src="(\/_next[^"]+\.js)"/g;
  let m;
  const urls = [];
  while ((m = re.exec(t)) !== null) {
    urls.push(m[1]);
  }
  console.log('JS files found:', urls.length);
  
  for (const u of urls) {
    const r2 = await fetch('https://fut-lance.vercel.app' + u);
    const js = await r2.text();
    if (js.includes('Premiere 2 FHD')) {
      console.log('FOUND Premiere 2 FHD in', u);
      return;
    }
  }
  console.log('Premiere 2 FHD not found in any JS bundle');
}
check();
