async function test(){
  const urls=[
    // Goias - from official site
    'https://www.goiasec.com.br/imagens/header/logo-goias.svg',
    // Cienciano - from official site
    'https://cienciano.com/wp-content/uploads/2023/11/LOGO-CIENCIANO.png',
    // Montevideo City Torque - from official site
    'https://montevideocitytorque.com/wp-content/uploads/2020/01/escudo-1.png',
    'https://montevideocitytorque.com/wp-content/uploads/2020/01/cropped-escudo-1-50x50.png'
  ];
  for(const u of urls){
    try{
      const r=await fetch(u,{method:'HEAD'});
      const ct=r.headers.get('content-type');
      const size=r.headers.get('content-length');
      console.log(r.status,ct?.includes('image')?'IMG':'NO',size,u.split('/').pop().substring(0,40));
    }catch(e){console.log('ERRO',u.split('/').pop().substring(0,40))}
  }
}
test();
