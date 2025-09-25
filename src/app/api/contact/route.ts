import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the interface for contact form data
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Email templates
const createEmailTemplate = (data: ContactFormData) => {
  return {
    subject: `Nova mensagem de contato - ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(90deg, #00CDF6 0%, #009BEC 70%, #008BE1 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #00CDF6; }
            .footer { margin-top: 20px; padding: 15px; background: #e9e9e9; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📩 Nova Mensagem de Contato</h1>
              <p>Recebida através do seu portfólio</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nome:</div>
                <div class="value">${data.name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">📱 Telefone:</div>
                <div class="value">${data.phone || 'Não informado'}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 Mensagem:</div>
                <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Esta mensagem foi enviada através do formulário de contato do seu portfólio</p>
              <p>Data: ${new Date().toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Nova mensagem de contato recebida:

Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone || 'Não informado'}

Mensagem:
${data.message}

---
Enviado através do formulário de contato do portfólio
Data: ${new Date().toLocaleString('pt-BR')}
    `
  };
};

// Auto-reply email template
const createAutoReplyTemplate = (data: ContactFormData) => {
  return {
    subject: 'Obrigado pelo seu contato - Manuel Sereno',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(90deg, #00CDF6 0%, #009BEC 70%, #008BE1 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .footer { margin-top: 20px; padding: 15px; background: #e9e9e9; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Obrigado pelo seu contato!</h1>
            </div>
            <div class="content">
              <p>Olá <strong>${data.name}</strong>,</p>
              
              <p>Recebi sua mensagem e fico muito feliz com seu interesse! 🚀</p>
              
              <p>Entrarei em contato com você em breve para discutirmos seu projeto. Enquanto isso, fique à vontade para explorar meu portfólio e conhecer mais sobre meu trabalho.</p>
              
              <p>Sua mensagem:</p>
              <blockquote style="border-left: 4px solid #00CDF6; padding-left: 15px; margin: 15px 0; font-style: italic;">
                ${data.message.replace(/\n/g, '<br>')}
              </blockquote>
              
              <p>Você também pode me encontrar em:</p>
              <ul>
                <li>📧 Email: <a href="mailto:nelfsereno@gmail.com">nelfsereno@gmail.com</a></li>
                <li>📱 WhatsApp: <a href="https://wa.me/5571999956042">(71) 99995-6042</a></li>
                <li>💼 LinkedIn: <a href="https://linkedin.com/in/dev-manuel-sereno">@dev-manuel-sereno</a></li>
              </ul>
              
              <p>Até breve!</p>
              <p><strong>Manuel Sereno</strong><br>
              Desenvolvedor Front-End & UI/UX Designer</p>
            </div>
            <div class="footer">
              <p>Esta é uma resposta automática. Responderei pessoalmente em breve!</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Olá ${data.name},

Recebi sua mensagem e fico muito feliz com seu interesse! 🚀

Entrarei em contato com você em breve para discutirmos seu projeto. Enquanto isso, fique à vontade para explorar meu portfólio e conhecer mais sobre meu trabalho.

Sua mensagem:
"${data.message}"

Você também pode me encontrar em:
- Email: nelfsereno@gmail.com
- WhatsApp: (71) 99995-6042
- LinkedIn: linkedin.com/in/dev-manuel-sereno

Até breve!

Manuel Sereno
Desenvolvedor Front-End & UI/UX Designer

---
Esta é uma resposta automática. Responderei pessoalmente em breve!
    `
  };
};

// Validation function
const validateFormData = (data: unknown): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Type guard to ensure data is an object
  if (!data || typeof data !== 'object') {
    errors.push('Dados inválidos');
    return { isValid: false, errors };
  }

  const formData = data as Record<string, unknown>;

  if (!formData.name || typeof formData.name !== 'string' || formData.name.trim().length < 2) {
    errors.push('Nome é obrigatório e deve ter pelo menos 2 caracteres');
  }

  if (!formData.email || typeof formData.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Email válido é obrigatório');
  }

  if (!formData.message || typeof formData.message !== 'string' || formData.message.trim().length < 10) {
    errors.push('Mensagem é obrigatória e deve ter pelo menos 10 caracteres');
  }

  if (formData.phone && (typeof formData.phone !== 'string' || !/^[\d\s\(\)\-\+]+$/.test(formData.phone))) {
    errors.push('Formato de telefone inválido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Rate limiting (simple in-memory store)
const rateLimitStore = new Map();

const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 3; // Max 3 requests per 15 minutes

  if (!rateLimitStore.has(identifier)) {
    rateLimitStore.set(identifier, []);
  }

  const requests = rateLimitStore.get(identifier).filter((timestamp: number) => 
    now - timestamp < windowMs
  );

  if (requests.length >= maxRequests) {
    return false;
  }

  requests.push(now);
  rateLimitStore.set(identifier, requests);
  return true;
};

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Muitas tentativas. Tente novamente em 15 minutos.' 
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate form data
    const validation = validateFormData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Dados inválidos',
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    // Clean and prepare data
    const contactData: ContactFormData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || undefined,
      message: body.message.trim()
    };

    // Create email transporter
    const transporter = createTransporter();

    // Verify transporter
    await transporter.verify();

    // Prepare emails
    const notificationEmail = createEmailTemplate(contactData);
    const autoReplyEmail = createAutoReplyTemplate(contactData);

    // Send notification email to you
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: notificationEmail.subject,
      html: notificationEmail.html,
      text: notificationEmail.text,
    });

    // Send auto-reply to the user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: contactData.email,
      subject: autoReplyEmail.subject,
      html: autoReplyEmail.html,
      text: autoReplyEmail.text,
    });

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso! Você receberá uma confirmação por email.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro interno do servidor. Tente novamente mais tarde.' 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Método não permitido' },
    { status: 405 }
  );
}