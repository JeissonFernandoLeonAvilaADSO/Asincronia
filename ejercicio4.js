// Función para obtener los aprendices y sus repositorios
const ObtenerAprendices = async () => {
  try {
    // Se hace una solicitud para obtener los datos de usuario desde un archivo 'user.json'
    const response = await fetch('user.json');
    // Se convierte la respuesta en formato JSON
    const data = await response.json();
    // Se filtran los usuarios que son aprendices
    const aprendices = data.users.filter(user => user.aprendiz);

    // Se crea un arreglo para almacenar los resultados
    const resultados = [];
    // Se itera sobre cada aprendiz para obtener sus repositorios
    for (const aprendiz of aprendices) {
      // Se hace una solicitud para obtener los repositorios del usuario en GitHub
      const reposResponse = await fetch(`https://api.github.com/users/${aprendiz.user}/repos`);
      // Se convierte la respuesta en formato JSON
      const reposData = await reposResponse.json();
      // let avatarUrl;
      // reposResponse.forEach(element => {
      //   if (element.name === "asincronia") {
      //     avatarUrl = element.owner.avatar_url
      //   }
      // });
      // Se agregan los datos relevantes (nombre, avatar, repositorios) al arreglo de resultados
      resultados.push({
        nombre: aprendiz.name,
        avatar: aprendiz.user,
        repositorios: reposData
      });
    }
    // Se devuelve el arreglo de resultados
    return resultados;
  } catch (error) {
    // En caso de error, se imprime en la consola
    console.error('Error:', error);
  }
};

// //hacemos una funcion asincrona autoejecutable para ejecutar todas las tareas solicitadas
(async () => {
  try {
    // Se obtienen los aprendices y sus repositorios
    const aprendices = await ObtenerAprendices();

    // Filtrar aprendices con menos de 5 repositorios y mostrar en formato de tabla
    const menosDeCincoRepos = aprendices.filter(aprendiz => aprendiz.repositorios.length < 5);
    console.table(menosDeCincoRepos.map(({ nombre, avatar }) => ({ nombre, avatar })));

    // Filtrar repositorios que contienen "JavaScript" en el nombre
    const repositoriosJS = aprendices.map(aprendiz => ({
      nombre: aprendiz.name,
      avatar: aprendiz.user,
      repositorios: aprendiz.repositorios.filter(repo => repo.name.includes("JavaScript"))
    })).filter(aprendiz => aprendiz.repositorios.length > 0);
    console.log("Repositorios que contienen 'JavaScript' en el nombre:", repositoriosJS);

    // Ordenar repositorios de cada aprendiz de menor a mayor según el nombre
    const repositoriosOrdenados = aprendices.map(aprendiz => ({
      nombre: aprendiz.name,
      avatar: aprendiz.user,
      repositorios: [...aprendiz.repositorios].sort((a, b) => a.name.localeCompare(b.name))
    }));
    console.log("Repositorios ordenados por nombre:", repositoriosOrdenados);

    // Filtrar repositorios con más de 5 letras en el nombre
    const repositoriosMasDeCincoLetras = aprendices.map(aprendiz => ({
      nombre: aprendiz.name,
      avatar: aprendiz.user,
      repositorios: aprendiz.repositorios.filter(repo => repo.name.length > 5)
    })).filter(aprendiz => aprendiz.repositorios.length > 0);
    console.log("Repositorios con más de 5 letras en el nombre:", repositoriosMasDeCincoLetras);

  } catch (error) {
    // En caso de error, se imprime en la consola
    console.error(error);
  }
})()



