function textoInicialVazio(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

textoInicialVazio('.saida', `
    <div class="saida__texto">
        <img src="./assets/img/img-area-texto.svg" alt="" >
        <h2>Nenhuma mensagem encontrada</h2>
        <p>Digite um texto que você deseja criptografar ou descriptografar.</p>
    </div>
`);
let txtAreas = document.querySelectorAll('#autoTxtArea');
for(x=0;x<txtAreas.length;x++){
   txtAreas[x].addEventListener('input', function(){
        if(this.scrollHeight > this.offsetHeight) this.rows += 1;
   });
};
document.addEventListener("DOMContentLoaded", function() {
    const entradaDeTexto = () => {
        let texto = document.getElementById('autoTxtArea').value;
        if (validarTexto(texto)) {
            let textoCriptografado = criptografar(texto);
            atualizarSaida(textoCriptografado);
            document.querySelector('textarea').value = '';
        } else {
            alert("Por favor, insira apenas letras minúsculas e sem acentos.");
        }
    };

    const descriptografarTexto = () => {
        let texto = document.getElementById('autoTxtArea').value;
        if (validarTexto(texto)) {
            let textoDescriptografado = descriptografar(texto);
            atualizarSaida(textoDescriptografado);
            document.querySelector('textarea').value = '';
        } else {
            alert("Por favor, insira apenas letras minúsculas e sem acentos.");
        }
    };

    function criptografar(texto) {
        let dadosDaCriptografia = {
            'e': 'enter',
            'i': 'imes',
            'a': 'ai',
            'o': 'ober',
            'u': 'ufat'
        };
        return texto.replace(/[eioua]/g, match => dadosDaCriptografia[match]);
    };

    function descriptografar(texto) {
        let dadosDaCriptografiaInversa = {
            'enter': 'e',
            'imes': 'i',
            'ai': 'a',
            'ober': 'o',
            'ufat': 'u'
        };
        return texto.replace(/enter|imes|ai|ober|ufat/g, match => dadosDaCriptografiaInversa[match]);
    };

    function validarTexto(texto) {
        return /^[a-z\s]+$/.test(texto);
    };

    function atualizarSaida(texto) {
        removerSaidaTexto();
        criarMensagem(texto);
    };

    const removerSaidaTexto = () => {
        let saidaTexto = document.querySelector('.saida__texto');
        if (saidaTexto) {
            saidaTexto.remove();
        }
        let mensagem = document.querySelector('.mensagem');
        if (mensagem) {
            mensagem.remove();
        }
    };

    const criarMensagem = (texto) => {
        let saida = document.querySelector('.saida');
        let mensagemDiv = document.createElement('div');
        mensagemDiv.classList.add('mensagem');
    
        let mensagemParagrafo = document.createElement('p');
        mensagemParagrafo.textContent = texto;
    
        let copiarBotao = document.createElement('button');
        copiarBotao.classList.add('copiar');
        copiarBotao.textContent = 'Copiar';
        copiarBotao.addEventListener('click', () => {
            navigator.clipboard.writeText(texto).then(() => {
                mostrarNotificacao('Texto copiado com sucesso!', mensagemDiv); // Passando mensagemDiv como referência
            });
        });
    
        mensagemDiv.appendChild(mensagemParagrafo);
        mensagemDiv.appendChild(copiarBotao);
    
        saida.appendChild(mensagemDiv);
    };
    
    const mostrarNotificacao = (mensagem, referencia) => {
        let notificacao = document.createElement('div');
        notificacao.classList.add('notificacao');
        notificacao.textContent = mensagem;
    
        referencia.appendChild(notificacao); // Inserindo dentro de mensagemDiv
    
        setTimeout(() => {
            notificacao.remove();
        }, 2000);
    };

    document.querySelector('.criptografar').addEventListener('click', entradaDeTexto);
    document.querySelector('.descriptografar').addEventListener('click', descriptografarTexto);
});
