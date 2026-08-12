/**
 * Central Data Store for Tea House Application
 */

const productsData = [
  {
    id: 1,
    name: "Milk Tea",
    category: "milk-tea",
    categoryLabel: "Milk Tea",
    price: 4.50,
    rating: 4.9,
    reviewsCount: 128,
    image: "./images/tea-1.png",
    description: "Rich black tea infused with creamy whole milk and natural cane sugar. A classic favorite for everyday refreshment.",
    ingredients: ["Ceylon Black Tea", "Fresh Creamer Milk", "Boba Pearls", "Cane Sugar Syrup"],
    isFeatured: true
  },
  {
    id: 2,
    name: "Black Tea",
    category: "black-tea",
    categoryLabel: "Black Tea",
    price: 3.80,
    rating: 4.8,
    reviewsCount: 94,
    image: "./images/tea-2.png",
    description: "Pure organic high-mountain black tea leaves brewed to perfection with robust aroma and deep malt notes.",
    ingredients: ["Organic Black Tea Leaves", "Spring Water", "Optional Lemon Twist"],
    isFeatured: true
  },
  {
    id: 3,
    name: "Lemon Tea",
    category: "lemon-tea",
    categoryLabel: "Lemon Tea",
    price: 4.20,
    rating: 4.7,
    reviewsCount: 86,
    image: "./images/tea-3.png",
    description: "Zesty freshly squeezed lemons combined with crisp iced tea and wild blossom honey for a vitamin C boost.",
    ingredients: ["Fresh Meyer Lemons", "Crisp Jasmine Green Tea", "Raw Wild Honey", "Ice Cubes"],
    isFeatured: true
  },
  {
    id: 4,
    name: "Green Tea",
    category: "green-tea",
    categoryLabel: "Green Tea",
    price: 4.00,
    rating: 4.9,
    reviewsCount: 150,
    image: "./images/tea-4.png",
    description: "Premium Japanese Matcha-infused green tea packed with antioxidants and a smooth, earthy taste profile.",
    ingredients: ["Uji Matcha Powder", "Steeped Sencha Green Tea", "Purified Water"],
    isFeatured: true
  },
  {
    id: 5,
    name: "Boba Milk Fusion",
    category: "milk-tea",
    categoryLabel: "Milk Tea",
    price: 5.20,
    rating: 5.0,
    reviewsCount: 210,
    image: "./images/fresh-2.png",
    description: "Chewy tapioca boba pearls immersed in rich brown sugar syrup and velvety iced matcha milk tea.",
    ingredients: ["Handcrafted Tapioca Pearls", "Brown Sugar Glaze", "Full Cream Milk", "Matcha Blend"],
    isFeatured: false
  },
  {
    id: 6,
    name: "Tropical Citrus Tea",
    category: "lemon-tea",
    categoryLabel: "Lemon Tea",
    price: 4.80,
    rating: 4.8,
    reviewsCount: 75,
    image: "./images/fresh-1.png",
    description: "A vibrant blend of fresh passion fruit, slices of orange, and zesty lemon over chilled Earl Grey tea.",
    ingredients: ["Passion Fruit Juice", "Sliced Oranges", "Lemon Juice", "Earl Grey Base"],
    isFeatured: false
  }
];

const testimonialsData = [
  {
    id: 1,
    name: "Ilham Yuda",
    role: "Businessman",
    avatar: "./images/client.png",
    comment: "We are providing the best and most suitable tea products for customer needs. The milk tea here is absolutely phenomenal and consistent every single visit!",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Food Critic & Blogger",
    avatar: "./images/client.png",
    comment: "The Tea House offers an unmatched ambiance paired with raw organic ingredients. The Lemon Iced Tea is my daily afternoon reset standard.",
    rating: 5
  },
  {
    id: 3,
    name: "Tanvir Hossain",
    role: "Software Engineer",
    avatar: "./images/client.png",
    comment: "Great user experience, fast service, and the boba textures are spot on. Their green tea matcha blend gives me clean energy all day.",
    rating: 5
  }
];

const newsData = [
  {
    id: 1,
    date: "Feb 12, 2027",
    author: "Tea House Team",
    title: "Collecting 8 points for discount",
    excerpt: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    content: "Earn loyalty points with every cup purchased! Accumulate 8 points to unlock a 25% discount coupon or get a free seasonal topping on your next order. Join our rewards community today through our online ordering portal.",
    image: "./images/news-1.png"
  },
  {
    id: 2,
    date: "Feb 15, 2027",
    author: "Master Brewer",
    title: "The Art of Cold Brew Matcha",
    excerpt: "Discover how slow cold steeping brings out the subtle sweetness and rich antioxidants of organic high-grade tea leaves.",
    content: "Cold brewing tea extracts rich flavors without harsh tannins. By steeping Sencha and Uji Matcha leaves in filtered water for 12 hours at low temperature, we achieve a velvety texture and naturally sweet finish.",
    image: "./images/news-2.png"
  },
  {
    id: 3,
    date: "Feb 18, 2027",
    author: "Sustainability Director",
    title: "Eco-Friendly & Zero Waste Tea Cups",
    excerpt: "We are proud to introduce 100% biodegradable cornstarch cups and plant-based straws across all Tea House branches.",
    content: "Protecting nature is at the heart of our mission. All packaging materials used at The Tea House are now compostable within 90 days. Enjoy your favorite tea knowing you are supporting a cleaner, greener planet.",
    image: "./images/news-3.png"
  }
];
