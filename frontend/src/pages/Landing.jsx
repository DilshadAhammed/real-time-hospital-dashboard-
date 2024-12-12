import React from "react";
import "./styles.css";

function Landing() {
  return (
    <>
      <header>
        <nav>
          <a href="#">Home</a>
          <a href="#page-2">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>
      <main>
        <h1>Explore the world.</h1>
      </main>
      <div className="container" id="page-2">
        <h1>Explore the universe</h1>
      </div>
      {/* <main>
        
      </main> */}
    </>
  );
}

export default Landing;
