import React from 'react';
import { CheckCircle2, Circle, Clock, MapPin, Plane, Utensils, Home, Camera, Compass } from 'lucide-react';

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

interface ActivityCardProps {
  activity: Activity;
  onToggle: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onToggle }) => {
  const getTypeIcon = (type: string) => {
    const iconProps = { className: "w-4 h-4" };
    switch (type) {
      case 'transport':
        return <Plane {...iconProps} />;
      case 'ritual':
        return <Compass {...iconProps} />;
      case 'meal':
        return <Utensils {...iconProps} />;
      case 'accommodation':
        return <Home {...iconProps} />;
      case 'sightseeing':
        return <Camera {...iconProps} />;
      default:
        return <Clock {...iconProps} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transport':
        return 'bg-blue-100 text-blue-700';
      case 'ritual':
        return 'bg-green-100 text-green-700';
      case 'meal':
        return 'bg-orange-100 text-orange-700';
      case 'accommodation':
        return 'bg-purple-100 text-purple-700';
      case 'sightseeing':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'transport':
        return 'Transportasi';
      case 'ritual':
        return 'Ibadah';
      case 'meal':
        return 'Makan';
      case 'accommodation':
        return 'Akomodasi';
      case 'sightseeing':
        return 'Wisata';
      default:
        return 'Lainnya';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md ${
      activity.completed 
        ? 'border-green-200 bg-green-50' 
        : 'border-gray-200 hover:border-amber-300'
    }`}>
      <div className="p-4 lg:p-6">
        <div className="flex items-start space-x-4">
          {/* Completion Toggle */}
          <button
            onClick={onToggle}
            className={`mt-1 transition-all duration-200 ${
              activity.completed
                ? 'text-green-600 hover:text-green-700'
                : 'text-gray-300 hover:text-amber-600'
            }`}
          >
            {activity.completed ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>

          {/* Activity Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className={`text-base lg:text-lg font-semibold transition-colors ${
                  activity.completed 
                    ? 'text-green-800 line-through' 
                    : 'text-gray-800'
                }`}>
                  {activity.title}
                </h3>
                <p className={`text-sm mt-1 ${
                  activity.completed ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {activity.description}
                </p>
              </div>
              <div className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(activity.type)}`}>
                <div className="flex items-center space-x-1">
                  {getTypeIcon(activity.type)}
                  <span className="hidden sm:inline">{getTypeName(activity.type)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm">
              <div className="flex items-center space-x-2 text-amber-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{activity.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{activity.location}</span>
              </div>
            </div>

            {activity.completed && (
              <div className="mt-3 inline-flex items-center space-x-2 text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>Selesai</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;