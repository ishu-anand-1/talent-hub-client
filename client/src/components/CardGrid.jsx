import React from "react";
import { Music, Mic, Guitar, ListMusic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cards = [
  { title: "Dance", color: "from-pink-500 to-red-500", glow: "shadow-pink-500/50", Icon: Music },
  { title: "Singing", color: "from-blue-500 to-indigo-500", glow: "shadow-blue-500/50", Icon: Mic },
  { title: "Instrument", color: "from-green-500 to-emerald-500", glow: "shadow-green-500/50", Icon: Guitar },
  { title: "Playlist", color: "from-purple-500 to-fuchsia-500", glow: "shadow-purple-500/50", Icon: ListMusic },
];

function CardGrid() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-10 mt-20">
      {cards.map(({ title, color, glow, Icon }, i) => (
        <div
          key={i}
          onClick={() =>
            navigate(title === "Playlist" ? "/playlist" : `/videos/${title}`)
          }
          className={`max-w-3xl min-h-[140px] lg:min-h-[150px] bg-white/95 p-6 lg:p-12 
                      rounded-3xl border border-teal-100 shadow-md transition-transform duration-300 
                      hover:shadow-lg lg:-rotate-1 lg:hover:rotate-0
                      bg-gradient-to-br ${color} relative text-white text-center transform 
                      hover:scale-105 shadow-xl hover:shadow-2xl hover:${glow} group cursor-pointer`}
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            className="bg-white/10 p-4 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:animate-pulse 
                       border border-white/20 shadow-md"
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-lg font-extrabold tracking-wide">{title} Videos</h2>
          <div className="absolute inset-0 rounded-xl z-[-1] bg-white/5 blur-xl opacity-20 group-hover:opacity-40 transition" />
        </div>
      ))}
    </div>
  );
}

export default CardGrid;
