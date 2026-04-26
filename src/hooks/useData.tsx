import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  TeamMember,
  Client,
  Analysis,
  Task,
} from "@/data/mock";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface DataContextType {
  teamMembers: TeamMember[];
  clients: Client[];
  analyses: Analysis[];
  tasks: Task[];
  loading: boolean;
  addMember: (member: Omit<TeamMember, "id" | "status" | "assignedClients" | "avatarColor" | "initials">) => Promise<void>;
  addClient: (client: Omit<Client, "id" | "entryDate" | "team" | "pendingActions" | "lastAnalysis" | "logoColor" | "initials">) => Promise<void>;
  addAnalysis: (analysis: Omit<Analysis, "id" | "createdAt" | "status">) => Promise<void>;
  updateAnalysis: (id: string, analysis: Partial<Analysis>) => Promise<void>;
  deleteAnalysis: (id: string) => Promise<void>;
  addTask: (task: Omit<Task, "id" | "status">) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateClient: (id: string, updates: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  updateMember: (id: string, updates: Partial<TeamMember>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const avatarColors = ["bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-orange-500", "bg-rose-500", "bg-indigo-500"];
const logoColors = ["bg-primary", "bg-blue-600", "bg-purple-600", "bg-emerald-600", "bg-orange-600", "bg-rose-600"];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();

    // Set up Realtime subscriptions for multi-device sync
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'team_members' },
        () => fetchData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'clients' },
        () => fetchData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'analyses' },
        () => fetchData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [membersRes, clientsRes, analysesRes, tasksRes] = await Promise.all([
        supabase.from("team_members").select("*").order("name"),
        supabase.from("clients").select("*").order("name"),
        supabase.from("analyses").select("*").order("created_at", { ascending: false }),
        supabase.from("tasks").select("*").order("due_date", { ascending: true })
      ]);

      if (membersRes.data) {
        const mappedMembers = membersRes.data.map(m => ({
          ...m,
          assignedClients: m.assigned_clients || 0,
          assignedClientNames: m.assigned_client_names || [],
          avatarColor: m.avatar_color || "bg-primary"
        }));
        setTeamMembers(mappedMembers);
      }
      
      if (clientsRes.data) {
        const mappedClients = clientsRes.data.map(c => ({
          ...c,
          entryDate: c.entry_date,
          monthlyFee: c.monthly_fee,
          pendingActions: c.pending_actions,
          lastAnalysis: c.last_analysis,
          logoColor: c.logo_color
        }));
        setClients(mappedClients);
      }
      
      if (analysesRes.data) {
        const mappedAnalyses = analysesRes.data.map(a => ({
          ...a,
          clientId: a.client_id,
          clientName: a.client_name,
          currentSituation: a.current_situation,
          actionPlan: a.action_plan,
          createdAt: a.created_at
        }));
        setAnalyses(mappedAnalyses);
      }
      if (tasksRes.data) {
        const mappedTasks = tasksRes.data.map(t => ({
          ...t,
          clientName: t.client_name,
          dueDate: t.due_date
        }));
        setTasks(mappedTasks);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data from Supabase");
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (member: Omit<TeamMember, "id" | "status" | "assignedClients" | "avatarColor" | "initials" | "assignedClientNames">) => {
    const initials = member.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const dbMember = {
      name: member.name,
      role: member.role,
      department: member.department,
      email: member.email,
      phone: member.phone,
      status: "active",
      assigned_clients: 0,
      assigned_client_names: [],
      avatar_color: avatarColors[Math.floor(Math.random() * avatarColors.length)],
      initials
    };

    const { data, error } = await supabase.from("team_members").insert([dbMember]).select();
    if (error) {
      toast.error(`Error: ${error.message}`);
      console.error(error);
    } else if (data) {
      const mapped = {
        ...data[0],
        assignedClients: data[0].assigned_clients,
        assignedClientNames: data[0].assigned_client_names,
        avatarColor: data[0].avatar_color
      };
      setTeamMembers(prev => [mapped, ...prev]);
      toast.success("Member added successfully");
    }
  };

  const addClient = async (client: Omit<Client, "id" | "entryDate" | "pendingActions" | "lastAnalysis" | "logoColor" | "initials">) => {
    const initials = client.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const dbClient = {
      name: client.name,
      niche: client.niche,
      monthly_fee: client.monthlyFee,
      status: client.status,
      priority: client.priority,
      team: client.team,
      entry_date: new Date().toLocaleDateString(),
      pending_actions: 0,
      last_analysis: "Never",
      logo_color: logoColors[Math.floor(Math.random() * logoColors.length)],
      initials
    };

    const { data, error } = await supabase.from("clients").insert([dbClient]).select();
    if (error) {
      toast.error(`Error: ${error.message}`);
      console.error(error);
    } else if (data) {
      const mapped = {
        ...data[0],
        entryDate: data[0].entry_date,
        monthlyFee: data[0].monthly_fee,
        pendingActions: data[0].pending_actions,
        lastAnalysis: data[0].last_analysis,
        logoColor: data[0].logo_color
      };
      setClients(prev => [mapped, ...prev]);
      
      // Update team members assigned to this client
      if (client.team && client.team.length > 0) {
        const updatedMembers = teamMembers.map(m => {
          if (client.team.includes(m.id)) {
            const newClientNames = [...(m.assignedClientNames || []), client.name];
            return {
              ...m,
              assignedClients: (m.assignedClients || 0) + 1,
              assignedClientNames: newClientNames
            };
          }
          return m;
        });

        // Sync each member to Supabase
        for (const memberId of client.team) {
          const member = updatedMembers.find(m => m.id === memberId);
          if (member) {
            await supabase
              .from("team_members")
              .update({ 
                assigned_clients: member.assignedClients, 
                assigned_client_names: member.assignedClientNames 
              })
              .eq("id", memberId);
          }
        }
        
        setTeamMembers(updatedMembers);
      }
      
      toast.success("Client added successfully and linked to team members");
    }
  };

  const addAnalysis = async (analysis: Omit<Analysis, "id" | "createdAt" | "status">) => {
    const dbAnalysis = {
      client_id: analysis.clientId,
      client_name: analysis.clientName,
      current_situation: analysis.currentSituation,
      problems: analysis.problems,
      opportunities: analysis.opportunities,
      action_plan: analysis.actionPlan,
      responsible: analysis.responsible,
      deadline: analysis.deadline,
      priority: analysis.priority,
      notes: analysis.notes,
      status: "active"
    };

    const { data, error } = await supabase.from("analyses").insert([dbAnalysis]).select();
    if (error) {
      toast.error(`Error: ${error.message}`);
      console.error(error);
    } else if (data) {
      const mapped = {
        ...data[0],
        clientId: data[0].client_id,
        clientName: data[0].client_name,
        currentSituation: data[0].current_situation,
        actionPlan: data[0].action_plan
      };
      setAnalyses(prev => [mapped, ...prev]);
      toast.success("Analysis created successfully");
    }
  };

  const updateAnalysis = async (id: string, analysis: Partial<Analysis>) => {
    const dbUpdate: any = {};
    if (analysis.clientId) dbUpdate.client_id = analysis.clientId;
    if (analysis.clientName) dbUpdate.client_name = analysis.clientName;
    if (analysis.priority) dbUpdate.priority = analysis.priority;
    if (analysis.deadline) dbUpdate.deadline = analysis.deadline;
    if (analysis.notes) dbUpdate.notes = analysis.notes;
    if (analysis.status) dbUpdate.status = analysis.status;

    const { data, error } = await supabase.from("analyses").update(dbUpdate).eq("id", id).select();
    if (error) {
      toast.error(`Error: ${error.message}`);
    } else if (data) {
      const updated = {
        ...analysis,
        id: data[0].id,
        clientId: data[0].client_id,
        clientName: data[0].client_name,
        notes: data[0].notes,
        priority: data[0].priority,
        deadline: data[0].deadline,
        createdAt: data[0].created_at
      };
      setAnalyses(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
      toast.success("Analysis updated successfully");
    }
  };

  const deleteAnalysis = async (id: string) => {
    console.log("Attempting to delete analysis with ID:", id);
    const { error } = await supabase.from("analyses").delete().eq("id", id);
    if (error) {
      toast.error(`Error: ${error.message}`);
      console.error("Delete error:", error);
    } else {
      setAnalyses(prev => prev.filter(a => a.id !== id));
      toast.success("Analysis removed successfully");
    }
  };

  const addTask = async (task: Omit<Task, "id" | "status">) => {
    const dbTask = {
      title: task.title,
      client_name: task.clientName,
      responsible: task.responsible,
      due_date: task.dueDate,
      priority: task.priority,
      status: "pending"
    };

    const { data, error } = await supabase.from("tasks").insert([dbTask]).select();
    if (error) {
      toast.error(`Error: ${error.message}`);
      console.error("Task creation error:", error);
    } else if (data) {
      const mapped = {
        ...data[0],
        clientName: data[0].client_name,
        dueDate: data[0].due_date
      };
      setTasks(prev => [mapped, ...prev]);
      toast.success("Task created successfully");
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const dbUpdate: any = { ...updates };
    if (updates.clientName) {
      dbUpdate.client_name = updates.clientName;
      delete dbUpdate.clientName;
    }
    if (updates.dueDate) {
      dbUpdate.due_date = updates.dueDate;
      delete dbUpdate.dueDate;
    }

    const { data, error } = await supabase.from("tasks").update(dbUpdate).eq("id", id).select();
    if (error) {
      toast.error(`Error: ${error.message}`);
    } else if (data) {
      const mapped = {
        ...data[0],
        clientName: data[0].client_name,
        dueDate: data[0].due_date
      };
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...mapped } : t));
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      toast.error(`Error deleting task: ${error.message}`);
    } else {
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.success("Task removed successfully");
    }
  };

  const updateMember = async (id: string, updates: Partial<TeamMember>) => {
    const dbUpdates: any = { ...updates };
    
    // Map camelCase to snake_case for DB
    if (updates.assignedClients !== undefined) {
      dbUpdates.assigned_clients = updates.assignedClients;
      delete dbUpdates.assignedClients;
    }
    if (updates.assignedClientNames !== undefined) {
      dbUpdates.assigned_client_names = updates.assignedClientNames;
      delete dbUpdates.assignedClientNames;
    }
    if (updates.avatarColor !== undefined) {
      dbUpdates.avatar_color = updates.avatarColor;
      delete dbUpdates.avatarColor;
    }

    const { data, error } = await supabase
      .from("team_members")
      .update(dbUpdates)
      .eq("id", id)
      .select();

    if (error) {
      toast.error(`Error updating member: ${error.message}`);
      console.error(error);
    } else if (data) {
      const mapped = {
        ...data[0],
        assignedClients: data[0].assigned_clients,
        assignedClientNames: data[0].assigned_client_names,
        avatarColor: data[0].avatar_color
      };
      setTeamMembers(prev => prev.map(m => m.id === id ? mapped : m));
      toast.success("Member updated successfully");
    }
  };

  const updateClient = async (id: string, updates: Partial<Client>) => {
    const dbUpdates: any = { ...updates };
    
    if (updates.entryDate) {
      dbUpdates.entry_date = updates.entryDate;
      delete dbUpdates.entryDate;
    }
    if (updates.pendingActions !== undefined) {
      dbUpdates.pending_actions = updates.pendingActions;
      delete dbUpdates.pendingActions;
    }
    if (updates.lastAnalysis) {
      dbUpdates.last_analysis = updates.lastAnalysis;
      delete dbUpdates.lastAnalysis;
    }
    if (updates.logoColor) {
      dbUpdates.logo_color = updates.logoColor;
      delete dbUpdates.logoColor;
    }
    if (updates.monthlyFee !== undefined) {
      dbUpdates.monthly_fee = updates.monthlyFee;
      delete dbUpdates.monthlyFee;
    }

    const { data, error } = await supabase.from("clients").update(dbUpdates).eq("id", id).select();
    if (error) {
      toast.error(`Error updating client: ${error.message}`);
    } else if (data) {
      const mapped = {
        ...data[0],
        entryDate: data[0].entry_date,
        monthlyFee: data[0].monthly_fee,
        pendingActions: data[0].pending_actions,
        lastAnalysis: data[0].last_analysis,
        logoColor: data[0].logo_color
      };
      setClients(prev => prev.map(c => c.id === id ? { ...c, ...mapped } : c));
      toast.success("Client updated successfully");
    }
  };

  const deleteClient = async (id: string) => {
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) {
      toast.error(`Error deleting client: ${error.message}`);
    } else {
      setClients(prev => prev.filter(c => c.id !== id));
      toast.success("Client removed successfully");
    }
  };

  return (
    <DataContext.Provider value={{ 
      teamMembers, 
      clients, 
      analyses, 
      tasks, 
      loading, 
      addMember, 
      updateMember,
      addClient, 
      addAnalysis, 
      updateAnalysis,
      deleteAnalysis,
      addTask,
      updateTask,
      deleteTask,
      updateClient,
      deleteClient,
      updateMember
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
