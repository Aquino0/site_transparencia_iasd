import React from 'react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-2">Compromisso com a Verdade</h3>
                        <p className="text-sm text-slate-400 max-w-md">
                            "Tudo o que fizerem, façam de todo o coração, como para o Senhor, e não para os homens."
                            <br />
                            <span className="italic mt-1 block">- Colossenses 3:23</span>
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm">
                            &copy; {currentYear} Igreja Adventista do Sétimo Dia - Vila Pinheiro.
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            Desenvolvido para garantir a transparência e fidelidade na gestão dos recursos sagrados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
