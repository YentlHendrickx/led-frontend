import { Link } from "react-router-dom";
import {
  FaLightbulb,
  FaBars,
  FaX,
  FaPaintRoller,
  FaHouse,
  FaInfo,
  FaExplosion,
} from "react-icons/fa6";
import { useState } from "react";

function SideBar() {
  return (
    <div className="w-48 h-full fixed left-0 top-0 bg-primary">
      <div className="flex flex-col h-1/2 w-full items-center justify-center mt-2 pb-8">
        <div className="mt-4">
          <Link
            to="/"
            aria-label="Home"
            className="text-6xl text-primary-text hover:text-yellow-300"
          >
            <FaLightbulb />
          </Link>
        </div>
        <div className="flex flex-col justify-evenly align-middle h-2/3 text-2xl">
          <Link
            to="/"
            className="text-primary-text hover:text-primary-text-hover"
          >
            <span className="flex gap-x-2">
              <FaHouse className="mt-1.5 text-xl" /> Home
            </span>
          </Link>
          <Link
            to="/effects"
            className="text-primary-text hover:text-primary-text-hover"
          >
            <span className="flex gap-x-2">
              <FaExplosion className="mt-1.5 text-xl" /> Effects
            </span>
          </Link>
          <Link
            to="/colors"
            className="text-primary-text hover:text-primary-text-hover"
          >
            <span className="flex gap-x-2">
              <FaPaintRoller className="mt-1.5 text-xl" /> Colors
            </span>
          </Link>
          <Link
            to="/info"
            className="text-primary-text hover:text-primary-text-hover"
          >
            <span className="flex gap-x-2">
              <FaInfo className="mt-1.5 text-xl" /> Info
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileBar() {
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-primary p-5 shadow-md">
      <div className="flex">
        <div className="w-fit">
          <Link
            to="/"
            aria-label="Home"
            className="text-4xl text-primary-text hover:text-primary-text-hover"
          >
            <FaLightbulb />
          </Link>
        </div>
        <div className="w-full flex justify-end">
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
      </div>
      <div
        className={
          showMenu
            ? "max-h-screen overflow-hidden transition-all ease-linear duration-200"
            : "max-h-0 overflow-hidden transition-all ease-linear duration-200"
        }
      >
        <Link
          to="/"
          className="block text-left text-lg text-primary-text my-2 py-2 hover:text-primary-text-hover border-b border-primary-text-hover"
          aria-label="Home"
        >
          <span className="flex gap-x-2">
            <FaHouse className="mt-0.5 text-xl" /> Home
          </span>
        </Link>
        <Link
          to="/effects"
          className="block text-left text-lg text-primary-text my-2 pb-2 hover:text-primary-text-hover border-b border-primary-text-hover"
          aria-label="Effects"
        >
          <span className="flex gap-x-2">
            <FaExplosion className="mt-0.5 text-xl" /> Effects
          </span>
        </Link>
        <Link
          to="/colors"
          className="block text-left text-lg text-primary-text my-2 pb-2 hover:text-primary-text-hover border-b border-primary-text-hover"
          aria-label="Colors"
        >
          <span className="flex gap-x-2">
            <FaPaintRoller className="mt-0.5 text-xl" /> Colors
          </span>
        </Link>
        <Link
          to="/info"
          className="block text-left text-lg text-primary-text my-2 pb-2 hover:text-primary-text-hover border-b border-primary-text-hover"
          aria-label="Info"
        >
          <span className="flex gap-x-2">
            <FaInfo className="mt-0.5 text-xl" /> Info
          </span>
        </Link>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="w-full ">
      <div className="hidden sm:block">{SideBar()}</div>
      <div className="sm:hidden">{MobileBar()}</div>
    </div>
  );
}

export default Navigation;
