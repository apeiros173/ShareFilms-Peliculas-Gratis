const peliculas = [
  {
    id: "contracara",
    titulo: "Contracara",
    año: 1997,
    descripcion: "El agente del FBI Sean Archer vive con su familia mientras persigue al terrorista Castor Troy. Tras un accidente, Archer se somete a una operación experimental para intercambiar rostros con Troy y atraparlo.",
    genero: ["Acción", "Suspenso"],
    imagen: "images/contracara.jpeg",
    video: "https://drive.google.com/file/d/1FsEqOKWlq4zMSeYOF-7tp_UB4jTKujqn/preview"
  },
  {
    id: "interstellar",
    titulo: "Interstellar",
    año: 2014,
    descripcion: "Un grupo de científicos y exploradores viaja a través de un agujero de gusano en el espacio para encontrar un nuevo planeta habitable para la humanidad.",
    genero: ["Ciencia ficción", "Drama"],
    imagen: "images/interestelar.jpeg",
    video: "https://drive.google.com/file/d/1cVVPgzsRjlombZxDsP2YWa9F9cHs0xa7/preview"
  },
  {
    id: "karate-kid",
    titulo: "Karate Kid",
    año: 1984,
    descripcion: "Daniel LaRusso se muda a California, donde es acosado por pandillas locales hasta que el sabio señor Miyagi le enseña el arte del karate.",
    genero: ["Acción", "Drama"],
    imagen: "images/karate-kid.jpeg",
    video: "https://drive.google.com/file/d/1vytWPJ8SuHa5cLsXWXQFHsCA26jspc5/preview"
  },
  {
    id: "la-leyenda-de-los-chaneques",
    titulo: "La leyenda de los Chaneques",
    año: 2025,
    descripcion: "Cinco años después, Leo San Juan enfrenta una antigua maldición en Veracruz mientras investiga la desaparición de su hermano.",
    genero: ["Animación", "Familia", "Aventura"],
    imagen: "images/la-leyenda-de-los-chaneques.jpeg",
    video: "https://drive.google.com/file/d/1j2-DvVDho1-u6DoJhZpr3fG6mpyAMGL5/preview"
  },
  {
    id: "venom-3",
    titulo: "Venom 3",
    año: 2024,
    descripcion: "Eddie Brock y Venom enfrentan a la criatura Xenófaga mientras intentan limpiar su nombre y sobrevivir a un nuevo enemigo.",
    genero: ["Acción", "Superhéroes"],
    imagen: "images/venom-3.jpeg",
    video: "https://drive.google.com/file/d/1-I98WaJ_C622i2YMeBFjcEn43808KgmR/preview"
  },
  {
    id: "tiempo-congelado",
    titulo: "Tiempo Congelado",
    año: 2002,
    descripcion: "Un adolescente descubre un reloj que detiene el tiempo y debe protegerlo de quienes quieren usarlo para dominar el mundo.",
    genero: ["Aventura", "Ciencia ficción"],
    imagen: "images/tiempo-congelado.jpeg",
    video: "https://drive.google.com/file/d/1yourlink/preview"
  },
  {
    id: "lightyear",
    titulo: "Lightyear",
    año: 2025,
    descripcion: "Buzz Lightyear y Alisha Hawthorne exploran el planeta T'Kani Prime, enfrentando peligros cósmicos y dilemas sobre el tiempo y la amistad.",
    genero: ["Animación", "Aventura"],
    imagen: "images/lightyear.jpeg",
    video: "https://drive.google.com/file/d/1kpAxZOwLmSTcZZnHZ_vDlfNHqv9ZtGgz/preview"
  },
  {
    id: "mufasa",
    titulo: "Mufasa: El Rey León",
    año: 2025,
    descripcion: "Una historia épica que explora los orígenes de Mufasa y su ascenso a rey, antes de los eventos de El Rey León original.",
    genero: ["Animación", "Drama"],
    imagen: "images/mufasa.jpeg",
    video: "https://drive.google.com/file/d/1kpAxZOwLmSTcZZnHZ_vDlfNHqv9ZtGgz/preview"
  },
  {
    id: "como-entrenar-a-tu-dragon-2",
    titulo: "Cómo Entrenar a tu Dragón 2",
    año: 2014,
    descripcion: "Hipo y Chimuelo descubren nuevos territorios y enfrentan a cazadores de dragones que amenazan la paz entre humanos y dragones.",
    genero: ["Animación", "Aventura"],
    imagen: "images/dragon2.jpeg",
    video: "https://drive.google.com/file/d/1HoxHuCgIgetLZk6nuFE6nN9a_1YK9Py_/preview"
  },
  {
    id: "como-entrenar-a-tu-dragon-3",
    titulo: "Cómo Entrenar a tu Dragón 3",
    año: 2019,
    descripcion: "Hipo busca el Mundo Oculto para salvar a los dragones capturados, mientras Chimuelo encuentra un nuevo amor.",
    genero: ["Animación", "Aventura"],
    imagen: "images/dragon3.jpeg",
    video: "https://drive.google.com/file/d/1x4CYvRvkriWKcL2aE0nqOJY1tPAq71I2/preview"
  },
  {
    id: "avatar-2",
    titulo: "Avatar 2: El Camino del Agua",
    año: 2022,
    descripcion: "Jake Sully y Ney'tiri deben proteger a su familia mientras exploran los océanos de Pandora frente a una nueva amenaza humana.",
    genero: ["Acción", "Aventura", "Ciencia ficción"],
    imagen: "images/avatar2.jpeg",
    video: "https://drive.google.com/file/d/12RRSn0kLKUea3RbJlg32Z7zLZE7v__B5/preview"
  },
  {
    id: "flow",
    titulo: "Flow",
    año: 2024,
    descripcion: "Un gato sobreviviente de una inundación encuentra refugio en un barco y debe aprender a convivir con otros animales.",
    genero: ["Animación", "Aventura", "Musical"],
    imagen: "images/flow.jpeg",
    video: "https://drive.google.com/file/d/1VVd1JCyxkHXGpsYr-3-SaD68pijn1XFS/preview"
  },
  {
    id: "spiderman-un-nuevo-universo",
    titulo: "Spider-Man: Un nuevo universo",
    año: 2018,
    descripcion: "Miles Morales obtiene poderes arácnidos y debe aprender a usarlos para detener al Kingpin, quien ha abierto portales hacia otros universos.",
    genero: ["Animación", "Aventura", "Superhéroes"],
    imagen: "images/into-the-spiderverse.jpeg",
    video: "https://drive.google.com/file/d/1Gp-v1xvRausPDh9c88yxOSFusXM9dkwE/preview"
  },
  {
    id: "spiderman-a-traves-del-spider-verso",
    titulo: "Spider-Man 2: A través del Spider-Verso",
    año: 2023,
    descripcion: "Miles Morales viaja a través del multiverso junto a Gwen Stacy y conoce a cientos de versiones del Hombre Araña que protegen su realidad.",
    genero: ["Acción", "Ciencia ficción", "Animación"],
    imagen: "images/across-the-spiderverse.jpeg",
    video: "https://drive.google.com/file/d/1H0RANDOMLINK/preview"
  },
  {
    id: "huye",
    titulo: "Huye",
    año: 2017,
    descripcion: "Chris conoce a los padres de su novia Rose, quienes esconden un oscuro secreto. Pronto descubre que nada es lo que parece.",
    genero: ["Terror", "Comedia", "Suspenso"],
    imagen: "images/get-out.jpeg",
    video: "https://drive.google.com/file/d/1en6HYU4w0GfvSf3PT8ZAqcxzbHvCcjHB/preview"
  },
  {
    id: "rango",
    titulo: "Rango",
    año: 2011,
    descripcion: "Rango, un camaleón doméstico, termina perdido en el desierto y se convierte en el sheriff de un pueblo lleno de criaturas peculiares.",
    genero: ["Infantil", "Wéstern", "Animación", "Aventura"],
    imagen: "images/rango.jpeg",
    video: "https://drive.google.com/file/d/1SB357lg3QIGL5RvdfrJQ53_1jmnHNv7u/preview"
  },
  {
    id: "kpop-hunters",
    titulo: "K-pop Hunters",
    año: 2025,
    descripcion: "Las superestrellas del k-pop Rumi, Mira y Zoey usan sus poderes secretos para proteger a sus fans de demonios interdimensionales.",
    genero: ["Musical", "Acción", "Animación", "Aventura"],
    imagen: "images/huntrix.jpeg",
    video: "https://drive.google.com/file/d/1yn5s7n8Cf3hnMtJdND3xG6gMq0DO3kfO/preview"
  }
];
