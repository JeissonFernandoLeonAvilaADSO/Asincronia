const filtrar = x => x.name === 'asincronia' //se crea una funcion expresada asginandole a una variable una funcion anonima, se le quitan los parentesis porque no solamente tiene un paramentro y se le quita  el corchete porque el codigo de la funcion equivale a una linea, la palabra reservada "Function" no esta debido a que se uso una arrow

let promesa = new Promise((resolve, reject) => { //se crea una promesa que se resuelve o rechaza dependiendo del resultado de la operacion asincrona
  fetch("user.json") //hacemos una solicitud a la api para obtener los datos del usuario
    .then(response => response.json()) //parseamos la respuesta a json para poder trabajar con ella
    .then(user => { //obtenemos los datos del usuario
      fetch(`https://api.github.com/users/${user.name}/repos`) //hacemos una solicitud a la api de github para obtener los repositorios del usuario
        .then(response => response.json()) //parseamos la respuesta a json para poder trabajar con ella
        .then(data => { //obtenemos los datos de los repositorios
          const listaF = data.filter(filtrar); //filtramos los datos utilizando la funcion filtrar ya programada anteriormente
          resolve(listaF); //resolvemos la promesa con la lista filtrada
          console.log(listaF); //imprimimos la lista filtrada
        })
        .catch(error => reject(error)); //capturamos cualquier error y rechazamos la promesa
    })
    .catch(error => reject(error)); //capturamos cualquier error y rechazamos la promesa
});

promesa.then(listaF => console.log(listaF)); //imprimimos la lista filtrada cuando la promesa se resuelve