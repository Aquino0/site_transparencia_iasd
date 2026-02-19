import React, { useEffect, useRef, useState } from 'react';

export function HeroSequence({ children, className = '' }) {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const frameRef = useRef(0);
    const requestRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const totalFrames = 80;

    useEffect(() => {
        let isMounted = true;

        const loadImages = async () => {
            const promises = [];
            for (let i = 0; i < totalFrames; i++) {
                promises.push(new Promise((resolve) => {
                    const img = new Image();
                    const paddedIndex = String(i).padStart(3, '0');
                    img.src = `/hero-sequence/Loop_suave_movimento_1080p_202602191948_${paddedIndex}.jpg`;
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null);
                }));
            }

            const loadedImages = await Promise.all(promises);

            if (isMounted) {
                imagesRef.current = loadedImages.filter(img => img !== null);
                if (imagesRef.current.length > 0) {
                    setIsLoaded(true);
                    startAnimation();
                }
            }
        };

        loadImages();

        return () => {
            isMounted = false;
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const startAnimation = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });

        // Define canvas resolution keeping 16:9 ratio
        canvas.width = 1920;
        canvas.height = 1080;

        let lastTime = 0;
        const fpsInterval = 1000 / 30; // 30 FPS para movimento suave

        const animate = (time) => {
            if (!lastTime) lastTime = time;
            const elapsed = time - lastTime;

            if (elapsed > fpsInterval && canvasRef.current) {
                lastTime = time - (elapsed % fpsInterval);

                const img = imagesRef.current[frameRef.current];
                if (img) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
                frameRef.current = (frameRef.current + 1) % imagesRef.current.length;
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
    };

    return (
        <div className={`relative overflow-hidden bg-gray-900 ${className}`}>
            {!isLoaded && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/header-bg.png')" }}
                />
            )}
            <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            {/* Overlay Escuro para Legibilidade */}
            <div className="absolute inset-0 bg-black/60 md:bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}
