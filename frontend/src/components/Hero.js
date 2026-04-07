import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-left">
            <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
            <p>
              Browse through our diverse range of carefully crafted garments,
              designed to bring out your individuality and match your sense of style.
            </p>

            <Link to="/products" className="shop-btn">
              Shop Now
            </Link>

            <div className="hero-stats">
              <div>
                <h3>200+</h3>
                <p>International Brands</p>
              </div>
              <div>
                <h3>2,000+</h3>
                <p>High-Quality Products</p>
              </div>
              <div>
                <h3>30,000+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
              alt="Fashion Models"
            />
          </div>
        </div>
      </section>

      <section className="brand-strip">
        <div className="container brand-row">
          <span>VERSACE</span>
          <span>ZARA</span>
          <span>GUCCI</span>
          <span>PRADA</span>
          <span>Calvin Klein</span>
        </div>
      </section>
    </>
  );
}

export default Hero;