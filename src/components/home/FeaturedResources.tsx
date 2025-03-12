import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResourceCategory } from '@/types';

const mockResources = [
  {
    id: '1',
    title: 'Nature Photography Pack',
    category: 'photography' as ResourceCategory,
    thumbnailUrl: 'https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=80&w=2061',
    price: 29.99,
    creatorName: 'Sarah Johnson',
    downloads: 2450,
  },
  {
    id: '2',
    title: 'Business Presentation Template',
    category: 'graphics' as ResourceCategory,
    thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974',
    price: 19.99,
    creatorName: 'Michael Chen',
    downloads: 1823,
  },
  {
    id: '3',
    title: 'Educational Video Pack',
    category: 'educational' as ResourceCategory,
    thumbnailUrl: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?q=80&w=2070',
    price: 39.99,
    creatorName: 'Emma Davis',
    downloads: 974,
  },
  {
    id: '4',
    title: 'UI Design Elements',
    category: 'graphics' as ResourceCategory,
    thumbnailUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070',
    price: 24.99,
    creatorName: 'Alex Rivera',
    downloads: 3210,
  },
  {
    id: '5',
    title: 'Abstract Digital Art Collection',
    category: 'graphics' as ResourceCategory,
    thumbnailUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070',
    price: 15.99,
    creatorName: 'Jasmine Wong',
    downloads: 1534,
  },
  {
    id: '6',
    title: 'Landscape Photography Bundle',
    category: 'photography' as ResourceCategory,
    thumbnailUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074',
    price: 34.99,
    creatorName: 'Robert Clark',
    downloads: 2190,
  },
  {
    id: '7',
    title: 'Social Media Templates',
    category: 'graphics' as ResourceCategory,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2074',
    price: 22.99,
    creatorName: 'Sofia Martinez',
    downloads: 4250,
  },
  {
    id: '8',
    title: 'Audio Production Kit',
    category: 'music' as ResourceCategory,
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070',
    price: 49.99,
    creatorName: 'David Kim',
    downloads: 890,
  },
];

export function FeaturedResources() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'photography', label: 'Photography' },
    { id: 'graphics', label: 'Graphics' },
    { id: 'educational', label: 'Educational' },
    { id: 'music', label: 'Music' },
  ];
  
  const filteredResources = selectedCategory === 'all' 
    ? mockResources 
    : mockResources.filter(resource => resource.category === selectedCategory);

  return (
    <section className="py-12 container">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Discover Resources</h2>
          <p className="text-muted-foreground">Find the perfect digital assets for your projects</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button 
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredResources.map(resource => (
          <Card key={resource.id} className="resource-card overflow-hidden group">
            <div className="relative">
              <img 
                src={resource.thumbnailUrl} 
                alt={resource.title}
                className="resource-card-image h-44 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button asChild className="bg-white text-black hover:bg-white/90">
                  <Link to={`/store/${resource.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
              <Badge className="absolute top-2 right-2 bg-white text-foreground">
                ${resource.price}
              </Badge>
            </div>
            <CardContent className="p-4">
              <Badge variant="outline" className="mb-2">
                {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
              </Badge>
              <h3 className="text-base font-medium line-clamp-1">{resource.title}</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-muted-foreground">By {resource.creatorName}</p>
                <p className="text-xs text-muted-foreground">{resource.downloads.toLocaleString()} downloads</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <Button asChild variant="outline" className="rounded-full px-8">
          <Link to="/store">Browse All Resources</Link>
        </Button>
      </div>
    </section>
  );
}
