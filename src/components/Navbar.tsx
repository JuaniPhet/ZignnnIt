"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const getLinkHref = (hash: string) => {
    return pathname === "/" ? hash : `/${hash}`;
  };

  return (
    <header id="navbar" className="bg-background fixed shadow-md w-full z-50 top-0 left-0 header-nav border-b">
      <nav className="container mx-auto flex items-center justify-between text-lg h-20 sm:h-24 px-4">
        <Link href={pathname === "/" ? "#home" : "/"}>
          <div className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="254" height="98" viewBox="0 0 254 98" fill="none" className="w-32 -mt-3 text-foreground">
              <path d="M0 0H52V30H0V0Z" fill="#F7B700" />
              <path d="M254 51.9727H244.276V72.2255C244.276 74.1032 244.79 75.2656 245.818 75.7127C246.668 76.0704 247.763 76.2492 249.104 76.2492C250.446 76.2492 251.921 75.8915 253.531 75.1762H254V80.1388C252.122 81.1224 250.11 81.6142 247.964 81.6142C241.437 81.6142 238.173 78.6634 238.173 72.762V51.9727H231.802V51.5703L244.276 39.365V46.7418H254V51.9727Z" fill="currentColor" />
              <path d="M218.664 80.9436V34H225.639V80.9436H218.664Z" fill="currentColor" />
              <path d="M210.703 59.9195V80.9435H203.729V61.6296C203.729 60.1319 203.36 58.7683 202.622 57.5388C201.907 56.3094 200.935 55.337 199.705 54.6216C198.498 53.8839 197.135 53.5151 195.614 53.5151C194.139 53.5151 192.787 53.8839 191.557 54.6216C190.328 55.337 189.344 56.3094 188.606 57.5388C187.869 58.7683 187.5 60.1319 187.5 61.6296V80.9435H180.525V47.4124H187.5V50.9667C188.662 49.5808 190.093 48.4854 191.792 47.6807C193.491 46.8759 195.324 46.4736 197.291 46.4736C199.772 46.4736 202.03 47.0771 204.064 48.2842C206.099 49.4914 207.708 51.112 208.893 53.1463C210.1 55.1805 210.703 57.4382 210.703 59.9195Z" fill="currentColor" />
              <path d="M173.832 59.9195V80.9435H166.858V61.6296C166.858 60.1319 166.489 58.7683 165.751 57.5388C165.036 56.3094 164.064 55.337 162.834 54.6216C161.627 53.8839 160.263 53.5151 158.743 53.5151C157.268 53.5151 155.916 53.8839 154.686 54.6216C153.457 55.337 152.473 56.3094 151.735 57.5388C150.998 58.7683 150.629 60.1319 150.629 61.6296V80.9435H143.654V47.4124H150.629V50.9667C151.791 49.5808 153.222 48.4854 154.921 47.6807C156.62 46.8759 158.453 46.4736 160.42 46.4736C162.901 46.4736 165.159 47.0771 167.193 48.2842C169.227 49.4914 170.837 51.112 172.022 53.1463C173.229 55.1805 173.832 57.4382 173.832 59.9195Z" fill="currentColor" />
              <path d="M136.961 59.9195V80.9435H129.987V61.6296C129.987 60.1319 129.618 58.7683 128.88 57.5388C128.165 56.3094 127.193 55.337 125.963 54.6216C124.756 53.8839 123.392 53.5151 121.872 53.5151C120.397 53.5151 119.044 53.8839 117.815 54.6216C116.585 55.337 115.602 56.3094 114.864 57.5388C114.127 58.7683 113.758 60.1319 113.758 61.6296V80.9435H106.783V47.4124H113.758V50.9667C114.92 49.5808 116.351 48.4854 118.05 47.6807C119.749 46.8759 121.582 46.4736 123.549 46.4736C126.03 46.4736 128.288 47.0771 130.322 48.2842C132.356 49.4914 133.966 51.112 135.151 53.1463C136.358 55.1805 136.961 57.4382 136.961 59.9195Z" fill="currentColor" />
              <path d="M91.7618 47.4124H98.7363V81.8154C98.7363 84.1178 98.2445 86.2415 97.2609 88.1863C96.2997 90.1311 94.992 91.8076 93.3378 93.2159C91.6836 94.6466 89.7835 95.7531 87.6375 96.5355C85.5139 97.3179 83.2896 97.7091 80.9648 97.7091C78.6176 97.7091 76.3599 97.2061 74.1915 96.2002C72.0232 95.2166 70.1119 93.8754 68.4577 92.1765C66.8259 90.4776 65.6076 88.5551 64.8028 86.4091L71.2073 83.5255C71.6543 84.9114 72.3697 86.1409 73.3533 87.2139C74.3592 88.2869 75.5216 89.1363 76.8405 89.7622C78.1817 90.3882 79.5565 90.7011 80.9648 90.7011C82.3508 90.7011 83.6808 90.4776 84.955 90.0305C86.2516 89.6058 87.4028 89.0022 88.4087 88.2198C89.437 87.4374 90.2529 86.4985 90.8565 85.4032C91.4601 84.3078 91.7618 83.1119 91.7618 81.8154V76.1486C90.6665 77.8475 89.2582 79.2223 87.5369 80.2729C85.8157 81.3012 83.815 81.8154 81.5348 81.8154C79.1653 81.8154 76.9299 81.3571 74.8286 80.4406C72.7273 79.5241 70.8831 78.2611 69.296 76.6516C67.7089 75.0197 66.4682 73.142 65.574 71.0183C64.6799 68.8947 64.2328 66.6146 64.2328 64.178C64.2328 61.7414 64.6799 59.4613 65.574 57.3377C66.4682 55.1917 67.7089 53.3139 69.296 51.7044C70.8831 50.0726 72.7273 48.7984 74.8286 47.8819C76.9299 46.9654 79.1653 46.5071 81.5348 46.5071C83.815 46.5071 85.8157 47.0324 87.5369 48.0831C89.2582 49.1114 90.6665 50.4861 91.7618 52.2074V47.4124ZM81.6019 75.0756C83.5467 75.0756 85.2456 74.5838 86.6986 73.6002C88.1516 72.5943 89.2805 71.2642 90.0853 69.61C90.89 67.9558 91.2924 66.1452 91.2924 64.178C91.2924 62.1661 90.8788 60.3443 90.0517 58.7124C89.247 57.0582 88.1181 55.7393 86.6651 54.7558C85.2121 53.7498 83.5244 53.2469 81.6019 53.2469C79.7242 53.2469 78.0029 53.7386 76.4381 54.7222C74.8957 55.7058 73.6662 57.0247 72.7497 58.6789C71.8332 60.3331 71.3749 62.1661 71.3749 64.178C71.3749 66.1899 71.8332 68.0229 72.7497 69.6771C73.6886 71.3313 74.9292 72.6502 76.4716 73.6338C78.0364 74.595 79.7465 75.0756 81.6019 75.0756Z" fill="currentColor" />
              <path d="M51.8368 47.4125H58.8112V80.9436H51.8368V47.4125ZM55.3911 42.5504C54.3181 42.5504 53.4239 42.204 52.7086 41.511C51.9932 40.818 51.6356 39.9462 51.6356 38.8955C51.6356 37.8673 51.9932 37.0066 52.7086 36.3137C53.4239 35.5983 54.3069 35.2407 55.3575 35.2407C56.3858 35.2407 57.2576 35.5983 57.973 36.3137C58.6883 37.0066 59.0459 37.8673 59.0459 38.8955C59.0459 39.9462 58.6883 40.818 57.973 41.511C57.28 42.204 56.4193 42.5504 55.3911 42.5504Z" fill="currentColor" />
              <path d="M7 80.9436V73.9691L35.5685 40.9745H7V34H44.9572V40.9745L16.3887 73.9691H44.9572V80.9436H7Z" fill="currentColor" />
            </svg>
          </div>
        </Link>

        {/* Mobile menu and elements */}
        <div className={`nav-menu absolute xl:static top-0 ${isOpen ? "left-[0]" : "left-[-100%]"} bg-background/95 min-h-[80vh] xl:min-h-fit w-full xl:w-auto flex items-center justify-center backdrop-blur-sm duration-300 z-40 border-b xl:border-none`}>
          <ul className="flex flex-col xl:flex-row items-center gap-8">
            <li>
              <Link href={getLinkHref("#home")} className="nav-link hover:bg-secondary hover:text-secondary-foreground p-3 rounded-lg" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link href={getLinkHref("#about-us")} className="nav-link hover:bg-secondary hover:text-secondary-foreground p-3 rounded-lg" onClick={() => setIsOpen(false)}>About</Link>
            </li>
            <li>
              <Link href={getLinkHref("#services")} className="nav-link hover:bg-secondary hover:text-secondary-foreground p-3 rounded-lg" onClick={() => setIsOpen(false)}>Services</Link>
            </li>
            <li>
              <Link href={getLinkHref("#projects")} className="nav-link hover:bg-secondary hover:text-secondary-foreground p-3 rounded-lg" onClick={() => setIsOpen(false)}>Projects</Link>
            </li>
            {/* <li>
              <Link href={getLinkHref("#pricing")} className="nav-link hover:bg-amber-100 dark:hover:bg-amber-950 p-3 rounded-lg" onClick={() => setIsOpen(false)}>Pricing</Link>
            </li> */}
            <li>
              <Link href="/contact" className="nav-link hover:bg-secondary hover:text-secondary-foreground p-3 rounded-lg" onClick={() => setIsOpen(false)}>Contact</Link>
            </li>
            <li className="xl:hidden">
              <Link
                href="/shop"
                className="bg-primary text-primary-foreground px-5 py-3 font-bold rounded-lg hover:brightness-110 active:scale-[0.97] transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex gap-4 items-center">
          {/* Dark Mode Icon */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-xl sm:text-3xl cursor-pointer z-50 focus:outline-none p-2 rounded-full hover:bg-muted"
            aria-label="Toggle theme"
          >
            {mounted && (theme === "dark" ? <i className="ri-sun-fill text-amber-500"></i> : <i className="ri-moon-fill"></i>)}
          </button>

          {/* Shop button */}
          <div className="hidden xl:flex z-50">
            <Link href="/shop" className="bg-primary text-primary-foreground px-5 py-3 font-bold rounded-lg hover:brightness-110 active:scale-[0.97] transition-all duration-200">
              Shop
            </Link>
          </div>

          {/* Hamburger Menu Icon */}
          <button
            type="button"
            onClick={toggleMenu}
            className="text-xl sm:text-3xl cursor-pointer z-50 xl:hidden focus:outline-none p-2 rounded-full hover:bg-muted"
            aria-label="Toggle navigation menu"
          >
            <i className={isOpen ? "ri-close-large-line" : "ri-menu-line"}></i>
          </button>
        </div>
      </nav>
    </header>
  );
}
