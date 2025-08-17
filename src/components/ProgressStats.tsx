import React from 'react';
import { BarChart3, CheckCircle2, Clock } from 'lucide-react';

interface ProgressStatsProps {
  totalActivities: number;
  completedActivities: number;
  progressPercentage: number;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({
  totalActivities,
  completedActivities,
  progressPercentage
}) => {
  return (
    <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white">
      <div className="flex items-center space-x-3 mb-4">
        <BarChart3 className="w-6 h-6" />
        <h3 className="text-lg font-semibold">Progress Umroh</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-amber-100">Kemajuan keseluruhan</span>
            <span className="font-bold">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-amber-400 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-amber-400">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-2xl font-bold">{completedActivities}</span>
            </div>
            <p className="text-amber-100 text-sm">Selesai</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-2xl font-bold">{totalActivities - completedActivities}</span>
            </div>
            <p className="text-amber-100 text-sm">Tersisa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;