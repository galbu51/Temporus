function enviarConfiguracao(tipo){

    chrome.tabs.query(
        {active:true, currentWindow:true},
        (tabs)=>{

            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    perfil: tipo
                }
            );

        }
    );

}


document
.getElementById("baixaVisao")
.onclick = () => {

    enviarConfiguracao("baixaVisao");

};


document
.getElementById("dislexia")
.onclick = () => {

    enviarConfiguracao("dislexia");

};


document
.getElementById("normal")
.onclick = () => {

    enviarConfiguracao("normal");

};