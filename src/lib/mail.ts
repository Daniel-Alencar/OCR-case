import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false, // true para 465, false para outras portas
  auth: {
    user: 'apikey', // Use o valor fixo 'apikey'
    pass: process.env.SENDGRID_API_KEY, // Sua chave API do SendGrid
  },
});

export async function sendResetEmail(
  email: string,
  resetLink: string
): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Redefinição de Senha',
    text: `Clique no link para redefinir sua senha: ${resetLink}`,
    html: `<p>Clique no link para redefinir sua senha: <a href="${resetLink}">${resetLink}</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
}
