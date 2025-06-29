// Realiza una solicitud HTTP GET para obtener los posts desde el backend
fetch("https://isladata-fast-api.onrender.com/posts")
    // Convierte la respuesta a formato JSON
    .then(response => response.json())
    // Procesa los datos recibidos
    .then(data => {
      // Obtiene el contenedor donde se mostrarán los posts
      const container = document.getElementById("post-container");
      // Itera sobre cada post recibido
      data.forEach(post => {
        // Crea un elemento <article> para cada post
        const article = document.createElement("article");
        // Inserta el título y contenido del post en el artículo
        article.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
        // Agrega el artículo al contenedor en el DOM
        container.appendChild(article);
      });
    })
    // Maneja errores en la solicitud o procesamiento de datos
    .catch(error => console.error("Error cargando los posts:", error));
