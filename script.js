fetch('./GemaData.json')
.then(response => response.json())
.then(gema => {
  if (gema && gema.Noticias && Array.isArray(gema.Noticias)) {
    const quantidadeNoticias = gema.Noticias.length;
    for (let i = 0; i < quantidadeNoticias; i++) {
      const imgNoticia = document.getElementById(`imgNoticia${i + 1}`);
      const tituloNoticia = document.getElementById(`tituloNoticia${i + 1}`);

      if (imgNoticia && tituloNoticia) {
        imgNoticia.setAttribute("src", gema.Noticias[i].imagem);
        tituloNoticia.textContent = gema.Noticias[i].titulo;     
      }
    }
  } else {
    console.error('O objeto gema ou a propriedade Noticias não está definida ou não é um array.');
  }
  if (gema && gema.campeonatos && Array.isArray(gema.campeonatos)) {
    const quantidadeCompeticoes = gema.campeonatos.length;
    for (let i = 0; i < quantidadeCompeticoes; i++) {
      const imgCompeticao = document.getElementById(`imagemCompeticao${i + 1}`);
      const nomeCompeticao = document.getElementById(`nomeCompeticao${i + 1}`);
      const medalhasOuro = document.getElementById(`ouroCompeticao${i + 1}`);
      const medalhasPrata = document.getElementById(`prataCompeticao${i + 1}`);
      const medalhasBronze = document.getElementById(`bronzeCompeticao${i + 1}`);

      if (imgCompeticao && nomeCompeticao && medalhasOuro && medalhasPrata && medalhasBronze) {
        imgCompeticao.setAttribute("src", gema.campeonatos[i].imagem);
        nomeCompeticao.textContent = gema.campeonatos[i].nomeCompleto;
        medalhasOuro.textContent = gema.campeonatos[i].medalhas.ouro.total;
        medalhasPrata.textContent = gema.campeonatos[i].medalhas.prata.total;
        medalhasBronze.textContent = gema.campeonatos[i].medalhas.bronze.total;
      }
    }
  } else {
    console.error('O objeto gema ou a propriedade Competicoes não está definida ou não é um array.');
  }
  // Declare showInfo function here to ensure it is in the correct scope
  window.showInfo = function(campeonato){
    var found = gema.campeonatos.find(c => c.nomeCompleto === campeonato);
    if (found) {
      const sectionOverlayer = document.querySelector('.modal');
      sectionOverlayer.style.display = 'block';
      
      console.log(`Informações do campeonato: ${found.nomeCompleto}`);

      var anos = Object.keys(found.anos)
      anos.reverse();
      var titulo = document.querySelector("#tituloSpan");
      titulo.textContent = found.nomeCompleto;

      var htmlqvaimostrar = "";
      for(let i = 0; i < anos.length; i++){
        var tituloAno = `<h2>${anos[i]}</h2>`;
        htmlqvaimostrar += tituloAno;
        let vencedores = found.anos[anos[i]];
        for(let j = 0; j < vencedores.length; j++){
          var vencedor = vencedores[j];
          var divvncedores = `<div class="preimado"><p id="classificaçao">${vencedor.posicao}</p><p>🎖️</p><p>${vencedor.nome}</p><p>${vencedor.medalha}</p></div>`
          htmlqvaimostrar += divvncedores;
        }
      }
      var divPremiados = document.querySelector("#todos-premiados");
      divPremiados.innerHTML = htmlqvaimostrar;

      
      console.log(anos)
    } else {
      console.log(`Campeonato ${campeonato} não encontrado.`);
    }
  };

  // Função para fechar o modal
  document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
  }

  // Fechar o modal se o usuário clicar fora do conteúdo do modal
  window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
      document.getElementById('modal').style.display = 'none';
    }
  }
  

})
.catch(error => {
  console.error('Erro ao carregar o JSON:', error);
});