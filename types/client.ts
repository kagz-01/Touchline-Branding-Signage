/* ── Client Dashboard Types ─────────────────────────────────── */

export type RequestType = 'quote' | 'delivery_note' | 'invoice' | 'general';
export type RequestStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'completed';
export type RequestPriority = 'low' | 'normal' | 'high' | 'urgent';

export type ProjectStatus = 'pending' | 'in_progress' | 'review' | 'completed' | 'delivered';
export type DocumentType = 'invoice' | 'delivery_note' | 'quotation' | 'receipt' | 'other';
export type DocumentStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue';

export interface ClientProfile {
  id: string;
  email: string;
  name: string;
  company_name?: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientRequest {
  id: string;
  client_id: string;
  type: RequestType;
  title: string;
  description: string;
  priority: RequestPriority;
  status: RequestStatus;
  division: 'branding' | 'signage';
  reference_number: string;
  attachments?: string[];
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export interface RequestMessage {
  id: string;
  request_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: 'client' | 'admin';
  content: string;
  attachments?: string[];
  created_at: string;
  read_at?: string;
}

export interface ClientProject {
  id: string;
  client_id: string;
  title: string;
  description: string;
  division: 'branding' | 'signage';
  status: ProjectStatus;
  reference_number: string;
  estimated_delivery?: string;
  actual_delivery?: string;
  total_amount?: number;
  currency: string;
  progress_percentage: number;
  timeline: ProjectTimelineEvent[];
  created_at: string;
  updated_at: string;
}

export interface ProjectTimelineEvent {
  id: string;
  label: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
}

export interface ClientDocument {
  id: string;
  client_id: string;
  project_id?: string;
  request_id?: string;
  type: DocumentType;
  title: string;
  file_url?: string;
  amount?: number;
  currency: string;
  status: DocumentStatus;
  due_date?: string;
  issued_at: string;
  reference_number: string;
  created_at: string;
}

export interface DashboardStats {
  active_projects: number;
  pending_requests: number;
  unread_messages: number;
  total_documents: number;
  recent_activity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'request_created' | 'request_updated' | 'message_received' | 'document_added' | 'project_updated';
  title: string;
  description: string;
  timestamp: string;
  link?: string;
}

