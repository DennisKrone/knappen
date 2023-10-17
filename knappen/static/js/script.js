// const knappen = document.getElementById("knappen");
const hunger = document.getElementById("hunger");
const energi = document.getElementById("energi");
const gos = document.getElementById("gos");
const ångest = document.getElementById("ångest");

// knappen.addEventListener('pointerdown', function (e) {

//     fetch('/knappen', {
//         headers : {
//             'Content-Type' : 'application/json'
//         },
//         method : 'PUT',
//         body : JSON.stringify( {
//             'status' : true
//         })
//     })
//     .then(function (response){

//         if(response.ok) {
//             response.json()
//             .then(function(response) {
//                 console.log(response);
//             });
//         }
//         else {
//             throw Error('Something went wrong');
//         }
//     })
//     .catch(function(error) {
//         console.log(error);
//     });
// });

// var deClickKnappen = function (e) {

//     fetch('/knappen', {
//         headers : {
//             'Content-Type' : 'application/json'
//         },
//         method : 'PUT',
//         body : JSON.stringify( {
//             'status' : false
//         })
//     })
//     .then(function (response){

//         if(response.ok) {
//             response.json()
//             .then(function(response) {
//                 console.log(response);
//             });
//         }
//         else {
//             throw Error('Something went wrong');
//         }
//     })
//     .catch(function(error) {
//         console.log(error);
//     });
// };
// knappen.addEventListener('pointerup', deClickKnappen)
// knappen.addEventListener('pointercancel', deClickKnappen);

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

// var scaleCurve = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
//     var el = document.querySelector('.heart-button'),
//     // mo.js timeline obj
//     timeline = new mojs.Timeline(),

//     // tweens for the animation:

//     // burst animation
//     tween1 = new mojs.Burst({
//         parent: el,
//     radius:   { 0: 100 },
//     angle:    { 0: 45 },
//     y: -10,
//     count:    10,
//     radius:       100,
//     children: {
//     shape:        'circle',
//     radius:       30,
//     fill:         [ 'red', 'white' ],
//     strokeWidth:  15,
//     duration:     500,
//     }
//     });


//     tween2 = new mojs.Tween({
//         duration : 900,
//         onUpdate: function(progress) {
//             var scaleProgress = scaleCurve(progress);
//             el.style.WebkitTransform = el.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
//         }
//     });
//             tween3 = new mojs.Burst({
//         parent: el,
//     radius:   { 0: 100 },
//     angle:    { 0: -45 },
//     y: -10,
//     count:    10,
//     radius:       125,
//     children: {
//     shape:        'circle',
//     radius:       30,
//     fill:         [ 'white', 'red' ],
//     strokeWidth:  15,
//     duration:     400,
//     }
//     });

// // add tweens to timeline:
// timeline.add(tween1, tween2, tween3);


// // when clicking the button start the timeline/animation:
// $( ".heart-button" ).click(function() {
//     if ($(this).hasClass('active')){
//         $(this).removeClass('active');
//     }else{
//     timeline.play();
//     $(this).addClass('active');
//     }
// });