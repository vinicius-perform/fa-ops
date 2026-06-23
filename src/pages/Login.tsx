import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#090909] relative overflow-hidden text-white font-sans">
      {/* Dynamic Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#95ec00]/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="w-full max-w-[420px] p-8 md:p-10 relative z-10 animate-in-fade">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-[32px] font-bold tracking-tight text-center text-[#95ec00]">FA Ops</h1>
          <p className="text-[14px] text-white/50 mt-2 text-center font-medium">Operational Control & Client Execution</p>
        </div>

        <div className="premium-card bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-[13px] font-semibold text-white/70 ml-1">Email address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-white/30 group-focus-within:text-[#95ec00] transition-colors" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-11 h-12 rounded-xl bg-white/[0.05] border-transparent focus:bg-white/[0.08] focus:border-[#95ec00]/30 text-white placeholder:text-white/20 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" shifting className="text-[13px] font-semibold text-white/70">Password</Label>
                <button type="button" className="text-[12px] font-semibold text-[#95ec00] hover:opacity-80 transition-opacity">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-white/30 group-focus-within:text-[#95ec00] transition-colors" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-11 h-12 rounded-xl bg-white/[0.05] border-transparent focus:bg-white/[0.08] focus:border-[#95ec00]/30 text-white placeholder:text-white/20 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-bold text-[15px] transition-all mt-4 group shadow-[0_10px_20px_rgba(59,130,246,0.25)] active:scale-[0.98]" 
              disabled={loading}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>
                  Enter Dashboard <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-white/10" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/30">Secure Access</span>
            <span className="h-[1px] w-8 bg-white/10" />
          </div>
          <p className="text-center text-[12px] text-white/40 leading-relaxed max-w-[280px]">
            This system is for authorized personnel only. 
            All activity is monitored and recorded.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
