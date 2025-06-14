export interface Job {
  jobID: number;
  title: string;
  description: string;
  budget: number;
  location: string;
  categoryID: number;
  postedBy: number;
  postedAt: string;
  status: string;
}