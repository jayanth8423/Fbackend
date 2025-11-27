import './About.css';

export default function About() {
  return (
    <section className="container">
      <h className="title">About Page</h>
      <p className="text">
        Welcome to <span className="highlight">FreshMart</span>, your go-to online grocery store for fresh and quality products at your doorstep. We aim to provide a seamless shopping experience with a wide range of groceries, organic produce, and household essentials.
      </p>
      
      <h2 className="subtitle">Our Mission</h2>
      <p className="text">
        Our mission is to make grocery shopping easy, convenient, and affordable. We prioritize freshness, quality, and timely delivery to ensure our customers always get the best.
      </p>
      
      <h2 className="subtitle">Why Choose Us?</h2>
      <ul className="list">
        <li>Wide variety of fresh and organic products</li>
        <li>Fast and reliable delivery services</li>
        <li>Affordable prices and great discounts</li>
        <li>Easy and secure online payment options</li>
      </ul>
      
      <h2 className="subtitle">Contact Us</h2>
      <p className="text">
        Have any questions? Reach out to us at  
        <a href="mailto:support@jsnstore.com" className="highlight"> support@jsnstore.com</a> 
        
      </p>
    </section>
  );
}
