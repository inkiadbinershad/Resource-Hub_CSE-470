// Mock data for the Resource Booking System

export const resources = [
  {
    id: 1,
    name: 'Conference Room A',
    category: 'Rooms',
    status: 'Available',
    image: '🏢',
    description: 'A spacious conference room equipped with a 75-inch 4K display, video conferencing capabilities, and seating for 12 people. Perfect for team meetings, presentations, and client calls.',
    capacity: 12,
    location: 'Floor 3, Room 301',
    amenities: ['4K Display', 'Video Conferencing', 'Whiteboard', 'Air Conditioning']
  },
  {
    id: 2,
    name: 'Projector HD',
    category: 'Equipment',
    status: 'Booked',
    image: '📽️',
    description: 'High-definition projector with 1080p resolution, ideal for presentations and movie nights. Includes HDMI and USB connectivity options.',
    capacity: 1,
    location: 'Equipment Room',
    amenities: ['1080p Resolution', 'HDMI', 'USB', 'Remote Control']
  },
  {
    id: 3,
    name: 'Company Van',
    category: 'Vehicles',
    status: 'Available',
    image: '🚐',
    description: 'Spacious 12-seater van perfect for team outings and client visits. Well-maintained with full insurance coverage.',
    capacity: 12,
    location: 'Parking Lot B',
    amenities: ['GPS Navigation', 'Air Conditioning', 'Bluetooth', 'Backup Camera']
  },
  {
    id: 4,
    name: 'Design Library',
    category: 'Books',
    status: 'Available',
    image: '📚',
    description: 'Collection of design books, UX guides, and industry publications. Includes rare editions and latest releases.',
    capacity: 5,
    location: 'Floor 2, Library',
    amenities: ['Quiet Space', 'Reading Desks', 'Coffee Machine', 'Natural Light']
  },
  {
    id: 5,
    name: 'Meeting Room B',
    category: 'Rooms',
    status: 'Maintenance',
    image: '🏠',
    description: 'Intimate meeting space for 4-6 people. Features a smart TV and collaborative tools.',
    capacity: 6,
    location: 'Floor 2, Room 204',
    amenities: ['Smart TV', 'Whiteboard', 'Video Call Setup', 'Natural Lighting']
  },
  {
    id: 6,
    name: 'DSLR Camera Kit',
    category: 'Equipment',
    status: 'Available',
    image: '📷',
    description: 'Professional DSLR camera with multiple lenses, tripod, and lighting equipment. Perfect for content creation and events.',
    capacity: 1,
    location: 'Equipment Room',
    amenities: ['24-70mm Lens', 'Tripod', 'Ring Light', 'Memory Cards']
  },
  {
    id: 7,
    name: 'Electric Scooter',
    category: 'Vehicles',
    status: 'Booked',
    image: '🛴',
    description: 'Eco-friendly electric scooter for quick office commutes. Compact and easy to use.',
    capacity: 1,
    location: 'Bike Storage',
    amenities: ['25 Mile Range', 'LED Lights', 'Digital Display', 'Foldable']
  },
  {
    id: 8,
    name: 'Tech Manuals Collection',
    category: 'Books',
    status: 'Available',
    image: '📖',
    description: 'Comprehensive collection of technical manuals, programming guides, and IT certifications preparation books.',
    capacity: 10,
    location: 'Floor 1, Room 102',
    amenities: ['Computer Desks', 'WiFi', 'Printing Service', 'Study Rooms']
  },
  {
    id: 9,
    name: 'Training Room',
    category: 'Rooms',
    status: 'Available',
    image: '🎓',
    description: 'Large training room with tiered seating for 30 people. Equipped with advanced audio-visual system.',
    capacity: 30,
    location: 'Floor 4, Room 401',
    amenities: ['Projector', 'Microphone System', 'Recording Equipment', 'Wheelchair Access']
  },
  {
    id: 10,
    name: 'Portable Speaker',
    category: 'Equipment',
    status: 'Available',
    image: '🔊',
    description: 'High-quality portable speaker system for events and presentations. Crystal clear audio.',
    capacity: 1,
    location: 'Equipment Room',
    amenities: ['Bluetooth 5.0', '12hr Battery', 'Waterproof', 'Party Lights']
  },
  {
    id: 11,
    name: 'Delivery Truck',
    category: 'Vehicles',
    status: 'Available',
    image: '🚚',
    description: 'Medium-sized delivery truck with loading ramp. Ideal for equipment transport.',
    capacity: 2,
    location: 'Parking Lot A',
    amenities: ['Loading Ramp', 'GPS', 'Air Conditioning', 'Cargo Space']
  },
  {
    id: 12,
    name: 'Audio Books Collection',
    category: 'Books',
    status: 'Maintenance',
    image: '🎧',
    description: 'Extensive collection of audiobooks across various genres. Includes premium headphones for listening.',
    capacity: 8,
    location: 'Floor 2, Media Room',
    amenities: ['Noise-Canceling Headphones', 'Comfortable Seating', 'Charging Stations', 'Relaxing Environment']
  }
];

export const bookings = [
  {
    id: 1,
    resourceName: 'Conference Room A',
    date: '2024-01-15',
    startTime: '09:00',
    endTime: '11:00',
    status: 'Confirmed'
  },
  {
    id: 2,
    resourceName: 'Projector HD',
    date: '2024-01-15',
    startTime: '14:00',
    endTime: '16:00',
    status: 'Pending'
  },
  {
    id: 3,
    resourceName: 'Company Van',
    date: '2024-01-16',
    startTime: '08:00',
    endTime: '18:00',
    status: 'Confirmed'
  },
  {
    id: 4,
    resourceName: 'Meeting Room B',
    date: '2024-01-14',
    startTime: '10:00',
    endTime: '12:00',
    status: 'Cancelled'
  },
  {
    id: 5,
    resourceName: 'DSLR Camera Kit',
    date: '2024-01-17',
    startTime: '13:00',
    endTime: '17:00',
    status: 'Confirmed'
  },
  {
    id: 6,
    resourceName: 'Electric Scooter',
    date: '2024-01-15',
    startTime: '09:00',
    endTime: '10:00',
    status: 'Confirmed'
  },
  {
    id: 7,
    resourceName: 'Training Room',
    date: '2024-01-18',
    startTime: '09:00',
    endTime: '17:00',
    status: 'Pending'
  },
  {
    id: 8,
    resourceName: 'Design Library',
    date: '2024-01-15',
    startTime: '15:00',
    endTime: '17:00',
    status: 'Confirmed'
  }
];

export const categories = ['All', 'Rooms', 'Equipment', 'Vehicles', 'Books'];

export const statistics = {
  totalResources: 12,
  totalBookings: 156,
  availableNow: 8,
  pendingBookings: 3
};

