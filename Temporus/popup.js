/*
TEMPORUS - POPUP.JS
Controle da interface
*/


let tamanhoFonte = 100;


// Enviar comando para a página

function enviarComando(acao, valor = null) {


    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },

        (tabs) => {


            chrome.tabs.sendMessage(
                tabs[0].id,

                {
                    acao: acao,
                    valor: valor
                },

                () => {


                    // Evita erro quando a página não aceita script

                    if(chrome.runtime.lastError){

                        console.log(
                            "Página não compatível ainda"
                        );

                    }


                }

            );


        }

    );


}





// ===============================
// PERFIS
// ===============================


document
.getElementById("baixaVisao")
.addEventListener("click", ()=>{


    enviarComando(
        "baixaVisao"
    );


});



document
.getElementById("dislexia")
.addEventListener("click", ()=>{


    enviarComando(
        "dislexia"
    );


});



document
.getElementById("daltonismo")
.addEventListener("click", ()=>{


    enviarComando(
        "daltonismo"
    );


});



document
.getElementById("normal")
.addEventListener("click", ()=>{


    enviarComando(
        "normal"
    );


});







// ===============================
// FONTE
// ===============================


document
.getElementById("aumentarFonte")
.addEventListener("click", ()=>{


    tamanhoFonte += 10;


    if(tamanhoFonte > 200){

        tamanhoFonte = 200;

    }


    atualizarNumero();


    enviarComando(
        "fonte",
        tamanhoFonte
    );


});





document
.getElementById("diminuirFonte")
.addEventListener("click", ()=>{


    tamanhoFonte -= 10;


    if(tamanhoFonte < 50){

        tamanhoFonte = 50;

    }


    atualizarNumero();


    enviarComando(
        "fonte",
        tamanhoFonte
    );


});






function atualizarNumero(){


    document
    .getElementById("valorFonte")
    .textContent =
    tamanhoFonte + "%";


}







// ===============================
// TEMAS
// ===============================


document
.getElementById("tema")
.addEventListener(
"change",

(e)=>{


    let escolha =
    e.target.value;



    if(escolha === "Alto contraste"){


        enviarComando(
            "contraste"
        );


    }



    else if(escolha === "Modo escuro"){


        enviarComando(
            "escuro"
        );


    }



    else if(escolha === "Modo amarelo/preto"){


        enviarComando(
            "amarelo"
        );


    }



    else {


        enviarComando(
            "normal"
        );


    }



});
