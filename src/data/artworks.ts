import type { Artwork } from '../types';

// Initial set of curated artworks
export const curatedArtworks = [
  {
    id: '0',
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    date: 'c. 1665',
    description: 'One of Vermeer\'s most famous works, this painting is not a traditional portrait but a "tronie" - a Dutch genre showing an idealized figure with exotic dress.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg',
    location: 'The Hague, Netherlands',
    museum: 'Mauritshuis',
    dimensions: '44.5 × 39 cm',
    likes: 18934
  },
  {
    id: '1',
    title: 'Irises',
    artist: 'Vincent van Gogh',
    date: 'May 1890',
    description: 'Painted in the last year before his death, Van Gogh\'s "Irises" is a masterpiece that captures the vibrant beauty of nature. The painting depicts a field of irises in the garden of the asylum at Saint-Rémy-de-Provence.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Irises-Vincent_van_Gogh.jpg',
    location: 'Saint-Rémy-de-Provence, France',
    museum: 'J. Paul Getty Museum, Los Angeles',
    dimensions: '71 × 93 cm',
    likes: 12263
  },
  {
    id: '2',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    date: 'June 1889',
    description: 'Created from memory during daylight hours, this masterpiece depicts the view from Van Gogh\'s asylum room window at night. The painting showcases the artist\'s emotional response to the landscape.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    location: 'Saint-Rémy-de-Provence, France',
    museum: 'Museum of Modern Art, New York',
    dimensions: '73.7 × 92.1 cm',
    likes: 15789
  },
  {
    id: '3',
    title: 'Water Lilies',
    artist: 'Claude Monet',
    date: '1919',
    description: 'Part of Monet\'s famous Water Lilies series, this painting captures the serene beauty of his garden in Giverny. The work demonstrates his mastery of light and reflection.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Claude_Monet_-_Water_Lilies_-_1906.jpg',
    location: 'Giverny, France',
    museum: 'Metropolitan Museum of Art, New York',
    dimensions: '100 × 200 cm',
    likes: 9876
  },
  {
    id: '4',
    title: 'The Birth of Venus',
    artist: 'Sandro Botticelli',
    date: 'c. 1485',
    description: 'This iconic Renaissance masterpiece depicts Venus, the goddess of love and beauty, emerging from the sea as a fully grown woman.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/2560px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
    location: 'Florence, Italy',
    museum: 'Uffizi Gallery',
    dimensions: '172.5 × 278.5 cm',
    likes: 14567
  },
  {
    id: '5',
    title: 'The Night Watch',
    artist: 'Rembrandt van Rijn',
    date: '1642',
    description: 'This monumental painting showcases Rembrandt\'s mastery of chiaroscuro and his ability to bring drama to group portraits.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/The_Night_Watch_by_Rembrandt.jpg',
    location: 'Amsterdam, Netherlands',
    museum: 'Rijksmuseum',
    dimensions: '363 × 437 cm',
    likes: 11234
  },
  {
    id: '6',
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    date: '1931',
    description: 'One of the most recognizable works of Surrealism, this painting features melting clocks in a dreamlike landscape.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
    location: 'New York City, USA',
    museum: 'Museum of Modern Art',
    dimensions: '24.1 × 33 cm',
    likes: 13456
  },
  {
    id: '7',
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    date: '1907-1908',
    description: 'A masterpiece of the Golden Period, this painting depicts two lovers embracing, their bodies entwined in elaborate robes decorated in gold leaf.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
    location: 'Vienna, Austria',
    museum: 'Belvedere',
    dimensions: '180 × 180 cm',
    likes: 16789
  },
  {
    id: '8',
    title: 'The Scream',
    artist: 'Edvard Munch',
    date: '1893',
    description: 'This iconic work of expressionist art depicts an agonized figure against a landscape with a tumultuous orange sky.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
    location: 'Oslo, Norway',
    museum: 'National Gallery',
    dimensions: '91 × 73.5 cm',
    likes: 12456
  },
  {
    id: '9',
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    date: 'c. 1829-1833',
    description: 'This woodblock print shows a giant wave threatening boats near Mount Fuji, and is one of the most recognized works of Japanese art.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg',
    location: 'Tokyo, Japan',
    museum: 'Tokyo National Museum',
    dimensions: '25.7 × 37.8 cm',
    likes: 15678
  },
  {
    id: '10',
    title: 'The Last Supper',
    artist: 'Leonardo da Vinci',
    date: 'c. 1495-1498',
    description: 'One of the most famous paintings in the world, depicting the dramatic scene of the Last Supper of Jesus with his apostles.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg',
    location: 'Milan, Italy',
    museum: 'Santa Maria delle Grazie',
    dimensions: '460 × 880 cm',
    likes: 19234
  },
  {
    id: '11',
    title: 'The Garden of Earthly Delights',
    artist: 'Hieronymus Bosch',
    date: 'c. 1490-1510',
    description: 'A triptych depicting paradise, earthly pleasures, and hell, known for its fantastic and nightmarish imagery.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/El_jard%C3%ADn_de_las_Delicias%2C_de_El_Bosco.jpg',
    location: 'Madrid, Spain',
    museum: 'Museo del Prado',
    dimensions: '220 × 389 cm',
    likes: 14567
  },
  {
    id: '12',
    title: 'The Son of Man',
    artist: 'René Magritte',
    date: '1964',
    description: 'A self-portrait of Magritte showing a man in a suit and bowler hat with his face obscured by a floating green apple.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Magritte_TheSonOfMan.jpg',
    location: 'Private Collection',
    museum: 'Private Collection',
    dimensions: '116 × 89 cm',
    likes: 11234
  },
  {
    id: '13',
    title: 'American Gothic',
    artist: 'Grant Wood',
    date: '1930',
    description: 'One of the most familiar images in 20th-century American art, depicting a farmer and his daughter standing in front of their house.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg',
    location: 'Chicago, USA',
    museum: 'Art Institute of Chicago',
    dimensions: '78 × 65.3 cm',
    likes: 13678
  },
  {
    id: '14',
    title: 'The Creation of Adam',
    artist: 'Michelangelo',
    date: 'c. 1508-1512',
    description: 'Part of the Sistine Chapel ceiling, depicting God giving life to Adam, one of the most iconic images in art history.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
    location: 'Vatican City',
    museum: 'Sistine Chapel',
    dimensions: '280 × 570 cm',
    likes: 20456
  },
  {
    id: '15',
    title: 'The Weeping Woman',
    artist: 'Pablo Picasso',
    date: '1937',
    description: 'A colorful cubist portrait showing the suffering of war, painted after the bombing of Guernica.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/14/Picasso_The_Weeping_Woman_Tate_identifier_T05010_10.jpg',
    location: 'London, UK',
    museum: 'Tate Modern',
    dimensions: '60 × 49 cm',
    likes: 12789
  },
  {
    id: '16',
    title: 'The Treachery of Images',
    artist: 'René Magritte',
    date: '1929',
    description: 'Famous surrealist work featuring a pipe with the text "Ceci n\'est pas une pipe" (This is not a pipe).',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b9/MagrittePipe.jpg',
    location: 'Los Angeles, USA',
    museum: 'Los Angeles County Museum of Art',
    dimensions: '63.5 × 93.98 cm',
    likes: 11567
  },
  {
    id: '17',
    title: 'The School of Athens',
    artist: 'Raphael',
    date: '1509-1511',
    description: 'A fresco depicting the greatest mathematicians, philosophers and scientists of classical antiquity gathered together.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
    location: 'Vatican City',
    museum: 'Apostolic Palace',
    dimensions: '500 × 770 cm',
    likes: 16234
  },
  {
    id: '18',
    title: 'Christina\'s World',
    artist: 'Andrew Wyeth',
    date: '1948',
    description: 'One of the most famous American paintings of the middle 20th century, showing a woman crawling across a field.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Christinas_world.jpg',
    location: 'New York City, USA',
    museum: 'Museum of Modern Art',
    dimensions: '81.9 × 121.3 cm',
    likes: 10987
  },
  {
    id: '19',
    title: 'The Sleeping Gypsy',
    artist: 'Henri Rousseau',
    date: '1897',
    description: 'A naive art masterpiece showing a sleeping person and a lion under a full moon in a desert landscape.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Henri_Rousseau_-_La_Boh%C3%A9mienne_endormie.jpg',
    location: 'New York City, USA',
    museum: 'Museum of Modern Art',
    dimensions: '129.5 × 200.7 cm',
    likes: 9876
  },
  {
    id: '20',
    title: 'Impression, Sunrise',
    artist: 'Claude Monet',
    date: '1872',
    description: 'The painting that gave its name to the Impressionist movement, showing the port of Le Havre at sunrise.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Monet_-_Impression%2C_Sunrise.jpg',
    location: 'Paris, France',
    museum: 'Musée Marmottan Monet',
    dimensions: '48 × 63 cm',
    likes: 13456
  }
];

// Dynamic artworks array that will be populated with fetched artworks
export let artworks: Artwork[] = [...curatedArtworks];

// Function to generate a unique artwork based on a seed
function generateUniqueArtwork(seed: number): Artwork {
  const artists = [
    'Claude Monet', 'Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso',
    'Rembrandt', 'Michelangelo', 'Johannes Vermeer', 'Gustav Klimt',
    'Frida Kahlo', 'Salvador Dalí', 'Georgia O\'Keeffe', 'Andy Warhol'
  ];

  const artTypes = ['Painting', 'Portrait', 'Landscape', 'Still Life', 'Abstract'];
  const years = Array.from({ length: 500 }, (_, i) => 1500 + i);
  const museums = [
    'Louvre Museum, Paris',
    'Metropolitan Museum of Art, New York',
    'State Hermitage Museum, St. Petersburg',
    'Uffizi Gallery, Florence',
    'Van Gogh Museum, Amsterdam',
    'National Gallery, London'
  ];

  const randomIndex = (arr: any[]) => arr[Math.floor((seed * 13 + arr.length) % arr.length)];
  const randomYear = years[Math.floor((seed * 17) % years.length)];

  return {
    id: `generated-${seed}`,
    title: `${randomIndex(artTypes)} ${String.fromCharCode(65 + (seed % 26))}`,
    artist: randomIndex(artists),
    date: `${randomYear}`,
    description: `A masterpiece created in ${randomYear}, showcasing the artist's unique style and vision.`,
    imageUrl: `https://source.unsplash.com/800x600/?artwork,${artTypes[seed % artTypes.length].toLowerCase()}`,
    location: randomIndex(museums).split(',')[1].trim(),
    museum: randomIndex(museums).split(',')[0],
    dimensions: `${80 + (seed % 100)}cm × ${100 + (seed % 150)}cm`,
    likes: Math.floor(seed * 1000) % 20000
  };
}

// Function to load more artworks
export async function loadMoreArtworks(count: number = 100): Promise<Artwork[]> {
  // Start with curated artworks
  let allArtworks = [...curatedArtworks];
  
  // Generate additional unique artworks
  const startSeed = allArtworks.length;
  for (let i = 0; i < count; i++) {
    allArtworks.push(generateUniqueArtwork(startSeed + i));
  }
  
  return Promise.resolve(allArtworks);
}