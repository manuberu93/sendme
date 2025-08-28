import nodemailer from 'nodemailer';

// Template HTML con imagen a la izquierda y desarrolladores
const getEmailTemplate = (nombre, cuerpo, senderName, senderEmail, linkedinUrl) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Startti - Desarrolladores</title>
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
        .team-section {
            background: #ffffff;
            padding: 32px;
            border-radius: 12px;
            margin: 32px 0;
            border: 2px solid #e5e7eb;
        }
        .team-intro {
            text-align: center;
            margin-bottom: 24px;
        }
        .team-intro h3 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
            color: #0e0e0eff;
        }
        .team-intro p {
            font-size: 16px;
            color: #666;
            margin: 0;
        }
        .team-content {
            display: block;
            margin-top: 24px;
        }
        .member-card-with-image {
            display: flex;
            gap: 20px;
            background: #fcfcfb;
            padding: 16px;
            border-radius: 8px;
            border: 2px solid #000000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            align-items: flex-start;
            margin-bottom: 16px;
            width: 100%;
            box-sizing: border-box;
        }
        .developer-image {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
            flex-shrink: 0;
        }
        .member-info {
        margin-left: 15px;
            flex: 1;
            padding-top: 4px;
        }
        .member-info h4 {
            font-size: 22px;
            font-weight: 700;
            margin: 0 0 4px 0;
            color: #0e0e0eff;
            line-height: 1.2;
        }
        .member-info .title {
            font-size: 14px;
            font-weight: 600;
            color: #666;
            margin-bottom: 8px;
        }
        .member-info p {
            font-size: 13px;
            margin: 0;
            color: #555;
            line-height: 1.4;
        }
        .experience-highlights {
    background: #f8f9fa;
    padding: 24px;
    border-radius: 8px;
    
    margin-top: 24px;
    border: 1px solid #e5e7eb;
}
.experience-highlights h4 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 20px 0;
    color: #0e0e0eff;
    text-align: center;
}
.highlights-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
    gap: 100px;
}

.highlight-item {
    text-align: center;
    min-width: 200px;
    background: #ffffff;
    padding: 24px 20px;
    border-radius: 12px;
    border: 2px solid #0e0e0eff;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
.highlight-item .number {
    font-size: 32px;
    font-weight: 800;
    color: #0e0e0eff;
    display: block;
    margin-bottom: 8px;
}
.highlight-item .text {
    font-size: 14px;
    color: #555;
    margin-top: 4px;
    line-height: 1.3;
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
            font-size: 19px;
        }
        li {
            font-size: 19px;
            margin-bottom: 8px;
        }
        @media (max-width: 700px) {
            .member-card-with-image {
                gap: 10px;
                padding: 12px;
            }
            .developer-image {
                width: 80px;
                height: 80px;
            }
            .member-info h4 {
                font-size: 18px;
            }
            .highlights-grid {
                flex-direction: column;
                gap: 12px;
            }
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

        <div class="team-section">
            <div class="team-intro">
                <h3>Un equipo con amplia experiencia en IA aplicada</h3>
                <p>Socios estratégicos: Google Latam & Boostart</p>
            </div>
            
            <div class="team-content">
                <div class="member-card-with-image">
                    <img src="https://i.imgur.com/xjJvrJn.png" alt="Daniel García" class="developer-image" />
                    <div class="member-info">
                        <h4>Daniel García</h4>
                        <div class="title">PhD en Ingeniería</div>
                        <p>Más de 7 años de experiencia como Data Scientist, colaborando con empresas globales en desarrollos de productos de IA.</p>
                    </div>
                </div>
                
                <div class="member-card-with-image">
                    <img src="https://i.imgur.com/G0d3xoR.png" alt="Julián Caicedo" class="developer-image" />
                    <div class="member-info">
                        <h4>Julián Caicedo</h4>
                        <div class="title">PhD en Ingeniería</div>
                        <p>Más de 7 años desarrollando sistemas de IA como Data Scientist y Head of Data Scientist y Software development.</p>
                    </div>
                </div>
                
                <div class="member-card-with-image">
                    <img src="https://i.imgur.com/7QBwDI1.png" alt="David Luna" class="developer-image" />
                    <div class="member-info">
                        <h4>David Luna</h4>
                        <div class="title">PhD en Ingeniería</div>
                        <p>Más de 7 años en roles como Data Scientist, Machine Learning Engineer y Backend Developer.</p>
                    </div>
                </div>
            </div>

          <div class="experience-highlights">
  <h4>Experiencia Combinada del Equipo</h4>
  <ul style="list-style: none; padding: 0; margin: 20px auto; max-width: 600px; font-size: 17px; line-height: 1.8; color: #333;">
    <li style="margin-bottom: 16px; text-align: center;">
      <strong style="font-size: 22px; color: #000;">+30</strong> años acumulados en automatización, IA y tecnología
    </li>
    <li style="margin-bottom: 16px; text-align: center;">
      <strong style="font-size: 22px; color: #000;">+10</strong> proyectos de IA implementados en empresas globales
    </li>
    <li style="margin-bottom: 16px; text-align: center;">
      <strong style="font-size: 22px; color: #000;">+5</strong> industrias transformadas con soluciones de IA
    </li>
  </ul>
</div>



            </div>
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
      subject: `Startti: Conoce nuestro equipo experto en IA`,
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