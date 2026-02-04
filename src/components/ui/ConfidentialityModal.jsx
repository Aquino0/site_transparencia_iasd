import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

export function ConfidentialityModal() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasAgreed = localStorage.getItem('confidentiality_agreed');
        if (!hasAgreed) {
            setIsVisible(true);
        }
    }, []);

    const handleAgree = () => {
        localStorage.setItem('confidentiality_agreed', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 text-center border-t-4 border-blue-900">
                <div className="mx-auto bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Lock size={32} className="text-blue-900" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    AVISO DE CONFIDENCIALIDADE
                </h2>

                <div className="text-gray-600 mb-8 space-y-4 text-left bg-gray-50 p-4 rounded-lg text-sm border border-gray-100">
                    <p>
                        As informações financeiras contidas neste portal são de caráter <strong className="text-gray-900">restrito e confidencial</strong>, destinadas exclusivamente para prestação de contas aos membros da Igreja Adventista do Sétimo Dia - Vila Pinheiro.
                    </p>
                    <p>
                        É estritamente <strong className="text-red-700">proibida a reprodução, compartilhamento (prints) ou divulgação</strong> destes dados em redes sociais, grupos ou quaisquer meios públicos.
                    </p>
                </div>

                <button
                    onClick={handleAgree}
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 text-lg"
                >
                    Li e Concordo
                </button>
            </div>
        </div>
    );
}
