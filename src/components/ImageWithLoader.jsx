import React, { useState } from 'react';

const ImageWithLoader = ({ src, alt, style, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div style={{ ...style, position: 'relative', overflow: 'hidden', background: '#f0f0f0' }} className={className}>
            {/* Placeholder / Blur Effect */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)',
                    backgroundSize: '200% 100%',
                    animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    opacity: isLoaded ? 0 : 1,
                    transition: 'opacity 0.5s ease',
                    zIndex: 1
                }}
            />

            {/* Actual Image */}
            <img
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    position: 'relative',
                    zIndex: 2
                }}
            />

            <style>{`
                @keyframes pulse {
                    0% { background-position-x: 100%; }
                    100% { background-position-x: -100%; }
                }
            `}</style>
        </div>
    );
};

export default ImageWithLoader;
