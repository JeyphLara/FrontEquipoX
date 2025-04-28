import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={estilos.overlay}>
            <div style={estilos.modal}>
                <button style={estilos.cerrar} onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

const estilos = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modal: {
        backgroundColor: '#1e1e2f',
        padding: '20px',
        borderRadius: '8px',
        position: 'relative' as 'relative',
        width: '400px',
        maxHeight: '90%',
        overflowY: 'auto' as 'auto'
    },
    cerrar: {
        position: 'absolute' as 'absolute',
        top: '10px',
        right: '10px',
        background: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '25px',
        height: '25px',
        cursor: 'pointer'
    }
};

export default Modal;
