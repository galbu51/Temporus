chrome.runtime.onMessage.addListener((mensagem)=>{


    if(mensagem.perfil === "baixaVisao"){

        document.body.style.fontSize = "150%";
        document.body.style.lineHeight = "1.6";

    }


    if(mensagem.perfil === "dislexia"){

        document.body.style.fontSize = "130%";
        document.body.style.letterSpacing = "2px";
        document.body.style.lineHeight = "1.8";

    }


    if(mensagem.perfil === "normal"){

        document.body.style.fontSize = "";
        document.body.style.letterSpacing = "";
        document.body.style.lineHeight = "";

    }


});