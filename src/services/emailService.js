import emailjs from '@emailjs/browser';

const EMAIL_CONFIG = {
  SERVICE_ID: 'service_gcdy0xd',
  TEMPLATE_ID: 'template_ju3cewa',
  PUBLIC_KEY: 'a7F_WMfHug8OuwxBW'
};

class EmailService {
  constructor() {
    this.isInitialized = false;
  }

  init() {
    if (!this.isInitialized) {
      emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
      this.isInitialized = true;
    }
  }

  async sendContactForm(data) {
    this.init();
    
    const templateParams = {
      to_email: 'devperfection0@gmail.com',
      from_name: data.name || 'Website Visitor',
      from_email: data.email || 'noreply@devperfection.com',
      subject: data.subject || 'New Contact Form Submission',
      message: data.message || '',
      phone: data.phone || '',
      service: data.service || 'General Inquiry',
      timestamp: new Date().toLocaleString()
    };

    try {
      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email sent successfully:', response);
      return { success: true, message: 'Email sent successfully!' };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, message: 'Failed to send email. Please try again.' };
    }
  }

  async sendQuoteRequest(data) {
    const formattedData = {
      ...data,
      subject: `Quote Request: ${data.service || 'Custom Service'}`,
      message: `
        Service: ${data.service || 'Not specified'}
        Budget: ${data.budget || 'Not specified'}
        Timeline: ${data.timeline || 'Not specified'}
        
        Additional Details:
        ${data.details || 'No additional details provided'}
      `
    };
    
    return this.sendContactForm(formattedData);
  }

  async sendNewsletterSignup(email) {
    const data = {
      email: email,
      subject: 'Newsletter Subscription',
      message: `New newsletter subscription from: ${email}`
    };
    
    return this.sendContactForm(data);
  }
}

export default new EmailService();
