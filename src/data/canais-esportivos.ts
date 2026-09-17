// Catálogo interno de canais esportivos (gerado a partir de .opencode/canais-iptv.json).
// Contém apenas nome, ID, categoria e status — SEM credenciais ou URLs upstream.
// Uso: consultar ao associar transmissões confirmadas ao canais[] dos jogos (Regra 64).

export interface CanalEsportivo {
  nome: string;
  id: string;
  categoria: string;
  status: string;
}

export const canaisEsportivos: CanalEsportivo[] = [
  { nome: "Canal GOAT III", id: "418336", categoria: "Futebol", status: "valida" },
  { nome: "Canal GOAT II", id: "418335", categoria: "Futebol", status: "nao-validada" },
  { nome: "Canal GOAT I", id: "418334", categoria: "Futebol", status: "nao-validada" },
  { nome: "SPORTV FHD", id: "423791", categoria: "Futebol", status: "em-uso" },
  { nome: "SPORTV HD", id: "423792", categoria: "Futebol", status: "em-uso" },
  { nome: "SPORTV SD", id: "423793", categoria: "Futebol", status: "valida" },
  { nome: "SPORTV 2 FHD", id: "423795", categoria: "Futebol", status: "em-uso" },
  { nome: "SPORTV 2 HD", id: "423796", categoria: "Futebol", status: "em-uso" },
  { nome: "SPORTV 2 SD", id: "423797", categoria: "Futebol", status: "valida" },
  { nome: "SPORTV 3 FHD", id: "423799", categoria: "Futebol", status: "valida" },
  { nome: "SPORTV 3 HD", id: "423800", categoria: "Futebol", status: "em-uso" },
  { nome: "SPORTV 3 SD", id: "423801", categoria: "Futebol", status: "valida" },
  { nome: "XSPORTS FHD", id: "423806", categoria: "Futebol", status: "nao-validada" },
  { nome: "XSPORTS HD", id: "423807", categoria: "Futebol", status: "nao-validada" },
  { nome: "XSPORTS SD", id: "423808", categoria: "Futebol", status: "valida" },
  { nome: "ESPN FHD", id: "424142", categoria: "Futebol", status: "em-uso" },
  { nome: "ESPN HD", id: "424143", categoria: "Futebol", status: "valida" },
  { nome: "ESPN SD", id: "424144", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 2 FHD", id: "424146", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 2 HD", id: "424147", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 2 SD", id: "424148", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 3 FHD", id: "424150", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 3 HD", id: "424151", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 3 SD", id: "424152", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 4 FHD", id: "424154", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 4 HD", id: "424155", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 4 SD", id: "424156", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 5 FHD", id: "424158", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 5 HD", id: "424159", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 5 SD", id: "424160", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 6 FHD", id: "424162", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 6 HD", id: "424163", categoria: "Futebol", status: "valida" },
  { nome: "ESPN 6 SD", id: "424164", categoria: "Futebol", status: "valida" },
  { nome: "BAND SPORTS FHD", id: "424166", categoria: "Futebol", status: "valida" },
  { nome: "BAND SPORTS HD", id: "424167", categoria: "Futebol", status: "valida" },
  { nome: "BAND SPORTS SD", id: "424168", categoria: "Futebol", status: "valida" },
  { nome: "COMBATE FHD", id: "424170", categoria: "Lutas", status: "valida" },
  { nome: "COMBATE HD", id: "424171", categoria: "Lutas", status: "nao-validada" },
  { nome: "COMBATE SD", id: "424172", categoria: "Lutas", status: "valida" },
  { nome: "PREMIERE CLUBES FHD", id: "424208", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE CLUBES HD", id: "424209", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE CLUBES SD", id: "424210", categoria: "Futebol", status: "valida" },
  { nome: "PREMIERE 2 FHD", id: "424212", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 2 HD", id: "424213", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 2 SD", id: "424214", categoria: "Futebol", status: "valida" },
  { nome: "PREMIERE 3 FHD", id: "424216", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 3 HD", id: "424217", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 3 SD", id: "424218", categoria: "Futebol", status: "valida" },
  { nome: "PREMIERE 4 FHD", id: "424220", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 4 HD", id: "424221", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 4 SD", id: "424222", categoria: "Futebol", status: "valida" },
  { nome: "PREMIERE 5 HD", id: "424224", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 5 SD", id: "424225", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 6 FHD", id: "424227", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 6 HD", id: "424228", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 6 SD", id: "424229", categoria: "Futebol", status: "valida" },
  { nome: "PREMIERE 7 FHD", id: "424231", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 7 HD", id: "424232", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 7 SD", id: "424233", categoria: "Futebol", status: "nao-validada" },
  { nome: "PREMIERE 8 FHD", id: "424235", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 8 HD", id: "424236", categoria: "Futebol", status: "em-uso" },
  { nome: "PREMIERE 8 SD", id: "424237", categoria: "Futebol", status: "nao-validada" },
  { nome: "UNIVERSAL PREMIERE FHD", id: "424812", categoria: "Futebol", status: "valida" },
  { nome: "UNIVERSAL PREMIERE HD", id: "424813", categoria: "Futebol", status: "valida" },
  { nome: "UNIVERSAL PREMIERE SD", id: "424814", categoria: "Futebol", status: "nao-validada" },
  { nome: "CAZE TV 01 FHD", id: "424908", categoria: "Futebol", status: "em-uso" },
  { nome: "CAZE TV 01 HD", id: "424909", categoria: "Futebol", status: "em-uso" },
  { nome: "CAZE TV 02 FHD", id: "424910", categoria: "Futebol", status: "nao-validada" },
  { nome: "CAZE TV 02 HD", id: "424911", categoria: "Futebol", status: "nao-validada" },
  { nome: "CAZE TV 03 FHD", id: "424912", categoria: "Futebol", status: "nao-validada" },
  { nome: "CAZE TV 03 HD", id: "424913", categoria: "Futebol", status: "nao-validada" },
  { nome: "CAZE TV 04 FHD", id: "424914", categoria: "Futebol", status: "nao-validada" },
  { nome: "CAZE TV 04 HD", id: "424915", categoria: "Futebol", status: "nao-validada" },
  { nome: "PRIME VIDEO 01 FHD", id: "424933", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 01 HD", id: "424934", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 02 FHD", id: "424935", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 02 HD", id: "424936", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 03 FHD", id: "424937", categoria: "Streaming (futebol eventual)", status: "valida" },
  { nome: "PRIME VIDEO 03 HD", id: "424938", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 04 FHD", id: "424939", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 04 HD", id: "424940", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 05 FHD", id: "424941", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 05 HD", id: "424942", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 06 FHD", id: "424943", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 06 HD", id: "424944", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 07 FHD", id: "424945", categoria: "Streaming (futebol eventual)", status: "valida" },
  { nome: "PRIME VIDEO 07 HD", id: "424946", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 08 FHD", id: "424947", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 08 HD", id: "424948", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 09 FHD", id: "424949", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "PRIME VIDEO 09 HD", id: "424950", categoria: "Streaming (futebol eventual)", status: "nao-validada" },
  { nome: "SPORTYNET 01 FHD", id: "424951", categoria: "Futebol", status: "valida" },
  { nome: "SPORTYNET 01 HD", id: "424952", categoria: "Futebol", status: "valida" },
  { nome: "SPORTYNET 02 FHD", id: "424953", categoria: "Futebol", status: "nao-validada" },
  { nome: "SPORTYNET 02 HD", id: "424954", categoria: "Futebol", status: "nao-validada" },
  { nome: "SPORTYNET 03 FHD", id: "424955", categoria: "Futebol", status: "valida" },
  { nome: "SPORTYNET 03 HD", id: "424956", categoria: "Futebol", status: "nao-validada" },
  { nome: "SPORTYNET 04 FHD", id: "424957", categoria: "Futebol", status: "valida" },
  { nome: "SPORTYNET 04 HD", id: "424958", categoria: "Futebol", status: "nao-validada" },
  { nome: "GE TV FHD", id: "424960", categoria: "Futebol", status: "em-uso" },
  { nome: "GE TV HD", id: "424961", categoria: "Futebol", status: "em-uso" },
  { nome: "GE TV SD", id: "424962", categoria: "Futebol", status: "valida" },
  { nome: "Globo Amazonica Manaus HD", id: "426186", categoria: "TV aberta (futebol eventual)", status: "valida" },
  { nome: "Globo Amazonica RO Ariquemes HD", id: "426187", categoria: "TV aberta (futebol eventual)", status: "valida" },
  { nome: "Globo Amazonica RO FHD", id: "426188", categoria: "TV aberta (futebol eventual)", status: "valida" },
  { nome: "Globo TV Porto Velho HD", id: "426333", categoria: "TV aberta (futebol eventual)", status: "valida" },
  { nome: "Band Sports 4K", id: "426371", categoria: "Futebol", status: "valida" },
  { nome: "Combate 4K", id: "426374", categoria: "Lutas", status: "nao-validada" },
  { nome: "Premiere 2 4K", id: "426396", categoria: "Futebol", status: "nao-validada" },
  { nome: "Premiere Clubes 4K", id: "426397", categoria: "Futebol", status: "valida" },
  { nome: "SporTV 2 4K", id: "426402", categoria: "Futebol", status: "valida" },
  { nome: "SporTV 3 4K", id: "426403", categoria: "Futebol", status: "valida" },
  { nome: "SporTV 4K", id: "426405", categoria: "Futebol", status: "valida" },
  { nome: "Paramount+ 01", id: "430486", categoria: "Futebol", status: "valida" },
  { nome: "Paramount+ 02", id: "430487", categoria: "Futebol", status: "em-uso" },
  { nome: "Paramount+ 03", id: "430488", categoria: "Futebol", status: "valida" },
  { nome: "Paramount+ 04", id: "430489", categoria: "Futebol", status: "valida" },
  { nome: "Paramount+ 05", id: "430490", categoria: "Futebol", status: "valida" },
];

export function getCanalById(id: string): CanalEsportivo | undefined {
  return canaisEsportivos.find((c) => c.id === id);
}

export function getCanalValidado(nome: string): CanalEsportivo | undefined {
  const n = nome.toLowerCase();
  return canaisEsportivos.find((c) => c.nome.toLowerCase() === n && (c.status === "valida" || c.status === "em-uso"));
}

export interface MatchChannelRef {
  nome: string;
  url: string;
}

/**
 * Monta o `canais[]` de um jogo a partir de nomes de canais confirmados.
 * REGRA DEFINITIVA: basta o canal existir na lista IPTV oficial e a
 * transmissão do jogo estar confirmada. Teste momentâneo de disponibilidade
 * NÃO é requisito (streams podem cair e voltar).
 * Retorna canais com status "valida" ou "em-uso"; "nao-validada"
 * (referência inexistente/quebrada) e nomes inexistentes são ignorados.
 */
export function montarCanais(nomes: string[]): MatchChannelRef[] {
  const out: MatchChannelRef[] = [];
  for (const nome of nomes) {
    if (typeof nome !== 'string' || nome.trim() === '') continue;
    const canal = canaisEsportivos.find(
      (c) =>
        c.nome.toLowerCase() === nome.toLowerCase() &&
        (c.status === 'valida' || c.status === 'em-uso')
    );
    if (!canal || !/^\d{1,6}$/.test(canal.id)) continue;
    out.push({ nome: canal.nome, url: `/api/stream?ch=${canal.id}` });
  }
  return out;
}