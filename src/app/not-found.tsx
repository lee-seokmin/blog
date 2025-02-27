import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-8">The page you are looking for does not exist.</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-foreground text-background rounded-full transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
