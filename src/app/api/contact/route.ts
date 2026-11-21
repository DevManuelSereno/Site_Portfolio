import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Define the interface for contact form data
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Os campos vêm de um formulário público e entram num HTML: sem escape, quem
// envia injeta marcação ou links no e-mail que chega à caixa do dono.
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Email templates para Resend
const createNotificationEmail = (data: ContactFormData) => {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = data.phone ? escapeHtml(data.phone) : 'Não informado';
  const message = escapeHtml(data.message);

  return {
    from: 'Portfolio <onboarding@resend.dev>',
    reply_to: [data.email], // Reply vai direto para quem enviou
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
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value"><a href="mailto:${email}" class="email-link">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">📱 Telefone</div>
                <div class="value">${phone}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 Mensagem</div>
                <div class="message-value">${message}</div>
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

    // Instanciado aqui, e não no escopo do módulo: o construtor do Resend lança
    // quando a chave falta, e no escopo do módulo isso quebrava o `next build`
    // (coleta de dados de página) antes da verificação acima poder responder.
    const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Enviar email de notificação
    const notificationResult = await resend.emails.send(notificationEmail);
    
    if (notificationResult.error) {
      console.error('Erro ao enviar notificação:', notificationResult.error);
      throw new Error('Falha ao enviar notificação');
    }

    // Resposta de sucesso
    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada. Respondo em breve.'
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
