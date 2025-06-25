import {
    Facebook,
    Instagram,
    Music2,
    Twitter,
    Youtube,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-black text-white text-sm mt-10">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Social Media */}
            <div className="flex flex-col gap-2">
                <h4 className="font-semibold">FOLLOW US</h4>
                <div className="flex gap-4 text-xl mt-3">
                    <div aria-label="Facebook"><Facebook className="w-5 h-5" /></div>
                    <div aria-label="X/Twitter"><Twitter className="w-5 h-5" /></div>
                    <div aria-label="Instagram"><Instagram className="w-5 h-5" /></div>
                    <div aria-label="YouTube"><Youtube className="w-5 h-5" /></div>
                    <div aria-label="TikTok"><Music2 className="w-5 h-5" /></div>
                </div>
            </div>

            {/* About Links */}
            <div className="flex flex-col gap-2">
            <h4 className="font-semibold">ABOUT US</h4>
            <div className="flex-nowrap whitespace-nowrap space-x-6 text-gray-300 flex mt-3 font-poppins">
                <Link to='/aboutus'>About CineBook</Link>
                <div>Media Releases</div>
                <Link to='/faq'>FAQ</Link>
                <div>Accessibility</div>
                <div>Contact Us</div>
            </div>
            </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 pb-6 text-center text-gray-400 text-xs px-4">
            <p>Copyright © 2025 CineBook. All Rights Reserved.</p>
            
            <div className="flex justify-center flex-wrap items-center gap-x-2 mt-2 text-white underline">
                <p className="mx-1">Terms & Conditions</p>
                <span>|</span>
                <p className="mx-1">Rewards Terms & Conditions</p>
                <span>|</span>
                <p className="mx-1">Privacy Policy</p>
            </div>

            <div className="mt-2 text-gray-400 flex justify-center flex-wrap items-center gap-1">
                <span>This site is protected by reCAPTCHA and the Google</span>
                <p className="underline ml-1">Privacy Policy</p>
                <span>and</span>
                <p className="underline ml-1">Terms of Service</p>
                <span>apply.</span>
            </div>
        </div>
    </footer>
    )
};
