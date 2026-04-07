import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
  FaGooglePay,
  FaEnvelope,
} from "react-icons/fa";


function Footer() {
  return (
    <>
      {/* NEWSLETTER */}
      <section className="newsletter container">
        <h2>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>

        <form className="newsletter-form">
          <div className="newsletter-input-wrap">
            <FaEnvelope className="newsletter-icon" />
            <input type="email" placeholder="Enter your email address" />
          </div>
          <button type="submit">Subscribe to Newsletter</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* LEFT */}
            <div className="footer-brand">
              <h2>SHOP.CO</h2>
              <p>
                We have clothes that suits your style and which you're proud to
                wear. From women to men.
              </p>

              <div className="social-icons">
                <span><FaTwitter /></span>
                <span><FaFacebookF /></span>
                <span><FaInstagram /></span>
                <span><FaGithub /></span>
              </div>
            </div>

            {/* COMPANY */}
            <div>
              <h4>Company</h4>
              <p>About</p>
              <p>Features</p>
              <p>Works</p>
              <p>Career</p>
            </div>

            {/* HELP */}
            <div>
              <h4>Help</h4>
              <p>Customer Support</p>
              <p>Delivery Details</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
            </div>

            {/* FAQ */}
            <div>
              <h4>FAQ</h4>
              <p>Account</p>
              <p>Manage Deliveries</p>
              <p>Orders</p>
              <p>Payments</p>
            </div>

            {/* RESOURCES */}
            <div>
              <h4>Resources</h4>
              <p>Free eBooks</p>
              <p>Development Tutorial</p>
              <p>How To - Blog</p>
              <p>Youtube Playlist</p>
            </div>
          </div>

          <hr className="footer-divider" />

          <div className="footer-bottom">
            <p>Shop.co © 2000-2024, All Rights Reserved</p>
            <div className="payment-badges">
              <span><FaCcVisa /> Visa</span>
              <span><FaCcMastercard /> MasterCard</span>
              <span><FaCcPaypal /> PayPal</span>
              <span><FaApplePay /> Apple Pay</span>
              <span><FaGooglePay /> G Pay</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
