import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin, Users, LogOut, Menu, X, Filter, BarChart3, Hotel, AlertTriangle } from 'lucide-react';
import ActivityCard from './ActivityCard';
import ProgressStats from './ProgressStats';
import FilterControls from './FilterControls';
import HotelInfo from './HotelInfo';
import ImportantInfo from './ImportantInfo';
import ActivityDetailModal from './ActivityDetailModal';
import UniformInfo from './UniformInfo';

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

interface Hotel {
  id: string;
  name: string;
  address: string;
  phone: string;
  dates: string;
  location: string;
  type: 'transit' | 'umroh';
}

interface Uniform {
  date: string;
  male: string;
  female: string;
  description: string;
}

interface DashboardProps {
  user: { email: string; name: string } | null;
  activities: Activity[];
  hotels: Hotel[];
  showHotelInfo: boolean;
  onLogout: () => void;
  onToggleActivity: (activityId: string) => void;
  onActivityDetail: (activity: Activity) => void;
  onResetActivities: () => void;
  onExportActivities: () => void;
  onImportActivities: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleHotelInfo: () => void;
  selectedActivity: Activity | null;
  onCloseActivityDetail: () => void;
  uniforms: Uniform[];
  getUniformForDate: (date: string) => Uniform | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user, activities, hotels, showHotelInfo, onLogout, onToggleActivity, onActivityDetail, onResetActivities, onExportActivities, onImportActivities, onToggleHotelInfo, selectedActivity, onCloseActivityDetail, uniforms, getUniformForDate }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showImportantInfo, setShowImportantInfo] = useState(false);

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

      {/* Main Container - Flexbox for single row layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:z-auto lg:flex-shrink-0`}>
          <div className="flex flex-col h-full">
            {/* Header */}
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

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Progress Stats */}
                <ProgressStats
                  totalActivities={totalActivities}
                  completedActivities={completedActivities}
                  progressPercentage={progressPercentage}
                />

                {/* Uniform Info */}
                <UniformInfo uniforms={uniforms} />

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

                              {/* Hotel Info Toggle */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={onToggleHotelInfo}
                  className={`w-full px-3 py-2 text-sm rounded-lg transition-colors border flex items-center justify-center space-x-2 ${
                    showHotelInfo
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50 border-gray-200 hover:border-amber-200'
                  }`}
                >
                  <Hotel className="w-4 h-4" />
                  <span>{showHotelInfo ? 'Sembunyikan' : 'Tampilkan'} Info Hotel</span>
                </button>
              </div>

              {/* Important Info Toggle */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowImportantInfo(!showImportantInfo)}
                  className={`w-full px-3 py-2 text-sm rounded-lg transition-colors border flex items-center justify-center space-x-2 ${
                    showImportantInfo
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50 border-gray-200 hover:border-red-200'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>{showImportantInfo ? 'Sembunyikan' : 'Tampilkan'} Info Penting</span>
                </button>
              </div>

                {/* Data Management */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Kelola Data</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={onExportActivities}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 hover:border-blue-200"
                    >
                      Export Data
                    </button>
                    <label className="px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-gray-200 hover:border-green-200 cursor-pointer text-center">
                      Import Data
                      <input
                        type="file"
                        accept=".json"
                        onChange={onImportActivities}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={onResetActivities}
                    className="w-full px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 hover:border-red-200"
                  >
                    Reset Semua Aktivitas
                  </button>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="p-6 border-t border-gray-200">
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
        <div className="flex-1 flex flex-col min-w-0">
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
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
            {/* Hotel Information */}
            {showHotelInfo && (
              <HotelInfo hotels={hotels} />
            )}

            {/* Important Information */}
            {showImportantInfo && (
              <ImportantInfo isOpen={showImportantInfo} />
            )}

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
                            onDetail={() => onActivityDetail(activity)}
                          />
                        ))}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Activity Detail Modal */}
      <ActivityDetailModal
        activity={selectedActivity}
        onClose={onCloseActivityDetail}
        uniforms={uniforms}
        getUniformForDate={getUniformForDate}
      />
    </div>
  );
};

export default Dashboard;