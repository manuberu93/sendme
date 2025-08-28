import nodemailer from 'nodemailer';

// Función para convertir markdown básico a HTML o pasar HTML directamente
const processContent = (text) => {
  // Si ya contiene HTML, lo devolvemos tal como está
  if (text.includes('<') && text.includes('>')) {
    return text;
  }
  
  // Si no, procesamos como markdown
  let html = text;
  
  // Títulos
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Negritas
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // Cursivas
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');
  
  // Enlaces
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: #0e0e0eff; text-decoration: underline;">$1</a>');
  
  // Listas
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  // Código inline
  html = html.replace(/`([^`]+)`/g, '<code style="background: #f1f1f1; padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>');
  
  // Saltos de línea
  html = html.replace(/\n/g, '<br>');
  
  return html;
};

// Template HTML dinámico con secciones opcionales
const getEmailTemplate = (nombre, cuerpo, senderName, senderEmail, linkedinUrl, options) => {
  const { showTeam, showCasosExito, showSalud, showAgricultura, showComputerVision, showAnalytica } = options;
  
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
        .content-body h1 {
            font-size: 28px;
            font-weight: 700;
            color: #0e0e0eff;
            margin: 24px 0 16px 0;
        }
        .content-body h2 {
            font-size: 24px;
            font-weight: 600;
            color: #0e0e0eff;
            margin: 20px 0 12px 0;
        }
        .content-body h3 {
            font-size: 20px;
            font-weight: 600;
            color: #0e0e0eff;
            margin: 16px 0 8px 0;
        }
        .content-body ul {
            margin: 16px 0;
            padding-left: 24px;
        }
        .content-body li {
            margin-bottom: 8px;
            font-size: 19px;
        }
        .content-body code {
            background: #f1f1f1;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 16px;
        }
        .content-body strong {
            font-weight: 700;
            color: #0e0e0eff;
        }
        .content-body em {
            font-style: italic;
        }
        .content-body a {
            color: #0e0e0eff;
            text-decoration: underline;
        }
        .section {
            background: #ffffff;
            padding: 32px;
            border-radius: 12px;
            margin: 32px 0;
            border: 2px solid #e5e7eb;
        }
        .section-intro {
            text-align: center;
            margin-bottom: 24px;
        }
        .section-intro h3 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
            color: #0e0e0eff;
        }
        .section-intro p {
            font-size: 16px;
            color: #666;
            margin: 0;
        }
        .section-content {
            display: block;
            margin-top: 24px;
        }
        .card-with-image {
            display: flex;
            gap: 30px;
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
        .card-image {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
            flex-shrink: 0;
        }
        .card-info {
            flex: 1;
            padding-top: 4px;
            margin-left: 5px;
        }
        .card-info h4 {
            font-size: 22px;
            font-weight: 700;
            margin: 0 0 4px 0;
            color: #0e0e0eff;
            line-height: 1.2;
        }
        .card-info .subtitle {
            font-size: 14px;
            font-weight: 600;
            color: #666;
            margin-bottom: 8px;
        }
        .card-info p {
            font-size: 13px;
            margin: 0;
            color: #555;
            line-height: 1.4;
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
            .card-with-image {
                gap: 15px;
                padding: 12px;
            }
            .card-image {
                width: 80px;
                height: 80px;
            }
            .card-info h4 {
                font-size: 18px;
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
            ${processContent(cuerpo)}
        </div>

        ${showTeam ? `
        <div class="section">
            <div class="section-intro">
                <h3>Un equipo con amplia experiencia en IA aplicada</h3>
                <p>Socios estratégicos: Google Latam & Boostart</p>
            </div>
            
            <div class="section-content">
                <div class="card-with-image">
                    <img src="https://i.imgur.com/xjJvrJn.png" alt="Daniel García" class="card-image" />
                    <div class="card-info">
                        <h4>Daniel García</h4>
                        <div class="subtitle">PhD en Ingeniería</div>
                        <p>Más de 7 años de experiencia como Data Scientist, colaborando con empresas globales en desarrollos de productos de IA.</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/G0d3xoR.png" alt="Julián Caicedo" class="card-image" />
                    <div class="card-info">
                        <h4>Julián Caicedo</h4>
                        <div class="subtitle">PhD en Ingeniería</div>
                        <p>Más de 7 años desarrollando sistemas de IA como Data Scientist y Head of Data Scientist y Software development.</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/7QBwDI1.png" alt="David Luna" class="card-image" />
                    <div class="card-info">
                        <h4>David Luna</h4>
                        <div class="subtitle">PhD en Ingeniería</div>
                        <p>Más de 7 años en roles como Data Scientist, Machine Learning Engineer y Backend Developer.</p>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        ${showCasosExito ? `
        <div class="section">
            <div class="section-intro">
                <h3>Casos de Éxito</h3>
                <p>Nuestros clientes han transformado sus negocios</p>
            </div>
            
            <div class="section-content">
                <div class="card-with-image">
                    <img src="https://i.imgur.com/lLyf7Dn.png" alt="Suprokom" class="card-image" />
                    <div class="card-info">
                        <h4>Suprokom</h4>
                        <div class="subtitle">Sector Ferretero</div>
                        <p>Impacto: +85% eficiencia operativa</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/0qS0nS3.png" alt="Maven" class="card-image" />
                    <div class="card-info">
                        <h4>Maven</h4>
                        <div class="subtitle">E-commerce - Make up</div>
                        <p>Impacto: 80% incremento en ventas</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/6vSC9AD.png" alt="Escappy" class="card-image" />
                    <div class="card-info">
                        <h4>Escappy</h4>
                        <div class="subtitle">Turismo</div>
                        <p>Impacto: +80% eficiencia operativa</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/4qw6HpZ.png" alt="Sumatec" class="card-image" />
                    <div class="card-info">
                        <h4>Sumatec</h4>
                        <div class="subtitle">Retail</div>
                        <p>Impacto: Automatización de data para toma de decisiones</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/yn5Ct92.png" alt="Aguas de Manizales" class="card-image" />
                    <div class="card-info">
                        <h4>Aguas de Manizales</h4>
                        <div class="subtitle">Gobierno</div>
                        <p> Impacto: +80% eficiencia operativa</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/KwkKLbf.png" alt="Alcaldía de Manizales" class="card-image" />
                    <div class="card-info">
                        <h4>Alcaldía de Manizales</h4>
                        <div class="subtitle">Smart Cities</div>
                        <p>Impacto: Automatización de procesos para toma de decisiones acelerada</p>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        ${showSalud ? `
        <div class="section">
            <div class="section-intro">
                <h3>Experiencia: IA en Salud</h3>
            </div>
            
            <div class="section-content">
                <div class="card-with-image">
                    <img src="https://i.imgur.com/COGYEHW.png" alt="Diagnóstico" class="card-image" />
                    <div class="card-info">
                        <h4>Diagnóstico Neuropatológico</h4>
                        <div class="subtitle">Visualización automática</div>
                        <p>Mejora en el tiempo de visualización y diagnóstico usando IA avanzada</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/rDF2hFS.png" alt="Nervios" class="card-image" />
                    <div class="card-info">
                        <h4>Segmentación de Nervios</h4>
                        <div class="subtitle">Procesamiento de imágenes</div>
                        <p>Mejora en calidad y rapidez de lectura del ultrasonido para intervenciones rápidas</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/QJOunMc.png" alt="Partos" class="card-image" />
                    <div class="card-info">
                        <h4>Algoritmo IA Térmicas</h4>
                        <div class="subtitle">Imágenes térmicas en partos</div>
                        <p>Mejora la calidad y seguridad de administración de anestesia en partos</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/LezRqRM.png" alt="Intención" class="card-image" />
                    <div class="card-info">
                        <h4>Detección de Intención</h4>
                        <div class="subtitle">Señales cerebrales</div>
                        <p>Posibilidad de ejecución de movimiento usando sólo las señales cerebrales</p>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        ${showAgricultura ? `
        <div class="section">
            <div class="section-intro">
                <h3>Experiencia: Agricultura Inteligente</h3>
            </div>
            
            <div class="section-content">
                <div class="card-with-image">
                    <img src="https://i.imgur.com/SCyVaoC.png" alt="Suelo" class="card-image" />
                    <div class="card-info">
                        <h4>Detección de Utilización de Suelo</h4>
                        <div class="subtitle">Automatización</div>
                        <p>Mejora el seguimiento y medición de lotes</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/O46NYbs.png" alt="Árboles" class="card-image" />
                    <div class="card-info">
                        <h4>Inventariado de Árboles</h4>
                        <div class="subtitle">Automatización</div>
                        <p>Permite el monitoreo de bosques y cultivos</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/PrnE1TB.png" alt="Cultivos" class="card-image" />
                    <div class="card-info">
                        <h4>Seguimiento de Cultivos</h4>
                        <div class="subtitle">Automático</div>
                        <p>Identificación automática del rendimiento agrícola</p>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        ${showComputerVision ? `
        <div class="section">
            <div class="section-intro">
                <h3>Experiencia: Computer Vision</h3>
            </div>
            
            <div class="section-content">
                <div class="card-with-image">
                    <img src="https://i.imgur.com/PE929kH.png" alt="Control Calidad" class="card-image" />
                    <div class="card-info">
                        <h4>Detección de Fallos y Control de Calidad</h4>
                        <div class="subtitle">Sistema IA</div>
                        <p>Mejora el control de calidad en líneas de producción</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/Wwg989F.png" alt="Video" class="card-image" />
                    <div class="card-info">
                        <h4>Detección de Fallos desde Video</h4>
                        <div class="subtitle">Sistema IA</div>
                        <p>Reducción hasta del 80% de tiempos de diagnóstico y generación automática de informes</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/NhVGKeF.png" alt="Movimiento" class="card-image" />
                    <div class="card-info">
                        <h4>Detección de Movimiento</h4>
                        <div class="subtitle">Articulaciones</div>
                        <p>Retroalimentación cuantificada para ejercicios en entrenamiento deportivo</p>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        ${showAnalytica ? `
        <div class="section">
            <div class="section-intro">
                <h3>Experiencia: IA + Analítica de Datos</h3>
            </div>
            
            <div class="section-content">
                <div class="card-with-image">
                    <img src="https://i.imgur.com/waMkAeb.png" alt="Data Warehouse" class="card-image" />
                    <div class="card-info">
                        <h4>Data Warehouse Empresarial</h4>
                        <div class="subtitle">Actualización automática</div>
                        <p>Incremento en la facilidad de toma de decisiones y análisis del estado de la compañía</p>
                    </div>
                </div>
                
                <div class="card-with-image">
                    <img src="https://i.imgur.com/S3m4WKZ.png" alt="E-commerce" class="card-image" />
                    <div class="card-info">
                        <h4>Plataforma E-commerce</h4>
                        <div class="subtitle">API búsqueda inteligente</div>
                        <p>Reducción significativa del tiempo en la toma de decisión de las compras por internet</p>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

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

  const { 
    nombre, email, asunto, cuerpo, senderEmail, senderName, linkedinUrl, gmailApiKey,
    showTeam, showCasosExito, showSalud, showAgricultura, showComputerVision, showAnalytica 
  } = req.body;

  if (!nombre || !email || !asunto || !cuerpo || !senderEmail || !senderName || !linkedinUrl || !gmailApiKey) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const transporter = createTransporter(senderEmail, gmailApiKey);
    const options = {
      showTeam: showTeam || false,
      showCasosExito: showCasosExito || false,
      showSalud: showSalud || false,
      showAgricultura: showAgricultura || false,
      showComputerVision: showComputerVision || false,
      showAnalytica: showAnalytica || false
    };
    const emailHtml = getEmailTemplate(nombre, cuerpo, senderName, senderEmail, linkedinUrl, options);

    const mailOptions = {
      from: {
        name: senderName,
        address: senderEmail
      },
      to: email,
      subject: asunto,
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