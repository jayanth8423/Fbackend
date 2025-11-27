// import React from "react";

// function PaymentPage() {
//   return (
//     <div className="payment-container text-center mt-20">
//       <h2 className="text-3xl font-bold mb-6">💳 Payment Page</h2>
//       <p className="mb-4">This is a placeholder for your payment gateway or form.</p>
//       <button
//         onClick={() => alert("Payment Successful!")}
//         className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full"
//       >
//         Pay Now
//       </button>
//     </div>
//   );
// }

// export default PaymentPage;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PaymentPage.css";

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    saveInfo: false
  });

  // Sample order summary data
  const orderSummary = {
    subtotal: 2499,
    shipping: 99,
    tax: 250,
    total: 2848,
    items: [
      { name: "Premium Headphones", price: 1499, quantity: 1 },
      { name: "Wireless Mouse", price: 499, quantity: 1 },
      { name: "USB-C Cable", price: 299, quantity: 1 },
      { name: "Screen Protector", price: 199, quantity: 1 }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment Successful! Order placed.");
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <Link to="/" className="brand-logo">JSN Stores</Link>
        <div className="payment-steps">
          <div className="step completed">Cart</div>
          <div className="step-divider"></div>
          <div className="step active">Payment</div>
          <div className="step-divider"></div>
          <div className="step">Confirmation</div>
        </div>
        <Link to="/cart" className="back-link">
          ← Back to Cart
        </Link>
      </div>

      <div className="payment-content">
        <div className="payment-form-container">
          <h2>Payment Details</h2>

          <div className="payment-methods">
            <div 
              className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('card')}
            >
              <span className="method-icon">💳</span>
              <span>Credit Card</span>
            </div>
            <div 
              className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('paypal')}
            >
              <span className="method-icon">🅿️</span>
              <span>PayPal</span>
            </div>
            <div 
              className={`payment-method ${paymentMethod === 'bank' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('bank')}
            >
              <span className="method-icon">🏦</span>
              <span>Bank Transfer</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            {paymentMethod === 'card' && (
              <div className="card-details">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardName">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                </div>

                <div className="form-row two-columns">
                  <div className="form-group">
                    <label htmlFor="expiry">Expiry Date</label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="paypal-info">
                <p>You will be redirected to PayPal to complete your purchase securely.</p>
                <div className="paypal-logo">PayPal</div>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="bank-info">
                <p>Use these details to make a bank transfer:</p>
                <div className="bank-details">
                  <p><strong>Bank:</strong> JSN National Bank</p>
                  <p><strong>Account Name:</strong> JSN Stores Ltd</p>
                  <p><strong>Account Number:</strong> 1234567890</p>
                  <p><strong>Sort Code:</strong> 12-34-56</p>
                  <p><strong>Reference:</strong> Your email address</p>
                </div>
              </div>
            )}

            <div className="billing-section">
              <h3>Billing Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Example Street"
                    required
                  />
                </div>
              </div>

              <div className="form-row two-columns">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="123456"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="saveInfo">Save my information for faster checkout next time</label>
                </div>
              </div>
            </div>

            <button type="submit" className="pay-button">Complete Payment</button>
          </form>
        </div>

        
      </div>
    </div>
  );
}

export default PaymentPage;