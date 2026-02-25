import { orgContent } from '../data/orgContent';
import { SiLinkedin, SiInstagram, SiFacebook, SiX } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'g4u-org');

  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20">
                <img src="/assets/generated/org-logo.dim_256x256.png" alt={orgContent.name} className="w-full h-full object-cover grayscale" />
              </div>
              <div>
                <div className="text-white font-black text-lg">{orgContent.name}</div>
                <div className="text-white/50 text-xs font-medium">{orgContent.fullName}</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              {orgContent.tagline}. Building a better world, one community at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {orgContent.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              {[
                { icon: SiX, href: orgContent.contact.social.twitter, label: 'X' },
                { icon: SiLinkedin, href: orgContent.contact.social.linkedin, label: 'LinkedIn' },
                { icon: SiInstagram, href: orgContent.contact.social.instagram, label: 'Instagram' },
                { icon: SiFacebook, href: orgContent.contact.social.facebook, label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <p className="text-white/40 text-sm">{orgContent.contact.email}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {year} {orgContent.fullName}. All rights reserved.
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1.5">
            Built with <Heart size={14} className="text-white/60 fill-white/60" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
