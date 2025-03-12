
import { useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ResourceCategory, ResourceType } from '@/types';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

// Mock data for resources
const mockResources = Array.from({ length: 12 }).map((_, i) => {
  const categories: ResourceCategory[] = ['educational', 'industrial', 'commercial', 'photography', 'videography', 'graphics', 'music', 'audio', 'coding'];
  const types: ResourceType[] = ['image', 'document', 'video', 'audio', 'design'];
  
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomType = types[Math.floor(Math.random() * types.length)];
  
  let thumbnailUrl = 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070';
  
  // Assign a more appropriate image based on type
  if (randomType === 'image' || randomType === 'photography') {
    thumbnailUrl = 'https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=80&w=2061';
  } else if (randomType === 'document' || randomType === 'design') {
    thumbnailUrl = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974';
  } else if (randomType === 'video' || randomType === 'videography') {
    thumbnailUrl = 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?q=80&w=2070';
  } else if (randomType === 'audio' || randomType === 'music') {
    thumbnailUrl = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070';
  }
  
  return {
    id: `resource-${i + 1}`,
    title: `Resource ${i + 1}`,
    description: `Description for Resource ${i + 1}`,
    thumbnailUrl,
    price: Math.floor(Math.random() * 50) + 5,
    creatorName: `Creator ${i % 5 + 1}`,
    category: randomCategory,
    type: randomType,
    downloads: Math.floor(Math.random() * 1000),
  };
});

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [filtersVisible, setFiltersVisible] = useState(false);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'educational', label: 'Educational' },
    { id: 'photography', label: 'Photography' },
    { id: 'videography', label: 'Videography' },
    { id: 'graphics', label: 'Graphics' },
    { id: 'music', label: 'Music' },
    { id: 'coding', label: 'Coding' },
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'image', label: 'Images' },
    { id: 'document', label: 'Documents' },
    { id: 'video', label: 'Videos' },
    { id: 'audio', label: 'Audio' },
    { id: 'design', label: 'Designs' },
  ];

  // Filter the resources based on selected filters
  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesPrice = resource.price >= priceRange[0] && resource.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesType && matchesPrice;
  });

  // Sort the resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'popularity') {
      return b.downloads - a.downloads;
    } else if (sortBy === 'newest') {
      // In a real app, we'd sort by date
      return Math.random() - 0.5;
    } else if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Mobile Filter Toggle */}
        <Button 
          variant="outline" 
          className="md:hidden w-full flex items-center justify-between"
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          <span>Filters</span>
          <Filter size={16} />
        </Button>

        {/* Filters Sidebar - Hidden on mobile unless toggled */}
        <div className={`w-full md:w-64 space-y-6 ${filtersVisible ? 'block' : 'hidden md:block'}`}>
          <div>
            <h3 className="font-medium mb-2">Search</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search resources..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Category</h3>
            <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-medium mb-2">Resource Type</h3>
            <Select onValueChange={setSelectedType} defaultValue={selectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {types.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="space-y-4">
              <Slider
                defaultValue={priceRange}
                min={0}
                max={100}
                step={1}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Resources Store</h1>
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground mr-2">Sort by:</p>
              <Select onValueChange={setSortBy} defaultValue={sortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {sortedResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedResources.map(resource => (
                <Card key={resource.id} className="resource-card overflow-hidden">
                  <div className="relative">
                    <img 
                      src={resource.thumbnailUrl} 
                      alt={resource.title}
                      className="resource-card-image"
                    />
                    <Badge className="absolute top-2 right-2 bg-white text-foreground">
                      ${resource.price}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline">
                        {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                      </Badge>
                      <Badge variant="outline">
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-medium line-clamp-1">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">By {resource.creatorName}</p>
                    <p className="text-sm text-muted-foreground mt-1">{resource.downloads} downloads</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild className="w-full">
                      <Link to={`/store/${resource.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
