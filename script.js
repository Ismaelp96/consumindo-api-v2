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
                          <p class="categoria" hidden>${video.categoria}</p>
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

const buttonCategory = document.querySelectorAll('.superior__item');

buttonCategory.forEach((button) => {
  let nameCategory = button.getAttribute('name');
  button.addEventListener('click', () => filterCategory(nameCategory));
});

function filterCategory(filter) {
  const videos = document.querySelectorAll('.videos__item');
  for (let video of videos) {
    let category = video.querySelector('.categoria').textContent.toLowerCase();
    let valueFilter = filter.toLowerCase();

    if (!category.includes(valueFilter) && valueFilter != 'tudo') {
      video.style.display = 'none';
    } else {
      video.style.display = 'block';
    }
  }
}
