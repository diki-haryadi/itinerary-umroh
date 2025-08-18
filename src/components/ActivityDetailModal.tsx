import React from 'react';
import { X, Clock, MapPin, Users, Shirt } from 'lucide-react';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  day: number;
  completed: boolean;
  type: 'ritual' | 'meal' | 'transport' | 'accommodation' | 'sightseeing';
}

interface Uniform {
  date: string;
  male: string;
  female: string;
  description: string;
}

interface ActivityDetailModalProps {
  activity: Activity | null;
  onClose: () => void;
  uniforms: Uniform[];
  getUniformForDate: (date: string) => Uniform | null;
}

const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({ 
  activity, 
  onClose, 
  uniforms, 
  getUniformForDate 
}) => {
  if (!activity) return null;

  const getDayDate = (day: number) => {
    const dates = [
      'Senin, 18 Agustus 2025',
      'Selasa, 19 Agustus 2025', 
      'Rabu, 20 Agustus 2025',
      'Kamis, 21 Agustus 2025',
      'Jum\'at, 22 Agustus 2025',
      'Sabtu, 23 Agustus 2025',
      'Ahad, 24 Agustus 2025',
      'Senin, 25 Agustus 2025',
      'Selasa, 26 Agustus 2025',
      'Rabu, 27 Agustus 2025',
      'Kamis, 28 Agustus 2025'
    ];
    return dates[day - 1] || '';
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

  const currentDate = getDayDate(activity.day);
  const uniform = getUniformForDate(currentDate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Detail Aktivitas</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Activity Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{activity.title}</h3>
              <p className="text-gray-600">{activity.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-500">Waktu</p>
                  <p className="font-medium">{activity.time}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Lokasi</p>
                  <p className="font-medium">{activity.location}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(activity.type)}`}>
                {getTypeName(activity.type)}
              </div>
              <span className="text-sm text-gray-500">• Hari {activity.day}</span>
            </div>
          </div>

          {/* Uniform Information */}
          {uniform ? (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
              <div className="flex items-center space-x-2 mb-4">
                <Shirt className="w-5 h-5 text-amber-600" />
                <h4 className="text-lg font-semibold text-amber-800">Penggunaan Seragam</h4>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-amber-200">
                  <h5 className="font-medium text-amber-800 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Laki-laki
                  </h5>
                  <p className="text-gray-700">{uniform.male}</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-amber-200">
                  <h5 className="font-medium text-amber-800 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Perempuan
                  </h5>
                  <p className="text-gray-700">{uniform.female}</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-amber-200">
                  <h5 className="font-medium text-amber-800 mb-2">Keterangan</h5>
                  <p className="text-gray-700">{uniform.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Shirt className="w-5 h-5 text-gray-500" />
                <h4 className="text-lg font-semibold text-gray-700">Penggunaan Seragam</h4>
              </div>
              <p className="text-gray-600">Tidak ada informasi seragam untuk tanggal ini.</p>
            </div>
          )}

          {/* Notes */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h5 className="font-medium text-blue-800 mb-2">Catatan Penting</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Membawa baju salin untuk di Hotel Transit Bandara</li>
              <li>• Jamaah di harapkan menyediakan pakaian ganti dengan menggunakan koper cabin di luar koper bagasi untuk berganti pakaian di ZEST Hotel Jakarta karena koper / Bagasi akan langsung di proses check in di Bandara</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailModal;
