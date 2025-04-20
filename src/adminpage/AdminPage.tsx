
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Eye, MessageSquare, Package } from 'lucide-react';

// Interfaces
interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Sample data for development
const sampleProducts: Product[] = [
  {
    _id: '1',
    name: 'Diamond Necklace',
    price: 1299,
    image: '/placeholder.svg',
    description: 'Beautiful diamond necklace with 24k gold chain',
    category: 'necklaces',
    stock: 5
  },
  {
    _id: '2',
    name: 'Pearl Earrings',
    price: 599,
    image: '/placeholder.svg',
    description: 'Elegant pearl earrings with silver accents',
    category: 'earrings',
    stock: 12
  },
  {
    _id: '3',
    name: 'Gold Bracelet',
    price: 899,
    image: '/placeholder.svg',
    description: 'Luxury gold bracelet with diamond studs',
    category: 'bracelets',
    stock: 8
  }
];

const sampleMessages: ContactMessage[] = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Order Inquiry',
    message: 'I would like to know about the availability of the diamond necklace.',
    createdAt: new Date().toISOString(),
    status: 'new'
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Custom Order',
    message: 'Can you create a custom design for a wedding ring?',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: 'read'
  },
  {
    _id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    subject: 'Return Policy',
    message: 'What is your return policy for earrings?',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    status: 'replied'
  }
];

const Admin: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image: null as File | null
  });
  const [activeSection, setActiveSection] = useState<'products' | 'messages'>('products');

  useEffect(() => {
    if (!isAuthenticated || (user as User)?.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchMessages();
    fetchProducts();
  }, [isAuthenticated, user, navigate]);

  const fetchMessages = async () => {
    setIsMessagesLoading(true);
    setMessagesError(null);
    try {
      // Simulate API call with mock data
      // In a real app, this would be a fetch call to your backend
      setTimeout(() => {
        setMessages(sampleMessages);
        setIsMessagesLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessagesError(error instanceof Error ? error.message : 'Failed to load messages');
      toast({
        title: 'Error',
        description: 'Failed to load messages. Please try again.',
        variant: 'destructive',
      });
      setIsMessagesLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      // Simulate API call with mock data
      // In a real app, this would be a fetch call to your backend
      setTimeout(() => {
        setProducts(sampleProducts);
      }, 500);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate form data
      if (!formData.name || !formData.price || !formData.description || !formData.category || !formData.stock) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in all required fields',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      
      // Simulate API call for saving product
      // In a real app, this would be a fetch call to your backend
      setTimeout(() => {
        if (selectedProduct) {
          // Update existing product
          const updatedProducts = products.map(p => 
            p._id === selectedProduct._id 
              ? { 
                  ...p, 
                  name: formData.name,
                  price: parseFloat(formData.price),
                  description: formData.description,
                  category: formData.category,
                  stock: parseInt(formData.stock)
                } 
              : p
          );
          setProducts(updatedProducts);
        } else {
          // Add new product
          const newProduct: Product = {
            _id: Date.now().toString(),
            name: formData.name,
            price: parseFloat(formData.price),
            description: formData.description,
            category: formData.category,
            stock: parseInt(formData.stock),
            image: '/placeholder.svg'
          };
          setProducts([...products, newProduct]);
        }
        
        resetForm();
        toast({
          title: 'Success',
          description: `Product ${selectedProduct ? 'updated' : 'added'} successfully`,
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save product. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      stock: product.stock.toString(),
      image: null
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      // Simulate API call for deleting product
      // In a real app, this would be a fetch call to your backend
      setTimeout(() => {
        setProducts(products.filter(p => p._id !== id));
        toast({
          title: 'Success',
          description: 'Product deleted successfully',
        });
      }, 500);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete product. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      stock: '',
      image: null
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const updateMessageStatus = async (messageId: string, status: 'read' | 'replied') => {
    try {
      // Simulate API call for updating message status
      // In a real app, this would be a fetch call to your backend
      setTimeout(() => {
        setMessages(messages.map(msg => 
          msg._id === messageId ? { ...msg, status } : msg
        ));
        
        toast({
          title: 'Success',
          description: 'Message status updated',
        });
      }, 300);
    } catch (error) {
      console.error('Error updating message status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update message status',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      // Simulate API call for deleting message
      // In a real app, this would be a fetch call to your backend
      setTimeout(() => {
        setMessages(messages.filter(msg => msg._id !== messageId));
        
        toast({
          title: 'Success',
          description: 'Message deleted successfully',
        });
      }, 300);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive',
      });
    }
  };

  if (!isAuthenticated || (user as User)?.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10">
        <h1 className="text-xl font-bold">Jewelry Admin Dashboard</h1>
        <Button variant="ghost" onClick={handleLogout}>Logout</Button>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 pt-14 fixed h-full">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
          <nav className="space-y-2">
            <Button
              variant={activeSection === 'products' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveSection('products');
                fetchProducts();
              }}
            >
              <Package className="h-4 w-4 mr-2" />
              Manage Products
            </Button>
            <Button
              variant={activeSection === 'messages' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveSection('messages');
                fetchMessages();
              }}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              View Messages
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-14 pl-64">
        <div className="p-8">
          {activeSection === 'products' ? (
            <>
              {/* Product Management Form */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>
                    {selectedProduct ? 'Edit Product' : 'Add New Product'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select a category</option>
                          <option value="necklaces">Necklaces</option>
                          <option value="earrings">Earrings</option>
                          <option value="bracelets">Bracelets</option>
                          <option value="rings">Rings</option>
                          <option value="pendants">Pendants</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          value={formData.stock}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          rows={4}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="image">Image</Label>
                        <Input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          disabled={isLoading}
                        />
                        {selectedProduct && formData.image === null && (
                          <p className="text-sm text-gray-500 mt-1">
                            Current image: {selectedProduct.image}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {selectedProduct ? 'Updating...' : 'Adding...'}
                          </span>
                        ) : (
                          selectedProduct ? 'Update Product' : 'Add Product'
                        )}
                      </Button>
                      {selectedProduct && (
                        <Button type="button" variant="outline" onClick={resetForm} disabled={isLoading}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Products Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>RS {product.price}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(product)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(product._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {isMessagesLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                ) : messagesError ? (
                  <div className="text-center py-8 text-red-600">
                    <p>{messagesError}</p>
                    <Button 
                      variant="outline" 
                      onClick={fetchMessages}
                      className="mt-4"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No messages found
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messages.map((message) => (
                        <TableRow key={message._id}>
                          <TableCell>
                            <div className="flex items-center">
                              {message.status === 'new' ? (
                                <span className="flex items-center text-blue-600">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                                  New
                                </span>
                              ) : message.status === 'read' ? (
                                <span className="flex items-center text-gray-600">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Read
                                </span>
                              ) : (
                                <span className="flex items-center text-green-600">
                                  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Replied
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{message.name}</TableCell>
                          <TableCell>{message.subject}</TableCell>
                          <TableCell>
                            {new Date(message.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center"
                                  onClick={() => {
                                    setSelectedMessage(message);
                                    if (message.status === 'new') {
                                      updateMessageStatus(message._id, 'read');
                                    }
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Message Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>From</Label>
                                      <p className="mt-1">{message.name}</p>
                                    </div>
                                    <div>
                                      <Label>Email</Label>
                                      <p className="mt-1">{message.email}</p>
                                    </div>
                                    <div className="col-span-2">
                                      <Label>Subject</Label>
                                      <p className="mt-1">{message.subject}</p>
                                    </div>
                                    <div className="col-span-2">
                                      <Label>Message</Label>
                                      <p className="mt-1 whitespace-pre-wrap">{message.message}</p>
                                    </div>
                                    <div className="col-span-2">
                                      <Label>Received</Label>
                                      <p className="mt-1">
                                        {new Date(message.createdAt).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`;
                                        updateMessageStatus(message._id, 'replied');
                                      }}
                                    >
                                      Reply via Email
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() => handleDeleteMessage(message._id)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
