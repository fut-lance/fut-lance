# -*- coding: utf-8 -*-
"""Helper IndexNow — FUT-LANCE.

Uso nos scripts de publicação, SOMENTE após CREATE confirmado no Strapi
(HTTP 200/201 + id válido retornado):

    from indexnow_notify import notificar
    ...
    notificar('https://fut-lance.vercel.app/noticias/<slug>')

Regras:
- Dispara apenas em CREATE (chamar só após POST bem-sucedido).
- NUNCA em update, verificação, rascunho ou falha.
- Anti-duplicação por execução via set() em memória.
- Erro do IndexNow NUNCA propaga exceção: só registra e retorna dict.
- Não inventa endpoint/chave/URL: usa a rota e chave já existentes.
"""
import json
import os
import sys
import urllib.request

INDEXNOW_ROUTE = 'https://fut-lance.vercel.app/api/indexnow'
LOG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'indexnow_log.txt')

_enviadas = set()


def _log(msg):
    try:
        with open(LOG_FILE, 'a', encoding='utf-8') as f:
            f.write(msg + '\n')
    except Exception:
        pass
    print(msg)


def notificar(url, timeout=30):
    """Envia URL ao IndexNow. Retorna dict, nunca levanta exceção."""
    if not url or not isinstance(url, str) or not url.startswith('http'):
        _log(f'[IndexNow] SKIP url invalida: {url!r}')
        return {'ok': False, 'skipped': True, 'reason': 'url-invalida'}
    if url in _enviadas:
        _log(f'[IndexNow] SKIP duplicada na execucao: {url}')
        return {'ok': False, 'skipped': True, 'reason': 'duplicada'}
    try:
        body = json.dumps({'url': url}).encode('utf-8')
        req = urllib.request.Request(
            INDEXNOW_ROUTE, data=body,
            headers={'Content-Type': 'application/json'}, method='POST')
        resp = urllib.request.urlopen(req, timeout=timeout)
        payload = resp.read().decode('utf-8', 'replace')[:300]
        _enviadas.add(url)
        _log(f'[IndexNow] OK {resp.status} {url} -> {payload}')
        return {'ok': True, 'status': resp.status}
    except Exception as e:
        _log(f'[IndexNow] ERRO (nao bloqueante) {url}: {str(e)[:150]}')
        return {'ok': False, 'error': str(e)[:150]}


if __name__ == '__main__':
    # Teste controlado: 1 URL real publicada + 1 inválida. Nada é publicado aqui.
    print(notificar('https://fut-lance.vercel.app/noticias/morre-sandro-mazzola-inter-83-anos'))
    print(notificar('https://fut-lance.vercel.app/noticias/morre-sandro-mazzola-inter-83-anos'))
    print(notificar(''))
    print(notificar('nota-url-inexistente'))
