import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Home() {
  return (
    <>
      <Navbar />
      {/* <div className="home">
        <section className="hero-section">
            <h1>Welcome to the Unified Grievance Redressal Portal of Kerala</h1>
            <p>Submit and track your grievances easily with our system.</p>
            <Link to="/submit" className="btn">Submit Grievance</Link>
        </section>
        <section className="how-to">
            <h2>How to Use the Portal</h2>
            <p>Learn to submit and track your grievances in a few easy steps.</p>
            <Link to="/guide" className="btn">Learn More</Link>
        </section>
        <section className="contact-info">
            <h2>Contact Us</h2>
            <p>If you have any questions or need help, feel free to contact us.</p>
            <p>Email: info@gov.kerala</p>
            <p>Phone: +91 123 456 7890</p>
        </section>
      </div> */}
      <Footer />
    </>
  )
}

export default Home