import Link from "next/link";

/**
 * 404 - Page Not Found
 */

export default function NotFound() {
  return (
    <div className="w-full px-3 sm:px-6 md:px-8 py-24">
      <div className="text-center">
        <h1 className="text-[43px] md:text-[55px] font-bold text-gray-dark mb-4">404</h1>
        <h2 className="text-[15px] md:text-[19px] font-semibold text-gray-dark mb-4">
          Page Not Found
        </h2>
        <p className="text-[9px] text-gray-text mb-8">
          This page doesn&apos;t seem to exist
        </p>
        <Link
          href="/"
          className="inline-block bg-gray-dark text-white px-6 py-2.5 text-[9px] font-medium transition-all hover:bg-gray-text"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
