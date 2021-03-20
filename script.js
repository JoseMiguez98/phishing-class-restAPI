

for (let index = 0; index < 100; index++) {
  const data = {
    nombreDeUsuario: `usuarioPrueba${index}`,
    email: `usuarioPrueba${index}@gmail.com`,
    password: `passwordPrueba${index}`,
    telefono: `00000000${index}`,
    direccion: `direccion prueba depto ${index}`,
    casado: index % 2 === 0,
  }

  fetch('http://localhost:3000/usuario', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}