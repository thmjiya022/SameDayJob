import { Job } from "../models/Job";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5004/api';

interface JobCategory {
  id: number;
  name: string;
}

interface JobCreateRequest {
  title: string;
  description: string;
  budget: string;
  location: string;
  categoryID: number;
  postedBy: number;
}

export const getActiveJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/job`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export const getJobCategories = async (): Promise<JobCategory[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobcategory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job categories:", error);
    return [];
  }
};

export const getJobById = async (id: number): Promise<Job | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/job/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch job');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching job ${id}:`, error);
    return null;
  }
};

export const createJob = async (jobData: JobCreateRequest): Promise<Job | null> => {
  try {
      const response = await fetch(`${API_BASE_URL}/job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData)
    });

    console.log(jobData);

    if (!response.ok) {
      throw new Error('Failed to create job');
    }
      return await response.json();
    } catch (error) {
      console.error('Error creating job:', error);
      return null;
    }
};
