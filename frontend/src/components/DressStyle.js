import React from "react";

function DressStyle() {
  const styles = [
    {
      name: "Casual",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Formal",
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Party",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Gym",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <section className="product-section">
      <div className="container">
        <div className="dress-style-box">
          <h2 className="section-title">BROWSE BY DRESS STYLE</h2>

          <div className="dress-grid">
            {styles.map((item, index) => (
              <div className="dress-card" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DressStyle;