const filtrar = x => x.name === 'Evaluacion' //se crea una funcion expresada asginandole a una variable una funcion anonima, se le quitan los parentesis porque no solamente tiene un paramentro y se le quita  el corchete porque el codigo de la funcion equivale a una linea, la palabra reservada "Function" no esta debido a que se uso una arrow

  //Se crea una funcion asincrona anonima autoejectutable la cual tambien se le quita la palabra reservada "function" al usar la arrow
  (async () => {
    let response = await fetch("user.json") //declaramos una variable y con el await hacemos que el codigo espere a que fetch se complete para poder seguir a la siguiente linea
    let user = await response.json() //declaramos una variable para almacenar los datos de la del json, para esto primero con el wait esperamos a que la variable response se ejecute y termine para luego continuar con la ejecucion, el response tiene el metodo "json()" el cual funciona para parsear o convertir el cuerpo de datos de la solicitud del fetch a un archivo json para que sea manejable en js

    let requestGithub = await fetch(`https://api.github.com/users/${user.name}/repos`) //declaramos una variable y con el await hacemos que el codigo espere a que fetch haga la solicitud a la api de github y se complete para poder seguir a la siguiente linea
    let usuarioGithub = await requestGithub.json()//declaramos una variable para almacenar los datos de la del json, para esto primero con el wait esperamos a que la variable requestGithub se ejecute y termine para luego continuar con la ejecucion, el response tiene el metodo "json()" el cual funciona para parsear o convertir el cuerpo de datos de la solicitud del fetch a un archivo json para que sea manejable en js


    //Hacemos un forEach en el archivo que contiene los datos de la repuesta de la consulta al github el cual recorre los archivos uno por uno y pasan por la funcion anonima que del forEach cada elemento individual se situa en el parametro con nombre element para que en cada iteracion realize el proceso correspondiente con dicho elemento
    usuarioGithub.forEach(element => {
      if (element.name === "Evaluacion") { //hacemos una condicional en el cual para cada elemento que se va iterando va pasando por la condicional si el nombre es estrictamente igual a "Evaluacion" imprime el elemento de lo contrario al no tener mas codigo pasa con el siguiente elemento de la iteracion
        console.log(element)//Esta salida imprime el elemento filtrado
      }
    });
})() //Cerramos la funcion asincrona autoejecutable y le colocamos los parentesis para que se pueda autoejecutar