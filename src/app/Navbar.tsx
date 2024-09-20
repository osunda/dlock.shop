'use client'
import Link from "next/link";
import Image from "next/image";
import steam from '/public/steam-1.svg'
import usa from '/public/United-states_flag_icon_round.svg.png'
import brazil from '/public/Brazilian_Flag_-_round.svg.png'
import spanish from '/public/Spain_flag_icon.svg.png'
import dlockbanner from '/public/bannerdlock.png'
import { useState } from "react";
import wallet from '/public/wallet.svg'; // Make sure to add this import

export function Navbar() {
	const currencies = [
		{ code: 'USD', symbol: '$' },
		{ code: 'EUR', symbol: '€' },
		{ code: 'GBP', symbol: '£' },
		{ code: 'JPY', symbol: '¥' },
		{ code: 'CAD', symbol: 'C$' },
		{ code: 'AUD', symbol: 'A$' },
		{ code: 'CHF', symbol: 'Fr' },
		{ code: 'CNY', symbol: '¥' },
		{ code: 'INR', symbol: '₹' },
		{ code: 'BRL', symbol: 'R$' },
	];

	const languages = [
		{ code: 'EN', name: 'English', flag: usa },
		{ code: 'PT', name: 'Portuguese', flag: brazil },
		{ code: 'ES', name: 'Spanish', flag: spanish },
	];

	const [openDropdown, setOpenDropdown] = useState<'language' | 'currency' | 'deposit' | null>(null)
	const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
	const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [balance, setBalance] = useState(0) // Add this line to track user balance

	const toggleDropdown = (dropdown: 'language' | 'currency' | 'deposit') => {
		setOpenDropdown(openDropdown === dropdown ? null : dropdown)
	}

	const handleLogin = () => {
		// In a real application, this would trigger the Steam login process
		setIsLoggedIn(true)
	}

	return (
		<nav className="absolute top-0 left-0 right-0 flex justify-between items-center w-full h-16 text-white p-2 z-50 bg-transparent">
			<div className="flex items-center space-x-10 ml-4">
				<Link href="/" className="hover:cursor-pointer mr-6">
					<Image src={dlockbanner} alt="Dlock Banner" width={180} height={60} />
				</Link>
				<Link href="/market" className="nav-tab font-bold pt-1 text-gray-500 text-sm">Market</Link>
				<Link href="/trade" className="nav-tab font-bold pt-1 text-gray-500 text-sm">Trade</Link>
				<Link href="/faq" className="nav-tab font-bold pt-1 text-gray-500 text-sm">FAQ</Link>
			</div>
			<div className="flex items-center mr-4">
				<div className="relative">
					<button 
						className="flex items-center mx-4 text-gray-500 hover:text-white transition-colors duration-200" 
						onClick={() => toggleDropdown('language')}
					>
						<Image src={selectedLanguage.flag} alt={selectedLanguage.name} width={25} height={25} className="mr-2" />
						<span className="mr-1">{selectedLanguage.code}</span>
						<svg 
							className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'language' ? 'rotate-180' : ''}`} 
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24" 
							xmlns="http://www.w3.org/2000/svg"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
						</svg>
					</button>
					{openDropdown === 'language' && (
						<div className="absolute mt-2 w-40 bg-[#1C1F29] rounded-md shadow-lg py-1 text-gray-500">
							{languages.map((language, index) => (
								<button 
									key={index} 
									className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 hover:text-white transition-colors duration-200"
									onClick={() => {
										setSelectedLanguage(language);
										setOpenDropdown(null);
									}}
								>
									<Image src={language.flag} alt={language.name} width={20} height={20} className="mr-2" />
									{language.name}
								</button>
							))}
						</div>
					)}
				</div>
				<div className="relative">
					<button 
						className="flex items-center mx-4 text-gray-500 hover:text-white transition-colors duration-200" 
						onClick={() => toggleDropdown('currency')}
					>
						<span className="mr-1">{selectedCurrency.code}</span>
						<svg 
							className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'currency' ? 'rotate-180' : ''}`} 
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24" 
							xmlns="http://www.w3.org/2000/svg"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
						</svg>
					</button>
					{openDropdown === 'currency' && (
						<div className="absolute mt-2 w-32 bg-[#1C1F29] rounded-md shadow-lg py-1 text-gray-500">
							{currencies.map((currency, index) => (
								<button 
									key={index} 
									className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 hover:text-white transition-colors duration-200"
									onClick={() => {
										setSelectedCurrency(currency);
										setOpenDropdown(null);
									}}
								>
									{currency.code} {currency.symbol}
								</button>
							))}
						</div>
					)}
				</div>
				{isLoggedIn ? (
					<>
						<div className="relative mr-4">
							<button 
								className="balance-display flex items-center px-4 py-2 text-sm font-bold bg-[#232732] rounded-md"
								onClick={() => toggleDropdown('deposit')}
							>
								<Image src={wallet} alt="Wallet" width={16} height={16} className="mr-2 filter-yellow" />
								<span className="mr-2">{selectedCurrency.symbol}{balance.toFixed(2)}</span>
								<span className="bg-[--main-gold] text-[#232732] w-5 h-5 rounded flex items-center justify-center text-xs font-bold ml-auto">+</span>
							</button>
							{openDropdown === 'deposit' && (
								<div className="absolute mt-2 w-40 bg-[#1C1F29] rounded-md shadow-lg py-1 text-gray-500">
									<button className="w-full px-4 py-2 text-left hover:bg-gray-700 hover:text-white transition-colors duration-200">
										Credit Card
									</button>
									<button className="w-full px-4 py-2 text-left hover:bg-gray-700 hover:text-white transition-colors duration-200">
										Crypto
									</button>
								</div>
							)}
						</div>
						<Image src="/pfp1.jpg" alt="User Avatar" width={32} height={32} className="rounded-full" />
					</>
				) : (
					<button className="login-button flex items-center px-6 py-2 text-sm font-bold" onClick={handleLogin}>
						<Image src={steam} alt='steam' width={20} height={20} className="mr-2 invert" />
						Login
					</button>
				)}
			</div>
		</nav>
	);
}