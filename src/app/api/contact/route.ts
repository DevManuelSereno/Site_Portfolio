import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the interface for contact form data
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Email templates para Resend
const createNotificationEmail = (data: ContactFormData) => {
  return {
    from: 'Portfolio <noreply@manuelsereno.dev>',
    to: ['nelfsereno@gmail.com'],
    subject: `🌟 Nova mensagem de contato - ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
            .header { background: linear-gradient(135deg, #00CDF6 0%, #009BEC 70%, #008BE1 100%); color: white; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
            .header p { margin: 8px 0 0; opacity: 0.9; }
            .content { padding: 30px 20px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: 600; color: #374151; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
            .value { padding: 12px 16px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #00CDF6; margin-top: 4px; }
            .message-value { padding: 16px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #00CDF6; white-space: pre-wrap; }
            .footer { padding: 20px; background: #f8fafc; text-align: center; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; }
            .email-link { color: #00CDF6; text-decoration: none; }
            .email-link:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📩 Nova Mensagem Recebida!</h1>
              <p>Alguém entrou em contato através do seu portfólio</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nome</div>
                <div class="value">${data.name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value"><a href="mailto:${data.email}" class="email-link">${data.email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">📱 Telefone</div>
                <div class="value">${data.phone || 'Não informado'}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 Mensagem</div>
                <div class="message-value">${data.message}</div>
              </div>
            </div>
            <div class="footer">
              <p><strong>Mensagem enviada em:</strong> ${new Date().toLocaleString('pt-BR')}</p>
              <p>Responda diretamente clicando no email acima 📧</p>
            </div>
          </div>
        </body>
      </html>
    `
  };
};

const createAutoReplyEmail = (data: ContactFormData) => {
  return {
    from: 'Manuel Sereno <noreply@manuelsereno.dev>',
    to: [data.email],
    subject: '✨ Obrigado pelo seu contato - Manuel Sereno',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
            .header { background: linear-gradient(135deg, #00CDF6 0%, #009BEC 70%, #008BE1 100%); color: white; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
            .content { padding: 30px 20px; }
            .message-quote { padding: 16px; background: #f0f9ff; border-left: 4px solid #00CDF6; border-radius: 8px; margin: 20px 0; font-style: italic; }
            .contact-info { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .contact-item { margin: 8px 0; }
            .contact-link { color: #00CDF6; text-decoration: none; }
            .contact-link:hover { text-decoration: underline; }
            .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
            .footer { padding: 20px; background: #f8fafc; text-align: center; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; }
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
              
              <div class="message-quote">
                <strong>Sua mensagem:</strong><br>
                ${data.message.replace(/\n/g, '<br>')}
              </div>
              
              <div class="contact-info">
                <h3 style="margin-top: 0; color: #374151;">📞 Você também pode me encontrar em:</h3>
                <div class="contact-item">📧 Email: <a href="mailto:nelfsereno@gmail.com" class="contact-link">nelfsereno@gmail.com</a></div>
                <div class="contact-item">📱 WhatsApp: <a href="https://wa.me/5571999956042" class="contact-link">(71) 99995-6042</a></div>
                <div class="contact-item">💼 LinkedIn: <a href="https://linkedin.com/in/dev-manuel-sereno" class="contact-link">@dev-manuel-sereno</a></div>
                <div class="contact-item">🐱 GitHub: <a href="https://github.com/DevManuelSereno" class="contact-link">@DevManuelSereno</a></div>
              </div>
              
              <div class="signature">
                <p>Até breve!</p>
                <p><strong>Manuel Sereno</strong><br>
                <span style="color: #6b7280;">Desenvolvedor Front-End & UI/UX Designer</span></p>
              </div>
            </div>
            <div class="footer">
              <p>Esta é uma resposta automática. Responderei pessoalmente em breve! 🚀</p>
            </div>
          </div>
        </body>
      </html>
    `
  };
};

// Validação de dados do formulário
const validateFormData = (data: unknown): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push('Dados inválidos');
    return { isValid: false, errors };
  }

  const formData = data as Record<string, unknown>;

  // Validação do nome
  if (!formData.name || typeof formData.name !== 'string' || formData.name.trim().length < 2) {
    errors.push('Nome é obrigatório e deve ter pelo menos 2 caracteres');
  }

  // Validação do email
  if (!formData.email || typeof formData.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Email válido é obrigatório');
  }

  // Validação da mensagem
  if (!formData.message || typeof formData.message !== 'string' || formData.message.trim().length < 10) {
    errors.push('Mensagem é obrigatória e deve ter pelo menos 10 caracteres');
  }

  // Validação do telefone (opcional)
  if (formData.phone && (typeof formData.phone !== 'string' || !/^[\d\s\(\)\-\+]+$/.test(formData.phone))) {
    errors.push('Formato de telefone inválido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Rate limiting simples
const rateLimitStore = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutos
  const maxRequests = 3; // Máx 3 tentativas por 15 min

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const requests = rateLimitStore.get(ip)!.filter(timestamp => now - timestamp < windowMs);
  
  if (requests.length >= maxRequests) {
    return true;
  }

  requests.push(now);
  rateLimitStore.set(ip, requests);
  return false;
};

export async function POST(request: NextRequest) {
  try {
    // Verificar se Resend está configurado
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY não encontrada');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Configuração de email não encontrada.' 
        },
        { status: 500 }
      );
    }

    // Obter IP do cliente para rate limiting
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Verificar rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Muitas tentativas. Tente novamente em 15 minutos.' 
        },
        { status: 429 }
      );
    }

    // Parse do corpo da requisição
    const body = await request.json();
    
    // Validar dados do formulário
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

    // Preparar e limpar dados
    const contactData: ContactFormData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || undefined,
      message: body.message.trim()
    };

    // Preparar emails
    const notificationEmail = createNotificationEmail(contactData);
    const autoReplyEmail = createAutoReplyEmail(contactData);

    // Enviar email de notificação
    const notificationResult = await resend.emails.send(notificationEmail);
    
    if (notificationResult.error) {
      console.error('Erro ao enviar notificação:', notificationResult.error);
      throw new Error('Falha ao enviar notificação');
    }

    // Enviar auto-reply
    const autoReplyResult = await resend.emails.send(autoReplyEmail);
    
    if (autoReplyResult.error) {
      console.error('Erro ao enviar auto-reply:', autoReplyResult.error);
      // Não falha se auto-reply der erro, só loga
    }

    // Resposta de sucesso
    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso! ✨ Você receberá uma confirmação por email em instantes.'
    });

  } catch (error) {
    console.error('Erro no formulário de contato:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro interno do servidor. Tente novamente mais tarde.' 
      },
      { status: 500 }
    );
  }
}

// Métodos não suportados
export async function GET() {
  return NextResponse.json(
    { 
      success: false,
      message: 'Método não permitido. Use POST para enviar mensagens.' 
    },
    { status: 405 }
  );
}
