import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Phone, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// This would come from a database in production
const OFFICIAL_CONTACT = "+62 811-2223-3121";
const ITEM_DETAILS: Record<string, any> = {
  "1": {
    id: "1",
    name: "Tas Ransel Hitam",
    description: "Tas ransel warna hitam dengan logo Nike di bagian depan. Berisi laptop Asus, charger, dan beberapa buku pelajaran. Kondisi tas masih sangat baik.",
    category: "Tas",
    station: "Stasiun Gambir",
    stationId: "1",
    foundDate: "2025-10-01",
    foundLocation: "Gerbong 3, Kereta Argo Bromo Anggrek tujuan Surabaya",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Medan Merdeka Timur No. 1, Jakarta Pusat",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan saat pengambilan barang.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Gambir,+Jl.+Medan+Merdeka+Timur+No.+1,+Jakarta+Pusat",
  },
  "2": {
    id: "2",
    name: "Dompet Kulit Coklat",
    description: "Dompet pria kulit coklat dengan beberapa kartu identitas",
    category: "Dompet",
    station: "Stasiun Gambir",
    stationId: "1",
    foundDate: "2025-09-30",
    foundLocation: "Gerbong 4, Kereta Argo Bromo Anggrek tujuan Surabaya",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Medan Merdeka Timur No. 1, Jakarta Pusat",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan saat pengambilan barang.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Gambir,+Jl.+Medan+Merdeka+Timur+No.+1,+Jakarta+Pusat",
  },
  "3": {
    id: "3",
    name: "iPhone 14 Pro",
    description: "iPhone 14 Pro warna silver dengan casing biru.",
    category: "Elektronik",
    station: "Stasiun Gambir",
    stationId: "1",
    foundDate: "2025-10-02",
    foundLocation: "Gerbong 2, Kereta Argo Bromo Anggrek tujuan Surabaya",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Medan Merdeka Timur No. 1, Jakarta Pusat",
    image: "https://img.myipadbox.com/upload/store/detail_l/EDA003101704C_1.jpg",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Gambir,+Jl.+Medan+Merdeka+Timur+No.+1,+Jakarta+Pusat",
  },
  "4": {
    id: "4",
    name: "Kunci Motor Honda",
    description: "Kunci motor Honda dengan gantungan kunci karakter",
    category: "Kunci",
    station: "Stasiun Gambir",
    stationId: "1",
    foundDate: "2025-09-29",
    foundLocation: "Gerbong 2, Kereta Argo Bromo Anggrek tujuan Surabaya",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Medan Merdeka Timur No. 1, Jakarta Pusat",
    image: "https://www.hondacengkareng.com/wp-content/uploads/2020/05/KeyBlank-35121K1AN00.jpg",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan saat pengambilan barang.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Gambir,+Jl.+Medan+Merdeka+Timur+No.+1,+Jakarta+Pusat",
  },
  "5": { 
    id: "5",
    name: "Kacamata Hitam",
    description: "Kacamata hitam dengan frame emas dalam casing coklat",
    category: "Aksesori",
    station: "Stasiun Gambir",
    stationId: "1",
    foundDate: "2025-10-01",
    foundLocation: "Gerbong 6, Kereta Argo Bromo Anggrek tujuan Surabaya",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Medan Merdeka Timur No. 1, Jakarta Pusat",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan saat pengambilan barang.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Gambir,+Jl.+Medan+Merdeka+Timur+No.+1,+Jakarta+Pusat",
  },
  "6": {
    id: "6",
    name: "Payung Lipat Biru",
    description: "Payung lipat otomatis warna biru tua",
    category: "Lainnya",
    station: "Stasiun Gambir",
    stationId: "1",
    foundDate: "2025-10-02",
    foundLocation: "Gerbong 2, Kereta Argo Bromo Anggrek tujuan Surabaya",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Medan Merdeka Timur No. 1, Jakarta Pusat",
    image: "https://www.shutterstock.com/image-photo/set-phantom-blue-foldable-umbrella-260nw-1550717192.jpg",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Gambir,+Jl.+Medan+Merdeka+Timur+No.+1,+Jakarta+Pusat",
  },
  "7": {
    id: "7",
    name: "Tas Ransel Hitam",
    description: "Tas ransel warna hitam dengan logo Nike",
    category: "Tas",
    station: "Stasiun Pasar Senen",
    stationId: "2",
    foundDate: "2025-10-01",
    foundLocation: "Ruang tunggu utama",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Pasar Senen No. 1, Jakarta Pusat",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan saat pengambilan barang.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Pasar+Senen",
  },
  "8": {
    id: "8",
    name: "Koper Merah",
    description: "Koper besar warna merah dengan stiker bandara",
    category: "Lainnya",
    station: "Stasiun Pasar Senen",
    stationId: "2",
    foundDate: "2025-09-29",
    foundLocation: "Gerbong 5, KA Bengawan",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Pasar Senen No. 1, Jakarta Pusat",
    image: "https://images.unsplash.com/photo-1582725800-fdb1d1e4c2f2?w=400",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Pasar+Senen", 
  },
  "9": {
    id: "9",
    name: "Payung Hitam",
    description: "Payung lipat warna hitam polos",
    category: "Lainnya",
    station: "Stasiun Pasar Senen",
    stationId: "2",
    foundDate: "2025-09-25",
    foundLocation: "Peron 3",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Pasar Senen No. 1, Jakarta Pusat",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Pasar+Senen",
  },
  "10": {
    id: "10",
    name: "Jaket Jeans",
    description: "Jaket jeans biru dengan robekan di lengan",
    category: "Lainnya",
    station: "Stasiun Bandung",
    stationId: "3",
    foundDate: "2025-09-30",
    foundLocation: "Ruang tunggu",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Kebon Kawung No. 43, Bandung",
    image: "https://images.unsplash.com/photo-1618354691263-d8f8a3cfc246?w=400",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan saat pengambilan barang.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Bandung",
  },
  "11": {
    id: "11",
    name: "Kamera DSLR",
    description: "Kamera Canon DSLR hitam",
    category: "Elektronik",
    station: "Stasiun Bandung",
    stationId: "3",
    foundDate: "2025-09-27",
    foundLocation: "Gerbong 4, KA Turangga",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Kebon Kawung No. 43, Bandung",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Bandung",
  },
  "12": {
    id: "12",
    name: "Dompet Coklat",
    description: "Dompet kulit warna coklat berisi kartu identitas",
    category: "Aksesori",
    station: "Stasiun Bandung",
    stationId: "3",
    foundDate: "2025-09-25",
    foundLocation: "Toilet umum stasiun",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Kebon Kawung No. 43, Bandung",
    image: "https://images.unsplash.com/photo-1610394219756-3b7a2c1a8f7c?w=400",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Bandung",
  },
  "13": {
    id: "13",
    name: "Topi Hitam",
    description: "Topi baseball hitam polos",
    category: "Aksesori",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-10-01",
    foundLocation: "Peron 1",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Kota No. 1, Jakarta Barat",
    image: "https://www.elfs-shop.com/~img/to1_baseball_twill_import_hx1-05d6b-3073_8331-t2494_81.webp",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan saat pengambilan barang.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Jakarta+Kota",
  },
  "14": {
    id: "14",
    name: "Botol Minum Biru",
    description: "Botol minum plastik biru merk Tupperware",
    category: "Lainnya",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-30",
    foundLocation: "Ruang tunggu",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Kota No. 1, Jakarta Barat",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrz3XSRyFdwHmDRSOAtZ9vLJgW9OQjAnCatA&s",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Jakarta+Kota",
  },
  "15": {
    id: "15",
    name: "Earphone Putih",
    description: "Earphone kabel warna putih",
    category: "Elektronik",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-28",
    foundLocation: "Gerbong 2, KA Commuter Line",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Kota No. 1, Jakarta Barat",
    image: "https://images.unsplash.com/photo-1597776395721-2d0d8a3cfcf1?w=400",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan saat pengambilan barang.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Jakarta+Kota",
  },
  "16": {
    id: "16",
    name: "Payung Biru",
    description: "Payung lipat otomatis warna biru tua",
    category: "Lainnya",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-27",
    foundLocation: "Peron 3",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Kota No. 1, Jakarta Barat",
    image: "https://www.shutterstock.com/image-photo/set-phantom-blue-foldable-umbrella-260nw-1550717192.jpg",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Jakarta+Kota",
  },
  "17": {
    id: "17",
    name: "Kacamata Hitam",
    description: "Kacamata hitam model aviator",
    category: "Aksesori",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-26",
    foundLocation: "Ruang tunggu VIP",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Kota No. 1, Jakarta Barat",
    image: "https://images.unsplash.com/photo-1589367920160-65e7d88a5c0b?w=400",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan saat pengambilan barang.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Jakarta+Kota",
  },
  "18": {
    id: "18",
    name: "Jam Tangan",
    description: "Jam tangan digital warna hitam",
    category: "Aksesori",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-25",
    foundLocation: "Gerbong 5, KA Commuter Line",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Kota No. 1, Jakarta Barat",
    image: "https://images.unsplash.com/photo-1512499617640-c2f999098f57?w=400",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut.",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Jakarta+Kota",
  },
  "19": {
    id: "19",
    name: "Koper Hitam",
    description: "Koper ukuran sedang berwarna hitam dengan kunci kombinasi.",
    category: "Tas",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-25",
    foundLocation: "Ruang tunggu peron 3",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Kota No. 1, Jakarta Barat",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Jakarta+Kota",
    image: "https://www.shutterstock.com/image-photo/black-travel-suitcase-isolated-on-260nw-1444419800.jpg",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan saat pengambilan barang."
  },
  "20": {
    id: "20",
    name: "Kotak Kacamata",
    description: "Kotak kacamata warna merah dengan tulisan 'Ray-Ban'.",
    category: "Aksesori",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-28",
    foundLocation: "Gerbong 5, KA Bengawan tujuan Solo",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Kota No. 1, Jakarta Barat",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Jakarta+Kota",
    image: "https://www.shutterstock.com/image-photo/red-glasses-case-isolated-on-260nw-1353088293.jpg",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut."
  },
  "21": {
    id: "21",
    name: "Boneka Panda",
    description: "Boneka panda ukuran kecil tertinggal di kursi tunggu.",
    category: "Lainnya",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-30",
    foundLocation: "Area ruang tunggu hall utama",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Kota No. 1, Jakarta Barat",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Jakarta+Kota",
    image: "https://www.shutterstock.com/image-photo/toy-panda-bear-on-white-260nw-1430824834.jpg",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut."
  },
  "22": {
    id: "22",
    name: "Helm Motor",
    description: "Helm motor warna putih polos merk INK.",
    category: "Lainnya",
    station: "Stasiun Manggarai",
    stationId: "10",
    foundDate: "2025-09-26",
    foundLocation: "Loket pembelian tiket",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Manggarai Utara 1, Manggarai, Tebet, Jakarta Selatan 12850",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Manggarai",
    image: "https://www.shutterstock.com/image-photo/motorcycle-helmet-white-background-260nw-202875029.jpg",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan saat pengambilan barang."
  },
  "23": {
    id: "23",
    name: "Jam Tangan",
    description: "Jam tangan pria dengan strap kulit cokelat.",
    category: "Aksesori",
    station: "Stasiun Manggarai",
    stationId: "10",
    foundDate: "2025-09-29",
    foundLocation: "Gerbong 4, KA Argo Parahyangan tujuan Jakarta",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Manggarai Utara 1, Manggarai, Tebet, Jakarta Selatan 12850",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Manggarai",
    image: "https://www.shutterstock.com/image-photo/wrist-watch-leather-band-260nw-1726381967.jpg",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut."
  },
  "24": {
    id: "24",
    name: "Laptop Asus",
    description: "Laptop Asus warna abu-abu, terdapat stiker di bagian cover.",
    category: "Elektronik",
    station: "Stasiun Manggarai",
    stationId: "10",
    foundDate: "2025-09-30",
    foundLocation: "Peron keberangkatan KA",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Manggarai Utara 1, Manggarai, Tebet, Jakarta Selatan 12850",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Manggarai",
    image: "https://www.shutterstock.com/image-photo/laptop-asus-gray-260nw-1159265980.jpg",
    additionalNotes: "Barang sedang dalam proses klaim. Silakan hubungi petugas untuk informasi lebih lanjut."
  },
  "25": {
    id: "25",
    name: "Ransel Biru",
    description: "Ransel warna biru merk Eiger berisi pakaian.",
    category: "Tas",
    station: "Stasiun Tanah Abang",
    stationId: "11",
    foundDate: "2025-09-27",
    foundLocation: "Peron 1 dekat pintu masuk utama",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Jatibaru Raya, Kampung Bali, Tanah Abang, Jakarta Pusat 10250",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Tanah+Abang",
    image: "https://www.shutterstock.com/image-photo/blue-backpack-isolated-on-white-260nw-1927611764.jpg",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan saat pengambilan barang."
  },
  "26": {
    id: "26",
    name: "Payung Lipat Polkadot",
    description: "Payung lipat berwarna merah dengan motif polkadot putih.",
    category: "Lainnya",
    station: "Stasiun Tanah Abang",
    stationId: "11",
    foundDate: "2025-09-25",
    foundLocation: "Ruang tunggu keberangkatan",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Jatibaru Raya, Kampung Bali, Tanah Abang, Jakarta Pusat 10250",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Tanah+Abang",
    image: "https://www.shutterstock.com/image-photo/red-polka-dot-umbrella-isolated-260nw-1512079451.jpg",
    additionalNotes: "Harap membawa identitas diri saat pengambilan barang."
  },
  "27": {
    id: "27",
    name: "Smartphone Samsung",
    description: "HP Samsung Galaxy A52 dengan casing transparan.",
    category: "Elektronik",
    station: "Stasiun Tanah Abang",
    stationId: "11",
    foundDate: "2025-09-28",
    foundLocation: "Gerbong 6, KA Argo Lawu",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Jatibaru Raya, Kampung Bali, Tanah Abang, Jakarta Pusat 10250",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Tanah+Abang",
    image: "https://www.shutterstock.com/image-photo/samsung-galaxy-smartphone-isolated-on-260nw-1939247862.jpg",
    additionalNotes: "Barang sedang dalam proses klaim."
  },
  "28": {
    id: "28",
    name: "Sepeda Lipat Hitam",
    description: "Sepeda lipat merk United, warna hitam doff.",
    category: "Lainnya",
    station: "Stasiun Bogor",
    stationId: "12",
    foundDate: "2025-09-29",
    foundLocation: "Parkiran sisi timur stasiun",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Nyi Raja Permas No.1, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16124",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Bogor",
    image: "https://www.shutterstock.com/image-photo/folding-bicycle-black-color-isolated-260nw-1488329115.jpg",
    additionalNotes: "Silakan hubungi petugas parkir untuk konfirmasi lebih lanjut."
  },
  "29": {
    id: "29",
    name: "Tas Ransel Gunung",
    description: "Tas ransel gunung merk Eiger warna hijau army.",
    category: "Tas",
    station: "Stasiun Bogor",
    stationId: "12",
    foundDate: "2025-09-26",
    foundLocation: "Ruang tunggu keberangkatan KA Bima",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Nyi Raja Permas No.1, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16124",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Bogor",
    image: "https://www.shutterstock.com/image-photo/green-eiger-backpack-isolated-on-white-260nw-2110241893.jpg",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan."
  },
  "30": {
    id: "30",
    name: "Laptop Asus",
    description: "Laptop Asus VivoBook warna silver dengan stiker anime di cover.",
    category: "Elektronik",
    station: "Stasiun Depok",
    stationId: "13",
    foundDate: "2025-09-27",
    foundLocation: "Gerbong 3, KA Argo Wilis tujuan Bandung",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Depok, Pancoran Mas, Kecamatan Pancoran Mas, Kota Depok, Jawa Barat 16436",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Depok",
    image: "https://www.shutterstock.com/image-photo/asus-laptop-silver-color-isolated-on-260nw-2057321845.jpg",
    additionalNotes: "Barang sedang dalam proses klaim."
  },
  "31": {
    id: "31",
    name: "Koper Hitam",
    description: "Koper besar warna hitam dengan label nama 'Andi'.",
    category: "Tas",
    station: "Stasiun Depok",
    stationId: "13",
    foundDate: "2025-09-29",
    foundLocation: "Area pengambilan bagasi",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Depok, Pancoran Mas, Kecamatan Pancoran Mas, Kota Depok, Jawa Barat 16436",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Depok",
    image: "https://www.shutterstock.com/image-photo/black-suitcase-isolated-on-white-background-260nw-1745762181.jpg",
    additionalNotes: "Barang sudah diklaim, silakan hubungi petugas bila ada masalah."
  },
  "32": {
    id: "32",
    name: "Tas Belanja Hijau",
    description: "Tas belanja kain warna hijau.",
    category: "Tas",
    station: "Stasiun Depok",
    stationId: "13",
    foundDate: "2025-09-29",
    foundLocation: "Gerbong 2 KA Matarmaja",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jl. Stasiun Depok, Pancoran Mas, Kecamatan Pancoran Mas, Kota Depok, Jawa Barat 16436",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Depok",
    image: "https://www.shutterstock.com/image-photo/green-shopping-bag-isolated-on-white-260nw-2233445566.jpg",
    additionalNotes: "Barang sudah diklaim, silakan hubungi petugas bila ada masalah."
  },
  "33": {
    id: "33",
    name: "Kunci Motor",
    description: "Kunci motor dengan gantungan Doraemon.",
    category: "Kunci",
    station: "Stasiun Bekasi",
    stationId: "14",
    foundDate: "2025-09-27",
    foundLocation: "Parkiran motor",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Ir. H. Juanda, Marga Mulya, Bekasi Utara, Kota Bekasi, Jawa Barat 17126",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Bekasi",
    image: "https://www.shutterstock.com/image-photo/motorbike-key-isolated-on-white-background-260nw-1345678912.jpg",
    additionalNotes: "Barang sedang dalam proses klaim."
  },
  "34": {
    id: "34",
    name: "Sepeda Motor Miniatur",
    description: "Miniatur sepeda motor vespa warna biru.",
    category: "Lainnya",
    station: "Stasiun Bekasi",
    stationId: "14",
    foundDate: "2025-09-26",
    foundLocation: "Ruang tunggu",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Ir. H. Juanda, Marga Mulya, Bekasi Utara, Kota Bekasi, Jawa Barat 17126",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Bekasi",
    image: "https://www.shutterstock.com/image-photo/blue-vespa-toy-miniature-isolated-on-white-260nw-1122334456.jpg",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan."
  },
  "35": {
    id: "35",
    name: "Sepatu Olahraga",
    description: "Sepatu olahraga Adidas warna putih biru.",
    category: "Lainnya",
    station: "Stasiun Tangerang",
    stationId: "15",
    foundDate: "2025-09-25",
    foundLocation: "Peron 1",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Kiasnawi, Sukarasa, Kec. Tangerang, Kota Tangerang, Banten 15111",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Tangerang",
    image: "https://www.shutterstock.com/image-photo/white-sports-shoes-isolated-on-white-260nw-1122334455.jpg",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan."
  },
  "36": {
    id: "36",
    name: "Powerbank Putih",
    description: "Powerbank warna putih kapasitas 10.000mAh merk Xiaomi.",
    category: "Elektronik",
    station: "Stasiun Tangerang",
    stationId: "15",
    foundDate: "2025-09-25",
    foundLocation: "Ruang tunggu keberangkatan",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Kiasnawi, Sukarasa, Kec. Tangerang, Kota Tangerang, Banten 15111",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Tangerang",
    image: "https://www.shutterstock.com/image-photo/powerbank-isolated-on-white-background-260nw-1034561234.jpg",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan."
  },
  "37": {
    id: "37",
    name: "Buku Catatan",
    description: "Buku catatan warna hitam ukuran A5.",
    category: "Lainnya",
    station: "Stasiun Tangerang",
    stationId: "15",
    foundDate: "2025-09-27",
    foundLocation: "Gerbong 1 KA Argo Muria",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Kiasnawi, Sukarasa, Kec. Tangerang, Kota Tangerang, Banten 15111",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Tangerang",
    image: "https://www.shutterstock.com/image-photo/black-notebook-isolated-on-white-background-260nw-2234561122.jpg",
    additionalNotes: "Barang sedang dalam proses klaim."
  },
  "38": {
    id: "38",
    name: "Koper Silver",
    description: "Koper besar warna silver dengan stiker wisata.",
    category: "Tas",
    station: "Stasiun Serpong",
    stationId: "16",
    foundDate: "2025-09-29",
    foundLocation: "Peron 4",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Stasiun Serpong No. 1, Cilenggang, Serpong, Kota Tangerang Selatan, Banten 15310",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Serpong",
    image: "https://www.shutterstock.com/image-photo/silver-suitcase-isolated-on-white-background-260nw-1456123456.jpg",
    additionalNotes: "Barang sudah diklaim, silakan hubungi petugas bila ada masalah."
  },
  "39": {
    id: "39",
    name: "Handphone iPhone X",
    description: "iPhone X warna silver dengan casing transparan.",
    category: "Elektronik",
    station: "Stasiun Serpong",
    stationId: "16",
    foundDate: "2025-09-26",
    foundLocation: "Ruang tunggu utama",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Stasiun Serpong No. 1, Cilenggang, Serpong, Kota Tangerang Selatan, Banten 15310",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Serpong",
    image: "https://www.shutterstock.com/image-photo/apple-iphone-x-isolated-on-white-260nw-1034567890.jpg",
    additionalNotes: "Barang sedang dalam proses klaim."
  },
  "40": {
    id: "40",
    name: "Kamera GoPro",
    description: "Kamera GoPro Hero 9 warna hitam.",
    category: "Elektronik",
    station: "Stasiun Serpong",
    stationId: "16",
    foundDate: "2025-09-28",
    foundLocation: "Ruang tunggu eksekutif",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    address: "Jalan Stasiun Serpong No. 1, Cilenggang, Serpong, Kota Tangerang Selatan, Banten 15310",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Stasiun+Serpong",
    image: "https://www.shutterstock.com/image-photo/gopro-hero-9-isolated-on-white-background-260nw-1901234567.jpg",
    additionalNotes: "Harap membawa identitas diri dan bukti kepemilikan."
  },
};

const STATUS_CONFIG = {
  Available: {
    color: "bg-green-500",
    icon: CheckCircle,
    text: "Tersedia untuk Diambil",
    description: "Barang dapat diambil sesuai jam operasional"
  },
  In_Process: {
    color: "bg-yellow-500",
    icon: AlertCircle,
    text: "Sedang Diproses",
    description: "Barang sedang dalam proses verifikasi"
  },
  Claimed: {
    color: "bg-gray-500",
    icon: CheckCircle,
    text: "Sudah Diambil",
    description: "Barang telah diklaim oleh pemiliknya"
  },
};

const ItemDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode") || "kai";
  const stationId = searchParams.get("station") || "1";

  const item = ITEM_DETAILS[id || "1"] || ITEM_DETAILS["1"];
  const statusConfig = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-kai text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate(`/items?mode=${mode}&station=${stationId}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Barang
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">Detail Barang Hilang</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <Card className="overflow-hidden">
            <div className="relative aspect-square bg-muted">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className={`${statusConfig.color} text-white text-sm`}>
                  {item.status}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3">
                {item.category}
              </Badge>
              <h2 className="text-3xl font-bold mb-3">{item.name}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>

            <Separator />

            {/* Status */}
            <Card className={`p-4 border-2 ${statusConfig.color.replace('bg-', 'border-')}`}>
              <div className="flex items-start gap-3">
                <StatusIcon className={`w-6 h-6 ${statusConfig.color.replace('bg-', 'text-')}`} />
                <div>
                  <h3 className="font-semibold mb-1">{statusConfig.text}</h3>
                  <p className="text-sm text-muted-foreground">
                    {statusConfig.description}
                  </p>
                </div>
              </div>
            </Card>

            {/* In Process Additional Warning */}
            {item.status === "In_Process" && (
              <Card className="bg-yellow-500/10 border-yellow-500/20 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Catatan Penting</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Barang ini sedang dalam tahap verifikasi kepemilikan.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Jika Anda merasa ini barang Anda, silakan segera hubungi petugas.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Apabila klaim tidak valid, barang akan kembali berstatus Available.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            )}

            {/* Found Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Tanggal Ditemukan</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.foundDate).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Lokasi Ditemukan</p>
                  <p className="text-sm text-muted-foreground">{item.foundLocation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Information */}
        <Card className="mt-8 p-6">
          <h3 className="text-xl font-bold mb-6">Informasi Pengambilan</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Lokasi Pengambilan</p>
                  <p className="text-sm text-muted-foreground">{item.station}</p>
                  <p className="text-sm text-muted-foreground">{item.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Jam Operasional</p>
                  <p className="text-sm text-muted-foreground">{item.pickupTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Kontak</p>
                  <p className="text-sm text-muted-foreground">{item.contact}</p>
                </div>
              </div>
            </div>

            <Card className="bg-accent/5 border-accent/20 p-4">
              <h4 className="font-semibold mb-3">Catatan Penting</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Bawa kartu identitas (KTP/SIM/Paspor)</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Bawa bukti kepemilikan barang</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Hubungi stasiun sebelum datang</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Barang disimpan maksimal 30 hari</span>
                </li>
              </ul>
            </Card>
          </div>

          {["Available", "In_Process"].includes(item.status) && (
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {/* Telpon */}
              <Button asChild variant="gradient" size="lg" className="flex-1 flex items-center justify-center">
                <a href="tel:+6281122233121" className="flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {item.status === "Available" ? "Hubungi Stasiun" : "Hubungi untuk Verifikasi"}
                  </a>
              </Button>
              
              {/* Maps */}
              <Button asChild variant="outline" size="lg" className="flex-1 flex items-center justify-center">
                <a
                href="https://www.google.com/maps/search/?api=1&query=Stasiun+Gambir,+Jl.+Medan+Merdeka+Timur+No.+1,+Jakarta+Pusat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Lihat Lokasi di Maps
                </a>
                </Button>
                </div>
              )}
            
        </Card>
      </div>
    </div>
  );
};

export default ItemDetail;
