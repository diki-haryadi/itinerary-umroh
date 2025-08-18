import React, { useState } from 'react';
import { X, Download, Printer, QrCode, Calendar, User, Shield } from 'lucide-react';

interface VaccineEntry {
  vaccine: string;
  manufacturer: string;
  date: string;
  validUntil: string;
  location: string;
  clinician: string;
}

interface VaccineInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const VaccineInfo: React.FC<VaccineInfoProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('certificate');
  const [showImageModal, setShowImageModal] = useState(false);

  if (!isOpen) return null;

  // Vaccine data based on the certificate
  const vaccineData: VaccineEntry[] = [
    {
      vaccine: 'MENINGITIS MENINGOCOCCUS',
      manufacturer: 'BIOFARMA B20241018-2',
      date: '21 Juli 2025',
      validUntil: '4 Agustus 2028',
      location: 'Klinik Pratama Idrisiyyah Medical Center',
      clinician: 'dr. Ulfi Shofahati'
    },
    {
      vaccine: 'POLIO',
      manufacturer: 'BIOFARMA 21000525',
      date: '21 Juli 2025',
      validUntil: '-',
      location: 'Klinik Pratama Idrisiyyah Medical Center',
      clinician: 'dr. Ulfi Shofahati'
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = '/vaksin.png';
    link.download = 'sertifikat-vaksin-umroh.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    // Create a printable version of the certificate
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Sertifikat Vaksin - Umroh</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
              .certificate { max-width: 800px; margin: 0 auto; border: 2px solid #1e40af; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .title { font-size: 24px; font-weight: bold; color: #1e40af; margin-bottom: 10px; }
              .subtitle { font-size: 16px; color: #6b7280; }
              .personal-info { margin-bottom: 30px; }
              .info-row { display: flex; margin-bottom: 10px; }
              .info-label { font-weight: bold; width: 120px; }
              .vaccine-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              .vaccine-table th, .vaccine-table td { border: 1px solid #d1d5db; padding: 8px; text-align: left; }
              .vaccine-table th { background-color: #f3f4f6; font-weight: bold; }
              .footer { margin-top: 30px; font-size: 12px; color: #6b7280; }
              @media print { body { margin: 0; } .certificate { border: none; } }
            </style>
          </head>
          <body>
            <div class="certificate">
              <div class="header">
                <div class="title">International Certificate of Vaccination (Prophylaxis)</div>
                <div class="subtitle">Certificat International de Vaccination ou de Prophylaxie</div>
              </div>
              
              <div class="personal-info">
                <div class="info-row">
                  <span class="info-label">Nama:</span>
                  <span>DIKI HARYADI</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Passport:</span>
                  <span>X5876235</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Tanggal Lahir:</span>
                  <span>19 Februari 1995</span>
                </div>
                <div class="info-row">
                  <span class="info-label">ID:</span>
                  <span>E25-002844347</span>
                </div>
              </div>
              
              <table class="vaccine-table">
                <thead>
                  <tr>
                    <th>Vaksin</th>
                    <th>Produsen & Batch</th>
                    <th>Tanggal</th>
                    <th>Berlaku Sampai</th>
                    <th>Lokasi & Dokter</th>
                  </tr>
                </thead>
                <tbody>
                  ${vaccineData.map(vaccine => `
                    <tr>
                      <td>${vaccine.vaccine}</td>
                      <td>${vaccine.manufacturer}</td>
                      <td>${vaccine.date}</td>
                      <td>${vaccine.validUntil}</td>
                      <td>${vaccine.location}<br><strong>${vaccine.clinician}</strong></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              
              <div class="footer">
                <p><strong>Penafisan:</strong> Nomor kode ICV elektronik (eICV) berbeda dengan nomor seri ICV fisik</p>
                <p>This certificate was issued by Ministry of Health of Indonesia</p>
                <p>Ce certificat a été délivré par le ministère Indonésien de la Santé</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Sertifikat Vaksin Umroh</h2>
                <p className="text-sm text-gray-600">International Certificate of Vaccination</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Download Certificate"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Print Certificate"
              >
                <Printer className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('certificate')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'certificate'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sertifikat
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'info'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Informasi Vaksin
            </button>
          </div>

          {activeTab === 'certificate' && (
            <div className="space-y-6">
              {/* Original Certificate Image */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sertifikat Vaksin Asli</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <img 
                    src="/vaksin.png" 
                    alt="International Certificate of Vaccination" 
                    className="max-w-full h-auto rounded-lg shadow-sm mx-auto cursor-pointer hover:shadow-md transition-shadow"
                    style={{ maxHeight: '500px' }}
                    onClick={() => setShowImageModal(true)}
                    title="Klik untuk memperbesar"
                  />
                  <p className="text-xs text-gray-500 mt-2">Klik gambar untuk memperbesar</p>
                </div>
              </div>

              {/* Certificate Header */}
              <div className="text-center border-b border-gray-200 pb-6">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">
                  International Certificate of Vaccination (Prophylaxis)
                </h3>
                <p className="text-gray-600 italic">
                  Certificat International de Vaccination ou de Prophylaxie
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  In accordance with the International Health Regulations
                </p>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Nama</p>
                      <p className="font-semibold">DIKI HARYADI</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Passport</p>
                      <p className="font-semibold">X5876235</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Tanggal Lahir</p>
                      <p className="font-semibold">19 Februari 1995</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <QrCode className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">ID Certificate</p>
                      <p className="font-semibold">E25-002844347</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vaccine Table */}
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800 border-b border-gray-200">
                        Vaksin
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800 border-b border-gray-200">
                        Produsen & Batch
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800 border-b border-gray-200">
                        Tanggal
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800 border-b border-gray-200">
                        Berlaku Sampai
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800 border-b border-gray-200">
                        Lokasi & Dokter
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccineData.map((vaccine, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 border-b border-gray-200">
                          <span className="font-medium text-gray-800">{vaccine.vaccine}</span>
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-600">
                          {vaccine.manufacturer}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-600">
                          {vaccine.date}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-600">
                          {vaccine.validUntil}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200">
                          <div className="text-sm">
                            <p className="text-gray-600">{vaccine.location}</p>
                            <p className="font-medium text-blue-600">{vaccine.clinician}</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-gray-800">Penafisan:</h4>
                <p className="text-sm text-gray-600">
                  Nomor kode ICV elektronik (eICV) berbeda dengan nomor seri ICV fisik
                </p>
                <p className="text-sm text-gray-600">
                  This certificate was issued by Ministry of Health of Indonesia
                </p>
                <p className="text-sm text-gray-600 italic">
                  Ce certificat a été délivré par le ministère Indonésien de la Santé
                </p>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Informasi Vaksin Umroh</h3>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Meningitis Meningococcus</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Wajib untuk jamaah Umroh</li>
                      <li>• Berlaku 3 tahun dari tanggal vaksinasi</li>
                      <li>• Melindungi dari penyakit meningitis</li>
                      <li>• Diberikan minimal 10 hari sebelum keberangkatan</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Polio</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Vaksinasi rutin untuk perjalanan internasional</li>
                      <li>• Melindungi dari virus polio</li>
                      <li>• Diberikan sesuai jadwal vaksinasi standar</li>
                      <li>• Penting untuk kesehatan global</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">Catatan Penting</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Bawa sertifikat vaksin asli saat perjalanan</li>
                      <li>• Simpan salinan digital sebagai backup</li>
                      <li>• Periksa masa berlaku sebelum keberangkatan</li>
                      <li>• Konsultasi dengan dokter jika ada kondisi medis khusus</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-60 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] overflow-auto">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Sertifikat Vaksin Asli</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDownloadImage}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Download Image"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowImageModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <img 
                src="/vaksin.png" 
                alt="International Certificate of Vaccination" 
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaccineInfo;
