
import { BarChart3, Download, Upload, Users } from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function Stat({ icon, value, label }: StatProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
        {icon}
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 container">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Trusted by Creators Worldwide</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join our growing community of creators and customers making the most of digital resources
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <Stat 
          icon={<Users className="h-6 w-6" />} 
          value="10,000+" 
          label="Active Creators" 
        />
        <Stat 
          icon={<Upload className="h-6 w-6" />} 
          value="50,000+" 
          label="Resources" 
        />
        <Stat 
          icon={<Download className="h-6 w-6" />} 
          value="1M+" 
          label="Downloads" 
        />
        <Stat 
          icon={<BarChart3 className="h-6 w-6" />} 
          value="$5M+" 
          label="Creator Earnings" 
        />
      </div>
    </section>
  );
}
