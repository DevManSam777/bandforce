const products = [
  // Individual Resistance Bands
  {
    name: 'BandForce Light Resistance Band - Orange',
    image: '/images/band-light-orange-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Perfect for beginners, rehabilitation, or warm-up exercises. Safe for all fitness levels. Premium latex-free TPE rubber. 41" x 0.25" x 4.5mm. Resistance Range: 2-10 lbs.',
    price: 12.99,
    countInStock: 50,
    rating: 4.5,
    numReviews: 8,
    images: [
      { url: '/images/band-light-orange-01.jpg', alt: 'Light Orange Band' }
    ]
  },
  {
    name: 'BandForce Medium Resistance Band - Red',
    image: '/images/band-medium-red-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Ideal for general strength training and muscle toning. Most popular choice. Premium latex-free TPE rubber. 41" x 0.5" x 4.5mm. Resistance Range: 5-25 lbs.',
    price: 15.99,
    countInStock: 60,
    rating: 4.7,
    numReviews: 15,
    images: [
      { url: '/images/band-medium-red-01.jpg', alt: 'Medium Red Band' }
    ]
  },
  {
    name: 'BandForce Heavy Resistance Band - Blue',
    image: '/images/band-heavy-blue-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'For advanced training and muscle building. Thicker construction for durability. Premium latex-free TPE rubber. 41" x 0.5" x 6mm. Resistance Range: 10-35 lbs.',
    price: 18.99,
    countInStock: 45,
    rating: 4.6,
    numReviews: 12,
    images: [
      { url: '/images/band-heavy-blue-01.jpg', alt: 'Heavy Blue Band' }
    ]
  },
  {
    name: 'BandForce Extra Heavy Resistance Band - Green',
    image: '/images/band-xlheavy-green-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Advanced training band with wider profile for serious strength athletes. Premium latex-free TPE rubber. 41" x 1.25" x 4.5mm. Resistance Range: 30-50 lbs.',
    price: 22.99,
    countInStock: 35,
    rating: 4.8,
    numReviews: 10,
    images: [
      { url: '/images/band-xlheavy-green-01.jpg', alt: 'Extra Heavy Green Band' }
    ]
  },
  {
    name: 'BandForce XX Heavy Resistance Band - Black',
    image: '/images/band-xxheavy-black-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Professional-grade band for serious strength athletes and advanced training. Premium latex-free TPE rubber. 41" x 1.75" x 4.5mm. Resistance Range: 50-85 lbs.',
    price: 26.99,
    countInStock: 30,
    rating: 4.9,
    numReviews: 9,
    images: [
      { url: '/images/band-xxheavy-black-01.jpg', alt: 'XX Heavy Black Band' }
    ]
  },
  {
    name: 'BandForce Maximum Resistance Band - Purple',
    image: '/images/band-max-purple-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Elite level band for powerlifting and maximum strength training. Premium latex-free TPE rubber. 41" x 2.25" x 4.5mm. Resistance Range: 80-100 lbs.',
    price: 29.99,
    countInStock: 25,
    rating: 5,
    numReviews: 7,
    images: [
      { url: '/images/band-max-purple-01.jpg', alt: 'Maximum Purple Band' }
    ]
  },

  // Mini Loop Resistance Bands
  {
    name: 'BandForce Mini Loop Band - Red',
    image: '/images/mini-loop-red-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Compact loop bands perfect for belt squats, glute drives, and leg exercises. 12" x 0.5" x 4.5mm. Resistance Range: 20-40 lbs. Premium latex-free TPE rubber.',
    price: 10.99,
    countInStock: 70,
    rating: 4.6,
    numReviews: 14,
    images: [
      { url: '/images/mini-loop-red-01.jpg', alt: 'Mini Loop Red Band' },
      { url: '/images/mini-loop-set-01.jpg', alt: 'Mini Loop Set' }
    ]
  },
  {
    name: 'BandForce Mini Loop Band - Blue',
    image: '/images/mini-loop-blue-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Great for intermediate strength training and leg workouts. 12" x 0.75" x 4.5mm. Resistance Range: 30-70 lbs. Premium latex-free TPE rubber.',
    price: 12.99,
    countInStock: 65,
    rating: 4.5,
    numReviews: 11,
    images: [
      { url: '/images/mini-loop-blue-01.jpg', alt: 'Mini Loop Blue Band' },
      { url: '/images/mini-loop-set-01.jpg', alt: 'Mini Loop Set' }
    ]
  },
  {
    name: 'BandForce Mini Loop Band - Green',
    image: '/images/mini-loop-green-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Heavy resistance mini loop for advanced lower body training. 12" x 1.25" x 4.5mm. Resistance Range: 50-110 lbs. Premium latex-free TPE rubber.',
    price: 14.99,
    countInStock: 55,
    rating: 4.7,
    numReviews: 9,
    images: [
      { url: '/images/mini-loop-green-01.jpg', alt: 'Mini Loop Green Band' },
      { url: '/images/mini-loop-set-01.jpg', alt: 'Mini Loop Set' }
    ]
  },
  {
    name: 'BandForce Mini Loop Band - Black',
    image: '/images/mini-loop-black-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Extra heavy mini loop for serious strength athletes. 12" x 1.75" x 4.5mm. Resistance Range: 70-150 lbs. Premium latex-free TPE rubber.',
    price: 16.99,
    countInStock: 45,
    rating: 4.8,
    numReviews: 8,
    images: [
      { url: '/images/mini-loop-black-01.jpg', alt: 'Mini Loop Black Band' },
      { url: '/images/mini-loop-set-01.jpg', alt: 'Mini Loop Set' }
    ]
  },
  {
    name: 'BandForce Mini Loop Band - Purple',
    image: '/images/mini-loop-purple-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Maximum resistance mini loop for elite powerlifting. 12" x 2.5" x 4.5mm. Resistance Range: 120-230 lbs. Premium latex-free TPE rubber.',
    price: 18.99,
    countInStock: 35,
    rating: 5,
    numReviews: 6,
    images: [
      { url: '/images/mini-loop-purple-01.jpg', alt: 'Mini Loop Purple Band' },
      { url: '/images/mini-loop-set-01.jpg', alt: 'Mini Loop Set' }
    ]
  },

  // Band Sets
  {
    name: 'BandForce Mini Loop Band Set (5-pack)',
    image: '/images/mini-loop-set-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Complete mini loop set with 5 color-coded resistance levels. Perfect for belt squats, glute drives, deadlifts, and leg exercises. 12" length. Red (20-40 lbs), Blue (30-70 lbs), Green (50-110 lbs), Black (70-150 lbs), Purple (120-230 lbs). Shorter length for easier setup and portability.',
    price: 59.99,
    countInStock: 45,
    rating: 4.8,
    numReviews: 16,
    images: [
      { url: '/images/mini-loop-set-01.jpg', alt: 'Mini Loop Band Set' }
    ]
  },
  {
    name: 'BandForce Power Band Set - 7 Pack (All Resistances)',
    image: '/images/set-powerband-multicolor-01.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Complete power band set with all 7 color-coded resistance levels for maximum versatility. Orange (2-10 lbs), Red (5-25 lbs), Blue (10-35 lbs), Green (30-50 lbs), Black (50-85 lbs), Purple (80-100 lbs), Grey (100-200 lbs). 41" length. Perfect for strength training, flexibility, and body weight exercises.',
    price: 99.99,
    countInStock: 38,
    rating: 4.7,
    numReviews: 13,
    images: [
      { url: '/images/set-powerband-multicolor-01.jpg', alt: 'Power Band 7-Pack Set' }
    ]
  },

  // Accessories
  {
    name: 'BandForce Door Anchor',
    image: '/images/anchor.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Heavy-duty nylon anchor fits any standard door. Enables upper body and core exercises. Reinforced nylon strap with metal anchor point. Over-the-door installation, no tools required.',
    price: 12.99,
    countInStock: 80,
    rating: 4.5,
    numReviews: 10,
    images: [
      { url: '/images/anchor.jpg', alt: 'Door Anchor' },
      { url: '/images/anchor1.jpg', alt: 'Door Anchor' },
      { url: '/images/anchor2.jpg', alt: 'Door Anchor' },
      { url: '/images/anchor3.jpg', alt: 'Door Anchor' }
    ]
  },
  {
    name: 'BandForce Exercise Mat',
    image: '/images/mat.webp',
    brand: 'BandForce',
    category: null,
    description: 'Premium non-slip exercise mat. Perfect complement to band workouts. High-density foam (NBR), non-slip surface. 72" x 24" x 0.5". Black with BandForce logo.',
    price: 29.99,
    countInStock: 50,
    rating: 4.7,
    numReviews: 12,
    images: [
      { url: '/images/mat.webp', alt: 'Exercise Mat' },
      { url: '/images/mat2.webp', alt: 'Exercise Mat' },
      { url: '/images/mat3.webp', alt: 'Exercise Mat' }
    ]
  },
  {
    name: 'BandForce Carry Bag',
    image: '/images/bag3.jpg',
    brand: 'BandForce',
    category: null,
    description: 'Durable mesh bag for band storage and portable workouts. High-grade nylon mesh. 10" x 8" x 5". Zippered closure with carrying handle.',
    price: 14.99,
    countInStock: 90,
    rating: 4.6,
    numReviews: 11,
    images: [
      { url: '/images/bag.jpg', alt: 'Carry Bag' },
      { url: '/images/bag1.jpg', alt: 'Carry Bag' },
      { url: '/images/bag2.jpg', alt: 'Carry Bag' },
      { url: '/images/bag3.jpg', alt: 'Carry Bag' }
    ]
  }
];

export default products;
