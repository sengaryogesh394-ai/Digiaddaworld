
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/shared/ProductCard';
import { mockProducts, mockCategories } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function ShopPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [priceRange, setPriceRange] = useState<number[]>([300]);

  const maxPrice = useMemo(() => Math.ceil(Math.max(...mockProducts.map(p => p.price)) / 10) * 10, []);

  useEffect(() => {
    setPriceRange([maxPrice]);
  }, [maxPrice]);
  
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategories(prev => prev.includes(category) ? prev : [...prev, category]);
    }
  }, [searchParams]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const categoryId = product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(categoryId);
      const priceMatch = product.price <= priceRange[0];
      return categoryMatch && priceMatch;
    });
  }, [selectedCategories, priceRange]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([maxPrice]);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-headline">Shop All Products</h1>
        <p className="text-lg text-muted-foreground mt-2">Find your next creative asset.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Filters</CardTitle>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {mockCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={category.id} className="cursor-pointer">{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={maxPrice}
                  step={1}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>Rs 0</span>
                  <span>Rs {priceRange[0].toFixed(0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
                <h3 className="text-2xl font-semibold">No Products Found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
