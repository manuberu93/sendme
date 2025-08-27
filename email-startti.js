require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Configuración del transporter para Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'manuel@startti.co',
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
};

// Template HTML del email
const getEmailTemplate = (clienteData) => {
  const { saludo, nombre, cargo, empresa, email } = clienteData;
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Únete a la Revolución de la IA Autónoma con Startti</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #0e0e0eff;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fcfcfb;
        }
        .container {
            background: #fcfcfb;
            border-radius: 16px;
            padding: 48px;
            box-shadow: none;
            border: none;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 2px solid #f3f4f6;
            padding-bottom: 30px;
        }
        .logo {
            margin-bottom: 16px;
        }
        .subtitle {
            color: #0e0e0eff;
            font-size: 26px;
            font-weight: 400;
            max-width: 600px;
            margin: 0 auto;
        }
        .highlight {
            background: #fcfcfb;
            color: #0e0e0eff;
            padding: 32px;
            border-radius: 12px;
            margin: 32px 0;
            text-align: center;
        }
        .highlight h3 {
            margin-top: 0;
            font-size: 30px;
            font-weight: 600;
        }
        .highlight p {
            font-size: 26px;
            color: #0e0e0eff;
        }
        .benefit-card {
            background: #fcfcfb;
            padding: 24px;
            border-radius: 12px;
            border: 2px solid #0e0e0eff;
            margin-bottom: 20px;
        }
        .benefit-card h4 {
            color: #0e0e0eff;
            font-weight: 600;
            margin: 0 0 16px 0;
            font-size: 20px;
        }
        .benefit-card p {
            color: #0e0e0eff;
            margin: 0;
            font-size: 18px;
        }
        .perfect-moment {
            background: #fcfcfb;
            padding: 32px;
            border-radius: 12px;
            margin: 32px 0;
            border: 2px solid #0e0e0eff;
        }
        .perfect-moment h3 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 24px;
            text-align: center;
        }
        .moment-item {
            margin-bottom: 24px;
            padding: 20px;
            background: #ffffff;
            border-radius: 8px;
            border-left: 4px solid #0e0e0eff;
        }
        .moment-item h4 {
            color: #0e0e0eff;
            font-weight: 700;
            margin: 0 0 12px 0;
            font-size: 18px;
        }
        .moment-item ul {
            margin: 8px 0 0 0;
            padding-left: 20px;
        }
        .moment-item li {
            margin-bottom: 8px;
            font-size: 16px;
            color: #374151;
        }
        .moment-conclusion {
            background: #f8fafc;
            padding: 24px;
            border-radius: 8px;
            margin-top: 24px;
            border: 1px solid #e2e8f0;
        }
        .moment-conclusion p {
            margin: 0;
            font-size: 18px;
            font-weight: 500;
            color: #0e0e0eff;
            line-height: 1.6;
        }
        .team-info {
            background: #fcfcfb;
            padding: 24px;
            border-radius: 12px;
            margin: 32px 0;
            border: none;
        }
        .team-info h3 {
            font-size: 20px;
        }
        .team-info li {
            font-size: 18px;
            margin-bottom: 8px;
        }
        .testimonial {
            background: #fcfcfb;
            padding: 24px;
            border-radius: 12px;
            margin: 32px 0;
            border: none;
        }
        .testimonial h3 {
            font-size: 20px;
        }
        .testimonial p {
            font-size: 18px;
        }
        h2 {
            color: #0e0e0eff;
            font-weight: 600;
            font-size: 22px;
        }
        h3 {
            color: #0e0e0eff;
            font-weight: 600;
            font-size: 20px;
            margin-bottom: 16px;
        }
        p {
            color: #0e0e0eff;
            line-height: 1.7;
            font-size: 18px;
        }
        .footer {
            text-align: center;
            margin-top: 48px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
            color: #0e0e0eff;
        }
        .footer p {
            font-size: 18px;
        }
        ul {
            font-size: 18px;
        }
        li {
            font-size: 18px;
            margin-bottom: 8px;
        }
        .footer a {
            color: #0e0e0eff;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        .youtube-button {
            display: inline-block;
            background: #ffffff;
            color: #0e0e0eff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            border: 2px solid #0e0e0eff;
            font-weight: 600;
            font-size: 18px;
            transition: all 0.2s ease;
        }
        .youtube-button:hover {
            background: #0e0e0eff;
            color: #ffffff;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <img src="https://i.imgur.com/RnoXoJm.png" alt="Startti Logo" style="height: 50px; margin-bottom: 15px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div style="display: none; font-size: 28px; font-weight: bold; color: #000000;">STARTTI</div>
            </div>
            <div class="subtitle">Construye potentes agentes de IA y optimiza la operatividad de tu negocio</div>
        </div>

        <h2>${saludo} ${nombre},</h2>
        <p><strong>${cargo} de ${empresa}</strong></p>
        
        <p>Como ${cargo.toLowerCase()} de <strong>${empresa}</strong>, sabes que la automatización inteligente es el futuro. Te escribo porque Startti está transformando cómo las empresas implementan IA autónoma, y creo que podríamos crear algo extraordinario juntos.</p>

        <div class="highlight">
            <h3>¿Qué hace Startti?</h3>
            <p>Creamos agentes de IA. Hacemos automatización. Hacemos que tu empresa sea mejor.</p>
        </div>

        <div class="benefit-card">
            <h4>Liberas cargas de trabajo</h4>
            <p>Para tareas estratégicas de mayor valor</p>
        </div>
        
        <div class="benefit-card">
            <h4>Reduces costos</h4>
            <p>Maximiza la productividad de tus empleados</p>
        </div>
        
        <div class="benefit-card">
            <h4>Tomas mejores decisiones</h4>
            <p>Con análisis de datos en tiempo real</p>
        </div>
        
        <div class="benefit-card">
            <h4>Procesas información compleja</h4>
            <p>Que sería imposible manualmente</p>
        </div>
        
        <div class="benefit-card">
            <h4>Respondes más rápido</h4>
            <p>A situaciones críticas</p>
        </div>
        
        <div class="benefit-card">
            <h4>Eliminas errores</h4>
            <p>En análisis y procesos repetitivos</p>
        </div>

        <div class="perfect-moment">
            <h3>POR QUÉ ESTE ES EL MOMENTO PERFECTO:</h3>
            
           
                <p>La IA es la herramienta que te permite alcanzar lo imposible. <strong>Es tu ventaja competitiva para aumentar ingresos un 25-30%, reducir costos operativos hasta 40%, optimizar flujo de efectivo, mejorar márgenes de ganancia, eliminar cuellos de botella operacionales, y escalar tu negocio sin contratar más personal.</strong></p>
        </div>

        <div class="team-info">
            <h3>Equipo de Clase Mundial</h3>
            <p><strong>Nuestro equipo :</strong></p>
            <ul>
                <li><strong>CEO:</strong> PhD en Ingeniería + MSc Automatización, especialista en IA aplicada</li>
                <li><strong>CFO:</strong> Lorem ipsum dolor sit amet consectetur adipiscing elit</li>
                <li><strong>CSO:</strong> Ingeniera de Sistemas + Master en Administración, experta en proyectos TI</li>
                <li><strong>CIO:</strong> PhD en IA, Lorem ipsum dolor sit amet consectetur adipiscing elit</li>
            </ul>
            
            
        </div>

        <div class="testimonial">
            <h3>Testimonio Real</h3>
            <p><em>"Carlos Rodríguez, fundador de Escappy Travel, sobre cómo Startti ha transformado su negocio."</em></p>
            <p style="font-style: italic; color: #0e0e0eff;">- Testimonio destacado en startti.ai</p>
        </div>

        <h3>Casos de éxito</h3>
        <ul>
            <li><strong>Lorem ipsum dolor:</strong> Sit amet consectetur adipiscing elit sed do eiusmod</li>
            <li><strong>Tempor incididunt:</strong> Ut labore et dolore magna aliqua enim ad minim veniam</li>
            <li><strong>Quis nostrud:</strong> Exercitation ullamco laboris nisi ut aliquip ex ea commodo</li>
            <li><strong>Duis aute irure:</strong> Dolor in reprehenderit in voluptate velit esse cillum</li>
        </ul>

        <p><strong>¿Por qué ahora?</strong> Porque las empresas que adopten agentes autónomos primero tendrán una ventaja competitiva. ${empresa} puede estar en esa primera línea.</p>

        <p>Me encantaría explicarte en 15 minutos cómo nuestros agentes pueden transformar ${empresa}. ¿Tienes disponibilidad esta semana para una charla rápida?</p>

        <div class="footer">
            <p><strong>Manuel Bedoya Rudas</strong><br>
             Head of Revenue, Startti<br>
            manuel@startti.co<br>
            <a href="https://startti.ai/es" style="color: #0e0e0eff;">startti.ai/es</a></p>
            
            <p style="font-size: 18px; margin-top: 20px;">
                <em>"Crea, conecta y lanza agentes autónomos."</em>
            </p>
        </div>
    </div>
</body>
</html>
  `;
};

const sendInvitationEmail = async (clienteData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: {
      name: 'Manuel - Startti',
      address: 'manuel@startti.co'
    },
    to: clienteData.email,
    subject: `${clienteData.empresa}: Revoluciona tu Automatización con Agentes IA Autónomos | Startti`,
    html: getEmailTemplate(clienteData),
    headers: {
      'X-Priority': '2',
      'X-MSMail-Priority': 'High'
    }
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado exitosamente:', result.messageId);
    return {
      success: true,
      messageId: result.messageId,
      recipient: clienteData.email
    };
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

const sendBulkInvitations = async (clientesList, delayBetweenEmails = 5000) => {
  const results = [];
  
  for (let i = 0; i < clientesList.length; i++) {
    const cliente = clientesList[i];
    console.log(`📤 Enviando email ${i + 1}/${clientesList.length} a ${cliente.nombre} (${cliente.cargo} - ${cliente.empresa})`);
    
    const result = await sendInvitationEmail(cliente);
    results.push({ ...cliente, ...result });
    
    if (i < clientesList.length - 1) {
      console.log(`⏳ Esperando ${delayBetweenEmails/1000}s antes del próximo email...`);
      await new Promise(resolve => setTimeout(resolve, delayBetweenEmails));
    }
  }
  
  return results;
};

const main = async () => {
  if (!process.env.GMAIL_APP_PASSWORD) {
    console.error('❌ Error: Configura GMAIL_APP_PASSWORD en tus variables de entorno');
    return;
  }

  const targetClientes = [
    {
      saludo: 'Estimado',
      nombre: 'Julian',
      cargo: 'Ceo',
      empresa: 'Startti',
      email: 'julian@startti.ai'
    }
  ];

  console.log('🚀 Iniciando campaña de invitaciones Startti...\n');
  
  const results = await sendBulkInvitations(targetClientes, 3000);
  
  console.log('\n📊 REPORTE FINAL:');
  console.log('================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Enviados exitosamente: ${successful.length}`);
  console.log(`❌ Fallidos: ${failed.length}`);
  
  console.log('\n🎯 Próximos pasos:');
  console.log('1. Monitorear respuestas en manuel@startti.co');
  console.log('2. Hacer seguimiento en 3-5 días a no respondedores');
  console.log('3. Agendar demos con interesados');
};

module.exports = {
  sendInvitationEmail,
  sendBulkInvitations,
  getEmailTemplate,
  main
};

if (require.main === module) {
  main();
}