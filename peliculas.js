// 📽️ Base de datos local de películas Share Films
const peliculas = [
  {
    id: "contracara",
    titulo: "Contracara",
    año: 1997,
    descripcion: "El agente del FBI Sean Archer... vive con su familia.",
    genero: ["Acción", "Suspenso"],
    imagen: "contracara.jpeg",
    video: "https://drive.google.com/file/d/1FsEqOKWlq4zMSeYOF-7tp_UB4jTKujqn/preview"
  },
  {
    id: "interstellar",
    titulo: "Interstellar",
    año: 2014,
    descripcion: "Un grupo de científicos y exploradores viajan al espacio para encontrar un planeta habitable.",
    genero: ["Ciencia ficción", "Drama"],
    imagen: "interestelar.jpeg",
    video: "https://drive.google.com/file/d/1cVVPgzsRjlombZxDsP2YWa9F9cHs0xa7/preview"
  },
  {
    id: "karate-kid",
    titulo: "Karate Kid",
    año: 1984,
    descripcion: "Daniel LaRusso aprende kung fu con el maestro Miyagi.",
    genero: ["Acción", "Drama"],
    imagen: "karate-kid.jpeg",
    video: "https://drive.google.com/file/d/1vytWPJ8SuHa5cLsXWXQFHsCA26jspc5/preview"
  },
  {
    id: "la-leyenda-de-los-chaneques",
    titulo: "La leyenda de los Chaneques",
    año: 2025,
    descripcion: "Cinco años después, Leo San Juan enfrenta una antigua maldición en Veracruz.",
    genero: ["Animación", "Familia", "Aventura"],
    imagen: "la-leyenda-de-los-chaneques.jpeg",
    video: "https://drive.google.com/file/d/1j2-DvVDho1-u6DoJhZpr3fG6mpyAMGL5/preview"
  },
  {
    id: "venom-3",
    titulo: "Venom 3",
    año: 2024,
    descripcion: "Eddie y Venom enfrentan a la criatura Xenófaga mientras intentan limpiar su nombre.",
    genero: ["Acción", "Superhéroes"],
    imagen: "venom-3.jpeg",
    video: "https://drive.google.com/file/d/1-I98WaJ_C622i2YMeBFjcEn43808KgmR/preview"
  },
  {
    id: "tiempo-congelado",
    titulo: "Tiempo Congelado",
    año: 2002,
    descripcion: "Un adolescente descubre un reloj que detiene el tiempo y debe protegerlo de quienes quieren usarlo para dominar el mundo.",
    genero: ["Aventura", "Ciencia ficción"],
    imagen: "tiempo-congelado.jpeg",
    video: "https://drive.google.com/file/d/1yourlink/preview"
  },
  {
    id: "lightyear",
    titulo: "Lightyear",
    año: 2025,
    descripcion: "Buzz y Alisha exploran el planeta T'Kani Prime y viven aventuras en el espacio-tiempo.",
    genero: ["Animación", "Aventura"],
    imagen: "lightyear.jpeg",
    video: "https://drive.google.com/file/d/1kpAxZOwLmSTcZZnHZ_vDlfNHqv9ZtGgz/preview"
  },
  {
    id: "mufasa",
    titulo: "Mufasa",
    año: 2025,
    descripcion: "Una historia épica que explora la vida de Mufasa antes de los eventos de El Rey León.",
    genero: ["Animación", "Drama"],
    imagen: "mufasa.jpeg",
    video: "https://drive.google.com/file/d/1kpAxZOwLmSTcZZnHZ_vDlfNHqv9ZtGgz/preview"
  },
  {
    id: "como-entrenar-a-tu-dragon-2",
    titulo: "Cómo Entrenar a tu Dragón 2",
    año: 2014,
    descripcion: "Hipo y Chimuelo se enfrentan a cazadores de dragones para evitar la guerra.",
    genero: ["Animación", "Aventura"],
    imagen: "dragon2.jpeg",
    video: "https://drive.google.com/file/d/1HoxHuCgIgetLZk6nuFE6nN9a_1YK9Py_/preview"
  },
  {
    id: "como-entrenar-a-tu-dragon-3",
    titulo: "Cómo Entrenar a tu Dragón 3",
    año: 2019,
    descripcion: "Hipo busca el Mundo Oculto para salvar a los dragones capturados.",
    genero: ["Animación", "Aventura"],
    imagen: "dragon3.jpeg",
    video: "https://drive.google.com/file/d/1x4CYvRvkriWKcL2aE0nqOJY1tPAq71I2/preview"
  },
  {
    id: "avatar-2",
    titulo: "Avatar 2",
    año: 2022,
    descripcion: "Jake Sully y Ney'tiri hacen todo por permanecer juntos y exploran Pandora ante una antigua amenaza.",
    genero: ["Acción", "Aventura", "Ciencia ficción"],
    imagen: "avatar2.jpeg",
    video: "https://drive.google.com/file/d/12RRSn0kLKUea3RbJlg32Z7zLZE7v__B5/preview"
  },
  {
    id: "flow",
    titulo: "Flow",
    año: 2024,
    descripcion: "Un gato devastado por una inundación encuentra refugio en un barco y aprende a trabajar en equipo.",
    genero: ["Animación", "Aventura", "Musical"],
    imagen: "flow.jpeg",
    video: "https://drive.google.com/file/d/1VVd1JCyxkHXGpsYr-3-SaD68pijn1XFS/preview"
  },
  {
    id: "spiderman-un-nuevo-universo",
    titulo: "Spider-Man: Un nuevo universo",
    año: 2018,
    descripcion: "Luego de ser mordido por una araña radioactiva, Miles Morales desarrolla misteriosos poderes que lo transforman en el Hombre Araña. Ahora deberá usar sus nuevas habilidades ante el malvado Kingpin, un enorme demente que puede abrir portales hacia otros universos.",
    genero: ["Animación", "Aventura", "Superhéroes"],
    imagen: "into-the-spiderverse.jpeg",
    video: "https://drive.google.com/file/d/1Gp-v1xvRausPDh9c88yxOSFusXM9dkwE/preview",
    trailer: "https://drive.google.com/file/d/1FTQh3ngY6CJmWgURjpCwuYHZMZWk-NY_/preview"
  },
  {
    id: "spiderman-across-the-spiderverse",
    titulo: "Spider-Man 2: A través del Spider-Verso",
    año: 2023,
    descripcion: "Después de reunirse con Gwen Stacy, el amigable vecino de tiempo completo de Brooklyn Spiderman, es lanzado a través del multiverso, donde se encuentra a un equipo de gente araña encomendada con proteger su mera existencia.",
    genero: ["Acción", "Ciencia ficción", "Animación"],
    imagen: "across-the-spiderverse.jpeg",
    video: "https://drive.google.com/file/d/1H0RANDOMLINK/preview"
  },
  {
    id: "huye",
    titulo: "Huye",
    año: 2017,
    descripcion: "Chris va a conocer a los padres de Rose, su novia. Al principio se muestran encantadores, si bien un tanto nerviosos. Chris supone que se debe a que él es negro, pero un poco más tarde descubre que sus suegros ocultan un secreto espeluznante.",
    genero: ["Terror", "Comedia", "Suspenso"],
    imagen: "get-out.jpeg",
    video: "https://drive.google.com/file/d/1en6HYU4w0GfvSf3PT8ZAqcxzbHvCcjHB/preview"
  },
  {
    id: "rango",
    titulo: "Rango",
    año: 2011,
    descripcion: "Rango es un camaleón que lleva toda su vida viviendo como mascota en un terrario. Sin embargo, un buen día, mientras transportan su terrario, el recipiente se cae del auto en medio del desierto y acaba en un pueblo salvaje donde lo nombran alguacil.",
    genero: ["Infantil", "Wéstern", "Animación", "Aventura"],
    imagen: "rango.jpeg",
    video: "https://drive.google.com/file/d/1SB357lg3QIGL5RvdfrJQ53_1jmnHNv7u/preview"
  },
  {
    id: "k-pop-hunters",
    titulo: "K-pop Hunters",
    año: 2025,
    descripcion: "Cuando no están llenando estadios, las superestrellas del k-pop Rumi, Mira y Zoey usan sus superpoderes para proteger a sus fans de los demonios.",
    genero: ["Musical", "Acción", "Animación", "Aventura"],
    imagen: "huntrix.jpeg",
    video: "https://drive.google.com/file/d/1yn5s7n8Cf3hnMtJdND3xG6gMq0DO3kfO/preview"
  }
];
