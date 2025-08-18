import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Plane, 
  Building2, 
  Phone, 
  Thermometer, 
  Heart, 
  Shirt, 
  BookOpen, 
  Pill, 
  DollarSign, 
  Umbrella, 
  Scissors, 
  Droplets, 
  Battery, 
  Shield,
  Users,
  User,
  MapPin
} from 'lucide-react';

interface ImportantInfoProps {
  isOpen: boolean;
}

const ImportantInfo: React.FC<ImportantInfoProps> = ({ isOpen }) => {
  const [activeTab, setActiveTab] = useState('preparation');

  // Function to open WhatsApp
  const openWhatsApp = (phoneNumber: string, name: string) => {
    const message = `Assalamu'alaikum, saya ingin bertanya tentang perjalanan Umroh.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Function to format phone number from 0 to +62
  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith('0')) {
      return '+62' + phone.substring(1);
    }
    return phone;
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
          Informasi Penting
        </h2>
        <p className="text-gray-600">Panduan lengkap untuk perjalanan Umroh</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('preparation')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            activeTab === 'preparation'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Persiapan
        </button>
        <button
          onClick={() => setActiveTab('travel')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            activeTab === 'travel'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tata Tertib Perjalanan
        </button>
        <button
          onClick={() => setActiveTab('mosque')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            activeTab === 'mosque'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tata Tertib Masjid
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            activeTab === 'contacts'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Kontak Penting
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Preparation Tab */}
        {activeTab === 'preparation' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Hal - Hal yang harus diperhatikan
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <Thermometer className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-800">Cuaca/Temperatur:</p>
                  <p className="text-red-700">Panas Makkah, 25° - 39°C</p>
                  <p className="text-red-700">Madinah Panas 29° - 44°C</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Heart className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-800">Persiapan Kesehatan:</p>
                  <p className="text-blue-700">Ibadah Umroh membutuhkan fisik yang prima</p>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Shirt className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Membawa pakaian muslim/muslimah untuk keperluan selama 9 hari</p>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Shirt className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Membawa pakaian dingin (Jacket, Longjon - Thermal khusus untuk di madinah)</p>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Membawa peralatan Ibadah seperti Mukena & Sajadah</p>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Pill className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Membawa obat obatan pribadi yang di konsumsi sehari hari</p>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Memakai Sandal & Sepatu yang nyaman (Flat Shoes)</p>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Membawa Uang Real / Rupiah</p>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Umbrella className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Membawa payung kecil</p>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Scissors className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Membawa gunting kecil untuk tahalul (di simpan di koper besar bagasi)</p>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Peraturan Bandara:</h4>
                <div className="space-y-2 text-sm text-yellow-700">
                  <div className="flex items-start space-x-2">
                    <Droplets className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>Barang barang cairan yang lebih dari 100 mili wajib masuk ke dalam bagasi pesawat di larang di bawa ke dalam tas jinjing</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Battery className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>Power Bank di larang masuk ke dalam koper / bagasi pesawat. Sebaik nya di masukan ke dalam tas jinjing</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>Benda Tajam seperti gunting untuk tahalul di masukan ke dalam koper / bagasi pesawat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Travel Rules Tab */}
        {activeTab === 'travel' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Plane className="w-5 h-5 mr-2 text-blue-600" />
              TATA TERTIB SELAMA DI PERJALANAN / PESAWAT
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Barang Terlarang:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Tidak diperbolehkan membawa barang berbahaya seperti senjata tajam, senjata api, dan sejenisnya</li>
                  <li>• Berat bagasi tidak boleh melebihi 23 Kg</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Barang Tidak Diperbolehkan di Kabin atau Bagasi:</h4>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li>• <strong>Bahan gas bertekanan:</strong> Kompor gas, tabung gas, korek gas, tabung oksigen</li>
                  <li>• <strong>Bahan peledak:</strong> Amunisi, senjata api</li>
                  <li>• <strong>Cairan mudah terbakar:</strong> Bensin</li>
                  <li>• <strong>Bahan radioaktif:</strong> Magnet, racun, bahan kimia, campuran oksida, asam aki</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Barang Berharga:</h4>
                <p className="text-sm text-blue-700">Barang berharga sebaiknya diletakkan di kabin untuk keamanan; jama'ah bertanggung jawab penuh atas barang bawaan</p>
              </div>

              <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Selama Penerbangan:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Dianjurkan menggerakkan anggota badan karena suhu udara di pesawat sangat dingin</li>
                  <li>• Dianjurkan meminta selimut kepada pramugari jika diperlukan</li>
                  <li>• Jama'ah akan mendapat sarapan 2 jam setelah take-off dan makan siang 2 jam sebelum landing</li>
                  <li>• Selama perjalanan dianjurkan sering berdzikir dan berdo'a</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Mosque Rules Tab */}
        {activeTab === 'mosque' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-green-600" />
              BEBERAPA HAL YANG PERLU DIPERHATIKAN DI SEKITAR MASJID NABAWI DAN MASJIDIL HARAM
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Jam Operasional Masjid Nabawi:</h4>
                <p className="text-sm text-green-700">Masjid Nabawi buka 1 jam sebelum adzan subuh dan tutup jam 22:00. Pembukaannya ditandai dengan suara adzan pertama. Pada bulan Ramadhan masjid buka 24 jam</p>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Shalat Jum'at Subuh:</h4>
                <p className="text-sm text-blue-700">Biasanya setiap shalat Jum'at subuh, Imam di Masjid Nabawi dan Masjidil Haram membaca ayat-ayat sajdah, sehingga jama'ah juga melakukan sujud tilawah bersama Imam</p>
              </div>

              <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Ziarah Makam Rasulullah:</h4>
                <p className="text-sm text-purple-700">Untuk ziarah makam Rasulullah SAW diperlukan izin khusus (tasreh / izin Raudhah) dan dibatasi sekali per jama'ah</p>
              </div>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Pemisahan Area:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Di Masjid Nabawi, pintu masuk laki-laki terpisah dengan perempuan, area shalat juga terpisah</li>
                  <li>• Masjidil Haram buka 24 jam, semua pintu masuk bisa digunakan laki-laki dan perempuan</li>
                  <li>• Tempat wudhu terpisah dari bangunan masjid tetapi berada di dekat masjid</li>
                  <li>• Tempat wudhu memiliki pintu masuk khusus laki-laki dan perempuan</li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Barang Terlarang:</h4>
                <p className="text-sm text-red-700">Ketika memasuki Masjidil Haram atau Masjid Nabawi, dilarang keras membawa kamera dan makanan</p>
              </div>

              <div className="p-4 bg-gray-50 border-l-4 border-gray-400 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Peraturan Umum:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Sepatu atau sandal boleh dibawa masuk masjid dan diletakkan di rak sepatu dekat area shalat</li>
                  <li>• Jama'ah harus hati-hati membawa dompet, uang, atau perhiasan</li>
                  <li>• Dianjurkan selalu memakai kartu identitas (ID Card) atau membawa kartu nama hotel</li>
                  <li>• Untuk perempuan, tidak diperbolehkan memakai pakaian transparan atau ketat, serta tidak boleh memakai make up yang mencolok</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              KONTAK PENTING
            </h3>
            <div className="space-y-6">
              {/* Team Indonesia */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  TEAM INDONESIA
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="font-medium">Ustad Sandra Yusuf</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 font-medium">{formatPhoneNumber('081252013990')}</span>
                      <button
                        onClick={() => openWhatsApp('6281252013990', 'Ustad Sandra Yusuf')}
                        className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                        title="Chat WhatsApp"
                      >
                        WA
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="font-medium">Dandi Nugraha</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 font-medium">{formatPhoneNumber('081310193191')}</span>
                      <button
                        onClick={() => openWhatsApp('6281310193191', 'Dandi Nugraha')}
                        className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                        title="Chat WhatsApp"
                      >
                        WA
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="font-medium">Silvi Maulida</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 font-medium">{formatPhoneNumber('085351991257')}</span>
                      <button
                        onClick={() => openWhatsApp('6285351991257', 'Silvi Maulida')}
                        className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                        title="Chat WhatsApp"
                      >
                        WA
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leader */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Leader Penanggung Jawab selama perjalanan
                </h4>
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <div>
                    <span className="font-medium">Reguler:</span>
                    <span className="ml-2">Ustadz Abdul Holid</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 font-medium">{formatPhoneNumber('081323374410')}</span>
                    <button
                      onClick={() => openWhatsApp('6281323374410', 'Ustadz Abdul Holid')}
                      className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                      title="Chat WhatsApp"
                    >
                      WA
                    </button>
                  </div>
                </div>
              </div>

              {/* Local Guide */}
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  MUTHOWIF/LOCAL GUIDE
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded">
                    <thead>
                      <tr className="bg-purple-100">
                        <th className="px-3 py-2 text-left text-sm font-medium text-purple-800">Nama</th>
                        <th className="px-3 py-2 text-left text-sm font-medium text-purple-800">No HP</th>
                        <th className="px-3 py-2 text-left text-sm font-medium text-purple-800">BUS</th>
                        <th className="px-3 py-2 text-left text-sm font-medium text-purple-800">PAKET</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 text-sm">Ustadzah Nancy Scegaf</td>
                        <td className="px-3 py-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-purple-600 font-medium">{formatPhoneNumber('085710030330')}</span>
                            <button
                              onClick={() => openWhatsApp('6285710030330', 'Ustadzah Nancy Scegaf')}
                              className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                              title="Chat WhatsApp"
                            >
                              WA
                            </button>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-sm">1</td>
                        <td className="px-3 py-2 text-sm">Reguler</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportantInfo;
