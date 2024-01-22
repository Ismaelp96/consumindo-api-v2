const containerVideos = document.querySelector('.videos__container');

async function searchAndShowVideos() {
  try {
    const search = await fetch(`http://localhost:3000/videos`);
    const videos = await search.json();
    videos.forEach((video) => {
      if (video.categoria == '') {
        throw new Error('Video não tem categoria');
      }
      containerVideos.innerHTML += `
                  <li class="videos__item">
                      <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                      <div class="descricao-video">
                          <img class="img-canal" alt="Logo do canal" src="${video.imagem}"/>
                          <h3 class="titulo-video">${video.titulo}</h3>
                          <p class="titulo-canal">${video.descricao}</p>
                      </div>
                  </li>
              `;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`;
  }
}

searchAndShowVideos();

const scrollSearch = document.querySelector('.pesquisar__input');

scrollSearch.addEventListener('input', filterSearch);

function filterSearch() {
  const videos = document.querySelectorAll('.videos__item');

  if (scrollSearch.value != '') {
    for (let video of videos) {
      let title = video
        .querySelector('.titulo-video')
        .textContent.toLowerCase();
      let valueFilter = scrollSearch.value.toLowerCase();

      if (!title.includes(valueFilter)) {
        video.style.display = 'none';
      } else {
        video.style.display = 'block';
      }
    }
  } else {
    video.style.display = 'block';
  }
}
