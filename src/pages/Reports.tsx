import { Topbar } from "@/components/layout/Topbar";
import { FileDown, FileSpreadsheet, Link2, BarChart3, Users, Briefcase, AlertTriangle, TrendingUp } from "lucide-react";

const reports = [
  { title: "Weekly Operational Report", desc: "All client activity, deliveries and blockers from the past 7 days.", icon: BarChart3, accent: "bg-primary/15" },
  { title: "Client Report", desc: "Per-client performance, analyses and pending actions snapshot.", icon: Briefcase, accent: "bg-info/15" },
  { title: "Team Productivity Report", desc: "Output, velocity and load distribution across your team.", icon: Users, accent: "bg-success/15" },
  { title: "Delays Report", desc: "Flagged risks, overdue tasks and at-risk accounts.", icon: AlertTriangle, accent: "bg-warning/15" },
  { title: "Performance Summary", desc: "Executive-level KPI summary across the entire operation.", icon: TrendingUp, accent: "bg-foreground/10" },
];

const Reports = () => (
  <>
    <Topbar title="Reports" subtitle="Generate and export operational reports" />
    <div className="p-6 lg:p-10 animate-in-fade">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reports.map(r => (
          <div key={r.title} className="premium-card p-6 group">
            <div className={`h-12 w-12 rounded-xl ${r.accent} grid place-items-center text-foreground`}>
              <r.icon className="h-5 w-5" />
            </div>
            <h3 className="text-[15px] font-semibold tracking-tight mt-4">{r.title}</h3>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed mt-1.5">{r.desc}</p>
            <div className="mt-5 pt-5 border-t border-border flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-foreground text-background text-[12px] font-semibold hover:bg-foreground/90 transition-colors">
                <FileDown className="h-3.5 w-3.5" /> PDF
              </button>
              <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-muted hover:bg-muted/70 text-foreground text-[12px] font-semibold transition-colors">
                <FileSpreadsheet className="h-3.5 w-3.5" /> Excel
              </button>
              <button className="ml-auto inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted text-[12px] font-semibold transition-colors">
                <Link2 className="h-3.5 w-3.5" /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default Reports;
