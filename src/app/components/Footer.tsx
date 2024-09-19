import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#1A1D24] text-white py-8 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Market */}
          <div>
            <h3 className="font-bold text-base mb-2">Market</h3>
            <ul className="text-gray-500">
              <li><Link href="/market/buy">Buy</Link></li>
              <li><Link href="/market/sell">Sell</Link></li>
              <li><Link href="/market/trends">Market Trends</Link></li>
            </ul>
          </div>

          {/* Trade */}
          <div>
            <h3 className="font-bold text-base mb-2">Trade</h3>
            <ul className="text-gray-500">
              <li><Link href="/trade/offers">Trade Offers</Link></li>
              <li><Link href="/trade/history">Trade History</Link></li>
              <li><Link href="/trade/bots">Trading Bots</Link></li>
            </ul>
          </div>

          {/* Terms & Policy and subtabs */}
          <div>
            <h3 className="font-bold text-base mb-2">Legal</h3>
            <ul className="text-gray-500">
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/cookies">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* LCC and headquarters location */}
          <div>
            <h3 className="font-bold text-base mb-2">Company</h3>
            <p className="text-gray-500">Dlock Shop</p>
            <p className="text-gray-500">493 Westmount Street</p>
            <p className="text-gray-500">Montreal, QC, CC 12345</p>
            <p className="text-gray-500">Canada</p>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-bold text-base mb-2">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="https://twitter.com/dlockshop" target="_blank" rel="noopener noreferrer">
                <Image src="/x.svg" alt="X (Twitter)" width={20} height={20} className="filter invert" />
              </Link>
              <Link href="https://discord.gg/dlockshop" target="_blank" rel="noopener noreferrer">
                <Image src="/discord.svg" alt="Discord" width={20} height={20} className="filter invert" />
              </Link>
              <Link href="https://instagram.com/dlockshop" target="_blank" rel="noopener noreferrer">
                <Image src="/instagram.svg" alt="Instagram" width={20} height={20} className="filter invert" />
              </Link>
              <Link href="https://steamcommunity.com/groups/dlockshop" target="_blank" rel="noopener noreferrer">
                <Image src="/steam-1.svg" alt="Steam Community" width={20} height={20} className="filter invert" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright disclaimer */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Dlockshop. All rights reserved.</p>
          <p className="mt-2">Dlockshop is not associated with or endorsed by Valve Corporation.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
