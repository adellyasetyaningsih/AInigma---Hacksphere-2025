import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, MapPin, ArrowLeft, Train } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock data for stations
const STATIONS = {
  kai: [
    { id: "1", name: "Gambir", city: "Jakarta", region: "DKI Jakarta" },
    { id: "2", name: "Pasar Senen", city: "Jakarta", region: "DKI Jakarta" },
    { id: "3", name: "Bandung", city: "Bandung", region: "Jawa Barat" },
    { id: "4", name: "Yogyakarta", city: "Yogyakarta", region: "DIY" },
    { id: "5", name: "Solo Balapan", city: "Surakarta", region: "Jawa Tengah" },
    { id: "6", name: "Surabaya Gubeng", city: "Surabaya", region: "Jawa Timur" },
    { id: "7", name: "Malang", city: "Malang", region: "Jawa Timur" },
    { id: "8", name: "Semarang Tawang", city: "Semarang", region: "Jawa Tengah" },
  ],
  krl: [
    { id: "9", name: "Stasiun Jakarta Kota", city: "Jakarta", region: "DKI Jakarta" },
    { id: "10", name: "Stasiun Manggarai", city: "Jakarta", region: "DKI Jakarta" },
    { id: "11", name: "Stasiun Tanah Abang", city: "Jakarta", region: "DKI Jakarta" },
    { id: "12", name: "Stasiun Bogor", city: "Bogor", region: "Jawa Barat" },
    { id: "13", name: "Stasiun Depok", city: "Depok", region: "Jawa Barat" },
    { id: "14", name: "Stasiun Bekasi", city: "Bekasi", region: "Jawa Barat" },
    { id: "15", name: "Stasiun Tangerang", city: "Tangerang", region: "Banten" },
    { id: "16", name: "Stasiun Serpong", city: "Tangerang Selatan", region: "Banten" },
  ],
};

const StationSearch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode") || "kai";
  const [searchQuery, setSearchQuery] = useState("");

  const stations = STATIONS[mode as keyof typeof STATIONS] || STATIONS.kai;

  const filteredStations = useMemo(() => {
    if (!searchQuery) return stations;
    const query = searchQuery.toLowerCase();
    return stations.filter(
      (station) =>
        station.name.toLowerCase().includes(query) ||
        station.city.toLowerCase().includes(query) ||
        station.region.toLowerCase().includes(query)
    );
  }, [searchQuery, stations]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-kai text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <Train className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">
              {mode.toUpperCase()} - Pilih Stasiun
            </h1>
          </div>
          <p className="text-white/90">
            Cari stasiun untuk melihat daftar barang hilang
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <Card className="p-4 shadow-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Cari nama stasiun, kota, atau wilayah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </Card>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-4">
          <p className="text-muted-foreground">
            Menampilkan {filteredStations.length} stasiun
          </p>
        </div>

        <div className="grid gap-4">
          {filteredStations.map((station) => (
            <Card
              key={station.id}
              className="p-6 hover-lift cursor-pointer group"
              onClick={() => navigate(`/items?mode=${mode}&station=${station.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{station.name}</h3>
                    <p className="text-muted-foreground">
                      {station.city}, {station.region}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Button variant="ghost" size="sm">
                    Lihat Barang
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredStations.length === 0 && (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Stasiun tidak ditemukan</h3>
            <p className="text-muted-foreground">
              Coba gunakan kata kunci yang berbeda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationSearch;
