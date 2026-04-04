/**
 * WhatsApp Integration Utility
 * Handles contact form submission via WhatsApp
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  budget?: string;
  message: string;
}

// Your WhatsApp number (format: country code + number, no spaces or symbols)
const WHATSAPP_NUMBER = '918485939130'; // +91 8485939130

/**
 * Send contact details via WhatsApp
 * Opens WhatsApp with pre-filled message
 */
export const sendToWhatsApp = (data: ContactFormData): void => {
  const message = formatWhatsAppMessage(data);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};

/**
 * Format contact data into WhatsApp message
 */
const formatWhatsAppMessage = (data: ContactFormData): string => {
  return `
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
};

/**
 * Send contact details via Email using EmailJS
 * Requires EmailJS setup (free account)
 */
export const sendToEmail = async (data: ContactFormData): Promise<boolean> => {
  try {
    // Check if EmailJS is configured
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS not configured. Email backup disabled.');
      return false;
    }

    // Dynamically import EmailJS (only if configured)
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
 * Submit contact form
 * Sends to WhatsApp (primary) and Email (backup)
 */
export const submitContactForm = async (data: ContactFormData): Promise<{
  success: boolean;
  whatsappOpened: boolean;
  emailSent: boolean;
  error?: string;
}> => {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        whatsappOpened: false,
        emailSent: false,
        error: 'Name, email, and message are required',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        whatsappOpened: false,
        emailSent: false,
        error: 'Invalid email format',
      };
    }

    // Send to WhatsApp (primary method)
    sendToWhatsApp(data);
    
    // Send to Email (backup) - non-blocking
    let emailSent = false;
    try {
      emailSent = await sendToEmail(data);
    } catch (error) {
      console.error('Email backup failed:', error);
    }

    // Save locally for your reference (optional)
    saveContactLocally(data);

    return {
      success: true,
      whatsappOpened: true,
      emailSent,
    };
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return {
      success: false,
      whatsappOpened: false,
      emailSent: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Quick WhatsApp chat
 * Opens WhatsApp with a simple greeting
 */
export const openQuickChat = (customMessage?: string): void => {
  const message = customMessage || 'Hi Naitik! I found your portfolio and would like to connect. 👋';
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

/**
 * Store contact in localStorage for tracking
 * (Optional - for your own reference when you visit the site)
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
 * (For your reference - can check who contacted you)
 */
export const getLocalContacts = (): Array<ContactFormData & { timestamp: string }> => {
  try {
    return JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
  } catch (error) {
    console.error('Failed to get local contacts:', error);
    return [];
  }
};

/**
 * Clear local contacts
 */
export const clearLocalContacts = (): void => {
  try {
    localStorage.removeItem('portfolio_contacts');
  } catch (error) {
    console.error('Failed to clear local contacts:', error);
  }
};
