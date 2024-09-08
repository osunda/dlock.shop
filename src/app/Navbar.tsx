'use client'
import Link from "next/link";
import Image from "next/image";
import steam from '/public/steam-1.svg'
import usa from '/public/United-states_flag_icon_round.svg.png'
import brazil from '/public/Brazilian_Flag_-_round.svg.png'
import spanish from '/public/Spain_flag_icon.svg.png'
import { useState } from "react";

export function Navbar() {
	const [languageDropdown, setLanguageDropdown] = useState(false)

	const toggleLanguageDropdown = () => setLanguageDropdown(!languageDropdown)
	return (
		<nav className="fixed top-0 left-0 right-0 flex justify-between items-center w-full h-16 text-white p-2 z-50 bg-transparent">
			<div className="flex items-center space-x-10 ml-14">
				<Link href="/" className="text-2xl font-bold hover:cursor-pointer mr-6">
					<span className="text-2xl font-extrabold hover:cursor-pointer" style={{ fontFamily: 'Montserrat, sans-serif' }}>d<span className="text-red-500">lock</span>.shop</span>
				</Link>
				<Link href="/market" className="nav-tab font-bold pt-1">Market</Link>
				<Link href="/trade" className="nav-tab font-bold pt-1">Trade</Link>
				<Link href="/faq" className="nav-tab font-bold pt-1">FAQ</Link>
			</div>
			<div className="flex items-center mr-4">
				<div className="relative">
					<button 
						className="flex items-center mx-8" 
						onClick={toggleLanguageDropdown}
					>
						<Image src={usa} alt='English' width={25} height={25} className="mr-2" />
						{languageDropdown ? '⇑' : '⇓'}
					</button>
					{languageDropdown && (
						<div className="absolute mt-2 w-40 bg-zinc-800 bg-opacity-80 backdrop-blur-sm rounded-md border border-zinc-700 p-2">
							{[
								{ src: brazil, alt: 'Portuguese', text: 'Portuguese' },
								{ src: spanish, alt: 'Spanish', text: 'Spanish' }
							].map((lang, index) => (
								<button key={index} className="flex items-center w-full p-2 hover:bg-zinc-700 hover:bg-opacity-80">
									<Image src={lang.src} alt={lang.alt} width={23} height={25} className="mr-2" />
									{lang.text}
								</button>
							))}
						</div>
					)}
				</div>
				<button className="login-button flex items-center px-6 py-2 text-sm font-bold">
					<Image src={steam} alt='steam' width={20} height={20} className="mr-2 invert" />
					Login
				</button>
			</div>
		</nav>
	);
}