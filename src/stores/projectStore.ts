import { create } from 'zustand';
import { Project, Task, DashboardStats } from '../types';

interface ProjectState {
  projects: Project[];
  tasks: Task[];
  currentProject: Project | null;
  dashboardStats: DashboardStats;
  isLoading: boolean;
  fetchProjects: () => Promise<void>;
  fetchTasks: (projectId?: string) => Promise<void>;
  createProject: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  createTask: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setCurrentProject: (project: Project | null) => void;
  fetchDashboardStats: () => Promise<void>;
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of the company website with modern UI/UX',
    status: 'active',
    priority: 'high',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-03-15'),
    progress: 65,
    ownerId: '1',
    teamMembers: ['1', '2', '3'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application for iOS and Android',
    status: 'active',
    priority: 'urgent',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-05-01'),
    progress: 30,
    ownerId: '1',
    teamMembers: ['1', '2', '4'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: '3',
    name: 'Database Migration',
    description: 'Migrate legacy database to new cloud infrastructure',
    status: 'completed',
    priority: 'medium',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2024-01-30'),
    progress: 100,
    ownerId: '1',
    teamMembers: ['1', '3'],
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-30'),
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage Layout',
    description: 'Create wireframes and mockups for the new homepage design',
    status: 'completed',
    priority: 'high',
    assigneeId: '2',
    projectId: '1',
    dueDate: new Date('2024-02-20'),
    tags: ['design', 'frontend'],
    attachments: [],
    comments: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-18'),
  },
  {
    id: '2',
    title: 'Implement User Authentication',
    description: 'Set up user login and registration system with JWT tokens',
    status: 'in-progress',
    priority: 'urgent',
    assigneeId: '1',
    projectId: '1',
    dueDate: new Date('2024-02-25'),
    tags: ['backend', 'security'],
    attachments: [],
    comments: [],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Connect frontend components with backend API endpoints',
    status: 'todo',
    priority: 'medium',
    assigneeId: '3',
    projectId: '1',
    dueDate: new Date('2024-03-01'),
    tags: ['frontend', 'api'],
    attachments: [],
    comments: [],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    title: 'Mobile UI Components',
    description: 'Design and implement reusable UI components for mobile app',
    status: 'in-progress',
    priority: 'high',
    assigneeId: '2',
    projectId: '2',
    dueDate: new Date('2024-02-28'),
    tags: ['mobile', 'ui'],
    attachments: [],
    comments: [],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-15'),
  },
];

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  tasks: [],
  currentProject: null,
  dashboardStats: {
    totalProjects: 0,
    activeProjects: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    teamMembers: 0,
  },
  isLoading: false,

  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ projects: mockProjects, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchTasks: async (projectId?: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      const filteredTasks = projectId 
        ? mockTasks.filter(task => task.projectId === projectId)
        : mockTasks;
      set({ tasks: filteredTasks, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createProject: async (data) => {
    const newProject: Project = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set(state => ({
      projects: [...state.projects, newProject],
    }));
  },

  updateProject: async (id, data) => {
    set(state => ({
      projects: state.projects.map(project =>
        project.id === id 
          ? { ...project, ...data, updatedAt: new Date() }
          : project
      ),
    }));
  },

  deleteProject: async (id) => {
    set(state => ({
      projects: state.projects.filter(project => project.id !== id),
    }));
  },

  createTask: async (data) => {
    const newTask: Task = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set(state => ({
      tasks: [...state.tasks, newTask],
    }));
  },

  updateTask: async (id, data) => {
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === id 
          ? { ...task, ...data, updatedAt: new Date() }
          : task
      ),
    }));
  },

  deleteTask: async (id) => {
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== id),
    }));
  },

  setCurrentProject: (project) => {
    set({ currentProject: project });
  },

  fetchDashboardStats: async () => {
    const { projects, tasks } = get();
    
    const stats: DashboardStats = {
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'active').length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      pendingTasks: tasks.filter(t => t.status !== 'completed').length,
      overdueTasks: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed').length,
      teamMembers: 5, // Mock data
    };
    
    set({ dashboardStats: stats });
  },
}));