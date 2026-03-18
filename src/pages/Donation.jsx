import React, { useState } from 'react';

export function Donation() {
    const [copied, setCopied] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const pixKey = "vilapinheiro.pix.arj@adventistas.org";

    const handleCopyPix = () => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(pixKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = pixKey;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            document.body.appendChild(textArea); 
            textArea.focus();
            textArea.select();
            try {
                document.execCommand("copy");
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            } catch (err) {
                console.error("Erro ao copiar: ", err);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[75vh] text-center px-4 py-8 overflow-hidden">
            
            {/* 🌌 Esferas de Luz no Fundo (Efeito Ambient Glow) */}
            <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-green-400 dark:bg-green-500/30 rounded-full filter blur-[100px] opacity-20 animate-pulse -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400 dark:bg-blue-600/30 rounded-full filter blur-[120px] opacity-25 animate-pulse delay-1000 -z-10"></div>

            <div className="z-10 flex flex-col items-center">
                {/* 🎨 Texto com Gradiente Moderno */}
                <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-blue-500 to-blue-700 bg-clip-text text-transparent mb-4 tracking-tight animate-fade-in">
                    Contribua com a Nossa Missão
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8 leading-relaxed text-sm md:text-base font-medium">
                    Sua fidelidade é a semente de novas histórias de fé. Escolha como quer ajudar:
                </p>
                
                {/* 🪟 Card Glassmorphism (Efeito Vidro) */}
                <div className="group relative bg-white/80 dark:bg-gray-800/60 backdrop-blur-md p-4 md:p-6 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.08)] dark:shadow-[0_20px_50px_rgba(0,_0,_0,_0.3)] border border-white/40 dark:border-gray-700/30 max-w-3xl w-full transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
                    
                    {!imageLoaded && (
                        <div className="absolute inset-4 md:inset-6 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse flex items-center justify-center min-h-[300px]">
                            <span className="text-gray-400 dark:text-gray-500 text-sm">Carregando imagem...</span>
                        </div>
                    )}

                    <img 
                        src="/iasdd.jpg" 
                        alt="QR Code Pix e 7me" 
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-auto rounded-2xl select-none group-hover:opacity-95 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute h-0 w-0'}`}
                    />
                </div>
                
                {/* ⚡ Botões de Ação com Layout Moderno */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                    <button 
                        onClick={handleCopyPix}
                        className="relative group bg-[#4FD1C5] hover:bg-[#38B2AC] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-200 dark:shadow-teal-900/30 flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
                        title="Clique para copiar a chave Pix"
                    >
                        <span className={`${copied ? 'hidden' : 'group-hover:hidden'} transition-all duration-300`}>📋 Copiar Chave Pix</span>
                        <span className={`${copied ? 'inline' : 'hidden group-hover:inline'} text-[11px] md:text-xs font-mono font-semibold tracking-wider animate-fade-in`}>{pixKey}</span>
                        {copied && (
                            <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-md animate-bounce">
                                Copiado! 🚀
                            </span>
                        )}
                    </button>

                    <a 
                        href="https://home.7me.app/port/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#315A7A] hover:bg-[#254661] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg border border-transparent hover:border-gray-100 dark:hover:border-gray-700 flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
                        title="Ir para download do 7me"
                    >
                        📲 Abrir App 7me
                    </a>
                </div>

                {/* 🛡️ Legenda com Ping animado */}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-8 flex items-center gap-1.5 select-none">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Transferência 100% segura para a Tesouraria.
                </p>
            </div>
        </div>
    );
}
