var oDiv = document.getElementById('box');
var num1 = 0;
var timer1 = null;
timer1 = setInterval(function(){
    num1++;
    oDiv.style.width = num1 + 'px';
    if(num1 == 200){
        clearInterval(timer1);
    }
},20)