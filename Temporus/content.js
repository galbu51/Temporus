/*
====================================================
TEMPORUS - CONTENT.JS

Motor de acessibilidade visual.

IMPORTANTE:
Este código altera apenas a visualização da página.
Não modifica arquivos originais.

Compatível com:
- Sites comuns
- Google Docs (melhorias futuras)
- Word Online (melhorias futuras)

====================================================
*/



// ================================================
// CRIAR ESTILO TEMPORÁRIO
// ================================================


function criarEstiloTemporus(){


    let estilo =
    document.getElementById(
        "temporus-style"
    );


    if(!estilo){


        estilo =
        document.createElement(
            "style"
        );


        estilo.id =
        "temporus-style";


        document.head.appendChild(
            estilo
        );


    }


    return estilo;


}








// ================================================
// ALTERAR TAMANHO DA FONTE
// ================================================


function alterarFonte(valor){


    const estilo =
    criarEstiloTemporus();



    estilo.innerHTML = `


        body * {

            font-size:
            ${valor}% !important;

        }


    `;


}








// ================================================
// PERFIL BAIXA VISÃO
// ================================================


function aplicarBaixaVisao(){


    const estilo =
    criarEstiloTemporus();



    estilo.innerHTML = `


        body * {


            font-size:
            150% !important;


            line-height:
            1.7 !important;


        }



    `;


}








// ================================================
// PERFIL DISLEXIA
// ================================================


function aplicarDislexia(){


    const estilo =
    criarEstiloTemporus();



    estilo.innerHTML = `


        body * {


            font-size:
            130% !important;


            letter-spacing:
            2px !important;


            line-height:
            1.8 !important;


            font-family:
            Arial, sans-serif !important;


        }



    `;


}








// ================================================
// PERFIL DALTONISMO
// ================================================


function aplicarDaltonismo(){


    const estilo =
    criarEstiloTemporus();



    estilo.innerHTML = `


        html {


            filter:
            contrast(120%)
            saturate(80%);


        }



    `;


}








// ================================================
// TEMA ALTO CONTRASTE
// ================================================


function aplicarContraste(){


    const estilo =
    criarEstiloTemporus();



    estilo.innerHTML = `


        html {


            filter:
            contrast(180%);


        }



    `;


}








// ================================================
// TEMA ESCURO
// ================================================


function aplicarModoEscuro(){


    const estilo =
    criarEstiloTemporus();



    estilo.innerHTML = `


        body,
        body * {


            background:
            #000 !important;


            color:
            #fff !important;


        }



    `;


}








// ================================================
// TEMA AMARELO/PRETO
// ================================================


function aplicarModoAmarelo(){


    const estilo =
    criarEstiloTemporus();



    estilo.innerHTML = `


        body,
        body * {


            background:
            #000 !important;


            color:
            #ffff00 !important;


        }



    `;


}








// ================================================
// VOLTAR AO NORMAL
// ================================================


function restaurarNormal(){


    const estilo =
    document.getElementById(
        "temporus-style"
    );



    if(estilo){


        estilo.remove();


    }


}








// ================================================
// RECEBER COMANDOS DO POPUP
// ================================================


chrome.runtime.onMessage.addListener(

    (mensagem)=>{


        switch(mensagem.acao){



            // PERFIS


            case "baixaVisao":


                aplicarBaixaVisao();


            break;





            case "dislexia":


                aplicarDislexia();


            break;





            case "daltonismo":


                aplicarDaltonismo();


            break;






            // TEMAS


            case "contraste":


                aplicarContraste();


            break;





            case "escuro":


                aplicarModoEscuro();


            break;





            case "amarelo":


                aplicarModoAmarelo();


            break;







            // RESET


            case "normal":


                restaurarNormal();


            break;







            // FONTE


            case "fonte":


                alterarFonte(
                    mensagem.valor
                );


            break;



        }



    }

);