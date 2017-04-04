console.log("!!!!!!");
var states = document.getElementsByClassName("state");
for (var i=0; i <states.length; i++){
    var m = (states[i].getAttribute('id'));
    console.log(m);
    var state = document.getElementById(m);
    state.addEventListener('click',function(){state.style.opacity="0.5";console.log(state);});
}
