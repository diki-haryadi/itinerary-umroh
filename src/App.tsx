import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin, Users, LogOut, Menu, X, Filter } from 'lucide-react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { getCookie, setCookie, removeCookie } from './utils/cookies';

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  // Sample umroh itinerary data
  const defaultActivities: Activity[] = [
    // Hari ke-1 (Day 1): Senin, 18 Agustus 2025 (TASIK - JAKARTA)
    { id: '1-1', time: '11:30', title: 'Ziarah Makam Masyayikh, Pelepasan & Keberangkatan', description: 'Rombongan Jamaah Umroh Tasikmalaya. Makan siang, shalat dzuhur dan ashar di MASJID AL FATTAH', location: 'Tasikmalaya', day: 1, completed: false, type: 'ritual' },
    { id: '1-2', time: '19:00', title: 'Check-in Hotel Transit', description: 'Rombongan Jamaah Tasikmalaya arrives at Hotel Transit, Hotel ZEST BANDARA', location: 'Hotel ZEST BANDARA', day: 1, completed: false, type: 'accommodation' },
    { id: '1-3', time: '20:00', title: 'Check-in Hotel Transit', description: 'Rombongan Jamaah Daerah JABODETABEK arrives at Hotel Transit, Hotel ZEST BANDARA', location: 'Hotel ZEST BANDARA', day: 1, completed: false, type: 'accommodation' },
    { id: '1-4', time: '21:00', title: 'Makan Malam Bersama', description: 'Dinner together at the hotel, followed by preparation for Isya prayer in individual rooms', location: 'Hotel ZEST BANDARA', day: 1, completed: false, type: 'meal' },
    { id: '1-5', time: '22:00', title: 'Istirahat', description: 'Rest in preparation for the next day\'s take-off', location: 'Hotel ZEST BANDARA', day: 1, completed: false, type: 'accommodation' },
    
    // Hari ke-2 (Day 2): Selasa, 19 Agustus 2025 (JAKARTA - JEDDAH - MADINAH)
    { id: '2-1', time: '03:30', title: 'Shalat Tahajjud dan Subuh', description: 'Tahajjud and Shubuh prayers individually in Zest Hotel rooms', location: 'Hotel ZEST BANDARA', day: 2, completed: false, type: 'ritual' },
    { id: '2-2', time: '06:00', title: 'Sarapan Pagi', description: 'Breakfast at Zest Hotel', location: 'Hotel ZEST BANDARA', day: 2, completed: false, type: 'meal' },
    { id: '2-3', time: '12:00', title: 'Shalat Dzuhur dan Ashar Jama\'', description: 'Dzuhur and Ashar prayers combined (Jama\') in individual rooms, followed by preparation for check-out', location: 'Hotel ZEST BANDARA', day: 2, completed: false, type: 'ritual' },
    { id: '2-4', time: '14:00', title: 'Makan Siang dan Briefing', description: 'Lunch, briefing for departure from the hotel to Terminal 3 of Soekarno Hatta International Airport, for boarding pass preparation, check-in, and take-off', location: 'Terminal 3 Soekarno Hatta', day: 2, completed: false, type: 'meal' },
    { id: '2-5', time: '18:35', title: 'Take-off ke DOHA', description: 'Take-off towards Transit Airport DOHA with flight QR 6380, estimated arrival at 23:00', location: 'Pesawat QR 6380', day: 2, completed: false, type: 'transport' },
    
    // Hari ke-3 (Day 3): Rabu, 20 Agustus 2025 (JEDDAH - MADINAH)
    { id: '3-1', time: '00:50', title: 'Take-off dari DOHA', description: 'Take-off from DOHA with flight QR 1184. Jamaah arrives at King Abdul Aziz Jeddah Airport at 03:20', location: 'Pesawat QR 1184', day: 3, completed: false, type: 'transport' },
    { id: '3-2', time: '03:20', title: 'Tiba di Jeddah dan City Tour Badr', description: 'Jamaah proceeds with immigration, baggage claim, etc., then continues to Madinah by BUS. Estimated travel time: +6 hours. City Tour Badr, visiting Makam Syuhada Badr, Masjid Al Arees, Jabal Malaikat, etc. Dzuhur and Ashar prayers combined (Jama\') and lunch at a restaurant', location: 'King Abdul Aziz Jeddah Airport & City Tour Badr', day: 3, completed: false, type: 'sightseeing' },
    { id: '3-3', time: '17:00', title: 'Check-in Hotel Madinah', description: 'Jamaah arrives at Hotel Madinah, check-in, and rests briefly', location: 'Hotel Madinah', day: 3, completed: false, type: 'accommodation' },
    { id: '3-4', time: '17:30', title: 'Shalat Maghrib dan Isya di Masjidil Nabawi', description: 'Jamaah prepares to perform Maghrib and Isya prayers in congregation at Masjidil Nabawi. Dinner at the hotel', location: 'Masjidil Nabawi', day: 3, completed: false, type: 'ritual' },
    { id: '3-5', time: '21:30', title: 'Istirahat', description: 'Jamaah returns to the hotel to rest and prepare for the next day\'s activities', location: 'Hotel Madinah', day: 3, completed: false, type: 'accommodation' },
    
    // Hari ke-4 (Day 4): Kamis, 21 Agustus 2025 (MADINAH - CITY TOUR)
    { id: '4-1', time: '03:00', title: 'Shalat Tahajjud dan Subuh di Masjid Nabawi', description: 'Gather in the lobby for Tahajjud prayer, followed by Shubuh prayer in congregation at Masjid Nabawi', location: 'Masjid Nabawi', day: 4, completed: false, type: 'ritual' },
    { id: '4-2', time: '06:30', title: 'Sarapan Pagi', description: 'Breakfast', location: 'Hotel Madinah', day: 4, completed: false, type: 'meal' },
    { id: '4-3', time: '07:00', title: 'Madinah City Tour', description: 'Madinah City Tour covering (Masjid Quba, Jabal Uhud, Kebun Kurma, Masjid Qiblatain & Masjid Khandak). A Tasawuf study session will be conducted with Ustadz Abdul Holid', location: 'Madinah City Tour', day: 4, completed: false, type: 'sightseeing' },
    { id: '4-4', time: '12:00', title: 'Shalat Dzuhur di Masjid Nabawi', description: 'Dzuhur prayer in congregation at Masjid Nabawi, followed by lunch at the hotel', location: 'Masjid Nabawi', day: 4, completed: false, type: 'ritual' },
    { id: '4-5', time: '15:00', title: 'Shalat Ashar di Masjid Nabawi', description: 'Ashar prayer in congregation at Masjid Nabawi', location: 'Masjid Nabawi', day: 4, completed: false, type: 'ritual' },
    { id: '4-6', time: '17:30', title: 'Persiapan Shalat Maghrib dan Isya', description: 'Preparation to perform Maghrib and Isya prayers in congregation at Masjid Nabawi', location: 'Masjid Nabawi', day: 4, completed: false, type: 'ritual' },
    { id: '4-7', time: '21:30', title: 'Istirahat', description: 'Jamaah returns to the hotel to rest and prepare for the next day\'s activities', location: 'Hotel Madinah', day: 4, completed: false, type: 'accommodation' },
    
    // Hari ke-5 (Day 5): Jum'at, 22 Agustus 2025 (MADINAH - ZIARAH RAWDAH - ZIARAH DALAM)
    { id: '5-1', time: '03:00', title: 'Shalat Tahajjud dan Subuh di Masjid Nabawi', description: 'Jemaah berkumpul di Lobby untuk Sholat Tahajjud berjemaah, dilanjutkan Sholat Subuh di Masjid Nabawi Khataman Quran di masjid nabawi', location: 'Masjid Nabawi', day: 5, completed: false, type: 'ritual' },
    { id: '5-2', time: '06:30', title: 'Sarapan Pagi', description: 'Breakfast', location: 'Hotel Madinah', day: 5, completed: false, type: 'meal' },
    { id: '5-3', time: '08:30', title: 'Tour Dalam Nabawi', description: 'Tour inside Nabawi', location: 'Masjid Nabawi', day: 5, completed: false, type: 'sightseeing' },
    { id: '5-4', time: '11:30', title: 'Shalat Jum\'at di Masjid Nabawi', description: 'Berkumpul di Lobby untuk Sholat Jum\'at berjamaah di Masjid Nabawi, dan dilajutkan makan siang di hotel', location: 'Masjid Nabawi', day: 5, completed: false, type: 'ritual' },
    { id: '5-5', time: '15:30', title: 'Shalat Ashar di Masjid Nabawi', description: 'Asr prayer in congregation at Masjid Nabawi', location: 'Masjid Nabawi', day: 5, completed: false, type: 'ritual' },
    { id: '5-6', time: '16:00', title: 'Ziarah Rawdah Jamaah Laki-laki', description: 'Rawdah Visit for Male Pilgrims *Tentative Time', location: 'Masjid Nabawi', day: 5, completed: false, type: 'ritual' },
    { id: '5-7', time: '17:45', title: 'Shalat Maghrib dan Isya di Masjid Nabawi', description: 'Maghrib and Isha prayer in congregation at Masjid Nabawi, dan dilanjutkan makan malam di hotel', location: 'Masjid Nabawi', day: 5, completed: false, type: 'ritual' },
    { id: '5-8', time: '20:00', title: 'Ziarah Rawdah Jamaah Perempuan', description: 'Rawdah Visit for Female Pilgrims *Tentative Time', location: 'Masjid Nabawi', day: 5, completed: false, type: 'ritual' },
    { id: '5-9', time: '21:45', title: 'Istirahat & Persiapan', description: 'Rest & Preparation for Midnight Wake-up for Tahajjud prayer in congregation', location: 'Hotel Madinah', day: 5, completed: false, type: 'accommodation' },
    
    // Hari ke-6 (Day 6): Sabtu, 23 Agustus 2025 (MADINAH - MAKKAH - UMROH PERTAMA)
    { id: '6-1', time: '03:00', title: 'Shalat Tahajjud dan Subuh di Masjidil Nabawi', description: 'Tahajjud prayer, Subuh prayer in congregation at Masjidil Nabawi', location: 'Masjidil Nabawi', day: 6, completed: false, type: 'ritual' },
    { id: '6-2', time: '06:30', title: 'Sarapan Pagi', description: 'Breakfast', location: 'Hotel Madinah', day: 6, completed: false, type: 'meal' },
    { id: '6-3', time: '07:00', title: 'Packing Barang', description: 'Packing belongings for preparation to Makkah', location: 'Hotel Madinah', day: 6, completed: false, type: 'accommodation' },
    { id: '6-4', time: '09:00', title: 'Persiapan Bagasi', description: 'Luggage placed in front of each room door', location: 'Hotel Madinah', day: 6, completed: false, type: 'accommodation' },
    { id: '6-5', time: '10:30', title: 'Persiapan Shalat', description: 'Preparation for congregational prayer at Masjid Nabawi', location: 'Masjid Nabawi', day: 6, completed: false, type: 'ritual' },
    { id: '6-6', time: '11:30', title: 'Shalat Dzuhur dan Ashar Jama\' Taqdim', description: 'Dhuhr and Asr prayer in combined (jama\' Taqdim) congregation at Masjid Nabawi, dilanjutkan makan siang', location: 'Masjid Nabawi', day: 6, completed: false, type: 'ritual' },
    { id: '6-7', time: '13:00', title: 'Check Out & Berangkat ke Makkah', description: 'Check Out & Depart to Makkah, untuk Perjalanan Menuju Makkah dengan Bus estimasi Perjalanan -+ 6 Jam. Melaksanakan MIQOT di MASJID BIR ALI', location: 'Bus ke Makkah', day: 6, completed: false, type: 'transport' },
    { id: '6-8', time: '19:30', title: 'Shalat Isya di Masjidil Haram', description: 'Congregation gathers in the Lobby to perform Isha prayer in congregation at Masjidil Haram', location: 'Masjidil Haram', day: 6, completed: false, type: 'ritual' },
    { id: '6-9', time: '20:30', title: 'Umroh PERTAMA', description: 'Then proceed with the FIRST Umrah (Tawwaf, Sai, and Tahalul). After that, return to the hotel and rest for tomorrow\'s activities', location: 'Masjidil Haram', day: 6, completed: false, type: 'ritual' },
    
    // Hari ke-7 (Day 7): Ahad, 24 Agustus 2025 (MAKKAH)
    { id: '7-1', time: '03:00', title: 'Shalat Tahajjud dan Subuh di Masjidil Haram', description: 'Congregation gathers in the Lobby for Tahajjud prayer in congregation, followed by Subuh prayer and Quran recitation at Masjidil Haram', location: 'Masjidil Haram', day: 7, completed: false, type: 'ritual' },
    { id: '7-2', time: '06:30', title: 'Sarapan Pagi', description: 'Breakfast', location: 'Hotel Makkah', day: 7, completed: false, type: 'meal' },
    { id: '7-3', time: '11:30', title: 'Shalat Dzuhur di Masjidil Haram', description: 'Gather in the Lobby for Dhuhr prayer in congregation at Masjidil Haram, dan dilajutkan makan siang di hotel', location: 'Masjidil Haram', day: 7, completed: false, type: 'ritual' },
    { id: '7-4', time: '15:30', title: 'Shalat Ashar di Masjidil Haram', description: 'Asr prayer in congregation at Masjidil Haram', location: 'Masjidil Haram', day: 7, completed: false, type: 'ritual' },
    { id: '7-5', time: '17:45', title: 'Shalat Maghrib dan Isya di Masjidil Haram', description: 'Maghrib and Isha prayer in congregation at Masjidil Haram, dan dilanjutkan makan malam di hotel', location: 'Masjidil Haram', day: 7, completed: false, type: 'ritual' },
    { id: '7-6', time: '21:45', title: 'Istirahat & Persiapan', description: 'Rest & Preparation for Midnight Wake-up for Tahajjud prayer in congregation', location: 'Hotel Makkah', day: 7, completed: false, type: 'accommodation' },
    
    // Hari ke-8 (Day 8): Senin, 25 Agustus 2025 (MAKKAH - CITY TOUR - UMROH KEDUA)
    { id: '8-1', time: '03:00', title: 'Shalat Tahajjud dan Subuh di Masjidil Haram', description: 'Gather in hotel lobby, depart to Masjidil Haram, perform Tahajjud and I\'tikaf, followed by Fajr prayer, Dhikr until sunrise', location: 'Masjidil Haram', day: 8, completed: false, type: 'ritual' },
    { id: '8-2', time: '06:30', title: 'Sarapan Pagi', description: 'Breakfast', location: 'Hotel Makkah', day: 8, completed: false, type: 'meal' },
    { id: '8-3', time: '07:00', title: 'Makkah City Tour', description: 'Pilgrims gather in lobby for Makkah City Tour including: Jabal Thawr, Arafat, Muzdalifah, Mina, Thawr Cave, Ma\'la. *Dhuhr prayer performed during City Tour. And will attend Tasawwuf lecture with Ustadz Abdul Holid at NAMIROH Mosque', location: 'Makkah City Tour', day: 8, completed: false, type: 'sightseeing' },
    { id: '8-4', time: '16:00', title: 'Kembali dari City Tour', description: 'Pilgrims return from City Tour to Hotel for preparation of Asr prayer in Masjidil Haram', location: 'Hotel Makkah', day: 8, completed: false, type: 'accommodation' },
    { id: '8-5', time: '16:00', title: 'Umroh KEDUA', description: 'Pilgrims gather in lobby to Masjidil Haram for second Umrah, Tawaf, Sa\'i and Tahallul. Then Maghrib and Isha prayers in Masjidil Haram', location: 'Masjidil Haram', day: 8, completed: false, type: 'ritual' },
    { id: '8-6', time: '21:30', title: 'Istirahat & Persiapan', description: 'Rest & Preparation for Midnight Prayer (Tahajjud)', location: 'Hotel Makkah', day: 8, completed: false, type: 'accommodation' },
    
    // Hari ke-9 (Day 9): Selasa, 26 Agustus 2025 (MAKKAH - UMROH KETIGA (OPTIONAL))
    { id: '9-1', time: '03:00', title: 'Shalat Tahajjud dan Subuh di Masjidil Haram', description: 'Pilgrims gather in Lobby for Tahajjud prayer, followed by Fajr prayer and Khataman Quran in Masjidil Haram', location: 'Masjidil Haram', day: 9, completed: false, type: 'ritual' },
    { id: '9-2', time: '06:30', title: 'Sarapan Pagi', description: 'Breakfast', location: 'Hotel Makkah', day: 9, completed: false, type: 'meal' },
    { id: '9-3', time: '11:30', title: 'Shalat Dzuhur di Masjidil Haram', description: 'Gather in Lobby for Dhuhr prayer in Masjidil Haram, followed by lunch at hotel', location: 'Masjidil Haram', day: 9, completed: false, type: 'ritual' },
    { id: '9-4', time: '15:30', title: 'Shalat Ashar di Masjidil Haram', description: 'Asr prayer in Masjidil Haram', location: 'Masjidil Haram', day: 9, completed: false, type: 'ritual' },
    { id: '9-5', time: '17:45', title: 'Shalat Maghrib dan Isya di Masjidil Haram', description: 'Maghrib and Isha prayers in Masjidil Haram, followed by dinner at hotel', location: 'Masjidil Haram', day: 9, completed: false, type: 'ritual' },
    { id: '9-6', time: '21:45', title: 'Istirahat & Persiapan', description: 'Rest & Preparation for Midnight Prayer (Tahajjud)', location: 'Hotel Makkah', day: 9, completed: false, type: 'accommodation' },
    
    // Hari ke-10 (Day 10): Rabu, 27 Agustus 2025 (MAKKAH - TAWWAF WADA - JEDDAH - JAKARTA)
    { id: '10-1', time: '03:00', title: 'Shalat Tahajjud dan Subuh di Masjidil Haram', description: 'Gather in hotel lobby, depart to Masjidil Haram, Tahajjud prayer, and I\'tikaf followed by Fajr prayer until sunrise. Then perform Tawwaf Wada (Farewell Tawaf)', location: 'Masjidil Haram', day: 10, completed: false, type: 'ritual' },
    { id: '10-2', time: '06:30', title: 'Sarapan dan Persiapan Check Out', description: 'Breakfast and Check out preparation', location: 'Hotel Makkah', day: 10, completed: false, type: 'meal' },
    { id: '10-3', time: '10:00', title: 'Persiapan Bagasi', description: 'All pilgrim luggage stored in front of their respective rooms', location: 'Hotel Makkah', day: 10, completed: false, type: 'accommodation' },
    { id: '10-4', time: '11:00', title: 'Check Out dan Persiapan Shalat', description: 'Check out and preparation for Dhuhr prayer', location: 'Hotel Makkah', day: 10, completed: false, type: 'accommodation' },
    { id: '10-5', time: '12:00', title: 'Shalat Dzuhur', description: 'Dhuhr prayer', location: 'Masjidil Haram', day: 10, completed: false, type: 'ritual' },
    { id: '10-6', time: '13:00', title: 'Perjalanan ke Jeddah', description: 'Travel to Jeddah, King Abdul Aziz Airport', location: 'King Abdul Aziz Airport', day: 10, completed: false, type: 'transport' },
    { id: '10-7', time: '18:00', title: 'Check-in dan Immigration', description: 'Baggage check-in, Immigration, and Boarding process', location: 'King Abdul Aziz Airport', day: 10, completed: false, type: 'transport' },
    { id: '10-8', time: '22:35', title: 'Take-off ke DOHA', description: 'Take off to Transit Airport DOHA with QR 1189, estimated arrival at 00:55+1', location: 'Pesawat QR 1189', day: 10, completed: false, type: 'transport' },
    
    // Hari ke-11 (Day 11): Kamis, 28 Agustus 2025 (JAKARTA INDONESIA)
    { id: '11-1', time: '00:55', title: 'Take-off dari DOHA', description: 'Take off from DOHA with QR 6381 and pilgrims arrive at Soekarno Hatta International Airport, Indonesia at 15:00', location: 'Pesawat QR 6381', day: 11, completed: false, type: 'transport' },
    { id: '11-2', time: '15:00', title: 'Tiba di Indonesia', description: 'Arrive at Soekarno Hatta International Airport CGK Indonesia. Baggage check-out, Immigration process, etc', location: 'Bandara Soekarno Hatta', day: 11, completed: false, type: 'transport' },
    { id: '11-3', time: '17:00', title: 'Berkumpul dan Doa Syukur', description: 'Gather and pray, giving thanks for completing Umrah, and return to respective regions. Tasikmalaya group departs by BUS with travel time ~6 hours', location: 'Bandara Soekarno Hatta', day: 11, completed: false, type: 'ritual' },
    { id: '11-4', time: '22:00', title: 'Tiba di Masjid Al Fattah', description: 'Tasikmalaya group arrives at Al Fattah Mosque', location: 'Masjid Al Fattah', day: 11, completed: false, type: 'ritual' },
    { id: '11-5', time: '23:00', title: 'Tiba di Rumah Masing-masing', description: 'Arrive at respective homes, safely and hopefully all 10 days of Umrah pilgrimage with Idrisiyyah Tour Travel are accepted by Allah SWT. Aamiin', location: 'Rumah Masing-masing', day: 11, completed: false, type: 'accommodation' },
  ];

  useEffect(() => {
    checkAuth();
    loadActivities();
    setLoading(false);
  }, []);

  // Debug effect to log activities changes
  useEffect(() => {
    if (activities.length > 0) {
      const completedCount = activities.filter((a: Activity) => a.completed).length;
      console.log('Activities state updated:', activities.length, 'total,', completedCount, 'completed');
    }
  }, [activities]);

  const checkAuth = () => {
    const session = getCookie('umroh_session');
    if (session) {
      try {
        const userData = JSON.parse(session);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        removeCookie('umroh_session');
      }
    }
  };

  const loadActivities = () => {
    const savedActivities = getCookie('umroh_activities');
    console.log('Loading activities from cookie:', savedActivities);
    if (savedActivities) {
      try {
        const parsedActivities = JSON.parse(decodeURIComponent(savedActivities));
        console.log('Successfully parsed activities:', parsedActivities.length, 'activities');
        setActivities(parsedActivities);
      } catch (error) {
        console.error('Error parsing activities from cookie:', error);
        setActivities(defaultActivities);
      }
    } else {
      console.log('No saved activities found, using default activities');
      setActivities(defaultActivities);
    }
  };

  const handleLogin = (email: string, password: string) => {
    if (email === 'admin@gmail.com' && password === 'admin') {
      const userData = { email, name: 'Admin Umroh' };
      setUser(userData);
      setIsLoggedIn(true);
      setCookie('umroh_session', JSON.stringify(userData), 7); // 7 days
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    removeCookie('umroh_session');
  };

  const toggleActivityCompletion = (activityId: string) => {
    console.log('Toggling activity:', activityId);
    const updatedActivities = activities.map(activity =>
      activity.id === activityId
        ? { ...activity, completed: !activity.completed }
        : activity
    );
    console.log('Updated activities:', updatedActivities.filter((a: Activity) => a.completed).length, 'completed');
    setActivities(updatedActivities);
    
    // Save to cookie immediately
    const activitiesJson = JSON.stringify(updatedActivities);
    console.log('Saving activities to cookie:', activitiesJson.length, 'characters');
    setCookie('umroh_activities', encodeURIComponent(activitiesJson), 30); // 30 days
    
    // Verify the cookie was set
    const savedCookie = getCookie('umroh_activities');
    console.log('Verification - cookie after save:', savedCookie ? 'exists' : 'not found');
    
    // Show save notification
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 2000);
  };

  const resetActivities = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset semua aktivitas? Semua progress yang sudah dicentang akan hilang.')) {
      console.log('Resetting activities to default');
      setActivities(defaultActivities);
      setCookie('umroh_activities', encodeURIComponent(JSON.stringify(defaultActivities)), 30);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      {showSaveNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Progress tersimpan!</span>
          </div>
        </div>
      )}
      <Dashboard
        user={user}
        activities={activities}
        onLogout={handleLogout}
        onToggleActivity={toggleActivityCompletion}
        onResetActivities={resetActivities}
      />
    </>
  );
}

export default App;