// ghost-api.js

// Asegúrate de que ghostConfig esté definido en config.js
// Estructura esperada: ghostConfig = { url, key, limit }

document.addEventListener('DOMContentLoaded', fetchPosts);

// 🔄 Función para obtener los posts desde la Content API
async function fetchPosts() {
  const apiUrl = `${ghostConfig.url}/ghost/api/content/posts/` +
  `?key=${ghostConfig.key}&limit=${ghostConfig.limit}&include=tags,authors`;

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    const data = await res.json();
    renderPosts(data.posts);
  } catch (error) {
    console.error('Error al cargar los posts desde Ghost:', error);
    const container = document.getElementById('post-container');
    container.innerHTML = `<p style="color: crimson;">No se pudieron cargar los artículos. Verifica tu conexión con Ghost y la clave de API.</p>`;
  }
}

// 🎨 Función para renderizar los posts en el contenedor principal
function renderPosts(posts) {
  const container = document.getElementById('post-container');
  container.innerHTML = ''; // Limpiamos cualquier contenido previo

  posts.forEach(post => {
    const postHTML = `
      <article class="post-card">
        <h2><a href="${post.url}" target="_blank" rel="noopener noreferrer">${post.title}</a></h2>
        <p class="excerpt">${post.excerpt}</p>
        <div class="meta">
          <span>${formatDate(post.published_at)}</span>
          <span>Por ${post.primary_author?.name || 'Autor desconocido'}</span>
        </div>
      </article>
    `;

    container.insertAdjacentHTML('beforeend', postHTML);
  });
}

// 📆 Formateador de fechas para español de Colombia
function formatDate(dateString) {
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-CO', options);
}



