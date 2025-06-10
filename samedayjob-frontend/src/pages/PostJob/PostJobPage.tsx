import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob, getJobCategories } from '../../services/jobService';
import Sidebar from '../../components/Sidebar/Sidebar';

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar user={user} />

      <main className="flex-1 flex items-center justify-center p-8 bg-gray-100">
        <div className="w-full max-w-3xl space-y-8">
          <section className="text-center">
            <h1 className="text-3xl font-bold text-blue-700 mb-2">Post a New Job</h1>
            <p className="text-gray-600">
              Describe what you need done and get offers from skilled workers in minutes.
            </p>
          </section>

          <section className="bg-white shadow-md rounded-lg p-6 border border-blue-100">
            {error && <div className="text-red-600 mb-4">{error}</div>}

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
                  placeholder="e.g., Garden cleanup, Furniture assembly"
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
                  placeholder="Describe what needs to be done in detail"
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
                    placeholder="Where the job needs to be done"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="categoryID" className="block font-medium text-blue-700 mb-1">
                  Category*
                </label>
                <select
                  id="categoryID"
                  name="categoryID"
                  value={formData.categoryID}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {jobCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
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
                  {isSubmitting ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PostJobPage;
