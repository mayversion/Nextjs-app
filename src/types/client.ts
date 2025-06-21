export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  tags?: string[];
  activities?: Activity[];
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  description: string;
  date: string;
}

export interface ClientFormData {
  firstName: string;
  lastName:string;
  email: string;
  phone: string;
} 