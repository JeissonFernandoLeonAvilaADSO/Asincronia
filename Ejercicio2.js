// Primero declaramos una constante para obtener los usuarios a la cual se le inicializa una nueva promesa
const ObtenerUsuarios = new Promise(async (rs, rj) => { // Inicializamos una nueva promesa y pasamos funciones para resolver (rs) y rechazar (rj)
  try {
    // Hacemos una solicitud para obtener los datos del archivo 'user.json'
    const response = await fetch('user.json'); // Usamos fetch para hacer una solicitud GET a 'user.json'
    const data = await response.json(); // Convertimos la respuesta a un objeto JSON

    // Filtramos los usuarios para obtener solo aquellos que son aprendices
    const aprendices = data.users.filter(user => user.aprendiz); // Filtramos los usuarios que tienen el atributo 'aprendiz' en verdadero

    // Creamos un arreglo para almacenar los resultados finales
    const resultados = [];

    // Iteramos sobre cada aprendiz para obtener sus repositorios y avatar de GitHub
    for (const aprendiz of aprendices) {
      // Hacemos una solicitud para obtener los repositorios del usuario en GitHub
      const reposResponse = await fetch(`https://api.github.com/users/${aprendiz.user}/repos`);
      const reposData = await reposResponse.json(); // Convertimos la respuesta a un objeto JSON para obtener los repositorios
      let avatarUrl;
      reposResponse.forEach(element => {
        if (element.name === "asincronia") {
          avatarUrl = element.owner.avatar_url
        }
      });
      // Agregamos los datos procesados al arreglo de resultados
      resultados.push({
        nombre: aprendiz.name, // Nombre del aprendiz
        avatar: avatarUrl, // URL de la imagen del avatar de GitHub
        repositorios: reposData // Lista de repositorios del usuario
      });
    }
    // Resolvemos la promesa con los resultados obtenidos
    rs(resultados);
  } catch (error) {
    // En caso de error, rechazamos la promesa y mostramos el error
    rj('Error:', error);
  }
});

// Usamos la promesa y mostramos los datos en la consola
ObtenerUsuarios.then((usuarios) => console.table(usuarios.map(({ nombre, avatar }) => ({ nombre, avatar }))))
// Resolvemos la promesa, le pasamos una función anónima e imprimimos el mapa que devuelve la promesa en una tabla





