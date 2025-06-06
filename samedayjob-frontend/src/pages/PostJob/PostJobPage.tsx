import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob, getJobCategories } from '../../services/jobService';
import '../Dashboard/Dashboard.css';

interface JobCategory {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

interface PostJobPageProps {
  user: User;
}

const PostJobPage = ({ user }: PostJobPageProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    location: '',
    categoryID: 1,
  });

  const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getJobCategories();
        setJobCategories(categories);
        if (categories.length > 0) {
          setFormData(prev => ({
            ...prev,
            categoryID: categories[0].id
          }));
        }
      } catch (err) {
        console.error("Failed to fetch job categories:", err);
        setError("Unable to load job categories. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'categoryID' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const { title, description, budget, location } = formData;

    if (!title.trim() || !description.trim() || !budget.trim() || !location.trim()) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(budget)) {
      setError('Please enter a valid budget amount (e.g., 250 or 250.50)');
      setIsSubmitting(false);
      return;
    }

    try {
      await createJob({
        ...formData,
        postedBy: user.id,
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to post job. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="menu-item" onClick={() => navigate('/dashboard')}>
            <span className="menu-name">Home</span>
          </div>
          <div className="menu-item">
            <span className="menu-name">Messages</span>
          </div>
          <div className="menu-item active">
            <span className="menu-name">Jobs</span>
          </div>
          <div className="menu-item">
            <span className="menu-name">Workers</span>
          </div>
          <div className="menu-item">
            <span className="menu-name">Payments</span>
          </div>
          <div className="menu-item">
            <span className="menu-name">Settings</span>
          </div>
        </nav>
      </aside>

      <main className="dashboard-container">
        <section className="welcome-section">
          <div className="welcome-content">
            <h1>Post a New Job</h1>
            <p>
              Describe what you need done and get offers from skilled workers in minutes
            </p>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="post-job-form-container">
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="post-job-form">
              <div className="form-group">
                <label htmlFor="title">Job Title*</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Garden cleanup, Furniture assembly"
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description*</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what needs to be done in detail"
                  rows={5}
                  maxLength={500}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="budget">Budget (R)*</label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g., 250 or 250.50"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location*</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Where the job needs to be done"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="categoryID">Category*</label>
                <select
                  id="categoryID"
                  name="categoryID"
                  value={formData.categoryID}
                  onChange={handleChange}
                >
                  {jobCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate('/dashboard')}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PostJobPage;
