import nodemailer from "nodemailer";

/**
 * Email transporter singleton
 */
let transporter: nodemailer.Transporter | null = null;

/**
 * Ethereal credentials (cached)
 */
let etherealAccount: { user: string; pass: string } | null = null;

/**
 * Create email transporter based on environment
 */
export async function createEmailTransport(): Promise<nodemailer.Transporter> {
  if (transporter) {
    return transporter;
  }

  const config = useRuntimeConfig();
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    // ✅ DEV: Use Ethereal (test email catcher)
    // Check for persistent credentials first
    const etherealUser = process.env.ETHEREAL_USERNAME;
    const etherealPass = process.env.ETHEREAL_PASSWORD;

    if (etherealUser && etherealPass) {
      // Use persistent account
      etherealAccount = {
        user: etherealUser,
        pass: etherealPass,
      };
      console.log("\n📧 [Ethereal Email] Using persistent account:");
      console.log("   User:", etherealUser);
      console.log("   Dashboard: https://ethereal.email/login\n");
    } else {
      // Generate temporary account
      if (!etherealAccount) {
        etherealAccount = await nodemailer.createTestAccount();
        console.log("\n📧 [Ethereal Email] Generated temporary account:");
        console.log("   User:", etherealAccount.user);
        console.log("   Pass:", etherealAccount.pass);
        console.log("   Dashboard: https://ethereal.email/login");
        console.log("   ⚠️  Account expires in 48h - set ETHEREAL_USERNAME/PASSWORD for persistence\n");
      }
    }

    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: etherealAccount.user,
        pass: etherealAccount.pass,
      },
    });

    console.log("📧 [Email] Using Ethereal (dev mode)");
  } else {
    // ✅ PROD: Use configured SMTP provider
    const smtpHost = config.email?.smtpHost || "smtp.resend.com";
    const smtpPort = config.email?.smtpPort || 587;
    const smtpUser = config.email?.smtpUser;
    const smtpPass = config.email?.smtpPass;

    if (!smtpUser || !smtpPass) {
      throw new Error(
        "[Email] SMTP credentials missing. Set SMTP_USER and SMTP_PASS env vars."
      );
    }

    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    console.log(`📧 [Email] Using ${smtpHost} (production mode)`);
  }

  return transporter;
}

/**
 * Send email with automatic dev/prod routing
 */
export async function sendEmail(options: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  const transporter = await createEmailTransport();
  const config = useRuntimeConfig();
  const isDev = process.env.NODE_ENV !== "production";

  const info = await transporter.sendMail({
    from: config.email?.from || "noreply@example.com",
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });

  if (isDev) {
    // Log preview URL for Ethereal
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("\n📧 [Email Sent]");
    console.log("   To:", options.to);
    console.log("   Subject:", options.subject);
    console.log("   Preview:", previewUrl);
    console.log("");
  } else {
    console.log(`📧 [Email Sent] To: ${options.to}, ID: ${info.messageId}`);
  }

  return info;
}

/**
 * Send magic link email
 */
export async function sendMagicLinkEmail(email: string, url: string) {
  await sendEmail({
    to: email,
    subject: "Your magic link to sign in",
    text: `Click this link to sign in: ${url}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Sign in to your account</h2>
        <p>Click the button below to sign in. This link expires in 15 minutes.</p>
        <a href="${url}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Sign In
        </a>
        <p style="color: #666; font-size: 14px;">
          Or copy this link: <br/>
          <code style="background: #f4f4f4; padding: 4px 8px; border-radius: 4px;">${url}</code>
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 32px;">
          If you didn't request this email, you can safely ignore it.
        </p>
      </div>
    `,
  });
}

/**
 * Send OTP email
 */
export async function sendOTPEmail(email: string, otp: string) {
  await sendEmail({
    to: email,
    subject: `Your verification code: ${otp}`,
    text: `Your verification code is: ${otp}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Your verification code</h2>
        <p>Enter this code to sign in:</p>
        <div style="background: #f4f4f4; padding: 16px; text-align: center; border-radius: 8px; margin: 24px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px;">${otp}</span>
        </div>
        <p style="color: #666; font-size: 14px;">
          This code expires in 10 minutes.
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 32px;">
          If you didn't request this code, you can safely ignore it.
        </p>
      </div>
    `,
  });
}
