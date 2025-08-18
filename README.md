# Umroh Itinerary Tracker

Aplikasi tracking jadwal Umroh dengan fitur penyimpanan progress otomatis menggunakan localStorage.

## Fitur Utama

### ✅ **Penyimpanan Progress Otomatis**
- Semua aktivitas yang dicentang tersimpan otomatis di browser localStorage
- Data tetap ada setelah reload halaman atau restart browser
- Progress tersimpan secara permanen (tidak ada batasan waktu)
- Fallback ke cookies jika localStorage tidak tersedia

### ✅ **11 Hari Perjalanan Lengkap**
- Hari 1-2: Perjalanan dari Indonesia ke Madinah
- Hari 3-5: Aktivitas di Madinah (Ziarah, City Tour, Rawdah)
- Hari 6-9: Perjalanan ke Makkah dan Umroh
- Hari 10-11: Tawaf Wada dan kembali ke Indonesia

### ✅ **Kategorisasi Aktivitas**
- 🚗 **Transportasi**: Penerbangan, bus, perjalanan
- 🕌 **Ibadah**: Shalat, umroh, ziarah
- 🍽️ **Makan**: Sarapan, makan siang, makan malam
- 🏨 **Akomodasi**: Check-in/out hotel, istirahat
- 📸 **Wisata**: City tour, ziarah tempat bersejarah

### ✅ **Fitur Filtering**
- Filter berdasarkan hari (1-11)
- Filter berdasarkan jenis aktivitas
- Tampilkan/sembunyikan aktivitas yang sudah selesai

### ✅ **Progress Tracking**
- Progress bar menunjukkan persentase aktivitas selesai
- Statistik aktivitas total dan yang sudah selesai
- Notifikasi visual saat progress tersimpan

### ✅ **Fitur Reset**
- Tombol reset untuk mengembalikan semua aktivitas ke status awal
- Konfirmasi dialog untuk mencegah reset tidak sengaja

### ✅ **Informasi Hotel**
- Detail lengkap hotel transit dan hotel Umroh
- Informasi alamat, nomor telepon, dan tanggal menginap
- Tampilan yang terorganisir dengan kategori transit dan Umroh reguler
- Tombol toggle untuk menampilkan/menyembunyikan informasi hotel

### ✅ **Informasi Penting**
- **Tab Persiapan**: Checklist lengkap barang yang harus dibawa, peraturan bandara, dan persiapan kesehatan
- **Tab Tata Tertib Perjalanan**: Peraturan penerbangan, barang terlarang, dan panduan selama di pesawat
- **Tab Tata Tertib Masjid**: Peraturan di Masjid Nabawi dan Masjidil Haram, jam operasional, dan pemisahan area
- **Tab Kontak Penting**: Nomor telepon team Indonesia, leader, dan local guide
- Tampilan tab yang interaktif dengan warna yang berbeda untuk setiap kategori

### ✅ **Export/Import Data**
- Export data aktivitas ke file JSON untuk backup
- Import data dari file JSON untuk memulihkan progress
- Format file yang terstruktur dengan metadata

## Cara Penggunaan

1. **Login**: Gunakan email `admin@gmail.com` dan password `admin`
2. **Centang Aktivitas**: Klik lingkaran di sebelah kiri aktivitas untuk menandai selesai
3. **Filter**: Gunakan sidebar untuk memfilter aktivitas berdasarkan hari atau jenis
4. **Info Hotel**: Klik "Tampilkan Info Hotel" di sidebar untuk melihat detail akomodasi
5. **Info Penting**: Klik "Tampilkan Info Penting" di sidebar untuk melihat panduan lengkap
6. **Export/Import**: Gunakan tombol Export/Import untuk backup dan restore data
7. **Reset**: Klik "Reset Semua Aktivitas" di sidebar jika ingin mengulang dari awal

## Teknologi

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Browser localStorage (dengan fallback ke cookies)
- **Icons**: Lucide React

## Struktur Data

Setiap aktivitas memiliki properti:
```typescript
interface Activity {
  id: string;           // ID unik aktivitas
  time: string;         // Waktu aktivitas (format: HH:MM)
  title: string;        // Judul aktivitas
  description: string;  // Deskripsi detail
  location: string;     // Lokasi aktivitas
  day: number;          // Hari ke berapa (1-11)
  completed: boolean;   // Status selesai
  type: 'transport' | 'ritual' | 'meal' | 'accommodation' | 'sightseeing';
}
```

Setiap hotel memiliki properti:
```typescript
interface Hotel {
  id: string;           // ID unik hotel
  name: string;         // Nama hotel
  address: string;      // Alamat lengkap hotel
  phone: string;        // Nomor telepon hotel
  dates: string;        // Tanggal menginap
  location: string;     // Lokasi kota
  type: 'transit' | 'umroh'; // Jenis hotel
}
```

## Storage System

Aplikasi menggunakan sistem storage hybrid:

### **Primary Storage: localStorage**
- `umroh_activities`: Data aktivitas dan progress
- Tidak ada batasan ukuran data
- Data tersimpan secara permanen
- Lebih reliable untuk data yang besar

### **Backup Storage: Cookies**
- `umroh_session`: Data login user (7 hari)
- `umroh_activities`: Backup data aktivitas (30 hari)
- Digunakan jika localStorage tidak tersedia

### **Migration System**
- Otomatis migrasi data dari cookies ke localStorage
- Fallback otomatis jika localStorage tidak tersedia
- Notifikasi visual jika menggunakan backup storage
