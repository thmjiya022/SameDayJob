// src/components/PostJobForm.tsx
import { useState } from 'react';
import { createJob } from '../../services/jobService';
import "../../pages/Dashboard/Dashboard.css"

interface PostJobFormProps {
  userId: number;
  onJobCreated: () => void;
  onCancel: () => void;
}

const PostJobForm = ({ userId, onJobCreated, onCancel }: PostJobFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    location: '',
    categoryID: 1 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const jobCategories = [
    { id: 1, name: 'Cleaning' },
    { id: 2, name: 'Gardening' },
    { id: 3, name: 'Handyman' },
    { id: 4, name: 'Delivery' },
    { id: 5, name: 'Assembly' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formData.title.trim() || !formData.description.trim() || !formData.budget.trim() || !formData.location.trim()) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(formData.budget)) {
      setError('Please enter a valid budget amount (e.g., 250 or 250.50)');
      setIsSubmitting(false);
      return;
    }

    try {
      await createJob({
        title: formData.title,
        description: formData.description,
        budget: formData.budget,
        location: formData.location,
        categoryID: formData.categoryID,
        postedBy: userId
      });
      onJobCreated();
    } catch (err) {
      setError('Failed to post job. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="post-job-modal">
        <div className="modal-header">
          <h2>Post a New Job</h2>
          <button className="modal-close-btn" onClick={onCancel} disabled={isSubmitting}>
            &times;
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
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
              onClick={onCancel}
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
    </div>
  );
};

export default PostJobForm;