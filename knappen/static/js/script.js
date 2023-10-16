const knappen = document.getElementById("knappen");
const hunger = document.getElementById("hunger");
const energi = document.getElementById("energi");
const gos = document.getElementById("gos");
const ångest = document.getElementById("ångest");

knappen.addEventListener('pointerdown', function (e) {

    fetch('/knappen', {
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'PUT',
        body : JSON.stringify( {
            'status' : true
        })
    })
    .then(function (response){

        if(response.ok) {
            response.json()
            .then(function(response) {
                console.log(response);
            });
        }
        else {
            throw Error('Something went wrong');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
});

var deClickKnappen = function (e) {

    fetch('/knappen', {
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'PUT',
        body : JSON.stringify( {
            'status' : false
        })
    })
    .then(function (response){

        if(response.ok) {
            response.json()
            .then(function(response) {
                console.log(response);
            });
        }
        else {
            throw Error('Something went wrong');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
};
knappen.addEventListener('pointerup', deClickKnappen)
knappen.addEventListener('pointercancel', deClickKnappen);

hunger.oninput = function() {
    fetch('/needs/2', {
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'PUT',
        body : JSON.stringify( {
            'status' : parseInt(this.value)
        })
    })
    .then(function (response){

        if(response.ok) {
            response.json()
            .then(function(response) {
                console.log(response);
            });
        }
        else {
            throw Error('Something went wrong');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

energi.oninput = function() {
    fetch('/needs/0', {
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'PUT',
        body : JSON.stringify( {
            'status' : parseInt(this.value)
        })
    })
    .then(function (response){

        if(response.ok) {
            response.json()
            .then(function(response) {
                console.log(response);
            });
        }
        else {
            throw Error('Something went wrong');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

gos.oninput = function() {
    fetch('/needs/1', {
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'PUT',
        body : JSON.stringify( {
            'status' : parseInt(this.value)
        })
    })
    .then(function (response){

        if(response.ok) {
            response.json()
            .then(function(response) {
                console.log(response);
            });
        }
        else {
            throw Error('Something went wrong');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

ångest.oninput = function() {
    fetch('/needs/3', {
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'PUT',
        body : JSON.stringify( {
            'status' : parseInt(this.value)
        })
    })
    .then(function (response){

        if(response.ok) {
            response.json()
            .then(function(response) {
                console.log(response);
            });
        }
        else {
            throw Error('Something went wrong');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}