var serviceRunning = true;
//Add event listeners for DOM
//Chrome does not allow inline javascript
document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('stop');
  link.addEventListener('click', stopBlock);
});

function stopBlock(){
  serviceRunning = false;
}
