import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: 'Startti: Agentes IA Autónomos para tu empresa',
    cuerpo: '',
    senderEmail: 'manuel@startti.co',
    senderName: 'Manuel - Startti',
    linkedinUrl: 'https://www.linkedin.com/in/manuel-bedoya-9a1727187',
    gmailApiKey: '',
    // Checkboxes para secciones opcionales
    showTeam: false,
    showCasosExito: false,
    showSalud: false,
    showAgricultura: false,
    showComputerVision: false,
    showAnalytica: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('✅ Email enviado exitosamente!');
        // Solo limpiar los campos del destinatario, mantener datos del remitente
        setFormData({
          ...formData,
          nombre: '',
          email: '',
          cuerpo: ''
        });
      } else {
        setMessage('❌ Error: ' + result.error);
      }
    } catch (error) {
      setMessage('❌ Error enviando email: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img 
          src="https://i.imgur.com/RnoXoJm.png" 
          alt="Startti Logo" 
          style={{ height: '50px', marginBottom: '20px' }}
        />
        <h1 style={{ color: '#0e0e0eff', fontSize: '32px', fontWeight: '600' }}>
          Startti Email Sender - Clientes
        </h1>
       
        <div style={{ marginTop: '20px' }}>
          <span style={{ 
            backgroundColor: '#0e0e0eff',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '6px',
            marginRight: '16px'
          }}>
            Email Clientes
          </span>
          <a href="/developers" style={{ 
            color: '#0e0e0eff', 
            textDecoration: 'none',
            backgroundColor: '#f8f9fa',
            padding: '8px 16px',
            borderRadius: '6px'
          }}>
            Email Desarrolladores →
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ 
        background: '#fcfcfb',
        padding: '40px',
        borderRadius: '16px',
        border: '2px solid #f3f4f6'
      }}>
        <h3 style={{ color: '#0e0e0eff', marginBottom: '24px', fontSize: '20px' }}>
          Configuración del Remitente
        </h3>
        
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '600',
            color: '#0e0e0eff'
          }}>
            Tu Email (Gmail):
          </label>
          <input
            type="email"
            name="senderEmail"
            value={formData.senderEmail}
            onChange={handleChange}
            required
            placeholder="Ej: tu@startti.co"
            style={{ 
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '600',
            color: '#0e0e0eff'
          }}>
            Tu Nombre:
          </label>
          <input
            type="text"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            required
            placeholder="Ej: Manuel - Startti"
            style={{ 
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '600',
            color: '#0e0e0eff'
          }}>
            Tu LinkedIn URL:
          </label>
          <input
            type="url"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
            required
            placeholder="Ej: https://www.linkedin.com/in/tu-perfil"
            style={{ 
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '600',
            color: '#0e0e0eff'
          }}>
            Gmail App Password:
          </label>
          <input
            type="password"
            name="gmailApiKey"
            value={formData.gmailApiKey}
            onChange={handleChange}
            required
            placeholder="Ej: abcd efgh ijkl mnop"
            style={{ 
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          <small style={{ color: '#666', fontSize: '14px' }}>
            Genera tu App Password en: <a href="https://myaccount.google.com/apppasswords" target="_blank" style={{color: '#0e0e0eff'}}>myaccount.google.com/apppasswords</a>
          </small>
        </div>

        <hr style={{ margin: '32px 0', border: '1px solid #f3f4f6' }} />

        <h3 style={{ color: '#0e0e0eff', marginBottom: '24px', fontSize: '20px' }}>
          Secciones Opcionales a Mostrar
        </h3>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '16px', 
          marginBottom: '32px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '16px',
            fontWeight: '500',
            color: '#0e0e0eff'
          }}>
            <input
              type="checkbox"
              name="showTeam"
              checked={formData.showTeam}
              onChange={handleChange}
              style={{ marginRight: '8px', transform: 'scale(1.2)' }}
            />
            Mostrar Equipo
          </label>

          <label style={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '16px',
            fontWeight: '500',
            color: '#0e0e0eff'
          }}>
            <input
              type="checkbox"
              name="showCasosExito"
              checked={formData.showCasosExito}
              onChange={handleChange}
              style={{ marginRight: '8px', transform: 'scale(1.2)' }}
            />
            Casos de Éxito
          </label>

          <label style={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '16px',
            fontWeight: '500',
            color: '#0e0e0eff'
          }}>
            <input
              type="checkbox"
              name="showSalud"
              checked={formData.showSalud}
              onChange={handleChange}
              style={{ marginRight: '8px', transform: 'scale(1.2)' }}
            />
            Experiencia en Salud
          </label>

          <label style={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '16px',
            fontWeight: '500',
            color: '#0e0e0eff'
          }}>
            <input
              type="checkbox"
              name="showAgricultura"
              checked={formData.showAgricultura}
              onChange={handleChange}
              style={{ marginRight: '8px', transform: 'scale(1.2)' }}
            />
            Agricultura Inteligente
          </label>

          <label style={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '16px',
            fontWeight: '500',
            color: '#0e0e0eff'
          }}>
            <input
              type="checkbox"
              name="showComputerVision"
              checked={formData.showComputerVision}
              onChange={handleChange}
              style={{ marginRight: '8px', transform: 'scale(1.2)' }}
            />
            Computer Vision
          </label>

          <label style={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '16px',
            fontWeight: '500',
            color: '#0e0e0eff'
          }}>
            <input
              type="checkbox"
              name="showAnalytica"
              checked={formData.showAnalytica}
              onChange={handleChange}
              style={{ marginRight: '8px', transform: 'scale(1.2)' }}
            />
            IA + Analítica de Datos
          </label>
        </div>

        <hr style={{ margin: '32px 0', border: '1px solid #f3f4f6' }} />

        <h3 style={{ color: '#0e0e0eff', marginBottom: '24px', fontSize: '20px' }}>
          Email a Enviar
        </h3>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '600',
            color: '#0e0e0eff'
          }}>
            Nombre del Destinatario:
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ej: Juan Pérez"
            style={{ 
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '600',
            color: '#0e0e0eff'
          }}>
            Email del Destinatario:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Ej: juan@empresa.com"
            style={{ 
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '600',
            color: '#0e0e0eff'
          }}>
            Asunto del Email:
          </label>
          <input
            type="text"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            required
            placeholder="Ej: Startti: Agentes IA para tu empresa"
            style={{ 
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '600',
            color: '#0e0e0eff'
          }}>
            Cuerpo del Email:
          </label>
          <textarea
            name="cuerpo"
            value={formData.cuerpo}
            onChange={handleChange}
            required
            placeholder="Escribe aquí el contenido personalizado del email..."
            rows="10"
            style={{ 
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              fontFamily: 'inherit',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
          <div style={{ 
            marginTop: '8px', 
            padding: '12px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '6px',
            fontSize: '14px',
            color: '#666'
          }}>
            <strong>Markdown soportado:</strong> 
            <code>**negrita**</code>, 
            <code>*cursiva*</code>, 
            <code>[enlace](url)</code>, 
            <code>- listas</code>, 
            <code># títulos</code>
            <br />
            <em>También puedes pegar HTML directamente si copias desde un email.</em>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ 
            width: '100%',
            padding: '16px',
            background: loading ? '#ccc' : '#0e0e0eff',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s ease'
          }}
        >
          {loading ? 'Enviando...' : 'Enviar Email'}
        </button>

        {message && (
          <div style={{ 
            marginTop: '20px',
            padding: '16px',
            borderRadius: '8px',
            background: message.includes('✅') ? '#d4edda' : '#f8d7da',
            color: message.includes('✅') ? '#155724' : '#721c24',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            {message}
          </div>
        )}
      </form>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px',
        color: '#666',
        fontSize: '14px'
      }}>
        
      </div>
    </div>
  );
}