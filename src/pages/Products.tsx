
import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Plus, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample product data (in a real app, this would come from an API)
const products = [
  {
    id: 1,
    name: "Pearl Elegance Necklace",
    price: 499,
    image: "src/pages/products/IMG_4185.jpg",
    category: "necklaces",
    isNew: true,
  },
  {
    id: 2,
    name: "Diamond Drop Earrings",
    price: 899,
    image: "src/pages/products/IMG_4173.jpg",
    category: "earrings",
    isNew: false,
  },
  {
    id: 3,
    name: "Silver Chain Bracelet",
    price: 299,
    image: "src/pages/products/IMG_4176.jpg",
    category: "bracelets",
    isNew: true,
  },
  {
    id: 4,
    name: "Sapphire Pendant",
    price: 599,
    image: "src/pages/products/IMG_4177.jpg",
    category: "pendants",
    isNew: false,
  },
  {
    id: 5,
    name: "Gold Hoop Earrings",
    price: 349,
    image: "src/pages/products/IMG_4178.jpg",
    category: "earrings",
    isNew: false,
  },
  {
    id: 6,
    name: "Gemstone Cluster Ring",
    price: 749,
    image: "src/pages/products/IMG_4180.jpg",
    category: "rings",
    isNew: false,
  },
  {
    id: 7,
    name: "Emerald Tennis Bracelet",
    price: 1299,
    image: "src/pages/products/IMG_4181.jpg",
    category: "bracelets",
    isNew: true,
  },
  {
    id: 8,
    name: "Pearl Stud Earrings",
    price: 199,
    image: "src/pages/products/IMG_4188 2.jpg",
    category: "earrings",
    isNew: false,
  },
  {
    id: 9,
    name: "Pearl Stud Earrings",
    price: 199,
    image: "src/pages/products/IMG_4215 2.JPG",
    category: "earrings",
    isNew: false,
  },
  {
    id: 10,
    name: "Pearl Stud Earrings",
    price: 199,
    image: "src/pages/products/IMG_4192.jpg",
    category: "earrings",
    isNew: false,
  },
  {
    id: 11,
    name: "Pearl Stud Earrings",
    price: 199,
    image: "src/pages/products/IMG_4193.jpg",
    category: "earrings",
    isNew: false,
  },
  {
    id: 12,
    name: "Pearl Stud Earrings",
    price: 199,
    image: "src/pages/products/IMG_4187.jpg",
    category: "earrings",
    isNew: false,
  },
  {
    id: 13,
    name: "Pearl Stud Earrings",
    price: 199,
    image: "src/pages/products/IMG_4184.jpg",
    category: "earrings",
    isNew: false,
  },
  {
    id: 14,
    name: "Pearl Stud Earrings",
    price: 199,
    image: "src/pages/products/IMG_4181.jpg",
    category: "earrings",
    isNew: false,
  },
];

const categories = [
  { id: "all", name: "All Jewelry" },
  { id: "necklaces", name: "Necklaces" },
  { id: "earrings", name: "Earrings" },
  { id: "bracelets", name: "Bracelets" },
  { id: "pendants", name: "Pendants" },
  { id: "rings", name: "Rings" },
];

const Products = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isVisible, setIsVisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-2">Our Collection</h1>
        <p className="text-gray-600 mb-8">Discover our handcrafted jewelry pieces</p>

        {/* Mobile Filter */}
        <div className="md:hidden mb-6">
          <Button 
            variant="outline" 
            className="w-full flex justify-between items-center"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span>Filter: {categories.find(cat => cat.id === selectedCategory)?.name}</span>
            <Filter size={16} />
          </Button>
          
          <div className={cn(
            "mt-2 bg-white shadow-md rounded-md overflow-hidden transition-all duration-300",
            isFilterOpen ? "max-h-96 py-2" : "max-h-0"
          )}>
            {categories.map(category => (
              <button
                key={category.id}
                className={cn(
                  "block w-full text-left px-4 py-2 transition-colors",
                  selectedCategory === category.id 
                    ? "bg-glam-purple/10 text-glam-purple" 
                    : "hover:bg-gray-100"
                )}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setIsFilterOpen(false);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Category Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <h3 className="bg-glam-purple text-white font-semibold py-3 px-4">Categories</h3>
              <div className="py-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={cn(
                      "block w-full text-left px-4 py-2 transition-colors",
                      selectedCategory === category.id 
                        ? "bg-glam-purple/10 text-glam-purple" 
                        : "hover:bg-gray-100"
                    )}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className={cn(
                    "bg-white rounded-lg shadow-md overflow-hidden transition-all duration-700 transform hover-lift",
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-64 object-cover" 
                    />
                    {product.isNew && (
                      <span className="absolute top-2 right-2 bg-glam-purple text-white text-xs font-bold px-2 py-1 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-glam-purple font-bold mb-3">RS {product.price}</p>
                    <Button 
                      className="w-full bg-glam-purple hover:bg-glam-purple-dark"
                      onClick={() => handleAddToCart(product)}
                    >
                      <Plus size={16} className="mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="bg-glam-purple text-white hover:bg-glam-purple-dark">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
