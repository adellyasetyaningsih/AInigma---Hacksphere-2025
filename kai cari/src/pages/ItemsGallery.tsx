import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, Filter, Package, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OFFICIAL_CONTACT = "+62 811-2223-3121";

// Mock data for lost items
const MOCK_ITEMS = [
  {
    id: "1",
    name: "Tas Ransel Hitam",
    description: "Tas ransel warna hitam dengan logo Nike, berisi laptop dan buku",
    category: "Tas",
    station: "Gambir",
    stationId: "1",
    foundDate: "2025-10-01",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
  },
  {
    id: "2",
    name: "Dompet Kulit Coklat",
    description: "Dompet pria kulit coklat dengan beberapa kartu identitas",
    category: "Dompet",
    station: "Gambir",
    stationId: "1",
    foundDate: "2025-09-30",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
  },
  {
    id: "3",
    name: "iPhone 14 Pro",
    description: "iPhone 14 Pro warna silver dengan casing biru",
    category: "Elektronik",
    station: "Gambir",
    stationId: "1",
    foundDate: "2025-10-02",
    status: "In Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://img.myipadbox.com/upload/store/detail_l/EDA003101704C_1.jpg",
  },
  {
    id: "4",
    name: "Kunci Motor Honda",
    description: "Kunci motor Honda dengan gantungan kunci karakter",
    category: "Kunci",
    station: "Gambir",
    stationId: "1",
    foundDate: "2025-09-29",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.hondacengkareng.com/wp-content/uploads/2020/05/KeyBlank-35121K1AN00.jpg",
  },
  {
    id: "5",
    name: "Kacamata Hitam",
    description: "Kacamata hitam dengan frame emas dalam casing coklat",
    category: "Aksesori",
    station: "Gambir",
    stationId: "1",
    foundDate: "2025-10-01",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400",
  },
  {
    id: "6",
    name: "Payung Lipat Biru",
    description: "Payung lipat otomatis warna biru tua",
    category: "Lainnya",
    station: "Gambir",
    stationId: "1",
    foundDate: "2025-09-28",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/set-phantom-blue-foldable-umbrella-260nw-1550717192.jpg",
  },
  {
    id: "7",
    name: "Tas Ransel Hitam",
    description: "Tas ransel warna hitam dengan logo Nike",
    category: "Tas",
    station: "Stasiun Pasar Senen",
    stationId: "2",
    foundDate: "2025-10-01",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
  },
  {
    id: "8",
    name: "Koper Merah",
    description: "Koper besar warna merah dengan stiker bandara",
    category: "Tas",
    station: "Stasiun Pasar Senen",
    stationId: "2",
    foundDate: "2025-09-29",
    status: "In Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://images.unsplash.com/photo-1582725800-fdb1d1e4c2f2?w=400",
  },
  {
    id: "9",
    name: "Payung Hitam",
    description: "Payung lipat warna hitam polos",
    category: "Lainnya",
    station: "Stasiun Pasar Senen",
    stationId: "2",
    foundDate: "2025-09-25",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
  },
  {
    id: "10",
    name: "Jaket Jeans",
    description: "Jaket jeans biru dengan robekan di lengan",
    category: "Lainnya",
    station: "Stasiun Bandung",
    stationId: "3",
    foundDate: "2025-09-30",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://images.unsplash.com/photo-1618354691263-d8f8a3cfc246?w=400",
  },
  {
    id: "11",
    name: "Kamera DSLR",
    description: "Kamera Canon DSLR hitam",
    category: "Elektronik",
    station: "Stasiun Bandung",
    stationId: "3",
    foundDate: "2025-09-27",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
  },
  {
    id: "12",
    name: "Dompet Coklat",
    description: "Dompet kulit warna coklat berisi kartu identitas",
    category: "Aksesori",
    station: "Stasiun Bandung",
    stationId: "3",
    foundDate: "2025-09-25",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://images.unsplash.com/photo-1610394219756-3b7a2c1a8f7c?w=400",
  },
  {
    id: "13",
    name: "Topi Hitam",
    description: "Topi baseball hitam polos",
    category: "Aksesori",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-10-01",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.elfs-shop.com/~img/to1_baseball_twill_import_hx1-05d6b-3073_8331-t2494_81.webp",
  },
  {
    id: "14",
    name: "Botol Minum Biru",
    description: "Botol minum plastik biru merk Tupperware",
    category: "Lainnya",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-30",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrz3XSRyFdwHmDRSOAtZ9vLJgW9OQjAnCatA&s",
  },
  {
    id: "15",
    name: "Earphone Putih",
    description: "Earphone kabel warna putih",
    category: "Elektronik",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-28",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://images.unsplash.com/photo-1597776395721-2d0d8a3cfcf1?w=400",
  },
  {
    id: "16",
    name: "Payung Biru",
    description: "Payung lipat otomatis warna biru tua",
    category: "Lainnya",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-27",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/set-phantom-blue-foldable-umbrella-260nw-1550717192.jpg",
  },
  {
    id: "17",
    name: "Kacamata Hitam",
    description: "Kacamata hitam model aviator",
    category: "Aksesori",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-26",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://images.unsplash.com/photo-1589367920160-65e7d88a5c0b?w=400",
  },
  {
    id: "18",
    name: "Jam Tangan",
    description: "Jam tangan digital warna hitam",
    category: "Aksesori",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-25",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://images.unsplash.com/photo-1512499617640-c2f999098f57?w=400",
  },
  {
    id: "19",
    name: "Koper Hitam",
    description: "Koper ukuran sedang berwarna hitam dengan kunci kombinasi.",
    category: "Tas",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-25",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/black-travel-suitcase-isolated-on-260nw-1444419800.jpg",
  },
  {
    id: "20",
    name: "Kotak Kacamata",
    description: "Kotak kacamata warna merah dengan tulisan 'Ray-Ban'.",
    category: "Aksesoris",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-28",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/red-glasses-case-isolated-on-260nw-1353088293.jpg",
  },
  {
    id: "21",
    name: "Boneka Panda",
    description: "Boneka panda ukuran kecil tertinggal di kursi tunggu.",
    category: "Lainnya",
    station: "Stasiun Jakarta Kota",
    stationId: "9",
    foundDate: "2025-09-30",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/toy-panda-bear-on-white-260nw-1430824834.jpg",
  },
  {
    id: "22",
    name: "Helm Motor",
    description: "Helm motor warna putih polos merk INK.",
    category: "Lainnya",
    station: "Stasiun Manggarai",
    stationId: "10",
    foundDate: "2025-09-26",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/motorcycle-helmet-white-background-260nw-202875029.jpg",
  },
  {
    id: "23",
    name: "Jam Tangan",
    description: "Jam tangan pria dengan strap kulit cokelat.",
    category: "Aksesoris",
    station: "Stasiun Manggarai",
    stationId: "10",
    foundDate: "2025-09-29",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/wrist-watch-leather-band-260nw-1726381967.jpg",
  },
  {
    id: "24",
    name: "Laptop Asus",
    description: "Laptop Asus warna abu-abu, terdapat stiker di bagian cover.",
    category: "Elektronik",
    station: "Stasiun Manggarai",
    stationId: "10",
    foundDate: "2025-09-30",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/laptop-asus-gray-260nw-1159265980.jpg",
  },
  {
    id: "25",
    name: "Ransel Biru",
    description: "Ransel warna biru merk Eiger berisi pakaian.",
    category: "Tas",
    station: "Stasiun Tanah Abang",
    stationId: "11",
    foundDate: "2025-09-27",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/blue-backpack-isolated-on-white-260nw-1927611764.jpg",
  },
  {
    id: "26",
    name: "Payung Lipat Polkadot",
    description: "Payung lipat berwarna merah dengan motif polkadot putih.",
    category: "Lainnya",
    station: "Stasiun Tanah Abang",
    stationId: "11",
    foundDate: "2025-09-25",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/red-polka-dot-umbrella-isolated-260nw-1512079451.jpg",
  },
  {
    id: "27",
    name: "Smartphone Samsung",
    description: "HP Samsung Galaxy A52 dengan casing transparan.",
    category: "Elektronik",
    station: "Stasiun Tanah Abang",
    stationId: "11",
    foundDate: "2025-09-28",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/samsung-galaxy-smartphone-isolated-on-260nw-1939247862.jpg",
  },
  {
    id: "28",
    name: "Sepeda Lipat Hitam",
    description: "Sepeda lipat merk United, warna hitam doff.",
    category: "Lainnya",
    station: "Stasiun Bogor",
    stationId: "12",
    foundDate: "2025-09-29",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/folding-bicycle-black-color-isolated-260nw-1488329115.jpg",
  },
  {
    id: "29",
    name: "Tas Ransel Gunung",
    description: "Tas ransel gunung merk Eiger warna hijau army.",
    category: "Tas",
    station: "Stasiun Bogor",
    stationId: "12",
    foundDate: "2025-09-26",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/green-eiger-backpack-isolated-on-white-260nw-2110241893.jpg",
  },
  {
    id: "30",
    name: "Laptop Asus",
    description: "Laptop Asus VivoBook warna silver dengan stiker anime di cover.",
    category: "Elektronik",
    station: "Stasiun Depok",
    stationId: "13",
    foundDate: "2025-09-27",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/asus-laptop-silver-color-isolated-on-260nw-2057321845.jpg",
  },
  {
    id: "31",
    name: "Koper Hitam",
    description: "Koper besar warna hitam dengan label nama 'Andi'.",
    category: "Tas",
    station: "Stasiun Depok",
    stationId: "13",
    foundDate: "2025-09-29",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/black-suitcase-isolated-on-white-background-260nw-1745762181.jpg",
  },
  {
    id: "32",
    name: "Tas Belanja Hijau",
    description: "Tas belanja kain warna hijau.",
    category: "Tas",
    station: "Stasiun Depok",
    stationId: "13",
    foundDate: "2025-09-29",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/green-shopping-bag-isolated-on-white-260nw-2233445566.jpg",
  },
  {
    id: "33",
    name: "Kunci Motor",
    description: "Kunci motor dengan gantungan Doraemon.",
    category: "Kunci",
    station: "Stasiun Bekasi",
    stationId: "14",
    foundDate: "2025-09-27",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/motorbike-key-isolated-on-white-background-260nw-1345678912.jpg",
  },
  {
    id: "34",
    name: "Sepeda Motor Miniatur",
    description: "Miniatur sepeda motor vespa warna biru.",
    category: "Lainnya",
    station: "Stasiun Bekasi",
    stationId: "14",
    foundDate: "2025-09-26",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/blue-vespa-toy-miniature-isolated-on-white-260nw-1122334456.jpg",
  },
  {
    id: "35",
    name: "Sepatu Olahraga",
    description: "Sepatu olahraga Adidas warna putih biru.",
    category: "Lainnya",
    station: "Stasiun Tangerang",
    stationId: "15",
    foundDate: "2025-09-25",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/white-sports-shoes-isolated-on-white-260nw-1122334455.jpg",
  },
  {
    id: "36",
    name: "Powerbank Putih",
    description: "Powerbank warna putih kapasitas 10.000mAh merk Xiaomi.",
    category: "Elektronik",
    station: "Stasiun Tangerang",
    stationId: "15",
    foundDate: "2025-09-25",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/powerbank-isolated-on-white-background-260nw-1034561234.jpg",
  },
  {
    id: "37",
    name: "Buku Catatan",
    description: "Buku catatan warna hitam ukuran A5.",
    category: "Lainnya",
    station: "Stasiun Tangerang",
    stationId: "15",
    foundDate: "2025-09-27",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/black-notebook-isolated-on-white-background-260nw-2234561122.jpg",
  },
  {
    id: "38",
    name: "Koper Silver",
    description: "Koper besar warna silver dengan stiker wisata.",
    category: "Tas",
    station: "Stasiun Serpong",
    stationId: "16",
    foundDate: "2025-09-29",
    status: "Claimed",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/silver-suitcase-isolated-on-white-background-260nw-1456123456.jpg",
  },
  {
    id: "39",
    name: "Handphone iPhone X",
    description: "iPhone X warna silver dengan casing transparan.",
    category: "Elektronik",
    station: "Stasiun Serpong",
    stationId: "16",
    foundDate: "2025-09-26",
    status: "In_Process",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/apple-iphone-x-isolated-on-white-260nw-1034567890.jpg",
  },
  {
    id: "40",
    name: "Kamera GoPro",
    description: "Kamera GoPro Hero 9 warna hitam.",
    category: "Elektronik",
    station: "Stasiun Serpong",
    stationId: "16",
    foundDate: "2025-09-28",
    status: "Available",
    pickupTime: "08:00 - 16:00 (Senin-Jumat)",
    contact: OFFICIAL_CONTACT,
    image: "https://www.shutterstock.com/image-photo/gopro-hero-9-isolated-on-white-background-260nw-1901234567.jpg",
  },
];

const CATEGORIES = ["Semua", "Tas", "Dompet", "Elektronik", "Kunci", "Aksesori", "Lainnya"];

const STATUS_COLORS = {
  Available: "bg-green-500",
  "In Process": "bg-yellow-500",
  Claimed: "bg-gray-500",
};

const ItemsGallery = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode") || "kai";
  const stationId = searchParams.get("station") || "1";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const station = "Stasiun " + (stationId === "1" ? "Gambir" : "Jakarta Kota");

  const filteredItems = useMemo(() => {
    let items = MOCK_ITEMS.filter((item) => item.stationId === stationId);

    if (selectedCategory !== "Semua") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    return items;
  }, [stationId, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-kai text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate(`/search?mode=${mode}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Pilih Stasiun
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">{station}</h1>
          </div>
          <p className="text-white/90">Barang hilang yang ditemukan</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <Card className="p-4 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Cari barang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>

      {/* Contact Info */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <Card className="p-4 bg-accent/5 border-accent/20">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>Jam Pengambilan: 08:00 - 16:00 (Senin-Jumat)</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" />
              <span>Kontak: {OFFICIAL_CONTACT}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4">
          <p className="text-muted-foreground">
            Menampilkan {filteredItems.length} barang
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden card-interactive cursor-pointer"
              onClick={() => navigate(`/item/${item.id}?mode=${mode}&station=${stationId}`)}
            >
              <div className="relative h-48 bg-muted overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`${STATUS_COLORS[item.status as keyof typeof STATUS_COLORS]} text-white`}>
                    {item.status}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Ditemukan: {new Date(item.foundDate).toLocaleDateString("id-ID")}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Barang tidak ditemukan</h3>
            <p className="text-muted-foreground">
              Coba gunakan kata kunci atau filter yang berbeda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsGallery;
