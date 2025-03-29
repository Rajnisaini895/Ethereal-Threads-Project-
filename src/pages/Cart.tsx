
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

const Cart = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Shopping Cart</h1>
        <p className="text-gray-600 mb-8">Review your items before checkout</p>

        {totalItems === 0 ? (
          <div 
            className={cn(
              "text-center py-20 transition-all duration-700 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            <div className="inline-flex justify-center items-center p-6 rounded-full bg-gray-100 mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any jewelry to your cart yet. 
              Start exploring our beautiful collections.
            </p>
            <Button asChild className="bg-glam-purple hover:bg-glam-purple-dark">
              <Link to="/products">
                Explore Collections
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div 
            className={cn(
              "transition-all duration-700 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Items ({totalItems})</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-grow sm:ml-6">
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          <p className="text-glam-purple font-bold mb-3">RS {item.price}</p>
                          <div className="flex items-center">
                            <div className="flex items-center border rounded-md mr-4">
                              <button 
                                className="px-2 py-1 text-gray-600 hover:text-glam-purple transition-colors"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10) || 1)}
                                className="w-12 text-center border-0 focus-visible:ring-0"
                              />
                              <button 
                                className="px-2 py-1 text-gray-600 hover:text-glam-purple transition-colors"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <button 
                              className="text-gray-500 hover:text-red-500 transition-colors"
                              onClick={() => removeItem(item.id)}
                              aria-label="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0 text-right sm:ml-4">
                          <span className="font-semibold">RS {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>RS {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>RS {totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-glam-purple hover:bg-glam-purple-dark">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <div className="text-center mt-4">
                      <Link to="/products" className="text-glam-purple hover:text-glam-purple-dark text-sm">
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
