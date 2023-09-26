function mostrar(img){
    const imagem = document.getElementById("imagemgrande")
    imagem.src=img.src
    imagem.parentElement.style.display='block'
}