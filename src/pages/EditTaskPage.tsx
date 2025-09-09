import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';
import { ArrowLeft, Edit } from 'lucide-react';

export const EditTaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, updateTask, getTaskById } = useTasks();
  const navigate = useNavigate();

  const task = id ? getTaskById(id) : undefined;

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Task Not Found</h2>
            <p className="text-gray-600 mb-6">The task you're looking for doesn't exist.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Tasks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (data: any) => {
    updateTask(task.id, data);
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
            <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
              <Edit className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Edit Task</h1>
              <p className="text-gray-600 mt-1">Update your task details</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <TaskForm
          initialData={task}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={true}
        />
      </div>
    </div>
  );
};