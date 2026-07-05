import { FileText, Users, Mail, CheckCircle } from "lucide-react";
import "./QuotationSystem.css";

export default function QuotationSystem() {
  return (
    <section className="marketplace-section quotation-section">
      <div className="quotation-container">
        <div className="quotation-content slide-in-left">
          <h2 className="quotation-title">Request Quotation System</h2>
          <p className="quotation-description">
            Smart quotation system that connects you with multiple vendors at once.
            Compare prices, negotiate directly, and find the best deals.
          </p>

          <div className="quotation-features">
            <div className="quotation-feature">
              <div className="quotation-feature-icon">
                <FileText size={24} />
              </div>
              <div className="quotation-feature-content">
                <h4>Select Multiple Products</h4>
                <p>Add products from different vendors to one inquiry</p>
              </div>
            </div>

            <div className="quotation-feature">
              <div className="quotation-feature-icon">
                <Users size={24} />
              </div>
              <div className="quotation-feature-content">
                <h4>Send to Multiple Vendors</h4>
                <p>One inquiry reaches all relevant vendors instantly</p>
              </div>
            </div>

            <div className="quotation-feature">
              <div className="quotation-feature-icon">
                <Mail size={24} />
              </div>
              <div className="quotation-feature-content">
                <h4>Receive Direct Quotations</h4>
                <p>Get competitive quotes directly from vendors</p>
              </div>
            </div>

            <div className="quotation-feature">
              <div className="quotation-feature-icon">
                <CheckCircle size={24} />
              </div>
              <div className="quotation-feature-content">
                <h4>Compare & Choose</h4>
                <p>Make informed decisions with detailed comparisons</p>
              </div>
            </div>
          </div>

          <button className="btn-primary">Start Your Inquiry</button>
        </div>

        <div className="quotation-visual slide-in-right">
          <div className="quotation-mockup glass-card">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p className="mockup-title">Request for Quotation</p>
            </div>
            <div className="mockup-body">
              <div className="mockup-item">
                <CheckCircle size={20} className="mockup-check" />
                <span>Premium Cement - OPC 53 Grade (500 bags)</span>
              </div>
              <div className="mockup-item">
                <CheckCircle size={20} className="mockup-check" />
                <span>Vitrified Tiles 800x800mm (100 boxes)</span>
              </div>
              <div className="mockup-item">
                <CheckCircle size={20} className="mockup-check" />
                <span>TMT Steel Bars Fe 500D (5 tons)</span>
              </div>
              <div className="mockup-vendors">
                <p>Sending to <strong>5 verified vendors</strong></p>
              </div>
              <button className="mockup-btn">Send Inquiry</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
