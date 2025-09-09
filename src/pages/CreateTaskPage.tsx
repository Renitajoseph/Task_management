import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';
import { ArrowLeft, Plus } from 'lucide-react';

export const CreateTaskPage: React.FC = () => {
  const { createTask } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    createTask(data);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Tasks
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Create New Task</h1>
              <p className="text-gray-600 mt-1">Add a new task to stay organized</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <TaskForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};