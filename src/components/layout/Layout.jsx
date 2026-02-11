import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsappButton } from '../ui/WhatsappButton';
import { ConfidentialityModal } from '../ui/ConfidentialityModal';

export function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
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
