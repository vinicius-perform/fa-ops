import { useState, useRef } from "react";
import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { useData } from "@/hooks/useData";
import { FileDown, CheckSquare, Square, FileText } from "lucide-react";
import html2pdf from "html2pdf.js";
import { toast } from "sonner";
import { PriorityBadge } from "@/components/ui-blocks/Badges";

const Reports = () => {
  const { analyses } = useData();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const toggleSelectAll = () => {
    if (selectedIds.length === analyses.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(analyses.map(a => a.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const exportPdf = async () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one analysis to export.");
      return;
    }

    if (!printRef.current) return;

    setIsExporting(true);
    toast.info("Generating PDF...");

    const element = printRef.current;
    
    // Unhide for printing
    element.style.display = "block";

    const opt = {
      margin:       10,
      filename:     'relatorio_analises.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast.success("PDF exported successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export PDF.");
    } finally {
      // Hide again
      element.style.display = "none";
      setIsExporting(false);
    }
  };

  const selectedAnalyses = analyses.filter(a => selectedIds.includes(a.id));

  return (
    <>
      <Topbar 
        title="Reports" 
        subtitle="Select analyses to export their annotations as PDF" 
        actions={
          <TopbarPrimaryButton onClick={exportPdf} disabled={isExporting || selectedIds.length === 0}>
            <FileDown className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export to PDF"}
          </TopbarPrimaryButton>
        }
      />
      
      <div className="p-6 lg:p-10 animate-in-fade space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedIds.length} of {analyses.length} selected
          </div>
          <button 
            onClick={toggleSelectAll}
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {selectedIds.length === analyses.length && analyses.length > 0 ? (
              <><CheckSquare className="h-4 w-4" /> Deselect All</>
            ) : (
              <><Square className="h-4 w-4" /> Select All</>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analyses.map(a => {
            const isSelected = selectedIds.includes(a.id);
            return (
              <div 
                key={a.id} 
                onClick={() => toggleSelect(a.id)}
                className={`premium-card p-5 cursor-pointer transition-all border ${isSelected ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : 'hover:border-primary/30'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-5 w-5 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-input bg-background'}`}>
                      {isSelected && <CheckSquare className="h-4 w-4" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[15px]">{a.clientName}</h3>
                      <p className="text-[12px] text-muted-foreground">{a.responsible}</p>
                    </div>
                  </div>
                  <PriorityBadge priority={a.priority} />
                </div>
                <div className="mt-4 flex items-center gap-2 text-[12px] text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Has annotations</span>
                </div>
              </div>
            );
          })}
          
          {analyses.length === 0 && (
             <div className="col-span-full py-12 text-center text-muted-foreground">
                No analyses found.
             </div>
          )}
        </div>
      </div>

      {/* Hidden PDF Content */}
      <div style={{ display: 'none' }}>
        <div ref={printRef} className="p-10 bg-white text-[#1d1d1f] max-w-[800px] mx-auto font-sans">
          {/* Document Header */}
          <div className="border-b-4 border-[#95ec00] pb-6 mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-black">Relatório de Análises</h1>
              <p className="text-gray-500 mt-2 font-medium">Resumo Estratégico de Clientes</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Data de Emissão</p>
              <p className="text-lg font-semibold text-black">{new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
          
          <div className="space-y-12">
            {selectedAnalyses.map((a, index) => (
              <div key={a.id} className="break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
                {/* Client Header */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-black">{a.clientName}</h2>
                    <div className="text-sm text-gray-500 mt-1 font-medium">
                      <span className="font-semibold text-gray-700">Data:</span> {new Date(a.deadline).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
                
                {/* Notes Section */}
                <div className="pl-4 border-l-4 border-gray-200 ml-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Anotações Estratégicas</h3>
                  <div 
                    className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: a.notes || "<p className='italic text-gray-400'>Nenhuma anotação fornecida para este cliente.</p>" }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="mt-16 pt-6 border-t border-gray-100 text-center text-sm text-gray-400 font-medium">
            Documento gerado pelo sistema FA Ops — Uso Confidencial
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
