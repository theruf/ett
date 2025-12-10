export default function Footer() {
  return (
    <footer className="bg-white mt-16 md:mt-20">
      <div className="w-full px-5 sm:px-8 md:px-10 pb-12">
        <div className="max-w-screen-2xl mx-auto flex flex-col gap-4">
          <div className="border-t border-gray-light pt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="so-nav text-gray-dark">©2025 ÉTT Market. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="https://t.me" target="_blank" rel="noopener" className="so-body text-gray-dark hover:text-gray-text">
                Telegram
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener" className="so-body text-gray-dark hover:text-gray-text">
                Instagram
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener" className="so-body text-gray-dark hover:text-gray-text">
                Pinterest
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
