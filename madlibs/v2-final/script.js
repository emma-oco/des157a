(function(){

    'use strict';
     console.log('reading js');

     const myArticle = document.querySelector('#madlib');

     const myForm = document.querySelector('#myform');

     const errorMessage = document.querySelector('#error');

     const madlibOverlay = document.querySelector('#overlay');

     const close = document.querySelector('#close');

     myForm.addEventListener('submit', function(event){
        event.preventDefault();

        const adjective1 = document.querySelector('#adjective1').value;
        const adjective2 = document.querySelector('#adjective2').value;
        const verb1 = document.querySelector('#verb1').value;
        const noun1 = document.querySelector('#noun1').value;
        const adjective3 = document.querySelector('#adjective3').value;

        let myText;

        if(adjective1 == ''){
            myText = "please provide an adjective";
            document.querySelector('#adjective1').focus();

            errorMessage.innerHTML = myText;
        }

        else if(adjective2 == ''){
            myText = "please provide an adjective";
            document.querySelector('#adjective2').focus();

            errorMessage.innerHTML = myText;
        }
        else if(verb1 == ''){
            myText = "please provide a verb";
            document.querySelector('#verb1').focus();

            errorMessage.innerHTML = myText;
        }
        else if(noun1 == ''){
            myText = "please provide a noun";
            document.querySelector('#noun1').focus();

            errorMessage.innerHTML = myText;
        }
        else if (adjective3 == ''){
            myText = "please provide an adjective";
            document.querySelector('#adjective3').focus();

            errorMessage.innerHTML = myText;
        }
        else{
            myText = `<h1>Beach Mad Lib</h1>
            <p>This past weekend I went to the beach! The weather was ${adjective1} and the waves were  ${adjective2}. We did a lot of fun activities, but my favorite was when my friend made up a game where we needed to ${verb1} from one side of the beach to the other. While we were snorkeling, we saw fish that looked like ${noun1}. Overall, it was a ${adjective3} day!</p>`;

            document.querySelector('#adjective1').value ='';
            document.querySelector('#adjective2').value ='';
            document.querySelector('#verb1').value ='';
            document.querySelector('#noun1').value ='';
            document.querySelector('#adjective3').value ='';

            madlib.innerHTML = myText;
            madlibOverlay.style.display = "block";
        }
        
    });

    close.addEventListener('click', function(event){
        event.preventDefault();
        madlibOverlay.style.display = "none";
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            madlibOverlay.style.display = "none";
        }
    });
    
}) ();