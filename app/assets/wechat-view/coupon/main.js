function Click0() {
	removeClass(document.getElementById("ControlTab1"), "active");
	addClass(document.getElementById("ControlTab0"), "active");
	document.getElementById("Tab1").style.display = "none";
    document.getElementById("Tab0").style.display = "block";
}

function Click1() {
	removeClass(document.getElementById("ControlTab0"), "active");
	addClass(document.getElementById("ControlTab1"), "active");
	document.getElementById("Tab0").style.display = "none";
    document.getElementById("Tab1").style.display = "block";
}

function hasClass(ele,cls) {
  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}
