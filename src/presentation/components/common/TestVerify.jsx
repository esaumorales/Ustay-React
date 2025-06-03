import React, { useState } from 'react';

export default function TestVerify() {
  const [isVerified, setIsVerified] = useState(false);

  const handleClick = () => {
    setIsVerified(true);
    setTimeout(() => {
      setIsVerified(false);
      alert('Cerrar modal');
    }, 3000);
  };

  if (isVerified) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'white',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'fadeInScale 0.5s ease forwards',
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: '600', marginBottom: 24 }}>Iniciar Sesión</h1>
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 48,
            maxWidth: 320,
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#16a34a', // verde tailwind green-600
              borderRadius: '9999px',
              width: 64,
              height: 64,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
              animation: 'scaleUp 0.5s ease forwards',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: 32, height: 32, color: 'white' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p style={{ color: '#4b5563', textAlign: 'center' }}>Inicio de sesión verificada</p>
        </div>

        <style>{`
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes scaleUp {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleClick} style={{ padding: 10, fontSize: 18 }}>
        Simular login exitoso
      </button>
    </div>
  );
}
