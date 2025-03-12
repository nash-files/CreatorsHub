
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function Hero() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden">
      <div className="hero-gradient py-16 md:py-24">
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4 animate-fadeIn">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Discover Uganda's Digital Treasures
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-[700px] mx-auto">
                Explore thousands of high-quality digital assets showcasing Uganda's beauty, culture, and creativity - all in one dedicated platform.
              </p>
            </div>
            
            <div className="max-w-xl mx-auto animate-slideUp">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input 
                  type="search" 
                  placeholder="Search Ugandan resources..." 
                  className="bg-white pl-10 pr-4 py-3 h-14 rounded-full w-full text-base" 
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {user ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="rounded-full bg-white text-creator hover:bg-white/90">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/store">
                      <Button size="lg" className="rounded-full bg-white text-creator hover:bg-white/90">
                        Browse Resources
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/20">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
