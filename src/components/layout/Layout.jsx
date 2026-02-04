import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsappButton } from '../ui/WhatsappButton';
import { ConfidentialityModal } from '../ui/ConfidentialityModal';

export function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
            <WhatsappButton />
            <ConfidentialityModal />
            <Footer />
        </div>
    );
}
