/**
 * Horários das partidas estão em Brasília (UTC-3, sem horário de verão).
 * Interpreta data (DD/MM/AAAA) + horário (HH:MM) sempre nesse fuso para que
 * o SSR (servidor em UTC) e o cliente concordem no status da partida.
 */
export function parseMatchDate(data: string, horario: string): Date {
  const [d, m, y] = data.split('/').map(Number);
  const [h, min] = horario.split(':').map(Number);
  const p = (n: number) => String(n).padStart(2, '0');
  return new Date(`${y}-${p(m)}-${p(d)}T${p(h)}:${p(min)}:00-03:00`);
}
