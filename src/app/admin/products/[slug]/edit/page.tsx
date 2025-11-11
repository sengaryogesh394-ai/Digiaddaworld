'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  ChevronLeft,
  PlusCircle,
  X,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface MediaItem {
  id: string;
  url: string;
  hint: string;
  type: 'image' | 'video';
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  value: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [productId, setProductId] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    status: 'active',
    stock: '999',
    isFeatured: false,
    tags: '',
  });

  const [promotion, setPromotion] = useState({
    enabled: false,
    discountPercentage: 0,
    timerDuration: 24
  });

  const [promotionalHeader, setPromotionalHeader] = useState({
    enabled: false,
    bannerText: '',
    mainHeading: '',
    subHeading: '',
    backgroundColor: '#FF6B6B',
    textColor: '#000000'
  });

  const [media, setMedia] = useState<MediaItem[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [mediaInput, setMediaInput] = useState({ url: '', hint: '', type: 'image' as 'image' | 'video' });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/slug/${params.slug}`);
      const result = await response.json();
      
      if (result.success) {
        const product = result.data;
        
        console.log('📦 FETCHED PRODUCT DATA:', product);
        console.log('🎯 Promotional Header in fetched data:', product.promotionalHeader);
        console.log('🎯 Promotional Header enabled?:', product.promotionalHeader?.enabled);
        
        setProductId(product._id);
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          originalPrice: product.originalPrice.toString(),
          category: product.category,
          status: product.status,
          stock: product.stock.toString(),
          isFeatured: product.isFeatured,
          tags: product.tags.join(', '),
        });
        setMedia(product.media || []);
        setFeatures(product.features || []);
        
        if (product.promotion) {
          setPromotion({
            enabled: product.promotion.enabled || false,
            discountPercentage: product.promotion.discountPercentage || 0,
            timerDuration: product.promotion.timerDuration || 24
          });
        }
        
        if (product.promotionalHeader) {
          console.log('✅ Setting promotional header state:', product.promotionalHeader);
          setPromotionalHeader({
            enabled: product.promotionalHeader.enabled || false,
            bannerText: product.promotionalHeader.bannerText || '',
            mainHeading: product.promotionalHeader.mainHeading || '',
            subHeading: product.promotionalHeader.subHeading || '',
            backgroundColor: product.promotionalHeader.backgroundColor || '#FF6B6B',
            textColor: product.promotionalHeader.textColor || '#000000'
          });
        } else {
          console.log('❌ No promotional header in product data!');
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error",
        description: "Failed to load product",
        variant: "destructive"
      });
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category || media.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and add at least one media item",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice) || parseFloat(formData.price) * 20,
        category: formData.category,
        status: formData.status,
        stock: parseInt(formData.stock),
        isFeatured: formData.isFeatured,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        media,
        features,
        promotion: {
          enabled: promotion.enabled,
          discountPercentage: promotion.discountPercentage,
          timerDuration: promotion.timerDuration,
          timerEndDate: promotion.enabled && promotion.timerDuration > 0 
            ? new Date(Date.now() + promotion.timerDuration * 60 * 60 * 1000)
            : undefined
        },
        promotionalHeader: {
          enabled: promotionalHeader.enabled,
          bannerText: promotionalHeader.bannerText,
          mainHeading: promotionalHeader.mainHeading,
          subHeading: promotionalHeader.subHeading,
          backgroundColor: promotionalHeader.backgroundColor,
          textColor: promotionalHeader.textColor
        }
      };

      console.log('Sending product data:', productData);
      console.log('Promotion data being sent:', productData.promotion);
      console.log('Promotional Header being sent:', productData.promotionalHeader);

      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Product updated successfully"
        });
        router.push('/admin/products');
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addMedia = () => {
    if (!mediaInput.url) return;
    const newMedia = {
      ...mediaInput,
      id: Date.now().toString(),
      hint: mediaInput.hint || 'product media' // Default hint if empty
    };
    setMedia([...media, newMedia]);
    setMediaInput({ url: '', hint: '', type: 'image' });
  };

  const removeMedia = (id: string) => {
    setMedia(media.filter(m => m.id !== id));
  };

  const addFeature = () => {
    setFeatures([...features, { icon: '✨', title: '', description: '', value: '' }]);
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-96">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/admin/products">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Edit Product
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" onClick={() => router.push('/admin/products')} disabled={loading}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Update Product'}
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Update your product information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="min-h-32"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-3">
                    <Label htmlFor="price">Price (Rs) *</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="originalPrice">Original Price (Rs)</Label>
                    <Input 
                      id="originalPrice" 
                      type="number" 
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="design, ebook, tutorial"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Media *</CardTitle>
              <CardDescription>Manage product images and videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-3 p-4 border rounded-lg">
                  <div className="grid gap-2">
                    <Label htmlFor="mediaUrl">Media URL</Label>
                    <Input
                      id="mediaUrl"
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={mediaInput.url}
                      onChange={(e) => setMediaInput({...mediaInput, url: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mediaHint">AI Hint (optional)</Label>
                    <Input
                      id="mediaHint"
                      placeholder="e.g., product screenshot (optional)"
                      value={mediaInput.hint}
                      onChange={(e) => setMediaInput({...mediaInput, hint: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mediaType">Type</Label>
                    <Select value={mediaInput.type} onValueChange={(value: 'image' | 'video') => setMediaInput({...mediaInput, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="button" onClick={addMedia} size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Media
                  </Button>
                </div>

                {media.length > 0 && (
                  <div className="grid gap-2">
                    <Label>Added Media ({media.length})</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {media.map((item) => (
                        <div key={item.id} className="relative group border rounded-lg p-2">
                          {item.type === 'image' ? (
                            <Image
                              src={item.url}
                              alt={item.hint}
                              width={150}
                              height={150}
                              className="w-full aspect-square object-cover rounded"
                            />
                          ) : (
                            <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                              <span className="text-sm">Video: {item.hint}</span>
                            </div>
                          )}
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
                            onClick={() => removeMedia(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <p className="text-xs mt-1 truncate">{item.hint}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Features</CardTitle>
              <CardDescription>Manage product features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="grid gap-3 p-4 border rounded-lg relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <Label>Icon</Label>
                        <Input
                          value={feature.icon}
                          onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                          placeholder="🎨"
                        />
                      </div>
                      <div className="col-span-3">
                        <Label>Title</Label>
                        <Input
                          value={feature.title}
                          onChange={(e) => updateFeature(index, 'title', e.target.value)}
                          placeholder="Feature title"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={feature.description}
                        onChange={(e) => updateFeature(index, 'description', e.target.value)}
                        placeholder="Feature description"
                      />
                    </div>
                    <div>
                      <Label>Value</Label>
                      <Input
                        value={feature.value}
                        onChange={(e) => updateFeature(index, 'value', e.target.value)}
                        placeholder="Rs 999 Value"
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addFeature} variant="outline" size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Courses & E-books">Courses & E-books</SelectItem>
                      <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                      <SelectItem value="AI Reels">AI Reels</SelectItem>
                      <SelectItem value="Video Editing">Video Editing</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Templates">Templates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Status & Stock</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger id="status">
                          <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="stock">Stock</Label>
                  <Input 
                    id="stock" 
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="featured" className="cursor-pointer">Featured Product</Label>
                </div>
            </CardContent>
          </Card>

          {/* Promotion Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Promotion Settings</CardTitle>
              <CardDescription>Configure countdown timer and discount</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="promotionEnabled"
                    checked={promotion.enabled}
                    onChange={(e) => setPromotion({...promotion, enabled: e.target.checked})}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="promotionEnabled" className="cursor-pointer">Enable Promotion</Label>
                </div>
                
                {promotion.enabled && (
                  <>
                    <div className="grid gap-3">
                      <Label htmlFor="discountPercentage">Discount % Off</Label>
                      <Input 
                        id="discountPercentage" 
                        type="number"
                        min="0"
                        max="100"
                        value={promotion.discountPercentage}
                        onChange={(e) => setPromotion({...promotion, discountPercentage: parseInt(e.target.value) || 0})}
                        placeholder="e.g., 85"
                      />
                      <p className="text-xs text-muted-foreground">
                        Shows as "{promotion.discountPercentage}% OFF" badge
                      </p>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="timerDuration">Timer Duration (hours)</Label>
                      <Input 
                        id="timerDuration" 
                        type="number"
                        min="1"
                        value={promotion.timerDuration}
                        onChange={(e) => setPromotion({...promotion, timerDuration: parseInt(e.target.value) || 24})}
                        placeholder="e.g., 24"
                      />
                      <p className="text-xs text-muted-foreground">
                        Countdown timer will show for {promotion.timerDuration} hours
                      </p>
                    </div>
                  </>
                )}
            </CardContent>
          </Card>

          {/* Promotional Header Settings */}
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Promotional Header
              </CardTitle>
              <CardDescription>Custom promotional banner at the top of product page</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="promoHeaderEnabled"
                  checked={promotionalHeader.enabled}
                  onChange={(e) => setPromotionalHeader({...promotionalHeader, enabled: e.target.checked})}
                  className="h-4 w-4"
                />
                <Label htmlFor="promoHeaderEnabled" className="cursor-pointer">Enable Promotional Header</Label>
              </div>
              
              {promotionalHeader.enabled && (
                <>
                  <div className="grid gap-3">
                    <Label htmlFor="bannerText">Top Banner Text (Optional)</Label>
                    <Input 
                      id="bannerText" 
                      value={promotionalHeader.bannerText}
                      onChange={(e) => setPromotionalHeader({...promotionalHeader, bannerText: e.target.value})}
                      placeholder="e.g., You asked, we listened. Get instant access for Lifetime..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Purple banner text at the very top
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="mainHeading">Main Heading *</Label>
                    <Textarea 
                      id="mainHeading" 
                      value={promotionalHeader.mainHeading}
                      onChange={(e) => setPromotionalHeader({...promotionalHeader, mainHeading: e.target.value})}
                      placeholder="e.g., World's Biggest Video Editing Bundle!"
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      Large heading in the center (required)
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="subHeading">Sub Heading (Optional)</Label>
                    <Textarea 
                      id="subHeading" 
                      value={promotionalHeader.subHeading}
                      onChange={(e) => setPromotionalHeader({...promotionalHeader, subHeading: e.target.value})}
                      placeholder="e.g., Are You A Passionate Video Editor? Or Aspiring To Become One?"
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      Text above the main heading
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="backgroundColor">Background Color</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="backgroundColor" 
                          type="color"
                          value={promotionalHeader.backgroundColor}
                          onChange={(e) => setPromotionalHeader({...promotionalHeader, backgroundColor: e.target.value})}
                          className="w-20 h-10 cursor-pointer"
                        />
                        <Input 
                          type="text"
                          value={promotionalHeader.backgroundColor}
                          onChange={(e) => setPromotionalHeader({...promotionalHeader, backgroundColor: e.target.value})}
                          placeholder="#FF6B6B"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="textColor">Text Color</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="textColor" 
                          type="color"
                          value={promotionalHeader.textColor}
                          onChange={(e) => setPromotionalHeader({...promotionalHeader, textColor: e.target.value})}
                          className="w-20 h-10 cursor-pointer"
                        />
                        <Input 
                          type="text"
                          value={promotionalHeader.textColor}
                          onChange={(e) => setPromotionalHeader({...promotionalHeader, textColor: e.target.value})}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="mt-4 p-4 rounded-lg border-2 border-dashed">
                    <p className="text-xs font-semibold mb-2">Preview:</p>
                    <div 
                      className="p-6 rounded-lg text-center"
                      style={{ 
                        background: promotionalHeader.backgroundColor,
                        color: promotionalHeader.textColor
                      }}
                    >
                      {promotionalHeader.bannerText && (
                        <div className="inline-block bg-purple-700 text-white px-4 py-2 rounded-lg text-xs mb-3">
                          {promotionalHeader.bannerText}
                        </div>
                      )}
                      {promotionalHeader.subHeading && (
                        <p className="text-sm mb-2">{promotionalHeader.subHeading}</p>
                      )}
                      <h2 className="text-2xl font-bold">
                        {promotionalHeader.mainHeading || 'Your Main Heading'}
                      </h2>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </form>
      <div className="flex items-center justify-center gap-2 md:hidden mt-4">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin/products')} disabled={loading}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Update Product'}
        </Button>
      </div>
    </>
  );
}
