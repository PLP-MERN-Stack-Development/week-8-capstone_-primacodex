import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, Search } from 'lucide-react';
import { useProjectStore } from '../stores/projectStore';
import { Task } from '../types';
import TaskCard from '../components/tasks/TaskCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Tasks: React.FC = () => {
  const { tasks, fetchTasks, updateTask, isLoading } = useProjectStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const taskColumns = {
    'todo': filteredTasks.filter(task => task.status === 'todo'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    'review': filteredTasks.filter(task => task.status === 'review'),
    'completed': filteredTasks.filter(task => task.status === 'completed'),
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const activeTask = tasks.find(task => task.id === active.id);
      if (activeTask && over.id in taskColumns) {
        updateTask(active.id, { status: over.id as Task['status'] });
      }
    }
    
    setActiveId(null);
  };

  const columnNames = {
    'todo': 'To Do',
    'in-progress': 'In Progress', 
    'review': 'Review',
    'completed': 'Completed',
  };

  const columnColors = {
    'todo': 'border-gray-300 dark:border-gray-600',
    'in-progress': 'border-warning-300 dark:border-warning-600',
    'review': 'border-accent-300 dark:border-accent-600',
    'completed': 'border-success-300 dark:border-success-600',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Organize and track your tasks with drag-and-drop functionality.
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus size={20} />
          <span>New Task</span>
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search size={20} />}
          className="max-w-md"
        />
      </motion.div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {Object.entries(taskColumns).map(([status, columnTasks]) => (
            <Card
              key={status}
              className={`p-4 min-h-96 border-t-4 ${columnColors[status as keyof typeof columnColors]}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {columnNames[status as keyof typeof columnNames]}
                </h3>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              
              <SortableContext
                items={columnTasks.map(task => task.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </SortableContext>
              
              {columnTasks.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No tasks in this column
                  </p>
                </div>
              )}
            </Card>
          ))}
        </motion.div>
        
        <DragOverlay>
          {activeId ? (
            <TaskCard task={tasks.find(task => task.id === activeId)!} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Tasks;