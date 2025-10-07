import { Link } from 'react-router';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <Calendar className="h-6 w-6" />
            <span>Event Management</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link to="/events">
              <Button variant="ghost">Events</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}