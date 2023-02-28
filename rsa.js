function mod(n, m) {
  return BigInt(((n % m) + m) % m);
}

function gcd(a,b){ 
    while(b>0){
        [a,b]=[b,mod(a,b)];
    }
    return a;
}

/*-----------------------------------------*/

function egcd(a,b){
    var x,x1,y,y1,g;
    if(b==0n){
        x=1n;
        y=0n;
        g = a;
        return [g,x,y]
    };

    [g,x1,y1]=egcd(b,mod(a,b));
    x=y1;
    y=x1-y1*(a/b);
    return [g,x,y]
}

function invm(m,a){
    [g,x,y]=egcd(a,m)
    if(g!=1){
        return;
    } else {
        return mod(x,m)
    }
}

/*-----------------------------------------*/

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
  if (lowBigInt >= highBigInt) {
    throw new Error('lowBigInt must be smaller than highBigInt');
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
    for(var i=0;i<t;i++){
        var a = genRandBigInt(2n,n-1n);
        var r = expm(a,n-1n,n);
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
  for(let i = 0; i < binaryLength; ++i) {
    binary += randomDigit();
  }
  return binary;
}

function prime(d){
    var isprime=false;
    while(isprime==false){
        var r = BigInt(generateRandomBinary(d));
        isprime=is_prime(r,30n);
    }
    return r
}

/*-----------------------------------------*/

function rsaKey(s){
    var p = prime(s);
    var q = prime(s);
    var n = p*q;
    var phi = (p-1n)*(q-1n);
    var e = 37n;
    var d = invm(phi,e);
    return [n,e,d]; 
}

function rsaEnc(n,e,x){
    return expm(x,e,n);
}

function rsaDec(n,d,y){
    return expm(y,d,n);
}


/*-----------------------------------------*/

function base2int(b,l){
    var res = 0n;
    l.reverse();
    for(var i=0n;i<l.length;i++){
        res=res+l[i]*(b**i);
    }
    return res;
}

function string2int(s){
    var base256=[]
    for(var i=0;i<s.length;i++){
        base256.push(BigInt(s[i].charCodeAt(0)));
    }
    m = base2int(256n,base256);
    return m
}

function base_expansion(n,b){
    var q=n;
    var chars=[];
    while(q!=0n){
        chars.push(mod(q,b));
        q=q/b;
    }
    chars.reverse();
    return chars;
}

function int2str(m){
    var l = base_expansion(m,256n);
    msg='';
    for(var i=0;i<l.length;i++){
        msg = msg + String.fromCharCode(Number(l[i]));
    }
    return msg;
}

function slice_string(s,n){
    /*slice string s in parts with n characters*/
    var str_parts = []
    for (var i = 0; i < s.length; i += n) {
        str_parts.push(s.substring(i, i + n));
    }
    return str_parts
}

function msg2int(msg,n){
    var str_parts=slice_string(msg,n);
    var int_parts=[];
    for(var i=0;i<str_parts.length;i++){
        int_parts.push(string2int(str_parts[i]));
    }
    return int_parts;
}

function int2msg(int_parts){
    /*number array to string parts*/
    var str_parts=[];
    var msg='';
    for(var i=0;i<int_parts.length;i++){
        var str = int2str(BigInt(int_parts[i]));
        str_parts.push(str);
        msg=msg+str;
    }
    return msg;
}

function encMsg(n,e,arr){
    /*encrypt message in form of big int array
     * returns encrypted array and message
     * */
    var arr_enc = [];
    var msg_enc='';
    for(var i=0;i<arr.length;i++){
        var int_enc = rsaEnc(n,e,arr[i]);
        arr_enc.push(int_enc);
        var str_enc = int2str(int_enc);
        msg_enc=msg_enc+str_enc;
    }
    return [arr_enc,msg_enc];
}

function decMsg(n,d,arr){
    /*decrypt message in form of big int array
     * returns decrypted array and message
     * */
    var arr_dec=[];
    var msg_dec='';
    for(var i=0;i<arr.length;i++){
        var int_dec = rsaDec(n,d,arr[i]);
        arr_dec.push(int_dec);
        var str_dec = int2str(int_dec);
        msg_dec=msg_dec+str_dec;
    }
    return [arr_dec,msg_dec];
}

