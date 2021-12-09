document.getElementById("child11").style.display = "none";

var x = document.getElementById("child11");
var y = document.getElementById("content");
function two() {
  x.style.display = "none";
  y.style.display = "block";
}
function one() {
  y.style.display = "none";
  x.style.display = "block";
}