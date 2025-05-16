import './Home.css'; 

const Dashboard = () => {

  const activeJobs = [
    { id: 1, title: "Garden Cleanup", worker: "T Tefera", date: "Today, 2pm", status: "In Progress" },
    { id: 2, title: "Furniture Assembly", worker: "D Pillay", date: "Tomorrow, 10am", status: "Scheduled" }
  ];

  const recentActivity = [
    { id: 1, message: "T Tefera accepted your Garden Cleanup job", time: "2 hours ago" },
    { id: 2, message: "You rated N Stevens 5 stars for Cleaning", time: "3 days ago" }
  ];

  return (
    <div className="home-container">
      <section className="hero">
        
        <h2>Welcome back, Thobani Mjiyakho!</h2>
        {/* <div className="user-sts">
          <div className="stat-card">
            <h3>Rating</h3>
            <p>{user.rating} ★</p>
          </div>
          <div className="stat-card">
            <h3>Jobs Completed</h3>
            <p>{user.completedJobs}</p>
          </div>
          <div className="stat-card">
            <h3>Member Since</h3>
            <p>{user.memberSince}</p>
          </div>
        </div> */}
      </section>

      <section className="how-it-works">
        <h2>Your Active Jobs</h2>
        <div className="steps">
          {activeJobs.map(job => (
            <div className="step" key={job.id}>
              <h3>{job.title}</h3>
              <p>Worker: {job.worker}</p>
              <p>Date: {job.date}</p>
              <p className={`status-${job.status.toLowerCase().replace(' ', '-')}`}>
                Status: {job.status}
              </p>
              <button className="secondary-button">View Details</button>
            </div>
          ))}
        </div>
      </section>

      <section className="categories">
        <h2>Quick Actions</h2>
        <div className="category-grid">
          <div className="category-card">Post New Job</div>
          <div className="category-card">Browse Jobs</div>
          <div className="category-card">Messages</div>
          <div className="category-card">Payment Settings</div>
        </div>
      </section>

      <section className="taskers">
        <h2>Recent Activity</h2>
        <div className="tasker-grid">
          {recentActivity.map(activity => (
            <div className="tasker-card" key={activity.id}>
              <p>{activity.message}</p>
              <p className="activity-time">{activity.time}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <h2>Recommended Workers</h2>
        <div className="steps">
          <div className="step">
            <h3>N Stevens</h3>
            <p>Cleaning</p>
            <p>4.9 (347 reviews)</p>
            <button className="primary-button">Hire Now</button>
          </div>
          <div className="step">
            <h3>T Tefera</h3>
            <p>Gardening</p>
            <p>4.8 (371 reviews)</p>
            <button className="primary-button">Hire Now</button>
          </div>
          <div className="step">
            <h3>M Maphalala</h3>
            <p>Delivery & Errands</p>
            <p>5.0 (198 reviews)</p>
            <button className="primary-button">Hire Now</button>
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

      <footer className="footer">
        <p>© 2025 GameDayJob. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;