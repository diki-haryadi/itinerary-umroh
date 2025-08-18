import React from 'react';
import { MapPin, Phone, Calendar, Hotel } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  address: string;
  phone: string;
  dates: string;
  location: string;
  type: 'transit' | 'umroh';
}

interface HotelInfoProps {
  hotels: Hotel[];
}

const HotelInfo: React.FC<HotelInfoProps> = ({ hotels }) => {
  const transitHotels = hotels.filter(hotel => hotel.type === 'transit');
  const umrohHotels = hotels.filter(hotel => hotel.type === 'umroh');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
          <Hotel className="w-6 h-6 mr-2 text-amber-600" />
          Informasi Hotel
        </h2>
        <p className="text-gray-600">Detail akomodasi selama perjalanan Umroh</p>
      </div>

      {/* Transit Hotel Section */}
      {transitHotels.length > 0 && (
        <div className="mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h3 className="text-lg font-semibold text-blue-800">HOTEL TRANSIT</h3>
            <p className="text-blue-600 text-sm">Jakarta - Soekarno Hatta</p>
          </div>
          
          <div className="space-y-4">
            {transitHotels.map((hotel) => (
              <div key={hotel.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">{hotel.name}</h4>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {hotel.location}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                    <span className="flex-1">{hotel.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a 
                      href={`tel:${hotel.phone}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {hotel.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{hotel.dates}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Umroh Hotels Section */}
      {umrohHotels.length > 0 && (
        <div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
            <h3 className="text-lg font-semibold text-purple-800">UMROH REGULER</h3>
            <p className="text-purple-600 text-sm">Hotel selama perjalanan Umroh</p>
          </div>
          
          <div className="space-y-4">
            {umrohHotels.map((hotel) => (
              <div key={hotel.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">{hotel.name}</h4>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                    {hotel.location}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                    <span className="flex-1">{hotel.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a 
                      href={`tel:${hotel.phone}`}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      {hotel.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{hotel.dates}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelInfo;
