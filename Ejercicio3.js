//hacemos una funcion asincrona autoejecutable
(async () => {
  try { //usamos le try para capturar cualquier error que suceda en el scope del try
    // Leer el archivo users.json
    const response = await fetch('user.json') //usamos el fetch para hacer una solicitud a nuestro archivo json con los datos de los usuarios
    const data = await response.json() //declaramos una constante data para que espere el arreglo con los usuarios y los haga manejables en js con el metodo .json() de la solicitud fetch anterior los almanece en la variable
    
    // declaramos una variable que almacene unicamente a los usuarios que sean aprendices
    let aprendices = data.users.filter(user => user.aprendiz) //le pasamos una funcion anonima al filter con la condicion para que rechaze o no los datos
    
    // declaramos un arreglo para almacenar todos los resultados
    let resultados = []

    // usamos un for of para recorrer el arreglo de usuarios filtrados "aprendices" pasandole una constante que tome el valor de cada dato del arreglo segun la iteracion
    for (const aprendiz of aprendices) {
      const reposResponse = await fetch(`https://api.github.com/users/${aprendiz.user}/repos`) //declaramos una constante que espere la respuesta de la api de github y con un template string le pasamos el nombre del usuario del cual necesitamos los repositorios
      const reposData = await reposResponse.json() //declaramos una constante que espere el cuerpo de la solicitud y lo convierta con el metodo .json() para poder manejar esos datos
      resultados.push({ //agregamos el nombre y el avatar del aprendiz de la lista "aprendices" a la lista de resultados junto con los repositorios resultantes de la solicitud anterior a la api de github
        nombre: aprendiz.name,
        avatar: aprendiz.user,
        repositorios: reposData
      });
    }

    // Mostrarmos los solamente el nombre y el avatar de la lista de usuarios por medio del metodo .map en una tabla
    console.table(resultados.map(({ nombre, avatar }) => ({ nombre, avatar })))

    // iniciamos un foreach de la lista resultados la cual tiene todos los datos y le pasamos una funcion anonima con el proceso que debe llevar con cada elemento del arreglo
    resultados.forEach(result => {
      //usamos template string para mostrar el nombre de la persona a que se le van a mostrar los respositorios segun la iteracion actual
      console.log(`Repositorios de ${result.nombre}:`)
      //mostramos los repositorios del aprendiz segun la iteracion actual
      console.log(result.repositorios)
    })
  } catch (error) { //usamos el catch para capturar y mostrar si hay algun error en la ejecucion del codigo
    console.error('Error:', error) //mostramos el error en la consola
  }
})() //cerramos la funcion asincrona anonima autoejecutable


