import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobById, updateJob, deleteJob } from '../../services/jobService';
import Sidebar from '../../components/Sidebar/Sidebar';

interface User {
  userID: number;
  name: string;
  email: string;
  phoneNumber: string;
}

const JobDetailPage = ({ user }: { user: User }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    location: '',
    categoryID: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      const jobData = await getJobById(parseInt(id));
      if (jobData) {
        setJob(jobData);
        setFormData({
          title: jobData.title,
          description: jobData.description,
          budget: jobData.budget.toString(),
          location: jobData.location,
          categoryID: jobData.categoryID,
        });
      }
    };

    fetchJob();
  }, [id]);

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

    if (!id) return;

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
      const updatedJob = await updateJob(parseInt(id), formData);
      if (updatedJob) {
        setJob(updatedJob);
        setIsEditing(false);
      }
    } catch (err) {
      setError('Failed to update job. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    setIsSubmitting(true);
    setError('');

    try {
      const success = await deleteJob(parseInt(id));
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Failed to delete job. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="flex min-h-screen bg-white text-gray-800">
        <Sidebar user={user} />
        <main className="flex-1 flex items-center justify-center p-8 bg-gray-100">
          <div className="text-center">Loading job details...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar user={user} />

      <main className="flex-1 flex items-center justify-center p-8 bg-gray-100">
        <div className="w-full max-w-3xl space-y-8">
          <section className="text-center">
            <h1 className="text-3xl font-bold text-blue-700 mb-2">
              {isEditing ? 'Edit Job' : 'Job Details'}
            </h1>
          </section>

          <section className="bg-white shadow-md rounded-lg p-6 border border-blue-100">
            {error && <div className="text-red-600 mb-4">{error}</div>}

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block font-medium text-blue-700 mb-1">
                    Job Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    maxLength={100}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block font-medium text-blue-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    maxLength={500}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="budget" className="block font-medium text-blue-700 mb-1">
                      Budget (R)*
                    </label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g., 250 or 250.50"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex-1">
                    <label htmlFor="location" className="block font-medium text-blue-700 mb-1">
                      Location*
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">{job.title}</h2>
                  <p className="text-gray-500">
                    Posted on {new Date(job.postedAt).toLocaleDateString()} • {job.status}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-blue-700 mb-1">Description</h3>
                  <p className="whitespace-pre-line">{job.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-blue-700 mb-1">Budget</h3>
                    <p>R{job.budget}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-700 mb-1">Location</h3>
                    <p>{job.location}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-700 mb-1">Category</h3>
                    <p>{job.category?.name}</p>
                  </div>
                </div>

                {job.postedBy === user.userID && (
                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit Job
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Deleting...' : 'Delete Job'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default JobDetailPage;