import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'Классическая футболка', price: 2500, category: 'Одежда', image: 'https://cdn.poehali.dev/projects/9a95673a-e649-4022-86d5-8cc00db4db3f/files/db255660-93ed-49f0-b367-3db15930d798.jpg' },
  { id: 2, name: 'Черные джинсы', price: 4500, category: 'Одежда', image: 'https://cdn.poehali.dev/projects/9a95673a-e649-4022-86d5-8cc00db4db3f/files/3f179525-2e13-45c5-b50d-29300683988b.jpg' },
  { id: 3, name: 'Кожаная сумка', price: 8500, category: 'Аксессуары', image: 'https://cdn.poehali.dev/projects/9a95673a-e649-4022-86d5-8cc00db4db3f/files/89347c68-bd08-4318-8f88-2a6a3229a57d.jpg' },
  { id: 4, name: 'Минималист рубашка', price: 3500, category: 'Одежда', image: 'https://cdn.poehali.dev/projects/9a95673a-e649-4022-86d5-8cc00db4db3f/files/db255660-93ed-49f0-b367-3db15930d798.jpg' },
  { id: 5, name: 'Повседневные брюки', price: 4000, category: 'Одежда', image: 'https://cdn.poehali.dev/projects/9a95673a-e649-4022-86d5-8cc00db4db3f/files/3f179525-2e13-45c5-b50d-29300683988b.jpg' },
  { id: 6, name: 'Кошелек', price: 2000, category: 'Аксессуары', image: 'https://cdn.poehali.dev/projects/9a95673a-e649-4022-86d5-8cc00db4db3f/files/89347c68-bd08-4318-8f88-2a6a3229a57d.jpg' },
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'cart' | 'checkout' | 'delivery' | 'contacts'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const categories = ['Все', 'Одежда', 'Аксессуары'];
  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/10 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">ONLINE STORE</h1>
            
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setCurrentPage('home')} 
                className={`text-sm tracking-wide hover:opacity-60 transition-opacity ${currentPage === 'home' ? 'font-semibold' : ''}`}
              >
                Главная
              </button>
              <button 
                onClick={() => setCurrentPage('catalog')} 
                className={`text-sm tracking-wide hover:opacity-60 transition-opacity ${currentPage === 'catalog' ? 'font-semibold' : ''}`}
              >
                Каталог
              </button>
              <button 
                onClick={() => setCurrentPage('delivery')} 
                className={`text-sm tracking-wide hover:opacity-60 transition-opacity ${currentPage === 'delivery' ? 'font-semibold' : ''}`}
              >
                Доставка и оплата
              </button>
              <button 
                onClick={() => setCurrentPage('contacts')} 
                className={`text-sm tracking-wide hover:opacity-60 transition-opacity ${currentPage === 'contacts' ? 'font-semibold' : ''}`}
              >
                Контакты
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Search" size={20} />
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-8 flex flex-col h-full">
                    {cart.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        Корзина пуста
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-auto space-y-4">
                          {cart.map(item => (
                            <div key={item.id} className="flex gap-4">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-6 w-6"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={12} />
                                  </Button>
                                  <span className="text-sm w-8 text-center">{item.quantity}</span>
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-6 w-6"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={12} />
                                  </Button>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t pt-4 space-y-4">
                          <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Итого:</span>
                            <span>{getTotalPrice().toLocaleString()} ₽</span>
                          </div>
                          <Button 
                            className="w-full" 
                            size="lg"
                            onClick={() => setCurrentPage('checkout')}
                          >
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main>
        {currentPage === 'home' && (
          <div>
            <section className="py-20 md:py-32 border-b border-black/10">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                  <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    Минимализм<br />в каждой детали
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                    Коллекция одежды и аксессуаров для тех, кто ценит качество и стиль
                  </p>
                  <Button size="lg" onClick={() => setCurrentPage('catalog')}>
                    Смотреть каталог
                  </Button>
                </div>
              </div>
            </section>

            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-3xl font-bold">Популярные товары</h3>
                  <Button variant="ghost" onClick={() => setCurrentPage('catalog')}>
                    Все товары
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {products.slice(0, 3).map(product => (
                    <Card key={product.id} className="overflow-hidden group cursor-pointer hover-scale">
                      <div className="aspect-square overflow-hidden bg-secondary">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <Badge variant="secondary" className="mb-3">{product.category}</Badge>
                        <h4 className="font-semibold mb-2">{product.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">{product.price.toLocaleString()} ₽</span>
                          <Button size="sm" onClick={() => addToCart(product)}>
                            Добавить
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'catalog' && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-8">Каталог</h2>
              
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden group cursor-pointer hover-scale">
                    <div className="aspect-square overflow-hidden bg-secondary">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-3">{product.category}</Badge>
                      <h4 className="font-semibold mb-2">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{product.price.toLocaleString()} ₽</span>
                        <Button size="sm" onClick={() => addToCart(product)}>
                          Добавить
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentPage === 'checkout' && (
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-2xl">
              <h2 className="text-4xl font-bold mb-8">Оформление заказа</h2>
              
              <Card className="p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Ваш заказ</h3>
                <div className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-medium">{(item.price * item.quantity).toLocaleString()} ₽</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span>{getTotalPrice().toLocaleString()} ₽</span>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Контактные данные</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="ivan@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" placeholder="+7 (900) 000-00-00" />
                  </div>
                  <div>
                    <Label htmlFor="address">Адрес доставки</Label>
                    <Textarea id="address" placeholder="Улица, дом, квартира" />
                  </div>
                  <Button className="w-full" size="lg">
                    Подтвердить заказ
                  </Button>
                </div>
              </Card>
            </div>
          </section>
        )}

        {currentPage === 'delivery' && (
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-4xl font-bold mb-8">Доставка и оплата</h2>
              
              <div className="space-y-8">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-black text-white p-3 rounded">
                      <Icon name="Truck" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Доставка</h3>
                      <p className="text-muted-foreground mb-2">
                        Доставка по Москве — бесплатно при заказе от 5000 ₽
                      </p>
                      <p className="text-muted-foreground">
                        Доставка по России — от 350 ₽, срок 3-7 дней
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-black text-white p-3 rounded">
                      <Icon name="CreditCard" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Оплата</h3>
                      <p className="text-muted-foreground mb-2">
                        Принимаем карты Visa, Mastercard, МИР
                      </p>
                      <p className="text-muted-foreground">
                        Оплата при получении для заказов по Москве
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-black text-white p-3 rounded">
                      <Icon name="RefreshCw" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Возврат</h3>
                      <p className="text-muted-foreground">
                        Возврат товара в течение 14 дней без объяснения причин
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'contacts' && (
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-4xl font-bold mb-8">Контакты</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <Icon name="Phone" size={24} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Телефон</h3>
                  <p className="text-muted-foreground mb-1">+7 (495) 000-00-00</p>
                  <p className="text-sm text-muted-foreground">Ежедневно с 10:00 до 21:00</p>
                </Card>

                <Card className="p-6">
                  <Icon name="Mail" size={24} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground mb-1">info@onlinestore.ru</p>
                  <p className="text-sm text-muted-foreground">Ответим в течение 24 часов</p>
                </Card>

                <Card className="p-6">
                  <Icon name="MapPin" size={24} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Адрес</h3>
                  <p className="text-muted-foreground mb-1">г. Москва, ул. Примерная, 1</p>
                  <p className="text-sm text-muted-foreground">Шоу-рум работает по записи</p>
                </Card>

                <Card className="p-6">
                  <Icon name="Clock" size={24} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Режим работы</h3>
                  <p className="text-muted-foreground mb-1">Пн-Пт: 10:00 - 21:00</p>
                  <p className="text-sm text-muted-foreground">Сб-Вс: 11:00 - 20:00</p>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-black/10 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">ONLINE STORE</h3>
              <p className="text-sm text-muted-foreground">
                Минималистичная одежда и аксессуары для современных людей
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <div className="space-y-2 text-sm">
                <button onClick={() => setCurrentPage('catalog')} className="block hover:opacity-60">
                  Каталог
                </button>
                <button onClick={() => setCurrentPage('delivery')} className="block hover:opacity-60">
                  Доставка
                </button>
                <button onClick={() => setCurrentPage('contacts')} className="block hover:opacity-60">
                  Контакты
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Соцсети</h4>
              <div className="flex gap-4">
                <Button variant="outline" size="icon">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Facebook" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Online Store. Все права защищены
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;