function ceasarEnc(x,k){
    var y = x+k
    if(y>25){
        return y%26;
    }
    return y;
}

function ceasarDec(y,k){
    var x = y-k
    if (x<0){
        return x+26;
    }
    return x;
}

var table_ceasar=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function char2int_ceasar(c){
    return table_ceasar.indexOf(c);
}

function int2char_ceasar(z){
    return table_ceasar[z];
}

function msg2int_ceasar(msg){
    var string_parts = slice_string(msg,1);
    var int_parts=[];
    for(var i=0;i<msg.length;i++){
        int_parts.push(char2int_ceasar(string_parts[i]));
    } 
    return int_parts;
}

function int2msg_ceasar(int_parts){
    var msg='';
    for(var i=0;i<int_parts.length;i++){
        msg+=int2char_ceasar(parseInt(int_parts[i]));
    }
    return msg;
}
 
function encMsg_ceasar(arr,k){
    var arr_enc = [];
    var msg_enc='';
    for(var i=0;i<arr.length;i++){
        var int_enc=ceasarEnc(arr[i],k);
        arr_enc.push(int_enc);
        msg_enc+=int2char_ceasar(int_enc);
    }
    return [arr_enc,msg_enc]
}

function decMsg_ceasar(arr,k){ 
    var arr_dec=[];
    var msg_dec='';
    for(var i=0;i<arr.length;i++){
        var int_dec=ceasarDec(arr[i],k);
        arr_dec.push(int_dec);
        msg_dec+=int2char_ceasar(int_dec);
    }
    return [arr_dec,msg_dec];
}
