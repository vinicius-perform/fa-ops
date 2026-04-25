// Empty data — ready for real backend integration
export type Priority = "low" | "medium" | "high" | "urgent";
export type ClientStatus = "active" | "attention" | "waiting" | "delayed" | "growth" | "paused";
export type TaskStatus = "pending" | "in-progress" | "waiting" | "completed";
export type MemberStatus = "active" | "inactive";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: MemberStatus;
  assignedClients: number;
  assignedClientNames: string[]; // List of client names
  avatarColor: string;
  initials: string;
}

export interface Client {
  id: string;
  name: string;
  niche: string;
  monthlyFee: number;
  entryDate: string;
  team: string[];
  status: ClientStatus;
  priority: Priority;
  pendingActions: number;
  lastAnalysis: string;
  logoColor: string;
  initials: string;
}

export interface Analysis {
  id: string;
  clientId: string;
  clientName: string;
  currentSituation: string;
  problems: string;
  opportunities: string;
  actionPlan: string;
  responsible: string;
  deadline: string;
  priority: Priority;
  notes: string;
  createdAt: string;
  status: "draft" | "active" | "completed";
}

export interface Task {
  id: string;
  title: string;
  clientName: string;
  responsible: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  analysisId?: string;
}

export interface Activity {
  id: string;
  type: "analysis" | "task" | "client" | "member";
  title: string;
  meta: string;
  time: string;
}

export const teamMembers: TeamMember[] = [];
export const clients: Client[] = [];
export const analyses: Analysis[] = [];
export const tasks: Task[] = [];
export const activities: Activity[] = [];

export const priorityMeta: Record<Priority, { label: string; className: string; dot: string }> = {
  low: { label: "Low", className: "bg-muted text-muted-foreground border-border", dot: "bg-muted-foreground" },
  medium: { label: "Medium", className: "bg-info/10 text-info border-info/20", dot: "bg-info" },
  high: { label: "High", className: "bg-warning/10 text-warning border-warning/20", dot: "bg-warning" },
  urgent: { label: "Urgent", className: "bg-destructive/10 text-destructive border-destructive/20", dot: "bg-destructive" },
};

export const clientStatusMeta: Record<ClientStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-success/10 text-success border-success/20" },
  attention: { label: "Attention", className: "bg-warning/10 text-warning border-warning/20" },
  waiting: { label: "Waiting Client", className: "bg-info/10 text-info border-info/20" },
  delayed: { label: "Delayed", className: "bg-destructive/10 text-destructive border-destructive/20" },
  growth: { label: "Growth", className: "bg-primary/15 text-foreground border-primary/30" },
  paused: { label: "Paused", className: "bg-muted text-muted-foreground border-border" },
};

export const taskStatusMeta: Record<TaskStatus, { label: string; accent: string }> = {
  pending: { label: "Pending", accent: "bg-muted-foreground" },
  "in-progress": { label: "In Progress", accent: "bg-info" },
  waiting: { label: "Waiting", accent: "bg-warning" },
  completed: { label: "Completed", accent: "bg-success" },
};

// Empty chart datasets
export const tasksByStatus = [
  { name: "Pending", value: 0 },
  { name: "In Progress", value: 0 },
  { name: "Waiting", value: 0 },
  { name: "Completed", value: 0 },
];

export const clientsBySector: { name: string; value: number }[] = [];

export const teamProductivity: { name: string; completed: number; open: number }[] = [];

export const weeklyFlow = [
  { day: "Mon", analyses: 0, tasks: 0 },
  { day: "Tue", analyses: 0, tasks: 0 },
  { day: "Wed", analyses: 0, tasks: 0 },
  { day: "Thu", analyses: 0, tasks: 0 },
  { day: "Fri", analyses: 0, tasks: 0 },
  { day: "Sat", analyses: 0, tasks: 0 },
  { day: "Sun", analyses: 0, tasks: 0 },
];
