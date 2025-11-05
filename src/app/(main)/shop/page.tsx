import { ProductCard } from '@/components/shared/ProductCard';
import { mockProducts, mockCategories } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export default function ShopPage() {
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
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {mockCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox id={category.id} />
                      <Label htmlFor={category.id}>{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <Slider defaultValue={[500]} max={1200} step={10} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>$0</span>
                  <span>$1200</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
