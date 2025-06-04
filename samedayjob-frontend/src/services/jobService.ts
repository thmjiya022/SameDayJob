// src/services/jobService.ts
import { Job } from "../models/Job";

const API_BASE_URL = 'http://localhost:5004/api/job';

export const getActiveJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export const getJobById = async (id: number): Promise<Job | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch job');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching job ${id}:`, error);
    return null;
  }
};

export const createJob = async (jobData: {
  title: string;
  description: string;
  budget: string;
  location: string;
  categoryID: number;
  postedBy: number;
}): Promise<Job | null> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create job');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating job:', error);
    return null;
  }
};