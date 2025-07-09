export const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold text-gray-800">Trade My Nest</h3>
          <p className="mt-1">&copy; {new Date().getFullYear()} Trade My Nest. All rights reserved.</p>
        </div>

        <div className="text-right">
          <p>
            Contact us:{' '}
            <a href="mailto:trademynest@gmail.com" className="text-blue-600 hover:underline">
              trademynest@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};