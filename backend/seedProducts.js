const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const products = [
  {
    name: "Super Hero Action Figure",
    description: "Detailed action figure with multiple points of articulation. Perfect for imaginative play!",
    price: 1299,
    category: "Action Figures",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500",
    stock: 25,
    ageRange: "5-12 years",
    rating: 4.5
  },
  {
    name: "Princess Doll Collection",
    description: "Beautiful princess doll with elegant dress and accessories. Great for storytelling!",
    price: 899,
    category: "Dolls",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    stock: 30,
    ageRange: "3-10 years",
    rating: 4.7
  },
  {
    name: "Educational Building Blocks",
    description: "100-piece colorful building blocks set. Develops creativity and motor skills.",
    price: 1499,
    category: "Educational",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500",
    stock: 40,
    ageRange: "3-8 years",
    rating: 4.8
  },
  {
    name: "Racing Car Set",
    description: "High-speed racing cars with track. Includes 2 cars and accessories.",
    price: 2499,
    category: "Vehicles",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    stock: 15,
    ageRange: "4-10 years",
    rating: 4.6
  },
  {
    name: "Teddy Bear Plush",
    description: "Soft and cuddly teddy bear. Perfect companion for kids!",
    price: 699,
    category: "Plush Toys",
    image: "https://images.unsplash.com/photo-1551361415-69c87624334f?w=500",
    stock: 50,
    ageRange: "0-10 years",
    rating: 4.9
  },
  {
    name: "Board Game - Family Fun",
    description: "Exciting board game for the whole family. 2-6 players.",
    price: 1799,
    category: "Board Games",
    image: "https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=500",
    stock: 20,
    ageRange: "8+ years",
    rating: 4.5
  },
  {
    name: "Robot Transformer",
    description: "Transforming robot toy that changes from car to robot. Amazing detail!",
    price: 1999,
    category: "Action Figures",
    image: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?w=500",
    stock: 18,
    ageRange: "6-14 years",
    rating: 4.7
  },
  {
    name: "Barbie Fashion Doll",
    description: "Fashionable doll with trendy outfits and accessories.",
    price: 1099,
    category: "Dolls",
    image: "https://images.unsplash.com/photo-1560582861-45078880e48e?w=500",
    stock: 35,
    ageRange: "3-12 years",
    rating: 4.6
  },
  {
    name: "STEM Science Kit",
    description: "Complete science experiment kit. Learn while having fun!",
    price: 2999,
    category: "Educational",
    image: "https://images.unsplash.com/photo-1581093458791-9d42e1d0b12d?w=500",
    stock: 12,
    ageRange: "8-14 years",
    rating: 4.9
  },
  {
    name: "Remote Control Helicopter",
    description: "Easy-to-fly RC helicopter with LED lights. Indoor/outdoor use.",
    price: 3499,
    category: "Vehicles",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
    stock: 10,
    ageRange: "10+ years",
    rating: 4.4
  },
  {
    name: "Unicorn Plush Toy",
    description: "Magical unicorn plush with rainbow mane. Super soft!",
    price: 799,
    category: "Plush Toys",
    image: "https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?w=500",
    stock: 45,
    ageRange: "3-10 years",
    rating: 4.8
  },
  {
    name: "Chess Set - Deluxe Edition",
    description: "Premium wooden chess set with folding board. Learn strategic thinking!",
    price: 2299,
    category: "Board Games",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=500",
    stock: 8,
    ageRange: "7+ years",
    rating: 4.7
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/toystore');
    
    console.log('MongoDB Connected');


    await Product.deleteMany();
    console.log('Products cleared');

    await Product.insertMany(products);
    console.log('Sample products added');

    const userExists = await User.findOne({ email: 'demo@toystore.com' });
    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('demo123', salt);
      
      await User.create({
        name: 'Demo User',
        email: 'demo@toystore.com',
        password: hashedPassword
      });
      console.log('Demo user created');
    }

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();