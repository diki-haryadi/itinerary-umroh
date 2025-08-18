import React, { useState } from 'react';
import { Shirt, Users, ChevronDown, ChevronUp } from 'lucide-react';

interface Uniform {
  date: string;
  male: string;
  female: string;
  description: string;
}

interface UniformInfoProps {
  uniforms: Uniform[];
}

const UniformInfo: React.FC<UniformInfoProps> = ({ uniforms }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
      {/* Header */}
      <button
        onClick={toggleExpanded}
        className="w-full p-4 flex items-center justify-between hover:bg-amber-100 transition-colors rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <Shirt className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-amber-800">Penggunaan Seragam</h3>
            <p className="text-xs text-amber-600">5 hari dengan seragam khusus</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-amber-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-amber-600" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {uniforms.map((uniform, index) => (
            <div key={index} className="bg-white rounded-lg p-3 border border-amber-200">
              <div className="mb-2">
                <h4 className="font-medium text-amber-800 text-sm">{uniform.date}</h4>
                <p className="text-xs text-amber-600">{uniform.description}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Users className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-blue-800">Laki-laki</p>
                    <p className="text-xs text-gray-700">{uniform.male}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Users className="w-3 h-3 text-pink-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-pink-800">Perempuan</p>
                    <p className="text-xs text-gray-700">{uniform.female}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Important Notes */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <h4 className="font-medium text-blue-800 text-sm mb-2">Catatan Penting</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Membawa baju salin untuk Hotel Transit</li>
              <li>• Gunakan koper cabin untuk pakaian ganti</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniformInfo;
