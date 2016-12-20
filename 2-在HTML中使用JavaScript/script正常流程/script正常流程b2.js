var num2 = 0;
var timer2 = null;
timer2 = setInterval(function(){
    num2++;
    oDiv.style.height = num2 + 'px';
    if(num2 == 200){
        clearInterval(timer2);
    }
},20)