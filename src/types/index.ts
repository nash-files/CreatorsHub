
export type UserRole = 'admin' | 'creator' | 'user';

export type PackageType = 'basic' | 'premium' | 'professional';

export type ResourceCategory = 
  | 'educational' 
  | 'industrial' 
  | 'commercial' 
  | 'photography' 
  | 'videography' 
  | 'graphics' 
  | 'music' 
  | 'audio' 
  | 'coding';

export type ResourceStatus = 'pending' | 'approved' | 'rejected';

export type ResourceType = 'image' | 'document' | 'video' | 'audio' | 'design' | 'photography' | 'videography';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface Creator extends User {
  bio?: string;
  packageType: PackageType;
  resources: Resource[];
  earnings: number;
  isVerified: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  fileUrl: string;
  price: number;
  creatorId: string;
  category: ResourceCategory;
  type: ResourceType;
  tags: string[];
  status: ResourceStatus;
  downloads: number;
  createdAt: string;
  updatedAt: string;
}

export interface Package {
  id: PackageType;
  name: string;
  price: number;
  description: string;
  features: string[];
  resourceLimit: number;
  commission: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}
