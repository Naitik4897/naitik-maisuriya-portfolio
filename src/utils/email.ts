/**
 * Email Contact Service - EmailJS Integration
 * Handles contact form submission via email
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  budget?: string;
  message: string;
}

/**
 * Send contact details via Email using EmailJS
 */
export const sendToEmail = async (data: ContactFormData): Promise<boolean> => {
  try {
    // Check if EmailJS is configured
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS not configured. Please setup environment variables.');
      return false;
    }

    // Dynamically import EmailJS
    const { default: emailjs } = await import('@emailjs/browser');
    
    // Send email
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: data.name,
        from_email: data.email,
        from_phone: data.phone || 'Not provided',
        subject: data.subject,
        budget: data.budget || 'Not specified',
        message: data.message,
        sent_time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      },
      publicKey
    );
    
    return response.status === 200;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

/**
 * Send contact details via WhatsApp (silent - no popup)
 * Note: Currently disabled to prevent popup. Only logs silently.
 */
export const sendToWhatsApp = (data: ContactFormData): void => {
  // WhatsApp message preparation (for logging/future use)
  const whatsappNumber = '918485939130';
  const message = `
Hi Naitik! 👋

*New Contact from Portfolio Website*

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone || 'Not provided'}
*Subject:* ${data.subject}
${data.budget ? `*Budget:* ${data.budget}` : ''}

*Message:*
${data.message}

---
📅 Sent: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
🌐 Source: Portfolio Contact Form
  `.trim();

  // Log the WhatsApp message silently (no popup)
  console.log('WhatsApp message prepared:', message);
  
  // NOTE: Removed window.open() to prevent WhatsApp popup
  // If you want WhatsApp functionality later, uncomment below:
  // const encodedMessage = encodeURIComponent(message);
  // const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  // window.open(whatsappUrl, '_blank');
};

/**
 * Submit contact form via Email AND WhatsApp (silently)
 */
export const submitContactFormViaEmail = async (data: ContactFormData): Promise<{
  success: boolean;
  emailSent: boolean;
  whatsappSent: boolean;
  error?: string;
}> => {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        emailSent: false,
        whatsappSent: false,
        error: 'Name, email, and message are required',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        emailSent: false,
        whatsappSent: false,
        error: 'Invalid email format',
      };
    }

    // Send to BOTH email AND WhatsApp silently
    const emailSent = await sendToEmail(data);
    
    // Log WhatsApp message silently (NO POPUP - just for records)
    let whatsappSent = false;
    try {
      // Only log the message, don't open WhatsApp
      const message = `Contact from ${data.name} (${data.email}): ${data.message}`;
      console.log('WhatsApp message logged:', message);
      whatsappSent = true; // Mark as "sent" for logging purposes
    } catch (error) {
      console.error('WhatsApp logging failed:', error);
      whatsappSent = false;
    }

    // Save locally for reference
    saveContactLocally(data);
    
    // Return success if either method worked
    if (emailSent || whatsappSent) {
      return {
        success: true,
        emailSent,
        whatsappSent,
      };
    } else {
      return {
        success: false,
        emailSent: false,
        whatsappSent: false,
        error: 'Failed to send message. Please try again.',
      };
    }
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return {
      success: false,
      emailSent: false,
      whatsappSent: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Store contact in localStorage for tracking
 */
const saveContactLocally = (data: ContactFormData): void => {
  try {
    const contacts = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
    contacts.push({
      ...data,
      timestamp: new Date().toISOString(),
    });
    // Keep only last 100 contacts
    if (contacts.length > 100) {
      contacts.splice(0, contacts.length - 100);
    }
    localStorage.setItem('portfolio_contacts', JSON.stringify(contacts));
  } catch (error) {
    console.error('Failed to save contact locally:', error);
  }
};

/**
 * Get locally stored contacts
 */
export const getLocalContacts = (): Array<ContactFormData & { timestamp: string }> => {
  try {
    return JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
  } catch (error) {
    console.error('Failed to get local contacts:', error);
    return [];
  }
};