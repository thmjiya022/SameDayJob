import { useEffect, useState } from 'react';
import './Dashboard.css';
import { Job } from '../../models/Job';
import { getActiveJobs } from '../../services/jobService';
import { useNavigate } from 'react-router-dom';

// import PostJobForm from '../../components/PostJobForm/PostJobForm';

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  rating?: number;
  completedJobs?: number;
  avatar?: string;
}

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const navigate = useNavigate();
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await getActiveJobs();
        setActiveJobs(jobs);
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const recommendedTasks = [
    { id: 1, title: "Home Cleaning", category: "Cleaning", avgPrice: "R150-300", workers: 24 },
    { id: 2, title: "Furniture Assembly", category: "Assembly", avgPrice: "R200-400", workers: 18 },
    { id: 3, title: "Garden Maintenance", category: "Gardening", avgPrice: "R250-500", workers: 15 },
    { id: 4, title: "Delivery Help", category: "Delivery", avgPrice: "R100-250", workers: 32 }
  ];

  const recentActivity = [
    { id: 1, message: "T Tefera accepted your Garden Cleanup job", time: "2 hours ago" },
    { id: 2, message: "You rated N Stevens 5 stars for Cleaning", time: "3 days ago" },
    { id: 3, message: "Payment completed for Furniture Assembly", time: "1 week ago" }
  ];

  const topWorkers = [
    { id: 1, name: "N Stevens", category: "Cleaning", rating: 4.9, reviews: 347, rate: "R200/hr" },
    { id: 2, name: "T Tefera", category: "Gardening", rating: 4.8, reviews: 371, rate: "R250/hr" },
    { id: 3, name: "M Maphalala", category: "Delivery", rating: 5.0, reviews: 198, rate: "R150/hr" }
  ];

  const conversations = [
    { id: 1, user: "T Tefera", lastMessage: "I'll be there at 2pm", time: "10:30 AM", unread: 2, avatar: "TT" },
    { id: 2, user: "D Pillay", lastMessage: "Do you have the assembly instructions?", time: "Yesterday", unread: 0, avatar: "DP" },
    { id: 3, user: "N Stevens", lastMessage: "Thanks for the 5-star rating!", time: "2 days ago", unread: 0, avatar: "NS" },
    { id: 4, user: "M Maphalala", lastMessage: "Package delivered successfully", time: "1 week ago", unread: 0, avatar: "MM" }
  ];

  const sidebarMenu = [
    { id: 1, name: "Home", active: true, route: "/dashboard" },
    { id: 2, name: "Messages", active: false, route: "/messages", notifications: 3 },
    { id: 3, name: "Jobs", active: false, route: "/jobs" },
    { id: 4, name: "Workers", active: false, route: "/workers" },
    { id: 5, name: "Payments", active: false, route: "/payments" },
    { id: 6, name: "Settings", active: false, route: "/settings" }
  ];


  if (loading) {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
        </aside>
        <main className="dashboard-container">
          <div className="loading-message">Loading jobs...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
        </aside>
        <main className="dashboard-container">
          <div className="error-message">{error}</div>
        </main>
      </div>
    );
  }

  const formattedJobs = activeJobs.map(job => ({
    id: job.jobID,
    title: job.title,
    worker: "To be assigned",
    date: new Date(job.postedAt).toLocaleDateString('en-US', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: job.status,
    price: `R${job.budget.toFixed(2)}`
  }));

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">SameDayJob</div>
          <button className="sidebar-close-btn">✕</button>
        </div>
        
        <div className="sidebar-user">
          <div className="user-avatar">{user.name.charAt(0)}</div>
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </div>
        
        <nav className="sidebar-menu">
          {sidebarMenu.map(item => (
            <div
              key={item.id}
              className={`menu-item ${item.active ? 'active' : ''}`}
              onClick={() => navigate(item.route)}
              style={{ cursor: 'pointer' }}
            >
              <span className="menu-name">{item.name}</span>
              {item.notifications && (
                <span className="menu-notification">{item.notifications}</span>
              )}
            </div>
          ))}
        </nav>
        
        <div className="sidebar-conversations">
          <div className="conversations-header">
            <h3>Messages</h3>
            <button className="new-message-btn">+</button>
          </div>
          <div className="conversations-list">
            {conversations.map(conv => (
              <div key={conv.id} className={`conversation-item ${conv.unread ? 'unread' : ''}`}>
                <div className="conversation-avatar">{conv.avatar}</div>
                <div className="conversation-content">
                  <div className="conversation-user">{conv.user}</div>
                  <div className="conversation-message">{conv.lastMessage}</div>
                </div>
                <div className="conversation-meta">
                  <div className="conversation-time">{conv.time}</div>
                  {conv.unread > 0 && (
                    <div className="conversation-unread">{conv.unread}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="dashboard-container">
        <section className="welcome-section">
          <div className="welcome-content">
            <h1>Welcome, {user.name}!</h1>
            <p>What would you like to get done today?</p>
            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-value">{user.rating || 4.5}</span>
                <span className="stat-label">Your Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{user.completedJobs || 12}</span>
                <span className="stat-label">Jobs Completed</span>
              </div>
            </div>
          </div>
          <div className="post-job-card">
            <h3>Post a new job</h3>
            <p>Describe what you need done and get offers from skilled workers in minutes</p>
            <button 
              className="post-job-button" 
               onClick={() => navigate('/post-job')}
            >
              Post a Job
            </button>
          </div>
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">Your Active Jobs</h2>
          <div className="jobs-grid">
            {formattedJobs.length > 0 ? (
              formattedJobs.map(job => (
                <div className={`job-card ${job.status.toLowerCase().replace(' ', '-')}`} key={job.id}>
                  <div className="job-header">
                    <h3>{job.title}</h3>
                    <span className="job-price">{job.price}</span>
                  </div>
                  <div className="job-details">
                    <p><strong>Worker:</strong> {job.worker}</p>
                    <p><strong>When:</strong> {job.date}</p>
                    <p><strong>Status:</strong> <span className="status-badge">{job.status}</span></p>
                  </div>
                  <div className="job-actions">
                    <button className="action-button message">Message</button>
                    <button className="action-button details">View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-jobs-message">
                You don't have any active jobs yet. Post a job to get started!
              </div>
            )}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Browse Popular Tasks</h2>
            <a href="#" className="view-all">View all categories</a>
          </div>
          <div className="tasks-grid">
            {recommendedTasks.map(task => (
              <div className="task-card" key={task.id}>
                <div className="task-content">
                  <h3>{task.title}</h3>
                  <p className="task-category">{task.category}</p>
                  <div className="task-meta">
                    <span className="task-price">{task.avgPrice}</span>
                    <span className="task-workers">{task.workers} workers available</span>
                  </div>
                </div>
                <button className="browse-button">Browse</button>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-feed">
            {recentActivity.map(activity => (
              <div className="activity-item" key={activity.id}>
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p>{activity.message}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recommended Workers</h2>
            <a href="#" className="view-all">View all workers</a>
          </div>
          <div className="workers-grid">
            {topWorkers.map(worker => (
              <div className="worker-card" key={worker.id}>
                <div className="worker-avatar">
                  <div className="avatar-placeholder">{worker.name.charAt(0)}</div>
                </div>
                <div className="worker-info">
                  <h3>{worker.name}</h3>
                  <p className="worker-category">{worker.category}</p>
                  <div className="worker-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-value">{worker.rating} ({worker.reviews})</span>
                  </div>
                  <p className="worker-rate">{worker.rate}</p>
                </div>
                <button className="hire-button">Hire</button>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <h2>Need something done? Post a job!</h2>
          <p>It's free and easy to post a job. Get started today.</p>
          <button 
            className="cta-button" 
             onClick={() => navigate('/post-job')}
          >
            Post a Job Now
          </button>
        </section>
{/* 
        {showJobForm && (
          <PostJobForm
            userId={parseInt(user.id)}
            onJobCreated={handleJobCreated}
            onCancel={() => setShowJobForm(false)}
          />
        )} */}

      </main>
    </div>
  );
};

export default Dashboard;