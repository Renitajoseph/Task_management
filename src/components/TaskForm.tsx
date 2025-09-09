import React from 'react';
import { Task } from '../types/Task';
import { useForm } from '../hooks/useForm';
import { Calendar, FileText, Flag, Target } from 'lucide-react';

interface TaskFormData {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface TaskFormProps {
  initialData?: Partial<Task>;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const validationRules = {
  title: (value: string) => {
    if (!value.trim()) return 'Title is required';
    if (value.length < 3) return 'Title must be at least 3 characters';
    return null;
  },
  description: (value: string) => {
    if (!value.trim()) return 'Description is required';
    return null;
  },
  dueDate: (value: string) => {
    if (!value) return 'Due date is required';
    if (new Date(value) < new Date()) return 'Due date cannot be in the past';
    return null;
  },
};

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const form = useForm<TaskFormData>(
    {
      title: initialData?.title || '',
      description: initialData?.description || '',
      status: initialData?.status || 'todo',
      priority: initialData?.priority || 'medium',
      dueDate: initialData?.dueDate || '',
    },
    validationRules
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validate()) {
      onSubmit(form.values);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 gap-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4" />
                Task Title
              </label>
              <input
                type="text"
                value={form.values.title}
                onChange={(e) => form.handleChange('title', e.target.value)}
                onBlur={() => form.handleBlur('title')}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-colors ${
                  form.errors.title && form.touched.title
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500'
                } focus:outline-none focus:ring-4 focus:ring-blue-50`}
                placeholder="Enter task title..."
              />
              {form.errors.title && form.touched.title && (
                <p className="mt-1 text-sm text-red-600">{form.errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Target className="w-4 h-4" />
                Description
              </label>
              <textarea
                value={form.values.description}
                onChange={(e) => form.handleChange('description', e.target.value)}
                onBlur={() => form.handleBlur('description')}
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-colors resize-none ${
                  form.errors.description && form.touched.description
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500'
                } focus:outline-none focus:ring-4 focus:ring-blue-50`}
                placeholder="Describe your task in detail..."
              />
              {form.errors.description && form.touched.description && (
                <p className="mt-1 text-sm text-red-600">{form.errors.description}</p>
              )}
            </div>

            {/* Status and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Target className="w-4 h-4" />
                  Status
                </label>
                <select
                  value={form.values.status}
                  onChange={(e) => form.handleChange('status', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-colors"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Flag className="w-4 h-4" />
                  Priority
                </label>
                <select
                  value={form.values.priority}
                  onChange={(e) => form.handleChange('priority', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-colors"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                Due Date
              </label>
              <input
                type="date"
                value={form.values.dueDate}
                onChange={(e) => form.handleChange('dueDate', e.target.value)}
                onBlur={() => form.handleBlur('dueDate')}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-colors ${
                  form.errors.dueDate && form.touched.dueDate
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500'
                } focus:outline-none focus:ring-4 focus:ring-blue-50`}
              />
              {form.errors.dueDate && form.touched.dueDate && (
                <p className="mt-1 text-sm text-red-600">{form.errors.dueDate}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isEditing ? 'Update Task' : 'Create Task'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};