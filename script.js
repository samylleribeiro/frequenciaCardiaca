// VERIFICA SE TEM ITEM SALVO
let BPMsalvo = localStorage.getItem("ultimoBPM");
let modoSalvo = localStorage.getItem("modoEscuro");

// 1. Primeiro aplica o Modo Escuro ou Claro para preparar o terreno
if (modoSalvo === "ativado") {
    document.body.classList.add("dark-mode");
    document.getElementById("btn-noturno").innerText = "☀️";
}

// 2. Depois recupera o resultado e aplica a cor de fundo certa de acordo com o histórico!
if (BPMsalvo) {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = BPMsalvo;
    document.querySelector('.container-resultado').style.display = 'block';

    let coracao = document.getElementById('coracao');
    coracao.style.display = 'block';

    // Olha o que estava salvo no texto e chama a função de estilo correspondente
 if (BPMsalvo.includes("✅") || BPMsalvo.includes("🟢")) {
        estiloSaude();
    } else if (BPMsalvo.includes("❌") ) {
        estiloErro();
    } else if (BPMsalvo.includes("🔵")){
        estiloFrequenciaLenta();
    } else if (BPMsalvo.includes("🚨") || BPMsalvo.includes("🔴")) {
        estiloFrequenciaAcelerada();
    }

       // Pega o número puro salvo e reativa o pulso!
    let numeroSalvo = localStorage.getItem("numeroBPMpuro");
    if (numeroSalvo) {
        let tempoBatida = 60 / Number(numeroSalvo);
        coracao.style.animation = `pulsar ${tempoBatida}s infinite ease-in-out`;
    }
}
// Função para conferir a frequência cardíaca
function conferirBPM() {
    // Pega o valor do input
    let BPM = document.getElementById('frequencia-cardiaca').value.trim();
    let resultado = document.getElementById('resultado');
    let coracao = document.getElementById('coracao');
   
    // Transforma para número para fazer as validações
    let numero = Number(BPM);

    // verefica se  o campo está vazio OU se não for um número válido (como letras ou apenas o sinal de '-')
    if (BPM === "" || isNaN(numero) ) {
        resultado.innerHTML = "Por favor, insira valores válidos para conferir a frequência cardiaca! ❌";
        estiloErro();
        coracao.style.display = 'block';   // aparece o coração
        coracao.style.animation = "none"; // Para o coração se der erro
        return;
    }
    
    if (numero <= 0 ) {
        resultado.innerHTML = "Sua frequência cardiaca , certamente não esta zero ou menor! ❌"; 
        estiloErro();
       coracao.style.display = 'block'; 
       coracao.style.animation = "none";
        return;
    }
    
    // LIMPA O ESTILO DE ERRO CASO TENHA SIDO APLICADO ANTERIORMENTE
    document.body.style.backgroundColor = "";
    resultado.style.color = "";

    // conferir a frequência cardiaca e exibir o resultado  
    // 1. abaixo de 60 BPM frequência lenta
   if (numero < 60) {
        resultado.innerHTML = `Frequência Cardíaca = <strong>${numero} BPM</strong> <br> <strong>Bradicardia (Frequência Cardíaca Lenta) 🔵!</strong>`;
        estiloFrequenciaLenta();       
    }
    // 2. Entre 60 e 100 BPM: Normal (CORRIGIDO O OPERADOR <= )
    else if (numero >= 60 && numero <= 100) {
        resultado.innerHTML = `Frequência Cardíaca = <strong>${numero} BPM</strong> <br> <strong>Frequência Cardíaca Normal ✅ 🟢 !</strong>`;
        estiloSaude(); 
    }
    // 3. Acima de 100 BPM: Frequência Acelerada (Taquicardia)
    else {
        resultado.innerHTML = `Frequência Cardíaca = <strong>${numero} BPM</strong> <br> <strong>Taquicardia (Frequência Cardíaca Acelerada) 🚨 🔴!</strong>`;
        estiloFrequenciaAcelerada();
    }
    // Faz o coração pulsar de acordo com a frequência cardíaca dinamicamente!
    coracao.style.display = 'block';
    let tempoBatida = 60 / numero; // Transforma BPM em segundos por batida
    coracao.style.animation = `pulsar ${tempoBatida}s infinite ease-in-out`;

    // A caixinha aparece no resultado
    document.querySelector('.container-resultado').style.display = 'block';

    // Salva o resultado no localStorage
    localStorage.setItem("ultimoBPM", resultado.innerHTML);
    //  Salva o número puro 
    localStorage.setItem("numeroBPMpuro", numero);
}
// funções auxiliares para os estilo de saúde, alerta e erroPerigo
// função auxiliar para erro 
function estiloErro() {
    let resultado = document.getElementById("resultado");
    let coracao = document.getElementById("coracao");  // Chama o coração aqui    
        if (document.body.classList.contains("dark-mode")) {
            document.body.style.backgroundColor = "#2d1a1a"; // Fundo vinho escuro
            resultado.style.color = "#ff8a80"; // Vermelho pastel
        } else {
            document.body.style.backgroundColor = "#ffebee"; // Fundo rosa claro
            resultado.style.color = "#c62828"; // Vermelho escuro
        } 
        // A caixinha aparece no resultado
        document.querySelector('.container-resultado').style.display = 'block';
        // Foca o cursor no primeiro campo para facilitar a correção
        document.getElementById('frequencia-cardiaca').focus();
}
// função auxiliar para saúde (frequência cardiaca normal)
function estiloSaude() {
    let resultado = document.getElementById("resultado");
    let coracao = document.getElementById("coracao");  // Chama o coração  aqui    
    
    if (document.body.classList.contains("dark-mode")) {
        document.body.style.backgroundColor = "#1a2e1a"; // Fundo verde escuro confortável
        resultado.style.color = "#a5d6a7"; // Verde pastel claro
    } else {
        document.body.style.backgroundColor = "#e8f5e9"; // Fundo verde bem clarinho
        resultado.style.color = "#2e7d32"; // Verde escuro
    } 
    // confeti para comemorar saúde(frequência cardiaca normal)
    confetti({
        particleCount: 150,  // Quantidade de confetes
        spread: 80,          // O quanto eles vão se espalhar para os lados
        origin: { y: 0.6 }   // De onde eles vão sair na tela (0.6 é perto dos botões)
    });
}
// função para frequência lenta
function estiloFrequenciaLenta() {
    let resultado = document.getElementById("resultado");
    let coracao = document.getElementById("coracao");  // Chama o coração aqui aqui    
    
    if (document.body.classList.contains("dark-mode")) {
        document.body.style.backgroundColor = "#0d233a"; // Azul escuro confortável
        resultado.style.color = "#90caf9"; // Azul claro pastel
    } else {
        document.body.style.backgroundColor = "#e3f2fd"; // Azul bem clarinho
        resultado.style.color = "#1565c0"; // Azul escuro para leitura
    } 
}
// função para frequência acelerada
function estiloFrequenciaAcelerada() {
    let resultado = document.getElementById("resultado");
    let coracao = document.getElementById("coracao");  // chama o coração aqui
    
    if (document.body.classList.contains("dark-mode")) {
        document.body.style.backgroundColor = "#4a1212"; // Vinho bem mais profundo e vivo
        resultado.style.color = "#ffb3b3"; // Rosa/vermelho bem claro para leitura
    } else {
        document.body.style.backgroundColor = "#ffcdd2"; // Um rosa/vermelho mais forte que o de febre comum
        resultado.style.color = "#b71c1c"; // Vermelho escuro total
    } 
}
// função para limpar
function limpar() {
    let resultado = document.getElementById("resultado");
    let coracao = document.getElementById("coracao");
    document.getElementById("frequencia-cardiaca").value = "";
    resultado.innerHTML = "";
    document.body.style.backgroundColor = "";
    resultado.style.color = "";
    localStorage.removeItem("ultimoBPM");
    localStorage.removeItem("numeroBPMpuro");
    document.getElementById('frequencia-cardiaca').focus();
    document.querySelector('.container-resultado').style.display = 'none';
    coracao.style.display = 'none';
}
// função para modo noturno
function toggleDarkMode() {
    document.body.classList.add("com-transicao");
    document.body.classList.toggle("dark-mode");
    
    let botao = document.getElementById("btn-noturno");   
    let resultado = document.getElementById("resultado");

    if (document.body.classList.contains("dark-mode")) {
        botao.innerText = "☀️"; 
        localStorage.setItem("modoEscuro", "ativado");
        
if (resultado.innerText.includes("❌") || resultado.innerText.includes("Por favor")) {
            document.body.style.backgroundColor = "#2d1a1a"; 
            resultado.style.color = "#ff8a80"; 
        } else if (resultado.innerText.includes("✅") || resultado.innerText.includes("🟢")) {
            document.body.style.backgroundColor = "#1a2e1a"; 
            resultado.style.color = "#a5d6a7";  
        } else if (resultado.innerText.includes("🔵")) {
            document.body.style.backgroundColor = "#0d233a"; 
            resultado.style.color = "#90caf9"; 
        } else if (resultado.innerText.includes("🚨") || resultado.innerText.includes("🔴")) {
            document.body.style.backgroundColor = "#4a1212"; 
            resultado.style.color = "#ffb3b3"; 
        }
    } else {
        botao.innerText = "🌙"; 
        localStorage.setItem("modoEscuro", "desativado");
        
        if (resultado.innerText.includes("❌") || resultado.innerText.includes("Por favor")) {
            document.body.style.backgroundColor = "#ffebee"; 
            resultado.style.color = "#c62828";            
        } else if (resultado.innerText.includes("✅") || resultado.innerText.includes("🟢")) {
            document.body.style.backgroundColor = "#e8f5e9"; 
            resultado.style.color = "#2e7d32"; 
        } else if (resultado.innerText.includes("🔵")) {
            document.body.style.backgroundColor = "#e3f2fd"; 
            resultado.style.color = "#1565c0"; 
        } else if (resultado.innerText.includes("🚨") || resultado.innerText.includes("🔴")) {
            document.body.style.backgroundColor = "#ffcdd2"; 
            resultado.style.color = "#b71c1c"; 
        }
    }
}