//navigation bar
import Link from 'next/link';
import Image from 'next/image';
import DHLLogo from '../images/dhl_logo.png';
import SignUpPage from '../signup/page';
//missing links obviously cause the pages dont exist yet

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-[#FFCC00] text-black shadow-md">
      <Image src={DHLLogo} alt="DHL Logo" width={120} height={40} className="object-contain" /> {/* replace this image with a proper logo maybe */}
      <div className="space-x-6">
        <Link href="/" className="hover:text-red-700 font-medium">Home</Link>
        <Link href="/login" className="hover:text-red-700 font-medium">Login</Link>
        <Link href="/signup" className="bg-[#D40511] text-white px-4 py-2 rounded font-bold hover:bg-red-800 transition">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

