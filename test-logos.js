async function test(){
  // Try common team name variations
  const teams=[
    'goias',
    'goias-ec',
    'goias-esporte-clube',
    'ec-goias',
    'cienciano',
    'cienciano-peru',
    'montevideo-city',
    'montevideo-city-torque',
    'torque'
  ];
  
  for(const t of teams){
    try{
      const url=`https://logodetimes.com/times/${t}/logo-${t}.png`;
      const r=await fetch(url);
      const ct=r.headers.get('content-type');
      console.log(r.status,ct?.includes('image')?'IMG':'NO',t);
    }catch(e){console.log('ERRO',t)}
  }
}
test();
