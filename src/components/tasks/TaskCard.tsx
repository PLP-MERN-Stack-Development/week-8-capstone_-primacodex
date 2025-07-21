import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, MessageSquare, Paperclip, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '../../types';
import Card from '../ui/Card';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  onStatusChange?: (taskId: string, status: Task['status']) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onClick,
  onStatusChange,
}) => {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
      case 'in-progress':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400';
      case 'review':
        return 'bg-accent-100 text-accent-800 dark:bg-accent-900/20 dark:text-accent-400';
      case 'completed':
        return 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'text-error-500';
      case 'high':
        return 'text-accent-500';
      case 'medium':
        return 'text-warning-500';
      case 'low':
        return 'text-success-500';
      default:
        return 'text-gray-500';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        hover 
        className={`p-4 cursor-pointer transition-all duration-200 ${
          isOverdue ? 'border-error-300 dark:border-error-700' : ''
        }`}
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
              {task.status.replace('-', ' ')}
            </span>
          </div>
          {isOverdue && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400">
              Overdue
            </span>
          )}
        </div>

        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {task.title}
        </h4>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {task.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-3">
            {task.dueDate && (
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{format(new Date(task.dueDate), 'MMM dd')}</span>
              </div>
            )}
            {task.assigneeId && (
              <div className="flex items-center space-x-1">
                <User size={12} />
                <span>Assigned</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {task.comments.length > 0 && (
              <div className="flex items-center space-x-1">
                <MessageSquare size={12} />
                <span>{task.comments.length}</span>
              </div>
            )}
            {task.attachments.length > 0 && (
              <div className="flex items-center space-x-1">
                <Paperclip size={12} />
                <span>{task.attachments.length}</span>
              </div>
            )}
          </div>
        </div>

        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {task.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400 rounded"
              >
                {tag}
              </span>
            ))}
            {task.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded">
                +{task.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default TaskCard;