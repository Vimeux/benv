import Link from "next/link";

const Header = () => {
  return (
    <div className="container mx-auto px-4 flex justify-between">
      <span className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/" className="hover:underline">
          Home
        </Link>
      </span>
      <span className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
      </span>
    </div>
  );
};

export default Header;
