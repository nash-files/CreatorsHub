
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';
import { Download, Upload, Heart, BarChart3, Users, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Dashboard stats based on user role
  const stats = {
    admin: [
      { title: 'Total Users', value: '4,328', icon: Users, change: '+22%' },
      { title: 'Resources', value: '12,593', icon: Upload, change: '+15%' },
      { title: 'Downloads', value: '87,239', icon: Download, change: '+32%' },
      { title: 'Revenue', value: '$48,350', icon: BarChart3, change: '+12%' },
    ],
    creator: [
      { title: 'Your Resources', value: '24', icon: Upload, change: '+3' },
      { title: 'Downloads', value: '1,293', icon: Download, change: '+126' },
      { title: 'Revenue', value: '$580', icon: BarChart3, change: '+$45' },
      { title: 'Profile Views', value: '893', icon: Users, change: '+74' },
    ],
    user: [
      { title: 'Downloaded', value: '12', icon: Download, change: '' },
      { title: 'Favorites', value: '28', icon: Heart, change: '' },
      { title: 'Recent Views', value: '56', icon: BarChart3, change: '' },
      { title: 'Account Type', value: 'Free', icon: Settings, change: '' },
    ]
  };

  // Get the appropriate stats for the user role, defaulting to user stats
  const userStats = stats[user.role as keyof typeof stats] || stats.user;

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.name}</h1>
          <p className="text-muted-foreground mt-1">
            {user.role === 'admin' 
              ? 'Manage your platform and monitor activity'
              : user.role === 'creator'
                ? 'Manage your digital resources and track performance'
                : 'Discover and manage your favorite Ugandan resources'}
          </p>
        </div>
        {user.role === 'creator' && (
          <Button className="mt-4 md:mt-0">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Resource
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className="text-xs text-muted-foreground">
                  {stat.change} from last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {user.role === 'admin' && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          {/* Admin dashboard specific content */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
              <CardDescription>Monitor key metrics of Uganda's digital resource platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Admin-specific dashboard content would appear here</p>
            </CardContent>
          </Card>
        </div>
      )}

      {user.role === 'creator' && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Your Resources</h2>
          {/* Creator dashboard specific content */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Track how your Ugandan digital content is performing</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Creator-specific dashboard content would appear here</p>
            </CardContent>
          </Card>
        </div>
      )}

      {user.role === 'user' && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
          {/* User dashboard specific content */}
          <Card>
            <CardHeader>
              <CardTitle>Discover More</CardTitle>
              <CardDescription>Ugandan resources you might be interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <p>User-specific recommendations would appear here</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
