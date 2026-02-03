import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsappButton() {
    // Número e mensagem pré-definidos
    // Substitua o telefone abaixo pelo número real da tesouraria
    const phoneNumber = "5521980059430";
    const message = encodeURIComponent("Olá! Acessei o Portal de Transparência e gostaria de tirar uma dúvida.");

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50 flex items-center gap-2 group print:hidden"
            title="Fale com a Tesouraria"
        >
            <MessageCircle size={28} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-semibold">
                Fale com a Tesouraria
            </span>
        </a>
    );
}
