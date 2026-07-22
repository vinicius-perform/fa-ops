import { Sparkles } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

interface Props { title: string; description: string; }

export function PlaceholderPage({ title, description }: Props) {
  return (
    <div className="p-6 animate-in-fade">
      <EmptyState
        icon={Sparkles}
        title={title}
        description={description}
      />
    </div>
  );
}

export default function Placeholder() {
  return <PlaceholderPage title="Módulo em construção" description="Este módulo será entregue na próxima etapa." />;
}
