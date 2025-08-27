const nodemailer = require('nodemailer');

// Template HTML dinámico
const getEmailTemplate = (nombre, cuerpo, senderName, senderEmail, linkedinUrl) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Startti</title>
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
            font-size: 19px;
        }
        .content-body {
            margin: 32px 0;
            font-size: 19px;
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
        .footer a {
            color: #0e0e0eff;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        ul {
            font-size: 18px;
        }
        li {
            font-size: 18px;
            margin-bottom: 8px;
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

        <h2>Hola ${nombre},</h2>
        
        <div class="content-body">
            ${cuerpo.replace(/\n/g, '<br>')}
        </div>

        <div class="footer">
            <p><strong><a href="${linkedinUrl}" target="_blank" style="color: #0e0e0eff; text-decoration: none;">${senderName}</a></strong><br>
            <a href="mailto:${senderEmail}">${senderEmail}</a><br>
            <a href="https://startti.ai">startti.ai</a></p>
            
            <p style="font-size: 18px; margin-top: 20px;">
                <em>"Crea, conecta y lanza agentes autónomos."</em>
            </p>
        </div>
    </div>
</body>
</html>
  `;
};

// Configuración de Gmail dinámica
const createTransporter = (senderEmail, gmailApiKey) => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: gmailApiKey
    }
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, email, cuerpo, senderEmail, senderName, linkedinUrl, gmailApiKey } = req.body;

  if (!nombre || !email || !cuerpo || !senderEmail || !senderName || !linkedinUrl || !gmailApiKey) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const transporter = createTransporter(senderEmail, gmailApiKey);
    const emailHtml = getEmailTemplate(nombre, cuerpo, senderName, senderEmail, linkedinUrl);

    const mailOptions = {
      from: {
        name: senderName,
        address: senderEmail
      },
      to: email,
      subject: `Startti: Agentes IA Autónomos para tu empresa`,
      html: emailHtml,
      headers: {
        'X-Priority': '2',
        'X-MSMail-Priority': 'High'
      }
    };

    const result = await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      success: true, 
      messageId: result.messageId,
      recipient: email 
    });
  } catch (error) {
    console.error('Error enviando email:', error);
    return res.status(500).json({ error: 'Error enviando email: ' + error.message });
  }
}