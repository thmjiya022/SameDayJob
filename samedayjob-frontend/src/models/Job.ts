export interface Job {
	jobID: number;
	title: string;
	description: string;
	budget: number;
	location: string;
	status: string;
	postedAt: string;
	postedBy: number;
	categoryID: number;
	category?: {
		categoryID: number;
		name: string;
	};
	client?: {
		userID: number;
		name: string;
		email: string;
		phoneNumber: string;
	};
}