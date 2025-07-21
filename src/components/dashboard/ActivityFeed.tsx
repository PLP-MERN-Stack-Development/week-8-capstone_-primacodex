import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { 
  CheckCircle, 
  UserPlus, 
  FileText, 
  MessageSquare,
  AlertTriangle 
} from 'lucide-react';
import Card from '../ui/Card';

interface Activity {
  id: string;
  type: 'task_completed' | 'user_joined' | 'project_created' | 'comment_added' | 'deadline_approaching';
  title: string;
  description: string;
  timestamp: Date;
  user: {
    name: string;
    avatar: string;
  };
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'task_completed',
    title: 'Task Completed',
    description: 'John completed "Design Homepage Layout"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    user: {
      name: 'John Doe',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  },
  {
    id: '2',
    type: 'user_joined',
    title: 'New Team Member',
    description: 'Sarah joined the Website Redesign project',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  },
  {
    id: '3',
    type: 'comment_added',
    title: 'New Comment',
    description: 'Mike commented on "API Integration" task',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    user: {
      name: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  },
  {
    id: '4',
    type: 'deadline_approaching',
    title: 'Deadline Reminder',
    description: 'User Authentication task due in 2 days',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    user: {
      name: 'System',
      avatar: '',
    },
  },
];

const ActivityFeed: React.FC = () => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle className="text-success-600" size={20} />;
      case 'user_joined':
        return <UserPlus className="text-primary-600" size={20} />;
      case 'project_created':
        return <FileText className="text-accent-600" size={20} />;
      case 'comment_added':
        return <MessageSquare className="text-secondary-600" size={20} />;
      case 'deadline_approaching':
        return <AlertTriangle className="text-warning-600" size={20} />;
      default:
        return <FileText className="text-gray-600" size={20} />;
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {mockActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {activity.description}
              </p>
              {activity.user.avatar && (
                <div className="flex items-center mt-2">
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {activity.user.name}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityFeed;