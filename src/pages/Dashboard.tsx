import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Activity as ActivityIcon, 
  Target, 
  ArrowUpRight, 
  AlertCircle,
  Clock,
  Sparkles,
  FileSearch,
  ListChecks,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { useData } from "@/hooks/useData";
import { NewAnalysisDialog } from "@/components/forms/NewAnalysisDialog";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { clients, teamMembers, tasks, analyses } = useData();

  // Calculate real-time stats
  const pendingTasks = tasks.filter(t => t.status !== "completed");
  const pendingTasksCount = pendingTasks.length;
  const criticalCasesCount = clients.filter(c => c.status === "attention" || c.status === "delayed").length;

  // Summaries
  const topTasks = pendingTasks.slice(0, 4); // Show up to 4 urgent tasks in the dark card
  const topAnalyses = analyses.slice(0, 3); // Second most important info
  const topTeam = teamMembers.slice(0, 4);

  return (
    <>
      <Topbar
        title="Command Center"
        subtitle="Priority tasks and strategic insights"
        actions={
          <NewAnalysisDialog>
            <TopbarPrimaryButton>New analysis</TopbarPrimaryButton>
          </NewAnalysisDialog>
        }
      />

      <div className="p-6 lg:p-10 space-y-10 animate-in-fade max-w-7xl mx-auto">
        
        {/* Top Section: MAIN PRIORITY (Tasks in Dark Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Priority: Tasks (Dark Card) */}
          <div className="lg:col-span-2 bg-[#121212] rounded-[40px] p-8 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#95ec00]/10 grid place-items-center">
                  <ListChecks className="h-6 w-6 text-[#95ec00]" />
                </div>
                <div>
                  <h2 className="text-[24px] font-bold text-white tracking-tight leading-none">Registro de Checkpoints</h2>
                  <p className="text-white/30 text-[12px] mt-2 font-bold tracking-widest uppercase">Principais tarefas operacionais</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 grid place-items-center">
                <span className="text-[#95ec00] font-black text-[18px]">{pendingTasksCount}</span>
              </div>
            </div>

            <div className="space-y-3">
              {topTasks.length === 0 ? (
                <p className="text-white/20 text-[14px] italic p-8 text-center border border-white/5 rounded-[24px] bg-white/[0.02]">Tudo em dia por aqui! Nenhuma tarefa pendente.</p>
              ) : (
                topTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="bg-white/5 hover:bg-white/10 p-5 rounded-[24px] border border-white/5 transition-all flex items-center justify-between group/item cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-10 w-10 rounded-full border-2 border-[#95ec00]/20 group-hover/item:border-[#95ec00] transition-colors grid place-items-center">
                        <div className="h-2 w-2 rounded-full bg-[#95ec00]" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-[17px] tracking-tight">{task.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-white/30 text-[11px] font-bold uppercase tracking-wider">{task.clientName}</span>
                          <span className="h-1 w-1 rounded-full bg-white/10" />
                          <span className="text-white/40 text-[11px] font-medium">{task.responsible}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 text-white/50 text-[12px] font-bold">
                        <Calendar className="h-3.5 w-3.5 text-[#95ec00]" />
                        {new Date(task.dueDate).toLocaleDateString(undefined, { day: "2-digit", month: "2-digit" })}
                      </div>
                      <ArrowUpRight className="h-6 w-6 text-white/10 group-hover/item:text-[#95ec00] transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#95ec00]/5 blur-[100px] rounded-full pointer-events-none" />
          </div>

          {/* Urgency Summary (White Card) */}
          <div className="bg-white rounded-[40px] p-8 shadow-xl border border-black/5 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-50 grid place-items-center">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <h2 className="text-[18px] font-bold text-[#1d1d1f] tracking-tight leading-none">Alertas de Urgência</h2>
            </div>

            <div className="my-8">
              <span className="text-[100px] font-black text-red-500 leading-none tracking-tighter">
                {criticalCasesCount}
              </span>
              <p className="text-[11px] font-bold text-black/30 uppercase tracking-[0.2em] mt-1">
                Clientes requerendo atenção
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-black/5">
              <p className="text-[12px] font-bold text-black/40 uppercase tracking-widest">Resumo de Status</p>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#1d1d1f]">Total de Clientes</span>
                <span className="text-[14px] font-bold text-[#95ec00]">{clients.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#1d1d1f]">Membros Ativos</span>
                <span className="text-[14px] font-bold text-blue-500">{teamMembers.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Secondary Priority: Analyses (Large Card Below) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Analysis Summary (Prominent White Card) */}
          <div className="lg:col-span-2 bg-white rounded-[40px] p-8 shadow-xl border border-black/5">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 grid place-items-center">
                  <FileSearch className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-[20px] font-bold text-[#1d1d1f] tracking-tight leading-none">Análises Estratégicas</h2>
                  <p className="text-black/30 text-[12px] mt-1 font-bold tracking-wider uppercase">Últimos diagnósticos realizados</p>
                </div>
              </div>
              <button className="text-[13px] font-bold text-amber-600 hover:underline transition-all">Ver todas</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topAnalyses.length === 0 ? (
                <div className="col-span-3 p-8 text-center text-muted-foreground italic text-[14px]">Nenhuma análise estratégica registrada.</div>
              ) : (
                topAnalyses.map(analysis => (
                  <div key={analysis.id} className="p-6 rounded-[32px] bg-[#f5f5f7] border border-black/5 hover:border-amber-200 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-8 w-8 rounded-full bg-white grid place-items-center shadow-sm">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold uppercase px-2 py-1 rounded-md",
                        analysis.priority === "high" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                      )}>
                        {analysis.priority}
                      </span>
                    </div>
                    <h4 className="text-[15px] font-bold text-[#1d1d1f] truncate mb-1">{analysis.clientName}</h4>
                    <p className="text-[11px] text-black/30 font-bold uppercase tracking-widest leading-tight">
                      Por: {analysis.responsible}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Team Workload Summary */}
          <div className="bg-white rounded-[40px] p-8 shadow-xl border border-black/5 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 grid place-items-center">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-[18px] font-bold text-[#1d1d1f] tracking-tight">Equipe</h2>
            </div>

            <div className="space-y-4 flex-1">
              {topTeam.map(member => (
                <div key={member.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-8 w-8 rounded-lg grid place-items-center text-white text-[10px] font-bold shadow-sm", member.avatarColor)}>
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#1d1d1f] leading-none">{member.name}</p>
                      <p className="text-[10px] text-black/30 font-bold uppercase mt-1 tracking-wider">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-black text-emerald-600 leading-none">{member.assignedClients || 0}</p>
                    <p className="text-[9px] text-black/30 font-bold uppercase mt-1">Clientes</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;
