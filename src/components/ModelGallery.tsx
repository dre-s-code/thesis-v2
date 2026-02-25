import { useState, useRef, useEffect } from "react";
import { Modal } from "./Modal";
import { X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

type GifItem = { 
  id: string; 
  url: string; 
  label: string; 
  type: 'GFS' | 'ERA5';
  params: { mp: string; cu: string };
};

// Placeholder parameterizations (bisa diganti sesuai PDF nanti)
const memberParams = [
  { mp: "WRF Single-Moment 6-class", cu: "Off" }, // Member 1
  { mp: "Goddard", cu: "Off" }, // Member 2
  { mp: "Thompson", cu: "Off" }, // Member 3
  { mp: "WRF Single-Moment 6-class", cu: "Tiedtke" }, // Member 4
  { mp: "WRF Single-Moment 3-class", cu: "Kain-Fritsch" }, // Member 5
  { mp: "Lin Purdue", cu: "Betts-Miller-Janjic" }, // Member 6
  { mp: "Eta Ferrier", cu: "Kain-Fritsch" }, // Member 7
  { mp: "Morrison", cu: "Modified-Tiedtke" }, // Member 8
  { mp: "WRF Single-Moment 6-class", cu: "Betts-Miller-Janjic" }, // Member 9
  { mp: "Goddard", cu: "Grell-3D" }, // Member 10
];

const gfsGifs: GifItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: `gfs-${i + 1}`,
  // [POIN 2] GANTI URL DI BAWAH INI:
  // Simpan file GIF Anda di dalam folder: public/ModelGalleryAssets/
  // Beri nama file: gfs-1.gif, gfs-2.gif, dst.
  // Vercel akan membaca folder public secara otomatis.
  url: `/ModelGalleryAssets/gfs-${i + 1}.gif`,
  label: `GFS Member ${i + 1}`,
  type: 'GFS',
  params: memberParams[i]
}));

const era5Gifs: GifItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: `era5-${i + 1}`,
  // [POIN 2] GANTI URL DI BAWAH INI:
  // Simpan file GIF Anda di dalam folder: public/ModelGalleryAssets/
  // Beri nama file: era5-1.gif, era5-2.gif, dst.
  url: `/ModelGalleryAssets/era5-${i + 1}.gif`,
  label: `ERA5 Member ${i + 1}`,
  type: 'ERA5',
  params: memberParams[i]
}));

const AutoScroller = ({ items, direction = 1, onItemClick }: { items: GifItem[], direction?: number, onItemClick: (item: GifItem) => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const exactScrollLeft = useRef(0);
  const isInitialized = useRef(false);

  useEffect(() => {
    let animationId: number;
    
    // Initialize scroll position for reverse direction
    if (!isInitialized.current && scrollRef.current) {
      if (direction === -1) {
        exactScrollLeft.current = scrollRef.current.scrollWidth / 2;
        scrollRef.current.scrollLeft = exactScrollLeft.current;
      }
      isInitialized.current = true;
    }

    const scroll = () => {
      if (!isPaused && scrollRef.current) {
        // Kecepatan sangat pelan (0.5 pixel per frame)
        exactScrollLeft.current += direction * 0.5;
        scrollRef.current.scrollLeft = exactScrollLeft.current;
        
        const { scrollLeft, scrollWidth } = scrollRef.current;
        
        // Reset scroll position for infinite loop effect
        if (direction === 1 && scrollLeft >= scrollWidth / 2) {
          exactScrollLeft.current = 0;
          scrollRef.current.scrollLeft = 0;
        } else if (direction === -1 && scrollLeft <= 0) {
          exactScrollLeft.current = scrollWidth / 2;
          scrollRef.current.scrollLeft = scrollWidth / 2;
        }
      } else if (scrollRef.current) {
        // Sync exactScrollLeft with manual scroll when paused
        exactScrollLeft.current = scrollRef.current.scrollLeft;
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, direction]);

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto gap-2 px-2 pb-4 hide-scrollbar cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {[...items, ...items].map((gif, index) => (
        <div 
          key={`${gif.id}-${index}`} 
          className="shrink-0 w-[280px] sm:w-[350px] lg:w-[450px]"
          onClick={() => onItemClick(gif)}
        >
          <div className="p-1.5 rounded-2xl border border-border bg-card flex flex-col gap-2 shadow-sm hover:border-blue-500/50 transition-colors cursor-pointer">
            {/* [POIN 1] PENYESUAIAN UKURAN: aspect-[800/816] agar sesuai dimensi GIF Anda */}
            <div className="relative aspect-[800/816] rounded-xl overflow-hidden bg-accent/50 flex items-center justify-center">
              <img
                src={gif.url}
                alt={gif.label}
                // [POIN 1] PENYESUAIAN UKURAN: object-contain agar tidak terpotong (crop) atau ter-stretch
                // loading="lazy" agar browser tidak memuat semua GIF sekaligus (mencegah lemot)
                className="w-full h-full object-contain"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Informasi Parameterisasi di luar GIF */}
            <div className="flex flex-col gap-1 px-1 items-center pb-1">
              <p className="text-center font-bold text-sm py-1">{gif.label}</p>
              <div className="flex flex-col gap-1.5 items-center">
                <div className="bg-accent/50 px-3 py-1 rounded-full text-[10px] sm:text-xs border border-border/50 inline-flex items-center gap-1.5 w-fit text-center">
                  <span className="font-semibold text-blue-500">Microphysics:</span> 
                  <span>{gif.params.mp}</span>
                </div>
                <div className="bg-accent/50 px-3 py-1 rounded-full text-[10px] sm:text-xs border border-border/50 inline-flex items-center gap-1.5 w-fit text-center">
                  <span className="font-semibold text-emerald-500">Cumulus:</span> 
                  <span>{gif.params.cu}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export function ModelGallery() {
  const { language } = useLanguage();
  const t = translations[language].gallery;
  const [compareItems, setCompareItems] = useState<GifItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gifKey, setGifKey] = useState(Date.now());

  const handleItemClick = (item: GifItem) => {
    setCompareItems([item]);
    setGifKey(Date.now());
    setIsModalOpen(true);
  };

  const handleAddCompare = (item: GifItem) => {
    if (compareItems.length < 4 && !compareItems.find(i => i.id === item.id)) {
      setCompareItems([...compareItems, item]);
      setGifKey(Date.now()); // Reset all GIFs timing
    }
  };

  const handleRemoveCompare = (id: string) => {
    const newItems = compareItems.filter(i => i.id !== id);
    setCompareItems(newItems);
    if (newItems.length === 0) {
      setIsModalOpen(false);
    }
  };

  return (
    <section className="py-12 overflow-hidden bg-accent/30">
      <div className="px-4 max-w-6xl mx-auto mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          {t.title}
        </h2>
        <p className="text-foreground/60">
          {t.desc}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <AutoScroller items={gfsGifs} direction={1} onItemClick={handleItemClick} />
        <AutoScroller items={era5Gifs} direction={-1} onItemClick={handleItemClick} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t.compareTitle}
        maxWidth="max-w-5xl"
      >
        <div className="flex flex-col gap-6">
          <div className={`grid gap-4 ${compareItems.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : compareItems.length === 2 ? 'grid-cols-2' : compareItems.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
            {compareItems.map(item => (
              <div key={item.id} className="relative flex flex-col gap-2">
                <button 
                  onClick={() => handleRemoveCompare(item.id)} 
                  className="absolute top-2 right-2 z-10 p-1.5 bg-background/80 backdrop-blur-sm rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <X size={16} />
                </button>
                {/* [POIN 1] PENYESUAIAN UKURAN: aspect-[800/816] agar sesuai dimensi GIF Anda */}
                <div className="relative aspect-[800/816] rounded-xl overflow-hidden bg-accent/50 border border-border flex items-center justify-center">
                  <img 
                    src={`${item.url}?t=${gifKey}`} 
                    alt={item.label} 
                    // [POIN 1] PENYESUAIAN UKURAN: object-contain agar tidak terpotong (crop) atau ter-stretch
                    // loading="lazy" agar browser tidak memuat semua GIF sekaligus (mencegah lemot)
                    className="w-full h-full object-contain" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Informasi Parameterisasi di luar GIF */}
                <div className="flex flex-col gap-1 mt-1 items-center pb-2">
                  <p className="text-center font-bold text-sm">{item.label}</p>
                  <div className="flex flex-col gap-1.5 items-center">
                    <div className="bg-accent/50 px-3 py-1 rounded-full text-[10px] sm:text-xs border border-border/50 inline-flex items-center gap-1.5 w-fit text-center">
                      <span className="font-semibold text-blue-500">Microphysics:</span> 
                      <span>{item.params.mp}</span>
                    </div>
                    <div className="bg-accent/50 px-3 py-1 rounded-full text-[10px] sm:text-xs border border-border/50 inline-flex items-center gap-1.5 w-fit text-center">
                      <span className="font-semibold text-emerald-500">Cumulus:</span> 
                      <span>{item.params.cu}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {compareItems.length < 4 && (
            <div className="border-t border-border pt-6">
              <h4 className="font-medium mb-4 text-sm text-foreground/80">{t.addCompare}</h4>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium w-12">GFS:</span>
                  {gfsGifs.map(g => (
                    <button 
                      key={g.id} 
                      disabled={compareItems.some(i => i.id === g.id)}
                      onClick={() => handleAddCompare(g)}
                      className="px-3 py-1 text-xs rounded-full border border-border hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      {g.id.replace('gfs-', '')}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium w-12">ERA5:</span>
                  {era5Gifs.map(g => (
                    <button 
                      key={g.id} 
                      disabled={compareItems.some(i => i.id === g.id)}
                      onClick={() => handleAddCompare(g)}
                      className="px-3 py-1 text-xs rounded-full border border-border hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      {g.id.replace('era5-', '')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
}
