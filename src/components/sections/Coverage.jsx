import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "../../hooks/useScrollAnimation";
import { HiMapPin } from "react-icons/hi2";
import Button from "../ui/Button";
import { getWhatsAppUrl } from "../../services/whatsappService";
import L from "leaflet";
import { coverageLocations } from "../../data/coverageLocations";

const areas = [
  "Electronic City",
  "Attibele",
  "Hosur Town",
  "Hosur Industrial Area",
  "Madagondapalli",
  "Kodiyalam",
  "Thally",
  "Denkanikottai",
];

const Coverage = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Inject pulse CSS once
    if (!document.getElementById("krp-pulse-style")) {
      const s = document.createElement("style");
      s.id = "krp-pulse-style";
      s.textContent = `
        .leaflet-pulse-marker {
          width: 18px; height: 18px;
          background: #00bfff;
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 8px rgba(0,191,255,0.6);
        }
        .leaflet-pulse-marker::after {
          content: "";
          position: absolute;
          width: 100%; height: 100%;
          border-radius: 50%;
          background: rgba(0,191,255,0.45);
          animation: krp-pulse 2s ease-out infinite;
        }
        @keyframes krp-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(2.5); opacity: 0;   }
          100% { transform: scale(1);   opacity: 0;   }
        }
      `;
      document.head.appendChild(s);
    }

    const map = L.map(mapRef.current, {
      center: [12.65, 77.77],
      zoom: 10,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    // Dark Matter map tiles (CartoDB)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20,
    }).addTo(map);

    // Pulsing divIcon
    const pulseIcon = L.divIcon({
      className: "",
      html: `<div class="leaflet-pulse-marker"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    // Markers with pulse icon
    coverageLocations.forEach((location) => {
      L.marker(location.coords, { icon: pulseIcon })
        .addTo(map)
        .bindPopup(
          `<strong>${location.name}</strong><br/>KRP Fiber Coverage Available`
        );
    });

    // Auto-fit to all markers
    const bounds = L.latLngBounds(coverageLocations.map((l) => l.coords));
    map.fitBounds(bounds, { padding: [60, 60] });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);


  return (
    <section
      id="coverage"
      className="pt-4 pb-8 lg:pt-6 lg:pb-12 bg-primary-950 relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left - Interactive map */}
          <motion.div variants={fadeInLeft} className="relative">
            <div className="relative rounded-3xl bg-slate-800/50 border border-white/5 p-4 sm:p-6 lg:p-8 aspect-square flex items-center justify-center overflow-hidden">
              {/* Decorative map grid overlay */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(6,182,212,0.5) 1px, transparent 0)",
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Leaflet map container */}
              <div
                ref={mapRef}
                className="relative z-0 w-full h-full rounded-2xl overflow-hidden"
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div variants={fadeInRight}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4 bg-white/10 text-accent-300">
              Coverage Area
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Available in Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-blue-400">
                Neighborhood
              </span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              Our fiber network covers Electronic City, Hosur, Denkanikottai,
              Thalli, and surrounding areas — with rapid expansion underway.
              Check if we&apos;re available in your area.
            </p>

            {/* Area tags */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap gap-3 mb-6"
            >
              {areas.map((area, i) => (
                <motion.span
                  key={i}
                  variants={fadeInUp}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 hover:bg-accent-500/10 hover:border-accent-500/30 hover:text-accent-300 transition-all duration-300"
                >
                  {area}
                </motion.span>
              ))}
            </motion.div>

            <Button
              variant="primary"
              size="lg"
              href={getWhatsAppUrl(
                "Hi, I want to check if KRP Networks is available in my area."
              )}
            >
              Check Availability
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Coverage;
