// Función asíncrona para obtener los aprendices y sus repositorios de GitHub
const ObtenerAprendices = async () => {
  try {
    // Realiza una solicitud HTTP para obtener los datos de 'user.json'
    const response = await fetch('user.json');
    // Convierte la respuesta HTTP a formato JSON
    const data = await response.json();
    // Filtra los usuarios que tienen la propiedad 'aprendiz' como verdadera
    const aprendices = data.users.filter(user => user.aprendiz);

    // Crea un arreglo para almacenar los resultados
    const resultados = [];
    // Itera sobre cada aprendiz para obtener sus repositorios de GitHub
    for (const aprendiz of aprendices) {
      // Realiza una solicitud HTTP para obtener los repositorios del usuario de GitHub
      const reposResponse = await fetch(`https://api.github.com/users/${aprendiz.user}/repos`);
      // Convierte la respuesta HTTP a formato JSON
      const reposData = await reposResponse.json();
      // Inicializa la variable para almacenar la URL del avatar
      // let avatarUrl = '';
      // // Itera sobre cada repositorio para encontrar el que tiene el nombre 'asincronia'
      // reposData.forEach(repo => {
      //   if (repo.name === "asincronia") {
      //     // Asigna la URL del avatar del propietario del repositorio a la variable
      //     avatarUrl = repo.owner.avatar_url;
      //   }
      // });
      // Agrega los datos relevantes al arreglo de resultados
      resultados.push({
        nombre: aprendiz.name, // Nombre del aprendiz
        avatar: aprendiz.user, // URL del avatar de GitHub
        repositorios: reposData // Lista de repositorios del usuario
      });
    }
    // Devuelve el arreglo de resultados
    return resultados;
  } catch (error) {
    // En caso de error, imprime el mensaje en la consola
    console.error('Error:', error);
  }
};

// Función asíncrona para leer y procesar el archivo 'user.json'
const procesarUsuarios = async () => {
  try {
    // Realiza una solicitud HTTP para obtener los datos de 'user.json'
    const response = await fetch('user.json');
    // Convierte la respuesta HTTP a formato JSON
    const data = await response.json();

    // Recorre los usuarios y aplica las modificaciones necesarias
    data.users.forEach(user => {
      // Verifica si el usuario es un aprendiz

      if (user.aprendiz) {
        // Divide el nombre del usuario en partes utilizando el espacio como delimitador
        const nombres = user.name.split(' ');
        // Verifica si el nombre tiene más de dos palabras
        if (nombres.length > 2) {
          // Verifica si el nombre de usuario contiene 'ADSO'
          if (user.user.includes('ADSO')) {
            // Crea un proxy para el usuario y aplica la validación
            const proxyUsuario = new Proxy(user, {
              // Define el método 'set' que se ejecuta al intentar modificar una propiedad del proxy
              set: (obj, prop, value) => {
                
                // Verifica si el valor es una cadena de texto y contiene solo letras mayúsculas y espacios
                if (typeof value === 'string' && /^[A-Z\s]*$/.test(value)) {
                  // Si la validación es correcta, asigna el valor a la propiedad del objeto original
                  console.log(obj)
                  obj[prop] = value;
                  return true; // Indica que la asignación fue exitosa
                } else {
                  // Si la validación falla, lanza un error
                  throw new Error('Solo se permiten letras mayúsculas');
                }
              }
            });
            // Asigna el nombre en mayúsculas al proxy, lo que desencadena la validación
            proxyUsuario.name = user.name.toUpperCase();
          }
        }
      }
    });

    // Imprime el resultado en la consola en formato JSON con una indentación de 2 espacios
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    // Captura y muestra cualquier error que ocurra durante la ejecución
    console.error('Error:', error);
  }
};

// Llama a la función para procesar los usuarios
procesarUsuarios();





