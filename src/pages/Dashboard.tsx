import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  CheckSquare, 
  Clock, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Calendar,
  Target
} from 'lucide-react';
import { useProjectStore } from '../stores/projectStore';
import StatsCard from '../components/dashboard/StatsCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import ProjectProgress from '../components/dashboard/ProjectProgress';
import Card from '../components/ui/Card';

const Dashboard: React.FC = () => {
  const { dashboardStats, fetchDashboardStats, fetchProjects, fetchTasks } = useProjectStore();

  useEffect(() => {
    const loadData = async () => {
      await fetchProjects();
      await fetchTasks();
      await fetchDashboardStats();
    };
    loadData();
  }, [fetchProjects, fetchTasks, fetchDashboardStats]);

  const statsCards = [
    {
      title: 'Total Projects',
      value: dashboardStats.totalProjects,
      change: { value: 12, trend: 'up' as const },
      icon: BarChart3,
      color: 'primary' as const,
    },
    {
      title: 'Active Projects',
      value: dashboardStats.activeProjects,
      change: { value: 8, trend: 'up' as const },
      icon: Target,
      color: 'success' as const,
    },
    {
      title: 'Completed Tasks',
      value: dashboardStats.completedTasks,
      change: { value: 15, trend: 'up' as const },
      icon: CheckSquare,
      color: 'secondary' as const,
    },
    {
      title: 'Pending Tasks',
      value: dashboardStats.pendingTasks,
      change: { value: 5, trend: 'down' as const },
      icon: Clock,
      color: 'warning' as const,
    },
    {
      title: 'Overdue Tasks',
      value: dashboardStats.overdueTasks,
      icon: AlertTriangle,
      color: 'error' as const,
    },
    {
      title: 'Team Members',
      value: dashboardStats.teamMembers,
      change: { value: 20, trend: 'up' as const },
      icon: Users,
      color: 'accent' as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Card className="px-4 py-2">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar size={16} className="text-primary-600" />
              <span className="text-gray-700 dark:text-gray-300">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectProgress />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ActivityFeed />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Create Project', icon: Target, color: 'primary' },
              { name: 'Add Task', icon: CheckSquare, color: 'success' },
              { name: 'Invite Member', icon: Users, color: 'secondary' },
              { name: 'View Reports', icon: TrendingUp, color: 'accent' },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-${action.color}-500 transition-colors text-center group`}
                >
                  <Icon 
                    size={24} 
                    className={`mx-auto mb-2 text-gray-400 group-hover:text-${action.color}-600 transition-colors`} 
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {action.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;