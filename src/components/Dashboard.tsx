import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin, Users, LogOut, Menu, X, Filter, BarChart3 } from 'lucide-react';
import ActivityCard from './ActivityCard';
import ProgressStats from './ProgressStats';
import FilterControls from './FilterControls';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  day: number;
  completed: boolean;
  type: 'transport' | 'ritual' | 'meal' | 'accommodation' | 'sightseeing';
}

interface DashboardProps {
  user: { email: string; name: string } | null;
  activities: Activity[];
  onLogout: () => void;
  onToggleActivity: (activityId: string) => void;
  onResetActivities: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, activities, onLogout, onToggleActivity, onResetActivities }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const days = Array.from({ length: 11 }, (_, i) => i + 1);

  const filteredActivities = activities.filter(activity => {
    if (selectedDay && activity.day !== selectedDay) return false;
    if (selectedType && activity.type !== selectedType) return false;
    if (!showCompleted && activity.completed) return false;
    return true;
  });

  const groupedActivities = filteredActivities.reduce((acc, activity) => {
    if (!acc[activity.day]) {
      acc[activity.day] = [];
    }
    acc[activity.day].push(activity);
    return acc;
  }, {} as Record<number, Activity[]>);

  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.completed).length;
  const progressPercentage = Math.round((completedActivities / totalActivities) * 100);

  const getDayName = (day: number) => {
    const dayNames = ['Hari 1', 'Hari 2', 'Hari 3', 'Hari 4', 'Hari 5', 'Hari 6', 'Hari 7', 'Hari 8', 'Hari 9', 'Hari 10', 'Hari 11'];
    return dayNames[day - 1] || `Hari ${day}`;
  };

  const getDayDate = (day: number) => {
    const dates = ['18 Agustus', '19 Agustus', '20 Agustus', '21 Agustus', '22 Agustus', '23 Agustus', '24 Agustus', '25 Agustus', '26 Agustus', '27 Agustus', '28 Agustus'];
    return dates[day - 1] || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-blue-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Jadwal Umroh</h1>
                <p className="text-sm text-gray-600">18-28 Agustus 2025</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Progress Stats */}
          <ProgressStats
            totalActivities={totalActivities}
            completedActivities={completedActivities}
            progressPercentage={progressPercentage}
          />

          {/* Filter Controls */}
          <FilterControls
            days={days}
            selectedDay={selectedDay}
            selectedType={selectedType}
            showCompleted={showCompleted}
            onDayChange={setSelectedDay}
            onTypeChange={setSelectedType}
            onShowCompletedChange={setShowCompleted}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="space-y-3">
            <button
              onClick={onResetActivities}
              className="w-full px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 hover:border-red-200"
            >
              Reset Semua Aktivitas
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-80 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                  {selectedDay ? `${getDayName(selectedDay)} - ${getDayDate(selectedDay)}` : 'Semua Jadwal'}
                </h2>
                <p className="text-gray-600 text-sm lg:text-base">
                  {filteredActivities.length} aktivitas
                  {selectedDay || selectedType ? ' (difilter)' : ''}
                </p>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Progress: <span className="font-semibold text-amber-600">{progressPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {Object.keys(groupedActivities).length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Tidak ada aktivitas</h3>
              <p className="text-gray-600">Tidak ada aktivitas yang sesuai dengan filter yang dipilih.</p>
              <button
                onClick={() => {
                  setSelectedDay(null);
                  setSelectedType(null);
                  setShowCompleted(true);
                }}
                className="mt-4 text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                Reset filter
              </button>
            </div>
          ) : (
            Object.entries(groupedActivities)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([day, dayActivities]) => (
                <div key={day} className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{day}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{getDayName(parseInt(day))}</h3>
                      <p className="text-gray-600 text-sm">{getDayDate(parseInt(day))}</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:gap-6">
                    {dayActivities
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((activity) => (
                        <ActivityCard
                          key={activity.id}
                          activity={activity}
                          onToggle={() => onToggleActivity(activity.id)}
                        />
                      ))}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;