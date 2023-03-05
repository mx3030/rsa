/*generate n=p*q*/
function mod(n, m) {
    return BigInt(((n % m) + m) % m);
}

function dec2bin(dec) {
    return BigInt(dec).toString(2);
}

function expm(a,k,n){
    var r = 1n;
    var bits=dec2bin(k);
    for (var i=0;i<bits.length;i++){
        r = mod((r*r),n);
        if(parseInt(bits[i])==1){
            r=mod((r*a),n);
        }
    }
    return r
}

/*-----------------------------------------*/

function genRandBigInt(lowBigInt, highBigInt) {
    if (lowBigInt > highBigInt) {
        throw new Error('lowBigInt must be smaller than highBigInt');
    } else if (lowBigInt==highBigInt){
        return lowBigInt;
    }

    const difference = highBigInt - lowBigInt;
    const differenceLength = difference.toString().length;
    let multiplier = '';
    while (multiplier.length < differenceLength) {
        multiplier += Math.random()
        .toString()
        .split('.')[1];
    }
    multiplier = multiplier.slice(0, differenceLength);
    const divisor = '1' + '0'.repeat(differenceLength);

    const randomDifference = (difference * BigInt(multiplier)) / BigInt(divisor);

    return lowBigInt + randomDifference;
}

function is_prime(n,t){
    if(n==BigInt(2)){
        return true;
    }
    for(var i=0;i<t;i++){
        var a = genRandBigInt(BigInt(2),n-1n);
        var r = expm(a,n-BigInt(1),n);
    }
    if(r!=1){
        return false;
    }
    return true;
}

function randomDigit() {
    return Math.floor(Math.random() * Math.floor(2));
}

function generateRandomBinary(binaryLength) {
    let binary = "0b";
    binary+=1;
    for(let i = 1; i < binaryLength; ++i) {
        binary += randomDigit();
    }
    return binary;
}

function prime(d){
    var isprime=false;
    var r = 0n;
    while(isprime==false){
        var r = BigInt(generateRandomBinary(d));
        isprime=is_prime(r,30n);
    }
    return r
}

/*------------------------------------------------------*/
/*find factorization primes p and q*/
function isqrt(a){
    if(a<=1n){
        return a;
    }
    var x0=a/2n;
    var x1=(x0+a/x0)/2n;
    while(x1<x0){
        x0=x1;
        x1=(x0+a/x0)/2n;
    }
    return x0
}

function pfactor_fermat(n){
    if(mod(n,2n)==0n){
        return [2n,n/2n]
    }
    var a = isqrt(n);
    var b2 = a*a-n;
    if(b2<0n){
        a=a+1n;
        b2 = a*a-n;
    }
    var b = isqrt(b2);
    while(b*b!=b2){
        a=a+1n;
        b2=a*a-n;
        b=isqrt(b2);
    }
    return [a-b,a+b];
}

function add2table(size,time,n,factors){
    var string = "<tr><td class=w-25>"+size.toString()+"</td><td class=w-25>"+time.toString()+"</td><td class=w-25>"+n.toString()+"</td><td class=w-25>"+factors.toString()+"</td></tr>"
    $('#table_body').append(string);
}
var live_plot;
function plot(){
    var time=[];
    var size=[];
    var trace={
        x: size,
        y: time,
        mode:'lines+markers',
        marker: {size: 10,color: 'rgb(0, 0, 0)'},
        type: 'scatter'
    };
    var layout = {
        title: 'Wie lange dauert das Faktorisieren einer Zahl n=pq?',
        xaxis: {title: 'Größe von n [in Bits]',tickformat: ',d',autorange: true, rangemode: 'tozero'},
        yaxis: {title: 'Zeit [s]', autorange: true, rangemode:'normal'},
        font: {
            //family: 'Courier New, monospace',
            size: 18,
            color: '#000000'
        }
    };
    Plotly.newPlot('plot',[trace],layout,{staticPlot: true});
    $('#table').css('display','block');
    var i =2;
    live_plot = setInterval(function() {
        var p=17n;
        var q=prime(i);
        var n=p*q;
        var n_bin=n.toString(2);
        var n_bin_length=n_bin.length;
        var start=performance.now();
        [a,b]=pfactor_fermat(n);
        var t=performance.now()-start;
        t = Math.round(t/1000*100)/100;
        console.log(n_bin_length,t,n,[a,b]);
        add2table(n_bin_length,t,n,[a,b]);
        Plotly.extendTraces('plot', {
            x: [[n_bin_length]],
            y: [[t]]
        }, [0])
        i=i+1;
        if(i==30) clearInterval(interval);
    }, 10);
}

function stop_plot(){
    clearInterval(live_plot)
}

