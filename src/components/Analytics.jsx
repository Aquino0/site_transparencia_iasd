import { useEffect } from 'react';

export function Analytics() {
    useEffect(() => {
        const gaId = import.meta.env.VITE_GA_ID;
        const pixelId = import.meta.env.VITE_PIXEL_ID;

        // 1. Google Analytics (GA4)
        if (gaId && !document.getElementById('ga-script')) {
            // Cria o script da tag global
            const scriptTag = document.createElement('script');
            scriptTag.id = 'ga-script';
            scriptTag.async = true;
            scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
            document.head.appendChild(scriptTag);

            // Código de inicialização
            const scriptInline = document.createElement('script');
            scriptInline.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
            `;
            document.head.appendChild(scriptInline);
            console.log('Google Analytics carregado com ID:', gaId);
        }

        // 2. Meta Pixel (Facebook)
        if (pixelId && !document.getElementById('fb-pixel')) {
            const scriptInline = document.createElement('script');
            scriptInline.id = 'fb-pixel';
            scriptInline.innerHTML = `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
            `;
            document.head.appendChild(scriptInline);

            // Noscript fallback
            const noscriptTag = document.createElement('noscript');
            const imgTag = document.createElement('img');
            imgTag.height = 1;
            imgTag.width = 1;
            imgTag.style.display = 'none';
            imgTag.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
            noscriptTag.appendChild(imgTag);
            document.body.appendChild(noscriptTag);

            console.log('Meta Pixel carregado com ID:', pixelId);
        }

    }, []);

    return null; // Componente sem renderização
}
