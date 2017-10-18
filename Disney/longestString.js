function digital_root(n){
    var number = 0, num = n.toString().split('');
    for(var i in num){
        number += +num[i];
        if (number >= 10) {
            var number2 = 0, num3 = number.toString().split('');
            for (var s in num3) {
                number2 += +num3[s];
            }
            return number2;
        }
        else{
            return number;
            }
    }
}
console.log(digital_root(123));


