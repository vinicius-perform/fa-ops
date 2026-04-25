// Mock data for FA Ops — premium operational system
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

export const teamMembers: TeamMember[] = [
  { id: "t1", name: "Camila Andrade", role: "Director", department: "Leadership", email: "camila@faops.com", phone: "+55 11 98000-1001", status: "active", assignedClients: 8, avatarColor: "bg-violet-500", initials: "CA" },
  { id: "t2", name: "Rafael Souza", role: "Coordinator", department: "Operations", email: "rafael@faops.com", phone: "+55 11 98000-1002", status: "active", assignedClients: 6, avatarColor: "bg-blue-500", initials: "RS" },
  { id: "t3", name: "Marina Costa", role: "Traffic Manager", department: "Performance", email: "marina@faops.com", phone: "+55 11 98000-1003", status: "active", assignedClients: 5, avatarColor: "bg-emerald-500", initials: "MC" },
  { id: "t4", name: "Lucas Pereira", role: "Social Media", department: "Content", email: "lucas@faops.com", phone: "+55 11 98000-1004", status: "active", assignedClients: 4, avatarColor: "bg-rose-500", initials: "LP" },
  { id: "t5", name: "Beatriz Lima", role: "Designer", department: "Creative", email: "bea@faops.com", phone: "+55 11 98000-1005", status: "active", assignedClients: 7, avatarColor: "bg-amber-500", initials: "BL" },
  { id: "t6", name: "Thiago Rocha", role: "Video Editor", department: "Creative", email: "thiago@faops.com", phone: "+55 11 98000-1006", status: "active", assignedClients: 3, avatarColor: "bg-indigo-500", initials: "TR" },
  { id: "t7", name: "Juliana Mello", role: "SDR", department: "Sales", email: "ju@faops.com", phone: "+55 11 98000-1007", status: "active", assignedClients: 0, avatarColor: "bg-pink-500", initials: "JM" },
  { id: "t8", name: "Pedro Alves", role: "Closer", department: "Sales", email: "pedro@faops.com", phone: "+55 11 98000-1008", status: "inactive", assignedClients: 0, avatarColor: "bg-slate-500", initials: "PA" },
  { id: "t9", name: "Isabela Ramos", role: "Designer", department: "Creative", email: "isa@faops.com", phone: "+55 11 98000-1009", status: "active", assignedClients: 5, avatarColor: "bg-teal-500", initials: "IR" },
  { id: "t10", name: "Gabriel Nunes", role: "Traffic Manager", department: "Performance", email: "gabriel@faops.com", phone: "+55 11 98000-1010", status: "active", assignedClients: 4, avatarColor: "bg-orange-500", initials: "GN" },
];

export const clients: Client[] = [
  { id: "c1", name: "Lumen Cosmetics", niche: "Beauty", monthlyFee: 12500, entryDate: "2024-08-12", team: ["t3", "t5", "t4"], status: "active", priority: "high", pendingActions: 3, lastAnalysis: "2 days ago", logoColor: "bg-rose-500", initials: "LC" },
  { id: "c2", name: "Northwave Capital", niche: "Finance", monthlyFee: 28000, entryDate: "2024-03-04", team: ["t2", "t3", "t6"], status: "growth", priority: "urgent", pendingActions: 5, lastAnalysis: "Today", logoColor: "bg-blue-500", initials: "NC" },
  { id: "c3", name: "Verde Foods", niche: "Food & Bev", monthlyFee: 8400, entryDate: "2025-01-22", team: ["t4", "t9"], status: "attention", priority: "high", pendingActions: 4, lastAnalysis: "5 days ago", logoColor: "bg-emerald-500", initials: "VF" },
  { id: "c4", name: "Atlas Real Estate", niche: "Real Estate", monthlyFee: 18900, entryDate: "2023-11-09", team: ["t1", "t10", "t5"], status: "active", priority: "medium", pendingActions: 2, lastAnalysis: "Yesterday", logoColor: "bg-amber-500", initials: "AR" },
  { id: "c5", name: "Pulse Fitness", niche: "Health & Fitness", monthlyFee: 6500, entryDate: "2025-02-14", team: ["t4", "t6"], status: "waiting", priority: "low", pendingActions: 1, lastAnalysis: "1 week ago", logoColor: "bg-indigo-500", initials: "PF" },
  { id: "c6", name: "Orbit Tech", niche: "SaaS", monthlyFee: 22000, entryDate: "2024-06-18", team: ["t2", "t3", "t9"], status: "growth", priority: "high", pendingActions: 6, lastAnalysis: "Today", logoColor: "bg-violet-500", initials: "OT" },
  { id: "c7", name: "Mont Joalheria", niche: "Luxury", monthlyFee: 15800, entryDate: "2024-10-30", team: ["t5", "t6"], status: "delayed", priority: "urgent", pendingActions: 7, lastAnalysis: "10 days ago", logoColor: "bg-yellow-600", initials: "MJ" },
  { id: "c8", name: "Núcleo Saúde", niche: "Healthcare", monthlyFee: 11200, entryDate: "2024-12-01", team: ["t3", "t4"], status: "active", priority: "medium", pendingActions: 2, lastAnalysis: "3 days ago", logoColor: "bg-teal-500", initials: "NS" },
  { id: "c9", name: "Forma Studio", niche: "Architecture", monthlyFee: 7300, entryDate: "2025-03-05", team: ["t9", "t6"], status: "paused", priority: "low", pendingActions: 0, lastAnalysis: "2 weeks ago", logoColor: "bg-slate-500", initials: "FS" },
  { id: "c10", name: "Brava Beachwear", niche: "Fashion", monthlyFee: 9800, entryDate: "2024-09-21", team: ["t4", "t5", "t10"], status: "attention", priority: "high", pendingActions: 4, lastAnalysis: "4 days ago", logoColor: "bg-pink-500", initials: "BB" },
];

export const analyses: Analysis[] = [
  {
    id: "a1", clientId: "c2", clientName: "Northwave Capital",
    currentSituation: "Lead generation at all-time high (+38% MoM) but conversion in qualification stage dropped 12%.",
    problems: "SDR follow-up gap on day 2-4. Landing page load above 3.2s on mobile. Creative fatigue on top 3 ads.",
    opportunities: "Launch retargeting layer for warm leads. Refresh creatives with founder-led UGC. Test long-form VSL.",
    actionPlan: "1) Implement automated 7-touch sequence  2) Compress hero video and lazy-load below-fold assets  3) Produce 6 new creatives by Friday",
    responsible: "Marina Costa", deadline: "2025-05-02", priority: "urgent", notes: "Client asked for weekly sync starting next Monday.",
    createdAt: "2025-04-23", status: "active",
  },
  {
    id: "a2", clientId: "c1", clientName: "Lumen Cosmetics",
    currentSituation: "Organic growing steadily, paid CAC stable at R$ 42.",
    problems: "Inventory mismatch on bestseller. Email open rate down 8%.",
    opportunities: "Bundle launch for Mother's Day. Influencer seeding to nano creators.",
    actionPlan: "Launch bundle by Apr 30, send to 25 nano influencers, refresh email subject line tests.",
    responsible: "Lucas Pereira", deadline: "2025-04-30", priority: "high", notes: "Coordinate with stock manager.",
    createdAt: "2025-04-22", status: "active",
  },
  {
    id: "a3", clientId: "c7", clientName: "Mont Joalheria",
    currentSituation: "ROAS dropped from 4.2 to 2.1 over last 3 weeks.",
    problems: "Audience saturation. No new creative shipped in 5 weeks.",
    opportunities: "Reposition as gift-first brand. Test premium audience layer.",
    actionPlan: "Full creative refresh + audience expansion test. Pause underperforming ad sets.",
    responsible: "Beatriz Lima", deadline: "2025-04-28", priority: "urgent", notes: "Escalated by director.",
    createdAt: "2025-04-19", status: "active",
  },
  {
    id: "a4", clientId: "c3", clientName: "Verde Foods",
    currentSituation: "New product line launching in 2 weeks.",
    problems: "Brand assets incomplete. Tracking pixel misfiring on checkout.",
    opportunities: "Launch teaser campaign, build waitlist.",
    actionPlan: "Fix tracking by Apr 26, ship teaser creatives by Apr 27, open waitlist Apr 29.",
    responsible: "Isabela Ramos", deadline: "2025-04-29", priority: "high", notes: "",
    createdAt: "2025-04-21", status: "active",
  },
  {
    id: "a5", clientId: "c6", clientName: "Orbit Tech",
    currentSituation: "Trial-to-paid conversion at 18%, target 25%.",
    problems: "Onboarding drop-off at step 3. Support response time 4h.",
    opportunities: "In-app tour redesign. Hire weekend support.",
    actionPlan: "Ship new onboarding flow Apr 30, evaluate weekend support hire.",
    responsible: "Rafael Souza", deadline: "2025-05-05", priority: "high", notes: "",
    createdAt: "2025-04-20", status: "active",
  },
];

export const tasks: Task[] = [
  { id: "k1", title: "Refresh creative pack — 6 new ads", clientName: "Northwave Capital", responsible: "Beatriz Lima", dueDate: "2025-04-28", priority: "urgent", status: "in-progress", analysisId: "a1" },
  { id: "k2", title: "Set up retargeting layer (warm)", clientName: "Northwave Capital", responsible: "Marina Costa", dueDate: "2025-04-29", priority: "urgent", status: "pending", analysisId: "a1" },
  { id: "k3", title: "Compress hero video LP", clientName: "Northwave Capital", responsible: "Thiago Rocha", dueDate: "2025-04-26", priority: "high", status: "in-progress", analysisId: "a1" },
  { id: "k4", title: "Mother's Day bundle launch", clientName: "Lumen Cosmetics", responsible: "Lucas Pereira", dueDate: "2025-04-30", priority: "high", status: "pending", analysisId: "a2" },
  { id: "k5", title: "Brief 25 nano influencers", clientName: "Lumen Cosmetics", responsible: "Lucas Pereira", dueDate: "2025-04-27", priority: "medium", status: "in-progress", analysisId: "a2" },
  { id: "k6", title: "Email subject A/B test", clientName: "Lumen Cosmetics", responsible: "Camila Andrade", dueDate: "2025-04-29", priority: "medium", status: "waiting", analysisId: "a2" },
  { id: "k7", title: "Audience expansion test", clientName: "Mont Joalheria", responsible: "Marina Costa", dueDate: "2025-04-28", priority: "urgent", status: "in-progress", analysisId: "a3" },
  { id: "k8", title: "Creative refresh — 8 statics", clientName: "Mont Joalheria", responsible: "Beatriz Lima", dueDate: "2025-04-27", priority: "urgent", status: "pending", analysisId: "a3" },
  { id: "k9", title: "Fix checkout pixel", clientName: "Verde Foods", responsible: "Rafael Souza", dueDate: "2025-04-26", priority: "high", status: "in-progress", analysisId: "a4" },
  { id: "k10", title: "Teaser creatives — product launch", clientName: "Verde Foods", responsible: "Isabela Ramos", dueDate: "2025-04-27", priority: "high", status: "pending", analysisId: "a4" },
  { id: "k11", title: "Open waitlist landing page", clientName: "Verde Foods", responsible: "Isabela Ramos", dueDate: "2025-04-29", priority: "medium", status: "waiting", analysisId: "a4" },
  { id: "k12", title: "Onboarding flow redesign", clientName: "Orbit Tech", responsible: "Rafael Souza", dueDate: "2025-04-30", priority: "high", status: "in-progress", analysisId: "a5" },
  { id: "k13", title: "Weekend support hiring brief", clientName: "Orbit Tech", responsible: "Camila Andrade", dueDate: "2025-05-02", priority: "medium", status: "pending", analysisId: "a5" },
  { id: "k14", title: "Quarterly performance deck", clientName: "Atlas Real Estate", responsible: "Camila Andrade", dueDate: "2025-04-25", priority: "high", status: "completed" },
  { id: "k15", title: "Pixel audit", clientName: "Pulse Fitness", responsible: "Marina Costa", dueDate: "2025-04-22", priority: "low", status: "completed" },
  { id: "k16", title: "Brand guidelines v2", clientName: "Núcleo Saúde", responsible: "Beatriz Lima", dueDate: "2025-04-23", priority: "medium", status: "completed" },
  { id: "k17", title: "Reels production batch", clientName: "Brava Beachwear", responsible: "Thiago Rocha", dueDate: "2025-04-29", priority: "high", status: "in-progress" },
];

export const activities: Activity[] = [
  { id: "ac1", type: "analysis", title: "New analysis created for Northwave Capital", meta: "by Marina Costa", time: "12 min ago" },
  { id: "ac2", type: "task", title: "Task completed: Quarterly performance deck", meta: "Atlas Real Estate · Camila Andrade", time: "48 min ago" },
  { id: "ac3", type: "client", title: "Mont Joalheria status changed to Delayed", meta: "by Camila Andrade", time: "2h ago" },
  { id: "ac4", type: "task", title: "3 tasks moved to In Progress", meta: "Northwave Capital", time: "3h ago" },
  { id: "ac5", type: "member", title: "New member added: Gabriel Nunes", meta: "Traffic Manager · Performance", time: "Yesterday" },
  { id: "ac6", type: "analysis", title: "Analysis updated: Verde Foods", meta: "by Isabela Ramos", time: "Yesterday" },
  { id: "ac7", type: "client", title: "Brava Beachwear priority raised to High", meta: "by Rafael Souza", time: "2 days ago" },
];

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

// Chart datasets
export const tasksByStatus = [
  { name: "Pending", value: tasks.filter(t => t.status === "pending").length },
  { name: "In Progress", value: tasks.filter(t => t.status === "in-progress").length },
  { name: "Waiting", value: tasks.filter(t => t.status === "waiting").length },
  { name: "Completed", value: tasks.filter(t => t.status === "completed").length },
];

export const clientsBySector = [
  { name: "Beauty", value: 1 },
  { name: "Finance", value: 1 },
  { name: "Food", value: 1 },
  { name: "Real Estate", value: 1 },
  { name: "Fitness", value: 1 },
  { name: "SaaS", value: 1 },
  { name: "Luxury", value: 1 },
  { name: "Health", value: 1 },
  { name: "Architecture", value: 1 },
  { name: "Fashion", value: 1 },
];

export const teamProductivity = teamMembers.slice(0, 7).map(m => ({
  name: m.name.split(" ")[0],
  completed: Math.floor(Math.random() * 12) + 4,
  open: Math.floor(Math.random() * 8) + 2,
}));

export const weeklyFlow = [
  { day: "Mon", analyses: 4, tasks: 18 },
  { day: "Tue", analyses: 6, tasks: 22 },
  { day: "Wed", analyses: 3, tasks: 16 },
  { day: "Thu", analyses: 7, tasks: 25 },
  { day: "Fri", analyses: 5, tasks: 21 },
  { day: "Sat", analyses: 1, tasks: 6 },
  { day: "Sun", analyses: 0, tasks: 2 },
];
