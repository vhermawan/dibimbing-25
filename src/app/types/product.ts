export interface Product {
	id: string;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}