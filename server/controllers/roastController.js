import DripzyRoast from '../models/DripzyRoast.js';
import Product from '../models/Product.js';

const fashionCategories = [
  'Old Money', 'Y2K', 'Streetwear', 'Minimal', 'Techwear', 'Oversized', 'Luxury', 'Cyberpunk', 'Vintage'
];

const personalities = {
  'Roast Energy 🔥': {
    roasts: [
      "This fit is giving 'I got dressed in the dark and hoped for the best.'",
      "Is that a trend or did you just lose a bet?",
      "The 2010s called, they don't even want this back.",
      "This look is proof that money can't buy taste, but it can buy confusion."
    ],
    praise: [
      "Wait, you actually cooked with this one. I'm mad I can't roast it.",
      "Main character energy. Everyone else is just an NPC today."
    ]
  },
  'Streetwear Judge 🥷': {
    roasts: [
      "The proportions are scarier than my bank account after a drop.",
      "Standard NPC streetwear. You're the background character in a music video.",
      "Nice hypebeast starter pack. Where's the personality though?"
    ],
    praise: [
      "The silhouette is immaculate. Proper street cred unlocked.",
      "Clean execution. You actually understand the assignment."
    ]
  },
  'Luxury Critic 🕶️': {
    roasts: [
      "This look is screaming for help in a language I don't speak.",
      "It's giving 'Budget Luxury.' Let's try harder next time.",
      "The aesthetic is a bit... loud. And not in a good way."
    ],
    praise: [
      "Sophisticated. Quiet luxury at its finest.",
      "This belongs on a runway, not a random upload. Exquisite."
    ]
  },
  'Hype Me Up 🚀': {
    roasts: [
      "You're almost there! Just need about 5 more layers of confidence.",
      "Bold choice! It's unique, like a rare bug in a video game."
    ],
    praise: [
      "CERTIFIED DRIP. The streets aren't ready for this!",
      "ABSOLUTE FIRE. You're basically the CEO of looking good."
    ]
  },
  'Clean Stylist ✨': {
    roasts: [
      "A bit cluttered. Let's practice the 'take one thing off' rule.",
      "The color palette is having an argument. Nobody is winning."
    ],
    praise: [
      "Minimalism done right. So crisp, so clean.",
      "The harmony here is beautiful. Great eye for detail."
    ]
  }
};

export const generateRoast = async (req, res) => {
  try {
    const { image, personality, gender } = req.body;
    const userId = req.user.id;

    if (!image || !personality) {
      return res.status(400).json({ message: 'Image and personality are required' });
    }

    // Simulate intelligent analysis
    const score = Math.floor(Math.random() * 41) + 50; 
    const category = fashionCategories[Math.floor(Math.random() * fashionCategories.length)];
    
    const pData = personalities[personality] || personalities['Roast Energy 🔥'];
    const roastPool = score > 80 ? pData.praise : pData.roasts;
    const roastText = roastPool[Math.floor(Math.random() * roastPool.length)];

    const suggestions = [
      `Try adding some ${category === 'Minimal' ? 'bold accessories' : 'minimalist layers'}`,
      "Swap those shoes for something with more 'Main Character' energy",
      "Focus on the silhouette - maybe go a bit more oversized?"
    ];

    // Get product recommendations based on gender and category
    const recommendations = await Product.findAll({ 
      where: { 
        gender: gender || 'men' 
      },
      limit: 3 
    });

    const newRoast = await DripzyRoast.create({
      userId,
      image,
      score,
      vibe: category,
      roastText,
      personality,
      suggestions,
      detectedCategory: category
    });

    res.status(201).json({
      ...newRoast.toJSON(),
      recommendations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoastHistory = async (req, res) => {
  try {
    const history = await DripzyRoast.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
