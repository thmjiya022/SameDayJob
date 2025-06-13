export interface Job {
  jobID: number;
  title: string;
  description: string;
  budget: number;
  location: string;
  status: string;
  postedAt: string;
  postedBy: {
    userID: number;
    name: string;
    email: string;
    phoneNumber: string;
  };
  category: {
    categoryID: number;
    name: string;
  };
  jobRequests?: any[];
  reviews?: any[];
  assignment?: any | null;
}