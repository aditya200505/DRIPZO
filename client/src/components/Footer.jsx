import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Send } from 'lucide-react';
import { FaInstagram, FaTwitter, FaFacebook, FaGithub } from 'react-icons/fa';
import { faqData } from '../data/productData';

const Footer = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [comment, setComment] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || !commentName.trim()) return;
    setCommentSubmitted(true);
    setComment('');
    setCommentName('');
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  return (
    <footer className="bg-bgLight border-t border-borderLight">

      {/* ═══════════ FAQ ACCORDION ═══════════ */}
      <div className="border-b border-borderLight py-14">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-secondary mb-8 text-center font-editorial">
            Quick <span className="font-fashion italic text-primary">Help</span>
          </h3>
          <div className="max-w-2xl mx-auto space-y-2">
            {faqData.slice(0, 4).map((faq, idx) => (
              <div key={idx} className="bg-white border border-borderLight rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-secondary font-semibold text-sm pr-4 font-body">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-textMuted shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-primary' : ''}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-48 pb-4' : 'max-h-0'}`}>
                  <p className="px-4 text-textMuted text-sm leading-relaxed font-body">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ DROP A COMMENT ═══════════ */}
      <div className="border-b border-borderLight py-14">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-secondary mb-2 font-editorial">
              Drop a <span className="font-fashion italic text-primary">Comment</span>
            </h3>
            <p className="text-textMuted text-sm mb-6 font-body">
              Share your thoughts, suggestions, or feedback with us!
            </p>

            {commentSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-green-700 font-semibold text-sm font-body">
                ✅ Thank you for your comment! We appreciate your feedback.
              </div>
            ) : (
              <form onSubmit={handleCommentSubmit} className="space-y-3 text-left">
                <input
                  type="text"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full bg-white border border-borderLight rounded-lg px-4 py-3 text-sm text-secondary focus:outline-none focus:border-primary transition-colors font-body"
                />
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment here..."
                  required
                  rows={3}
                  className="w-full bg-white border border-borderLight rounded-lg px-4 py-3 text-sm text-secondary focus:outline-none focus:border-primary transition-colors resize-none font-body"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primaryDark transition-all text-sm flex items-center justify-center gap-2 font-body tracking-wider uppercase"
                >
                  <Send size={14} /> Submit Comment
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════ FOOTER LINKS ═══════════ */}
      <div className="pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="text-2xl font-theater font-bold tracking-[0.15em] text-secondary block">
                DRIP<span className="text-primary">ZO</span>
              </Link>
              <p className="text-textMuted text-sm max-w-xs leading-relaxed font-body">
                Premium fashion from nearby boutiques delivered to your doorstep in under 60 minutes. Style, on demand.
              </p>
              <div className="flex space-x-3 pt-2">
                {[FaInstagram, FaTwitter, FaFacebook, FaGithub].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-white border border-borderLight flex items-center justify-center text-textMuted hover:bg-primary hover:text-white hover:border-primary transition-all">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-sm font-bold mb-5 text-secondary uppercase tracking-[0.15em] font-theater">Shop</h4>
              <ul className="space-y-3 text-textMuted text-sm font-body">
                <li><Link to="/collections" className="hover:text-primary transition-colors">All Collections</Link></li>
                <li><Link to="/men" className="hover:text-primary transition-colors">Men's Fashion</Link></li>
                <li><Link to="/women" className="hover:text-primary transition-colors">Women's Fashion</Link></li>
                <li><Link to="/collections?category=Luxury" className="hover:text-primary transition-colors">Luxury</Link></li>
                <li><Link to="/collections?category=Cosmetics" className="hover:text-primary transition-colors">Beauty & Cosmetics</Link></li>
                <li><Link to="/nearby" className="hover:text-primary transition-colors">1-Hour Delivery</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-bold mb-5 text-secondary uppercase tracking-[0.15em] font-theater">Support</h4>
              <ul className="space-y-3 text-textMuted text-sm font-body">
                <li><Link to="/dashboard" className="hover:text-primary transition-colors">My Account</Link></li>
                <li><Link to="/tracking" className="hover:text-primary transition-colors">Track Order</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shipping Information</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-bold mb-5 text-secondary uppercase tracking-[0.15em] font-theater">Stay in the Loop</h4>
              <p className="text-textMuted text-sm mb-4 font-body">Subscribe for special offers, giveaways, and early access to new drops.</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white border border-borderLight rounded-l-lg px-4 py-3 text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                  required
                />
                <button type="submit" className="bg-primary text-white px-4 py-3 rounded-r-lg font-bold hover:bg-primaryDark transition-colors flex items-center justify-center">
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
            
          </div>

          <div className="border-t border-borderLight pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-textMuted font-body">
            <p>&copy; {new Date().getFullYear()} DRIPZO Fashion. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
