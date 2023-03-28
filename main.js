$(document).ready(function () {
    
    // reference input message
    var inputMessage = $(".inputMessage");
    var inputMessageValue = inputMessage.tostring;
    var microphoneIcon = $("i.fa-solid.fa-microphone.fa-lg")
    var sendIcon = $("i.fa-sharp.fa-solid.fa-paper-plane.fa-lg")

    var inputSearchContact = $(".newChatSearch")


    // changing icon when input's value changes
   inputMessage.keyup(function(){
    if ( inputMessageValue !== "") {
        microphoneIcon.addClass("nv");
        sendIcon.removeClass("nv")
    } else if (inputMessageValue === " "){
        sendIcon.addClass("nv");
    } 
    })

    // detect new message sent 

    //with icon
    sendIcon.click(function(){
        sendMessage(inputMessage);
    })

    //with enter 
    inputMessage.keypress(function(e) {
        if(e.which == 13){
            sendMessage(inputMessage);
        }
    })

    // search a contact in a list 
    
    searchContact(inputSearchContact)



    /**
     * FUNCTIONS 
     */

    function sendMessage(input){
        // ottieni testo
        var testoMessaggio = input.val().trim();
        
        
        // controllo contenuto
        if(testoMessaggio != ""){
            //clone template
            var nuovoMessaggio = $(".template .message.sent").clone();
            
            //aggiunta testo al messaggio
            nuovoMessaggio.children('.message-text').text(testoMessaggio)

            //creazione e inserimento ora attuale
            var data = new Date();
            var ora = addZero(data.getHours());
            var minuti = addZero(data.getMinutes());
            var orario = ora + ":" + minuti;
            nuovoMessaggio.children('.message-time').text(orario)

            // aggiunta nuovo messaggio al contenitore attivo
            $(".right-messages.active").append(nuovoMessaggio)

            // reset input messaggio 
            inputMessage.val("")

            // risposta automatica utente 
            autoReply()
    }}


    function addZero (numero){
        if(numero < 10){
            numero = "0" + numero
        }
        return numero
    }


    function autoReply (){

        setTimeout(function(){

            // clonazione del messaggio
            var autoResponse = $(".template .received").clone();

            // aggiunta del testo al messaggio
            autoResponse.children('.message-text').text("Questa è una risposta automatica");
            
            // aggiunta dell'ora attuale alla risposta
            var data = new Date();
            var ora = addZero(data.getHours());
            var minuti = addZero(data.getMinutes());
            var orario = ora + ":" + minuti;

            autoResponse.children('.message-time').text(orario)

            // aggiunta nuovo messaggio al contenitore attivo
            $(".right-messages.active").append(autoResponse)

        },1000)

    }

        

}); //end doc ready