import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  // 1. State for form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });


  const [errors, setErrors] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };


  const validateForm = () => {
    const newErrors = {};

   
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

  
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
      }
    }

   
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter an inquiry subject.';
    }

    
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    return newErrors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const formValidationErrors = validateForm();

    
    if (Object.keys(formValidationErrors).length > 0) {
      setErrors(formValidationErrors);
      return;
    }

    
    setErrors({});
    setIsSubmitted(true);
  };

  
  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="contact-page page-wrapper">
      <div className="container">
      
        <header className="page-header contact-header text-center">
          <span className="badge page-badge">Farmer Support & Feedback</span>
          <h1 className="page-title">Contact Support</h1>
          <p className="page-description">
            Have questions about CropVision or need agricultural guidance? Reach out to our team.
          </p>
        </header>

     
        <div className="contact-main-grid">
          
          <div className="card contact-form-card">
            {isSubmitted ? (
              
              <div className="submission-success-card text-center">
                <div className="success-icon-circle">
                  <span role="img" aria-label="Success checkmark">✅</span>
                </div>
                <h2 className="success-title">Thank you! Your message has been received.</h2>
                <p className="success-description text-muted">
                  We have received your inquiry regarding <strong>"{formData.subject}"</strong>. Our agricultural 
                  support desk will review your message and reply to <strong>{formData.email}</strong> shortly.
                </p>

                <div className="submitted-summary-box text-left">
                  <span className="text-xs text-muted block">Sender: <strong>{formData.name}</strong></span>
                  <span className="text-xs text-muted block">Inquiry Topic: <strong>{formData.subject}</strong></span>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleResetForm}
                >
                  Send Another Message ✉️
                </button>
              </div>
            ) : (
             
              <>
                <div className="form-card-header">
                  <h3 className="form-card-title">Send a Message</h3>
                  <p className="text-muted text-sm">
                    Fill in the details below. All fields marked with * are required.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                 
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="farmer@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                 
                  <div className="form-group">
                    <label htmlFor="contact-subject" className="form-label">
                      Subject / Topic *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      className={`form-input ${errors.subject ? 'input-error' : ''}`}
                      placeholder="e.g. Query on Wheat Sowing Schedule"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                  </div>

                  
                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      Message / Inquiry *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="4"
                      className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                      placeholder="Please describe your crop question or feedback in detail..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    {errors.message && <span className="error-message">{errors.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ marginTop: '0.75rem' }}>
                    Send Message 📨
                  </button>
                </form>
              </>
            )}
          </div>

          
          <div className="contact-info-column">
            
            <div className="card info-block-card">
              <h3 className="info-block-title">Direct Contact Information</h3>
              <div className="info-items-list">
                <div className="info-item">
                  <div className="info-icon-box">🏢</div>
                  <div>
                    <strong>Campus Project Lab</strong>
                    <p className="text-muted text-sm">
                      Department of Computer Science & Agricultural Tech, Innovation Block 4
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-box">📧</div>
                  <div>
                    <strong>Email Inquiries</strong>
                    <p className="text-muted text-sm">support@cropvision.demo</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-box">📞</div>
                  <div>
                    <strong>Toll-Free Helpline</strong>
                    <p className="text-muted text-sm">+91 98765 43210 (Mon-Sat, 9AM - 6PM)</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-box">🕒</div>
                  <div>
                    <strong>Operating Hours</strong>
                    <p className="text-muted text-sm">Monday to Saturday: 9:00 AM – 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="card help-topics-card">
              <h4 className="help-topics-title">Common Support Areas</h4>
              <ul className="help-topics-list">
                <li>🌱 <strong>Crop Agronomy:</strong> Optimal watering & sowing guidelines</li>
                <li>🔬 <strong>Disease Diagnosis:</strong> Symptom advice for common foliar blights</li>
                <li>📊 <strong>Mandi Pricing:</strong> Clarification on commodity rates and MSP</li>
                <li>🎓 <strong>Evaluation Inquiry:</strong> Academic project demonstration queries</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
