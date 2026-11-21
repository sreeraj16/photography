import { Link } from 'react-router-dom';
import { Instagram, Youtube, Award, Camera, Heart, Sparkles, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../lib/constants';
import { Button } from '../components/ui/Button';

export function AboutPage() {
  const team = [
    {
      name: "Sreeraj G.",
      role: "Founder & Creative Director",
      bio: "Anamorphic cinematographer and documentary photographer with a passion for Nizami royal aesthetics and high-octane concert energy.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      instagram: "https://www.instagram.com/_dotpic_"
    },
    {
      name: "Naveen V.",
      role: "Lead Candid Photographer",
      bio: "Master of natural lighting and unobtrusive documentary storytelling. Over 150 weddings documented across South India.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
      instagram: "https://www.instagram.com/_dotpic_"
    },
    {
      name: "Roshni M.",
      role: "Senior Colorist & Editor",
      bio: "Calibrating custom Kodak & Fuji film profiles in DaVinci Resolve. Responsible for the signature DOTPIC warm tonal richness.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
      instagram: "https://www.instagram.com/_dotpic_"
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-dotpic-gold font-semibold block mb-2">
          THE ARTISANS BEHIND THE LENS
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-white font-light tracking-tight max-w-3xl mx-auto leading-tight">
          Every Frame Tells a Story.{' '}
          <span className="italic text-dotpic-gold font-normal">Every Moment Becomes Timeless.</span>
        </h1>
      </div>

      {/* Main Story Narrative */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-serif text-dotpic-gold font-light">01</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <span className="text-xs uppercase tracking-[0.25em] text-dotpic-gold font-semibold">
                ORIGINS & ETHOS
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-white font-light">
              We started with a single camera and a relentless obsession with truth.
            </h2>

            <p className="text-xs sm:text-sm text-dotpic-muted leading-relaxed">
              DOTPIC was born out of Hyderabad's vibrant cultural landscape. We grew tired of stiff, artificial wedding portraits with plastic skin retouching, and sterile campus event coverage.
            </p>

            <p className="text-xs sm:text-sm text-dotpic-muted leading-relaxed">
              We asked a simple question: what if wedding photography felt like a frame from an international art film? And what if college festivals were captured with the kinetic visual power of a stadium rock documentary?
            </p>

            {/* Social Links Beside Brand Story */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href={BRAND.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-pink-950/30 border border-pink-500/30 text-pink-300 text-xs hover:border-pink-500 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow @_dotpic_</span>
              </a>

              <a
                href={BRAND.socials.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-red-950/30 border border-red-500/30 text-red-300 text-xs hover:border-red-500 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>@dotpicphotography</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-dotpic-gold/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
                alt="DOTPIC Studio Team on Location"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-[10px] font-mono text-dotpic-gold uppercase tracking-wider">
                HYDERABAD • 2026 SEASON
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Roster Grid */}
      <div className="bg-dotpic-charcoal py-24 border-t border-b border-dotpic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold block mb-1">
              THE CREATIVE DIRECTORS
            </span>
            <h2 className="text-3xl font-serif text-white font-light">
              Meet The DOTPIC Crew
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-dotpic-black border border-dotpic-border rounded-sm overflow-hidden group hover:border-dotpic-gold/50 transition-colors duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:text-pink-400 border border-white/20 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>

                <div className="p-6">
                  <span className="text-[10px] uppercase font-mono text-dotpic-gold tracking-widest block mb-1">
                    {member.role}
                  </span>
                  <h3 className="text-xl font-serif text-white mb-2">{member.name}</h3>
                  <p className="text-xs text-dotpic-muted leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center py-20">
        <h3 className="text-2xl sm:text-3xl font-serif text-white mb-4">
          Ready to tell your story together?
        </h3>
        <Link to="/book">
          <Button variant="gold" size="lg" withShutterSound>
            Book Your Shoot With The Team
          </Button>
        </Link>
      </div>
    </div>
  );
}
