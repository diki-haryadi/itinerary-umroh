import React from 'react';
import { Filter, Calendar, Tag, Eye, EyeOff } from 'lucide-react';

interface FilterControlsProps {
  days: number[];
  selectedDay: number | null;
  selectedType: string | null;
  showCompleted: boolean;
  onDayChange: (day: number | null) => void;
  onTypeChange: (type: string | null) => void;
  onShowCompletedChange: (show: boolean) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  days,
  selectedDay,
  selectedType,
  showCompleted,
  onDayChange,
  onTypeChange,
  onShowCompletedChange
}) => {
  const activityTypes = [
    { value: 'transport', label: 'Transportasi', color: 'bg-blue-100 text-blue-700' },
    { value: 'ritual', label: 'Ibadah', color: 'bg-green-100 text-green-700' },
    { value: 'meal', label: 'Makan', color: 'bg-orange-100 text-orange-700' },
    { value: 'accommodation', label: 'Akomodasi', color: 'bg-purple-100 text-purple-700' },
    { value: 'sightseeing', label: 'Wisata', color: 'bg-pink-100 text-pink-700' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2 text-gray-800">
        <Filter className="w-5 h-5" />
        <h3 className="font-semibold">Filter Jadwal</h3>
      </div>

      {/* Day Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Pilih Hari
        </label>
        <div className="space-y-2">
          <button
            onClick={() => onDayChange(null)}
            className={`w-full px-3 py-2 text-sm rounded-lg transition-colors ${
              selectedDay === null
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Semua Hari
          </button>
          <div className="grid grid-cols-3 gap-2">
            {days.map(day => (
              <button
                key={day}
                onClick={() => onDayChange(day)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  selectedDay === day
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Hari {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Tag className="w-4 h-4 mr-2" />
          Jenis Aktivitas
        </label>
        <div className="space-y-2">
          <button
            onClick={() => onTypeChange(null)}
            className={`w-full px-3 py-2 text-sm text-left rounded-lg transition-colors ${
              selectedType === null
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Semua Jenis
          </button>
          {activityTypes.map(type => (
            <button
              key={type.value}
              onClick={() => onTypeChange(type.value)}
              className={`w-full px-3 py-2 text-sm text-left rounded-lg transition-colors ${
                selectedType === type.value
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Show Completed Toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Tampilkan
        </label>
        <button
          onClick={() => onShowCompletedChange(!showCompleted)}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
            showCompleted
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          <span>Aktivitas Selesai</span>
          {showCompleted ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Reset Filters */}
      {(selectedDay || selectedType || !showCompleted) && (
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={() => {
              onDayChange(null);
              onTypeChange(null);
              onShowCompletedChange(true);
            }}
            className="w-full px-3 py-2 text-sm text-amber-600 hover:text-amber-700 border border-amber-200 hover:border-amber-300 rounded-lg transition-colors hover:bg-amber-50"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterControls;