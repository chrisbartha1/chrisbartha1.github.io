
function myFunction(ID) {
    document.getElementById(ID).key();
}



function change(event, str) {

    let keypressed = event.which || event.keyCode;
    document.getElementsByClassName(str).idinnerHTML = String(keypressed);
    console.log(String(keypressed));
}

function hoverBOY() {
    console.log("hover boyyyyyyyyy")
}

