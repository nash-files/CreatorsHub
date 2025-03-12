
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  UploadCloud,
  ShoppingCart,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Heart,
  ShieldCheck,
  File,
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  
  // Get admin links
  const adminLinks = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Users, label: 'Creators', href: '/dashboard/creators' },
    { icon: ShieldCheck, label: 'Approvals', href: '/dashboard/approvals' },
    { icon: ShoppingCart, label: 'Resources', href: '/dashboard/resources' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  // Get creator links
  const creatorLinks = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: UploadCloud, label: 'Upload', href: '/dashboard/upload' },
    { icon: File, label: 'My Resources', href: '/dashboard/resources' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  // Get user links
  const userLinks = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: ShoppingCart, label: 'Purchases', href: '/dashboard/purchases' },
    { icon: Heart, label: 'Favorites', href: '/dashboard/favorites' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  // Determine which links to show based on user role
  const links = user?.role === 'admin' 
    ? adminLinks 
    : user?.role === 'creator' 
      ? creatorLinks 
      : userLinks;

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold">Creators Hub</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {links.map((link) => (
            <SidebarItem
              key={link.href}
              icon={link.icon}
              label={link.label}
              href={link.href}
            />
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
}
