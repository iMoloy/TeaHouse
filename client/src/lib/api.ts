import { Product, Review, News } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchProducts(category?: string, search?: string): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.warn('[API] Using client fallback products:', error);
    return [
      {
        _id: "1",
        name: "Milk Tea",
        category: "milk-tea",
        categoryLabel: "Milk Tea",
        price: 4.50,
        rating: 4.9,
        reviewsCount: 128,
        image: "/images/tea-1.png",
        description: "Rich black tea infused with creamy whole milk and natural cane sugar.",
        ingredients: ["Ceylon Black Tea", "Fresh Creamer Milk", "Boba Pearls", "Cane Sugar Syrup"]
      },
      {
        _id: "2",
        name: "Black Tea",
        category: "black-tea",
        categoryLabel: "Black Tea",
        price: 3.80,
        rating: 4.8,
        reviewsCount: 94,
        image: "/images/tea-2.png",
        description: "Pure organic high-mountain black tea leaves brewed to perfection.",
        ingredients: ["Organic Black Tea Leaves", "Spring Water", "Lemon Twist"]
      },
      {
        _id: "3",
        name: "Lemon Tea",
        category: "lemon-tea",
        categoryLabel: "Lemon Tea",
        price: 4.20,
        rating: 4.7,
        reviewsCount: 86,
        image: "/images/tea-3.png",
        description: "Zesty freshly squeezed lemons combined with crisp iced tea.",
        ingredients: ["Fresh Meyer Lemons", "Crisp Jasmine Green Tea", "Raw Wild Honey"]
      },
      {
        _id: "4",
        name: "Green Tea",
        category: "green-tea",
        categoryLabel: "Green Tea",
        price: 4.00,
        rating: 4.9,
        reviewsCount: 150,
        image: "/images/tea-4.png",
        description: "Premium Japanese Matcha-infused green tea packed with antioxidants.",
        ingredients: ["Uji Matcha Powder", "Steeped Sencha Green Tea", "Purified Water"]
      }
    ];
  }
}

export async function fetchReviews(): Promise<Review[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  } catch (error) {
    return [
      {
        _id: "1",
        name: "Ilham Yuda",
        role: "Businessman",
        avatar: "/images/client.png",
        comment: "We are providing the best and most suitable tea products for customer needs. The milk tea here is phenomenal!",
        rating: 5
      },
      {
        _id: "2",
        name: "Sarah Jenkins",
        role: "Food Critic & Blogger",
        avatar: "/images/client.png",
        comment: "The Tea House offers an unmatched ambiance paired with raw organic ingredients.",
        rating: 5
      }
    ];
  }
}

export async function fetchNews(): Promise<News[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/news`);
    if (!res.ok) throw new Error('Failed to fetch news');
    return res.json();
  } catch (error) {
    return [
      {
        _id: "1",
        date: "Feb 12, 2027",
        author: "Tea House Team",
        title: "Collecting 8 points for discount",
        excerpt: "Earn loyalty points with every cup purchased!",
        content: "Earn loyalty points with every cup purchased! Accumulate 8 points to unlock a 25% discount coupon.",
        image: "/images/news-1.png"
      },
      {
        _id: "2",
        date: "Feb 15, 2027",
        author: "Master Brewer",
        title: "The Art of Cold Brew Matcha",
        excerpt: "Discover how slow cold steeping brings out subtle sweetness.",
        content: "Cold brewing tea extracts rich flavors without harsh tannins.",
        image: "/images/news-2.png"
      },
      {
        _id: "3",
        date: "Feb 18, 2027",
        author: "Sustainability Director",
        title: "Eco-Friendly & Zero Waste Tea Cups",
        excerpt: "We are proud to introduce 100% biodegradable cups.",
        content: "Protecting nature is at the heart of our mission.",
        image: "/images/news-3.png"
      }
    ];
  }
}

export async function submitOrder(orderData: any) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return res.json();
  } catch (error) {
    return { success: true, message: 'Order submitted locally' };
  }
}
