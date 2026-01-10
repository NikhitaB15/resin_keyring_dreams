import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Check, AlertCircle, Info, X } from 'lucide-react';

const Toast = () => {
    const { toast, hideToast } = useStore();

    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                hideToast();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.show, hideToast]);

    if (!toast.show) return null;

    const getIcon = () => {
        switch (toast.type) {
            case 'success': return <Check size={20} />;
            case 'error': return <AlertCircle size={20} />;
            case 'info': return <Info size={20} />;
            default: return <Info size={20} />;
        }
    };

    const getColors = () => {
        switch (toast.type) {
            case 'success': return { bg: '#4ade80', text: '#064e3b' };
            case 'error': return { bg: '#f87171', text: '#7f1d1d' };
            case 'info': return { bg: '#60a5fa', text: '#1e3a8a' };
            default: return { bg: '#333', text: '#fff' };
        }
    };

    const colors = getColors();

    return (
        <div className="toast-container" style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${colors.bg}`,
            animation: 'slideInFromRight 0.3s ease',
            maxWidth: '350px'
        }}>
            <div style={{ color: colors.bg, display: 'flex' }}>
                {getIcon()}
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</p>
            <button
                onClick={hideToast}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    marginLeft: '8px',
                    opacity: 0.5
                }}
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
