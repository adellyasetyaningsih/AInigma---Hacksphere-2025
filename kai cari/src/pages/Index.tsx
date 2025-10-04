import { Train, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const navigate = useNavigate();


  return (
    
    <div className="min-h-screen">
      {/* HEADER ATAS KLASIK & RAPIH (Logo Kiri, Nav Kanan) */}
<header className="bg-white shadow-sm sticky top-0 z-50">
  <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">
    {/* Logo/Title - Rata Kiri */}
    <h1
      className="text-xl font-bold text-primary-accent"
      data-i18n="header_title"
    >
      KAI X AInigma
    </h1>

    {/* Desktop Navigation Links */}
    <div className="hidden md:flex items-center space-x-6 text-sm">
      {/* Appearance Icon and Dropdown */}
      <div className="relative">

      {/* Navigation Links */}
      <a
        href="http://localhost:8081/"
        className="nav-link font-medium text-slate-700 hover:text-primary-accent dark:text-gray-300"
      >
        KAICari
      </a>
    </div>
    </div>
  </nav>
</header>

      {/* Hero Section */}
      <div 
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            KAI Cari
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Temukan barang hilang Anda dengan mudah
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <MapPin className="w-5 h-5 text-white" />
            <span className="text-white">Seluruh stasiun Indonesia</span>
          </div>
        </div>
      </div>

      {/* Mode Selection Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pilih Layanan Kereta
          </h2>
          <p className="text-muted-foreground text-lg">
            Pilih jenis layanan kereta untuk mencari barang hilang Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* KAI Card */}
          <div 
            className="group relative overflow-hidden rounded-2xl bg-card shadow-lg card-interactive cursor-pointer"
            onClick={() => navigate("/search?mode=kai")}
          >
            <div className="absolute inset-0 gradient-kai opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="p-8">
              <div className="w-16 h-16 rounded-2xl gradient-kai flex items-center justify-center mb-6">
                <Train className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">KAI</h3>
              <p className="text-muted-foreground mb-6">
                Kereta Api Indonesia - Layanan kereta jarak jauh yang menghubungkan kota-kota besar
              </p>
              <Button variant="gradient" size="lg" className="w-full">
                Pilih KAI
              </Button>
            </div>
          </div>

          {/* KRL Card */}
          <div 
            className="group relative overflow-hidden rounded-2xl bg-card shadow-lg card-interactive cursor-pointer"
            onClick={() => navigate("/search?mode=krl")}
          >
            <div className="absolute inset-0 gradient-kai opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="p-8">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6">
                <Train className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">KRL</h3>
              <p className="text-muted-foreground mb-6">
                Kereta Rel Listrik - Layanan kereta komuter untuk area Jabodetabek
              </p>
              <Button variant="gradient" size="lg" className="w-full">
                Pilih KRL
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="gradient-kai py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Kehilangan Barang di Kereta atau Stasiun?
          </h3>
          <p className="text-lg text-white/90 mb-8">
            Kami membantu Anda menemukan barang yang hilang dengan mudah. 
            Pilih layanan kereta, cari stasiun, dan lihat daftar barang temuan.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">1</div>
              <span>Pilih Layanan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">2</div>
              <span>Cari Stasiun</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">3</div>
              <span>Temukan Barang</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
