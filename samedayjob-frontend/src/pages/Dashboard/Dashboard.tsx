import { useEffect, useState } from 'react';
import { Job } from '../../models/Job';
import { getActiveJobs, deleteJob } from '../../services/jobService';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

interface User {
  userID: number;
  name: string;
  email: string;
  phoneNumber: string;
  rating?: number;
  completedJobs?: number;
  avatar?: string;
}

interface DashboardProps {
  user: User;
  onLogout?: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const navigate = useNavigate();
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const handleDeleteJob = async (jobId: number) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    
    setDeletingId(jobId);
    try {
      const success = await deleteJob(jobId);
      if (success) {
        setActiveJobs(prev => prev.filter(job => job.jobID !== jobId));
      }
    } catch (err) {
      setError('Failed to delete job. Please try again.');
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const popularCategories = [
    { id: 1, name: "Cleaning", icon: "🧹", jobs: 124, route: "/jobs?category=cleaning" },
    { id: 2, name: "Moving", icon: "🚚", jobs: 89, route: "/jobs?category=moving" },
    { id: 3, name: "Gardening", icon: "🌿", jobs: 76, route: "/jobs?category=gardening" },
    { id: 4, name: "Assembly", icon: "🛠️", jobs: 65, route: "/jobs?category=assembly" },
    { id: 5, name: "Delivery", icon: "📦", jobs: 112, route: "/jobs?category=delivery" },
    { id: 6, name: "Handyman", icon: "🔧", jobs: 98, route: "/jobs?category=handyman" }
  ];

  const topWorkers = [
    { id: 1, name: "N Stevens", category: "Cleaning", rating: 4.9, completedJobs: 347, rate: "R200/hr", route: "/workers/1" },
    { id: 2, name: "T Tefera", category: "Gardening", rating: 4.8, completedJobs: 371, rate: "R250/hr", route: "/workers/2" },
    { id: 3, name: "M Maphalala", category: "Delivery", rating: 5.0, completedJobs: 198, rate: "R150/hr", route: "/workers/3" }
  ];

  const formattedJobs = activeJobs.map(job => ({
    id: job.jobID,
    title: job.title,
    date: new Date(job.postedAt).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    }),
    status: job.status,
    price: `R${job.budget}`,
    isOwner: job.postedBy === user.userID
  }));

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar user={user} onLogout={onLogout} />
        <main className="flex-1 p-4">
          <div className="text-center py-8">Loading jobs...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <Sidebar user={user} onLogout={onLogout} />
        <main className="flex-1 p-4">
          <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar user={user} onLogout={onLogout} />

      <main className="flex-1 p-4 max-w-4xl mx-auto">
        
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
              <p className="text-gray-600 mb-6">Find skilled workers for your tasks or post a new job</p>
              
              <div className="flex gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm flex-1 text-center">
                  <div className="text-xl font-bold text-blue-500">{user.rating || '4.5'}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Your Rating</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex-1 text-center">
                  <div className="text-xl font-bold text-blue-500">{user.completedJobs || 0}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Jobs Completed</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:w-80">
              <h3 className="font-bold text-lg mb-2">Post a new job</h3>
              <p className="text-gray-600 mb-4 text-sm">Describe what you need done and receive offers from skilled workers</p>
              <button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
                onClick={() => navigate('/post-job')}
              >
                Post a Job
              </button>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Active Jobs</h2>
            <button 
              className="text-blue-500 text-sm font-medium"
              onClick={() => navigate('/my-jobs')}
            >
              View all
            </button>
          </div>
          
          {formattedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {formattedJobs.map(job => (
                <div key={job.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium">{job.title}</h3>
                    <span className="font-bold text-blue-500">{job.price}</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-medium text-gray-800">Posted:</span> {job.date}</p>
                    <p><span className="font-medium text-gray-800">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        job.status === 'Assigned' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 border border-gray-300 rounded-md py-1 text-sm hover:bg-gray-50"
                      onClick={() => navigate(`/messages?job=${job.id}`)}
                    >
                      Message
                    </button>
                    <button 
                      className="flex-1 bg-blue-500 text-white rounded-md py-1 text-sm hover:bg-blue-600"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                      Details {job.isOwner} === null
                    </button>
                  </div>
                  {job.isOwner && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => navigate(`/jobs/${job.id}/edit`)}
                        className="w-full mb-2 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded-md text-xs font-medium"
                      >
                        Edit Job
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        disabled={deletingId === job.id}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md text-xs font-medium disabled:opacity-50"
                      >
                        {deletingId === job.id ? 'Deleting...' : 'Delete Job'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-600">You don't have any active jobs yet. Post a job to get started!</p>
              <button 
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
                onClick={() => navigate('/post-job')}
              >
                Post a Job
              </button>
            </div>
          )}
        </section>

      </main>
  
    </div>
  );
};

export default Dashboard;