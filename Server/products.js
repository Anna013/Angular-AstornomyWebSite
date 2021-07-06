var express = require('express')
var router = express.Router();
var jwt = require('jsonwebtoken');

const products = [
  {
    id: 0,
    name: 'Dazzling dispatches from the heart of a galaxy',
    date: "2021-07-20 23:00",
    imageUrl: 'https://cdn.images.express.co.uk/img/dynamic/151/590x/Black-Hole-631371.jpg',
    rating: 10,
    fullText: " That would be the supermassive black hole in the galaxy M87, located 55 million light years from Earth.a global collaboration of astrophysicists and observatories that created a virtual, Earth-sized telescope, released an image of M87." + 
    "It was the first photograph of a black hole and a technical achievement lauded by scientists around the world.EHTC data will allow scientists to conduct new lines of investigation into some of the most challenging areas of astrophysics. For example, scientists will use the data to improve tests of Albert Einstein’s theory of general relativity." + 
    "Currently, the main hurdles for these tests are uncertainties about the material rotating around a black hole and being blasted away from the black hole in jets that produce light spanning the entire electromagnetic spectrum, from radio waves to visible light to gamma rays.A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it.[1] The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole.[2][3] The boundary of no escape is called the event horizon." + 
    "Although it has an enormous effect on the fate and circumstances of an object crossing it, according to general relativity it has no locally detectable features.[4] In many ways, a black hole acts like an ideal black body, as it reflects no light.[5][6] Moreover, quantum field theory in curved spacetime predicts that event horizons emit Hawking radiation, with the same spectrum as a black body of a temperature inversely proportional to its mass."  + 
    "This temperature is on the order of billionths of a kelvin for black holes of stellar mass, making it essentially impossible to observe directly.",
    description: 'Mislav Balokovic a postdoctoral fellow at the Yale Center for Astronomy and Astrophysics, has a prime viewing spot for the most famous black hole humans have ever seen.That would be the supermassive black hole in the galaxy M87, located 55 million light years from Earth.A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it.The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole.The boundary of no escape is called the event horizon. Although it has an enormous effect on the fate and circumstances of an object crossing it, according to general relativity it has no locally detectable features.'
    
    
  },
  {
    id: 1,
    name: 'Lighting a path to Planet Nine',
    date: "2021-07-30 22:00",
    imageUrl: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2020_30/3399571/telescopes-kr-2x1-tease-200724-3399571.jpg',
    rating: 3,
    fullText: "The search for Planet Nine — a hypothesized ninth planet in our solar system — may come down to pinpointing the faintest orbital trails in an incredibly dark corner of space.That’s exactly what Yale astronomers Malena Rice and Gregory Laughlin are attempting with a technique that scoops up scattered light from thousands of space telescope images and identifies orbital pathways for previously undetected objects.“You really can’t see them without using this kind of method. If Planet Nine is out there, it’s going to be incredibly dim,” said Rice, lead author of a new study that has been accepted by The Planetary Science Journal.Rice, a Ph.D. student in astronomy and National Science Foundation Graduate Research Fellow, presented the findings Oct. 27 at the annual meeting of the American Astronomical Society’s Division for Planetary Sciences.The possibility of a ninth planet in Earth’s solar system, located beyond the orbit of Neptune, has gained momentum among astronomers in recent years as they’ve examined the curious orbits of a cluster of small, icy objects in the Kuiper Belt. Many astronomers believe the alignment of these objects — and their trajectories — point to the influence of an unseen object.Planet Nine is a hypothetical planet in the outer region of the Solar System.[1][2] Its gravitational effects could explain the unusual clustering of orbits for a group of extreme trans-Neptunian objects (ETNOs), bodies beyond Neptune that orbit the Sun at distances averaging more than 250 times that of the Earth. These ETNOs tend to make their closest approaches to the Sun in one sector, and their orbits are similarly tilted. These alignments suggest that an undiscovered planet may be shepherding the orbits of the most distant known Solar System objects.[2][4][5] Nonetheless, some astronomers question the idea that the hypothetical planet exists and instead assert that the clustering of the ETNOs orbits is due to observing biases, resulting from the difficulty of discovering and tracking these objects during much of the year.",
    description: 'The search for Planet Nine — a hypothesized ninth planet in our solar system — may come down to pinpointing the faintest orbital trails in an incredibly dark corner of space.That’s exactly what Yale astronomers Malena Rice and Gregory Laughlin are attempting with a technique that scoops up scattered light from thousands of space telescope images and identifies orbital pathways for previously undetected objects.Planet Nine is a hypothetical planet in the outer region of the Solar System.[1][2] Its gravitational effects could explain the unusual clustering of orbits for a group of extreme trans-Neptunian objects (ETNOs), bodies beyond Neptune that orbit the Sun at distances averaging more than 250 times that of the Earth. These ETNOs tend to make their closest approaches to the Sun in one sector, and their orbits are similarly tilted.'
  },
  {
    id: 2,
    name: 'Looking for pieces of Venus',
    date: "2021-07-27 23:00",
    imageUrl: 'https://www.dnevnik.rs/sites/default/files/2019-03/16%20-%20astronomsko%20drustvo%201.jpg',
    rating: 10,
    fullText: "A growing body of research suggests the planet Venus may have had an Earth-like environment billions of years ago, with water and a thin atmosphere.Yet testing such theories is difficult without geological samples to examine. The solution, according to Yale astronomers Samuel Cabot and Gregory Laughlin, may be closer than anyone realized.The researchers said asteroids and comets slamming into Venus may have dislodged as many as 10 billion rocks and sent them into an orbit that intersected with Earth and Earth’s moon. “Some of these rocks will eventually land on the moon as Venusian meteorites,” said Cabot, a Yale graduate student and lead author of the study.Cabot said catastrophic impacts such as these only happen every hundred million years or so — and occurred more frequently billions of years ago.The moon offers safe keeping for these ancient rocks,” Cabot said. “Anything from Venus that landed on Earth is probably buried very deep, due to geological activity. These rocks would be much better preserved on the moon.",
    description: "A growing body of research suggests the planet Venus may have had an Earth-like environment billions of years ago, with water and a thin atmosphere.Yet testing such theories is difficult without geological samples to examine. The solution, according to Yale astronomers Samuel Cabot and Gregory Laughlin, may be closer than anyone realized.enus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earths night sky after the Moon, Venus can cast shadows and can be, on rare occasions, visible to the naked eye in broad daylight.Venus lies within Earth's orbit, and so never appears to venture far from the Sun, either setting in the west just after dusk or rising in the east a little while before dawn. Venus orbits the Sun every 224.7 Earth days.[19] It has a synodic day length of 117 Earth days and a sidereal rotation period of 243 Earth days."
  }
];

var checkIfLoggedIn = (req, res, next) => {
  var token = req.get('X-AUTH-HEADER');
  var user = jwt.decode(token);
  if (user && user.user) {
    return next();
  }
  return res.status(403).json({msg: 'Please login to access this information'});
  
};

router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundProducts = products.filter(
      (product) => product.name.toLowerCase().indexOf(query) != -1);
    return res.status(200).json(foundProducts);
  }

  return res.status(200).json(products);
});

router.get('/:name', (req, res) => {
  let name = req.params.name;
  const foundProduct = products.find((product) => product.name === name);
  if (foundProduct) {
    res.json(foundProduct);
  } else {
    return res.status(400).json({msg: 'Product with name ' + name + ' not found.'})
  }
});

router.post('/', checkIfLoggedIn, (req, res) => {
  let product = req.body;

  if (product.id) {
    return res.status(400)
        .json({msg: 'Product seems to already have an id assigned'});
  }

  product.id = products.length + 1;
  product.rating = 0;
  products.push(product);
  return res.status(200).json(product);
});

router.patch('/:id', checkIfLoggedIn, (req, res) => {
  let productId = req.params.id;

  const foundProduct = products.find((product) => product.id == productId);

  if (foundProduct) {
    let changeInQuantity = req.body.changeInQuantity;
    foundProduct.rating += changeInQuantity;
    return res.status(200).json({msg: 'Successfully updated cart'});
  }
  alert('Product not found or you are not logedin')
  return res.status(400).json({msg: 'Product with id ' + productId + ' not found.'});
});

router.delete('/:id', (req, res) => {
  let productId = req.params.id;

  const foundProduct = products.find((product) => product.id == productId);

  if (foundProduct) {
    console.log('id u serveru ', foundProduct.id)
    const index = products.indexOf(foundProduct);
    console.log('index ', index)
    if (index > -1){
       products.splice(index, 1)
    }

    return res.status(200).json({msg: 'Successfully udeletedcart'});
    
  }
  alert('Product not found or you are not logedin')
  return res.status(400).json({msg: 'Product with id ' + productId + ' not found.'});
});

module.exports = router;