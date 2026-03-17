import React from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 py-6 mt-auto border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
                    
                    {/* Coluna 1: Citação */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-2">Compromisso com a Verdade</h3>
                        <p className="text-sm text-slate-400 max-w-sm mx-auto md:mx-0">
                            "Tudo o que fizerem, façam de todo o coração, como para o Senhor, e não para os homens."
                            <br />
                            <span className="italic mt-1 block">- Colossenses 3:23</span>
                        </p>
                    </div>

                    {/* Coluna 2: Redes Sociais */}
                    <div className="flex flex-col items-center">
                        <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider text-slate-200">
                            Conecte-se conosco
                        </h4>
                        <div className="flex items-center gap-4">
                            <a href="https://www.instagram.com/adventistas_vilapinheiro/" target="_blank" rel="noopener noreferrer" 
                               className="p-2.5 rounded-full bg-slate-800 hover:bg-[#E1306C] text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-md" title="Instagram">
                                <Instagram size={20} />
                            </a>

                            <a href="https://www.tiktok.com/@adventistas_vilapinheiro?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" 
                               className="p-2.5 rounded-full bg-slate-800 hover:bg-[#000000] border hover:border-pink-500 text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-md flex items-center justify-center p-[9.5px]" title="Tiktok">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                                </svg>
                            </a>

                            <a href="https://www.youtube.com/@AdventistaPinheiro" target="_blank" rel="noopener noreferrer" 
                               className="p-2.5 rounded-full bg-slate-800 hover:bg-[#FF0000] text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-md" title="Youtube">
                                <Youtube size={20} />
                            </a>

                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                               className="p-2.5 rounded-full bg-slate-800 hover:bg-[#1877F2] text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-md" title="Facebook">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Coluna 3: Copyright */}
                    <div className="md:text-right">
                        <p className="text-sm font-medium">
                            &copy; {currentYear} Adventistas - Vila Pinheiro.
                        </p>
                        <p className="text-xs text-slate-500 mt-1 max-w-xs md:ml-auto">
                            Garantindo a transparência e fidelidade na gestão dos recursos sagrados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
