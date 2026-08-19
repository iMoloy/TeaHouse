import { Router, Request, Response } from 'express';
import { Product } from '../models/Product.js';

const router = Router();

// Initial Fallback Products Data if DB is empty
const fallbackProducts = [
  {
    _id: "1",
    name: "Milk Tea",
    category: "milk-tea",
    categoryLabel: "Milk Tea",
    price: 4.50,
    rating: 4.9,
    reviewsCount: 128,
    image: "./images/tea-1.png",
    description: "Rich black tea infused with creamy whole milk and natural cane sugar.",
    ingredients: ["Ceylon Black Tea", "Fresh Creamer Milk", "Boba Pearls", "Cane Sugar Syrup"],
    isFeatured: true
  },
  {
    _id: "2",
    name: "Black Tea",
    category: "black-tea",
    categoryLabel: "Black Tea",
    price: 3.80,
    rating: 4.8,
    reviewsCount: 94,
    image: "./images/tea-2.png",
    description: "Pure organic high-mountain black tea leaves brewed to perfection.",
    ingredients: ["Organic Black Tea Leaves", "Spring Water", "Lemon Twist"],
    isFeatured: true
  },
  {
    _id: "3",
    name: "Lemon Tea",
    category: "lemon-tea",
    categoryLabel: "Lemon Tea",
    price: 4.20,
    rating: 4.7,
    reviewsCount: 86,
    image: "./images/tea-3.png",
    description: "Zesty freshly squeezed lemons combined with crisp iced tea and blossom honey.",
    ingredients: ["Fresh Meyer Lemons", "Crisp Jasmine Green Tea", "Raw Wild Honey"],
    isFeatured: true
  },
  {
    _id: "4",
    name: "Green Tea",
    category: "green-tea",
    categoryLabel: "Green Tea",
    price: 4.00,
    rating: 4.9,
    reviewsCount: 150,
    image: "./images/tea-4.png",
    description: "Premium Japanese Matcha-infused green tea packed with antioxidants.",
    ingredients: ["Uji Matcha Powder", "Steeped Sencha Green Tea", "Purified Water"],
    isFeatured: true
  }
];

// GET All Products (with optional category & search filter)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    let filter: any = {};

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { description: { $regex: search as string, $options: 'i' } }
      ];
    }

    const products = await Product.find(filter).exec();
    if (!products || products.length === 0) {
      return res.json(fallbackProducts);
    }
    return res.json(products);
  } catch (error) {
    return res.json(fallbackProducts);
  }
});

// GET Product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const fb = fallbackProducts.find(p => p._id === req.params.id);
      return res.status(fb ? 200 : 404).json(fb || { message: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    const fb = fallbackProducts.find(p => p._id === req.params.id);
    return res.status(fb ? 200 : 500).json(fb || { error: (error as Error).message });
  }
});

// POST Create New Product (Admin)
router.post('/', async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

// PUT Update Product by ID (Admin)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

// DELETE Product by ID (Admin)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    return res.json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
