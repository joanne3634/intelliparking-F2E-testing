var $ = require('jquery');
// var tab0 = document.getElementById('ControlTab0'),
//     tab1 = document.getElementById('ControlTab1');

// tab0.addEventListener('click', function(){
//     removeClass(document.getElementById("ControlTab1"), "active");
//     addClass(document.getElementById("ControlTab0"), "active");
//     document.getElementById("Tab1").style.display = "none";
//     document.getElementById("Tab0").style.display = "block"; 
// })

// tab1.addEventListener('click', function(){
//     removeClass(document.getElementById("ControlTab0"), "active");
//     addClass(document.getElementById("ControlTab1"), "active");
//     document.getElementById("Tab0").style.display = "none";
//     document.getElementById("Tab1").style.display = "block";
// })
$('#ControlTab0').on('click', function(){
    removeClass(document.getElementById("ControlTab1"), "active");
    addClass(document.getElementById("ControlTab0"), "active");
    document.getElementById("Tab1").style.display = "none";
    document.getElementById("Tab0").style.display = "block";
})

$('#ControlTab1').on('click', function(){
    removeClass(document.getElementById("ControlTab0"), "active");
    addClass(document.getElementById("ControlTab1"), "active");
    document.getElementById("Tab0").style.display = "none";
    document.getElementById("Tab1").style.display = "block";
})

function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}