import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsappButton } from '../ui/WhatsappButton';
import { ConfidentialityModal } from '../ui/ConfidentialityModal';

export function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FDF6E3] via-white/50 to-[#E5F6F0] dark:from-gray-900 dark:via-gray-900/40 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-sans transition-all duration-300">
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
