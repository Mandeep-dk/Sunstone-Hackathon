import { Phone } from "lucide-react";
import logo from '/sunstone.png';

export default function Footer() {
  return (
    <footer style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }} className="bg-[#white] text-white">
      
      {/* Top divider accent */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#003d82] to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Logo Column */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={logo} alt="Sunstone Logo" className="h-6 w-auto object-contain" />
            <p className="text-gray-400 text-sm leading-relaxed text-center md:text-left max-w-xs">
              Empowering students to build, innovate, and lead through technology and collaboration.
            </p>
          </div>

          {/* Empty middle column for spacing */}
          <div />

          {/* Get In Touch Column — rightmost */}
          <div className="flex flex-col items-center md:items-end gap-5">
            <h3 className="text-[#003d82] text-xs tracking-[0.3em] uppercase font-normal border-b border-[#c9a84c]/30 pb-2 w-full text-center md:text-right">
              Get In Touch
            </h3>
            <div className="flex flex-col gap-4 w-full">

              <a href="tel:+918822184839" className="group flex items-center justify-center md:justify-end gap-3 text-gray-300 hover:text-white transition-colors duration-300">
                <span className="text-sm tracking-wide text-black">+91 88221 84839</span>
                <span className="w-8 h-8 rounded-full border border-[#c9a84c]/30 flex items-center justify-center group-hover:border-[#c9a84c] transition-colors duration-300">
                  <Phone className="w-3.5 h-3.5 text-[#003d82]" />
                </span>
              </a>

              <a href="tel:+919876543210" className="group flex items-center justify-center md:justify-end gap-3 text-gray-300 hover:text-white transition-colors duration-300">
                <span className="text-sm tracking-wide text-black">+91 88220 72775</span>
                <span className="w-8 h-8 rounded-full border border-[#c9a84c]/30 flex items-center justify-center group-hover:border-[#c9a84c] transition-colors duration-300">
                  <Phone className="w-3.5 h-3.5 text-[#003d82]" />
                </span>
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontFamily: "sans-serif" }} className="text-gray-500 text-xs tracking-wide text-center sm:text-left">
            © 2026 <span className="text-gray-400">Sunstone</span>. All rights reserved.
          </p>
          <p style={{ fontFamily: "sans-serif" }} className="text-gray-500 text-xs tracking-widest uppercase text-center sm:text-right">
            Designed &amp; Developed by{" "}
            <span className="text-[#003d82] font-medium">Tech Club Sunstone</span>
          </p>
        </div>
      </div>

    </footer>
  );
}