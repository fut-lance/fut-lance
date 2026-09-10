'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * CookieConsent - Banner de consentimento de cookies
 *
 * Exibe um aviso discreto sobre o uso de cookies no site.
 * O banner não bloqueia o site e permite que o usuário aceite ou rejeite.
 * Armazena a preferência no localStorage.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('fut-lance-cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('fut-lance-cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('fut-lance-cookie-consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="bg-fut-darker border border-gray-700 rounded-2xl shadow-2xl shadow-black/50 max-w-4xl mx-auto overflow-hidden">
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-0.5">🍪</span>
            <div className="flex-1">
              <h3 className="text-white font-bold text-base mb-2">
                Uso de Cookies
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência de navegação,
                personalizar conteúdo e exibir publicidade relevante. Alguns cookies são essenciais
                para o funcionamento do site, enquanto outros são utilizados para análise e publicidade.
              </p>
              <p className="text-gray-500 text-xs">
                Ao continuar navegando, você concorda com o uso de cookies.
                Consulte nossa{' '}
                <Link href="/politica-de-cookies" className="text-fut-green hover:underline" target="_blank">
                  Política de Cookies
                </Link>{' '}
                para mais informações.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={handleAccept}
              className="bg-fut-green hover:bg-green-600 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Aceitar Todos
            </button>
            <button
              onClick={handleReject}
              className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Rejeitar Não-Essenciais
            </button>
            <Link
              href="/politica-de-cookies"
              className="text-gray-500 hover:text-fut-green text-xs transition-colors ml-auto"
            >
              Saiba mais
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
