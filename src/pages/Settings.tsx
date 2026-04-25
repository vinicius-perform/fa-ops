import { Topbar } from "@/components/layout/Topbar";
import { Upload, Bell, Shield, Database, Moon, Palette } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "company", label: "Company", icon: Upload },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "permissions", label: "Permissions", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Moon },
  { id: "data", label: "Data & Backup", icon: Database },
];

const Settings = () => {
  const [active, setActive] = useState("company");
  const [color, setColor] = useState("#95ec00");
  return (
    <>
      <Topbar title="Settings" subtitle="Workspace, branding and preferences" />
      <div className="p-6 lg:p-10 animate-in-fade">
        <div className="grid grid-cols-1 lg:grid-cols-[220px,1fr] gap-6">
          <nav className="space-y-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors",
                  active === s.id ? "bg-foreground text-background" : "text-foreground hover:bg-muted"
                )}
              >
                <s.icon className="h-4 w-4" />
                {s.label}
              </button>
            ))}
          </nav>

          <div className="premium-card p-6 lg:p-8 space-y-6">
            <div>
              <h2 className="text-[17px] font-semibold tracking-tight">{sections.find(s => s.id === active)?.label}</h2>
              <p className="text-[12.5px] text-muted-foreground mt-1">Manage how this section behaves across your workspace.</p>
            </div>

            {active === "company" && (
              <div className="space-y-5">
                <Row label="Company name" hint="Displayed across the platform.">
                  <input defaultValue="FA Marketing" className="h-10 px-3 w-full rounded-xl bg-muted/60 border border-transparent focus:bg-background focus:border-border outline-none text-[13px]" />
                </Row>
                <Row label="Logo upload" hint="PNG or SVG, square aspect ratio.">
                  <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border-2 border-dashed border-border hover:border-foreground/40 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                    <Upload className="h-4 w-4" /> Upload logo
                  </button>
                </Row>
              </div>
            )}

            {active === "branding" && (
              <div className="space-y-5">
                <Row label="Brand color" hint="Used for accents, KPIs, focus states.">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl border border-border" style={{ background: color }} />
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-10 w-20 rounded-xl border border-border cursor-pointer" />
                    <input value={color} onChange={e => setColor(e.target.value)} className="h-10 px-3 rounded-xl bg-muted/60 outline-none text-[13px] font-mono" />
                  </div>
                </Row>
              </div>
            )}

            {active === "permissions" && (
              <div className="space-y-3">
                {["Director", "Coordinator", "Traffic Manager", "Designer"].map(role => (
                  <div key={role} className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div>
                      <p className="text-[13px] font-semibold">{role}</p>
                      <p className="text-[11.5px] text-muted-foreground">Configure access scopes per module</p>
                    </div>
                    <button className="text-[12px] font-semibold text-muted-foreground hover:text-foreground">Manage →</button>
                  </div>
                ))}
              </div>
            )}

            {active === "notifications" && (
              <div className="space-y-3">
                {["Task assigned to me", "Analysis updated", "Client status changed", "Weekly digest"].map(n => (
                  <Toggle key={n} label={n} defaultChecked />
                ))}
              </div>
            )}

            {active === "appearance" && (
              <div className="space-y-3">
                <Toggle label="Dark mode" />
                <Toggle label="Reduced motion" />
                <Toggle label="Compact density" />
              </div>
            )}

            {active === "data" && (
              <div className="space-y-3">
                <Row label="Backup" hint="Last backup: 2h ago">
                  <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-foreground text-background text-[13px] font-semibold">
                    <Database className="h-4 w-4" /> Backup now
                  </button>
                </Row>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Row = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-4 items-start py-4 border-t border-border first:border-0 first:pt-0">
    <div>
      <p className="text-[13px] font-semibold">{label}</p>
      {hint && <p className="text-[11.5px] text-muted-foreground mt-0.5">{hint}</p>}
    </div>
    <div>{children}</div>
  </div>
);

const Toggle = ({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) => {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border">
      <p className="text-[13px] font-medium">{label}</p>
      <button
        onClick={() => setOn(o => !o)}
        className={cn("h-6 w-10 rounded-full transition-colors relative", on ? "bg-primary" : "bg-muted")}
      >
        <span className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform",
          on ? "translate-x-[18px]" : "translate-x-0.5"
        )} />
      </button>
    </div>
  );
};

export default Settings;
