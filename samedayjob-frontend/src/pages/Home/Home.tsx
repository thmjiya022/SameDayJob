import "./Home.css";
import Footer from "../../components/Footer/Footer";

const Home = () =>  {
    return (
      <div className="home-container">

        <section className="hero">
          <h2>Get Help or Earn Money Today</h2>
          <p>Post tasks or find work in your local area. It's fast, easy, and secure.</p>
          <div className="cta-buttons">
            <button className="primary-button">Post a Job</button>
            <button className="secondary-button">Find a Job</button>
          </div>
        </section>
  
        <section className="how-it-works">
          <h2>Why Choose Us</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Post a Task</h3>
              <p>Describe what you need done and when.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Choose a Worker</h3>
              <p>Browse profiles and select a trusted Tasker.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get It Done</h3>
              <p>Job completed and pay securely through the platform.</p>
            </div>
          </div>
        </section>
  
        <section className="categories">
          <h2>Popular Categories</h2>
          <div className="category-grid">
            <div className="category-card">Cleaning</div>
            <div className="category-card">Delivery</div>
            <div className="category-card">Handyman</div>
            <div className="category-card">Gardening</div>
          </div>
        </section>
  
        <section className="taskers">
          <h2>Top-Rated Workers Near You</h2>
          <div className="tasker-grid">
            <div className="tasker-card">
              <h3>N Stevens</h3>
              <p>Cleaning</p>
              <p>4.9 (347 reviews)</p>
            </div>
            <div className="tasker-card">
              <h3>T Tefera</h3>
              <p>Gardening</p>
              <p>4.8 (371 reviews)</p>
            </div>
            <div className="tasker-card">
              <h3>M Maphalala</h3>
              <p>Delivery & Errands</p>
              <p>5.0 (198 reviews)</p>
            </div>
            <div className="tasker-card">
              <h3>D Pillay</h3>
              <p>Handyman</p>
              <p>4.7 (411 reviews)</p>
            </div>
          </div>
        </section>
  
        <section className="app-download">
          <h2>Download Our App</h2>
          <p>Get SameDayJob on iOS and Android. Book tasks, chat with workers, and track jobs from your phone.</p>
          <div className="app-buttons">
            <button className="app-store-button">App Store</button>
            <button className="play-store-button">Google Play</button>
          </div>
        </section>

        <section className="safety">
          <h2>Our Safety Standards</h2>
          <ul>
            <li>Identity and criminal background checks</li>
            <li>In-app messaging for privacy</li>
            <li>Emergency support hotline</li>
          </ul>
        </section>
  
        <Footer />
      </div>
    );
  };
  
  export default Home;
