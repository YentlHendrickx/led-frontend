import { Link } from 'react-router-dom';
import { FaBars, FaX, FaPaintRoller, FaHouse, FaInfo, FaExplosion } from 'react-icons/fa6';
import { useState } from 'react';

function SideBar() {
	return (
		<div className="w-48 h-full fixed left-0 top-0 bg-primary">
			<div className="flex flex-col h-full w-full justify-between items-center mt-2 pb-8">
				<div className="flex flex-col text-primary-text text-2xl">
					<Link to={"/"}>Home</Link>
					<Link to={"/"}>Effects</Link>
					<Link to={"/"}>Colors</Link>
					<Link to={"/"}>Info</Link>
				</div>

			</div>
		</div>
	);
}

function Header() {
	const [showMenu, setShowMenu] = useState(true);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<div className="w-full ">
			<div className='hidden sm:block'>
				{ SideBar() } 
			</div>
			<div className='sm:hidden'>
				<div className='bg-primary sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none'>
					{/* Small screen hamburger menu */}
					<div className='w-full flex justify-end'>
						<button
							onClick={toggleMenu}
							type="button"
							className="focus:outline-none"
							aria-label="Hamburger Menu"
							>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="h-7 w-7 fill-current text-primary-dark"
							>
								{showMenu ? (
									<FaX className="text-xl" />
								) : (
									<FaBars className="text-xl" />
								)}
							</svg>
						</button>
					</div>
					<div
						className={
							showMenu
								? 'max-h-screen overflow-hidden transition-all ease-linear duration-200'
								: 'max-h-0 overflow-hidden transition-all ease-linear duration-200'
						}
					>
						<Link
							to="/"
							className="block text-left text-lg text-primary-text my-2 pb-2 hover:text-primary-text-hover border-b hover:border-primary-text-hover"
							aria-label="Home"
						>
							<span className='flex gap-x-2'>
								<FaHouse className='mt-1 text-xl' /> Home
							</span>
						</Link>
						<Link
							to="/"
							className="block text-left text-lg text-primary-text my-2 pb-2 hover:text-primary-text-hover border-b hover:border-primary-text-hover"
							aria-label="Effects"
						>
							<span className='flex gap-x-2'>
								<FaExplosion className='mt-1 text-xl'/> Effects
							</span>
						</Link>
						<Link
							to="/"
							className="block text-left text-lg text-primary-text my-2 pb-2 hover:text-primary-text-hover border-b hover:border-primary-text-hover"
							aria-label="Colors"
						>
							<span className='flex gap-x-2'>
								<FaPaintRoller className='mt-1 text-xl'/> Colors
							</span>
						</Link>
						<Link
							to="/"
							className="block text-left text-lg text-primary-text my-2 pb-2 hover:text-primary-text-hover border-b hover:border-primary-text-hover"
							aria-label="Info"
						>
							<span className='flex gap-x-2'>
								<FaInfo className='mt-1 text-xl'/> Info
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;