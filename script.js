var key_size_alice=32n
var key_size_bob=32n
var key_alice=[]
var key_bob=[]
var selected_key=-1

function update_settings_alice(){
    key_size_alice=BigInt($('#key-size-alice').val())
}

function gen_key(name){
    if(name=='alice'){
        [n,e,d]=rsaKey(key_size_alice);
        key_alice=[n,e,d];
        console.log(n,e,d);
        $('#private-n-alice').val(n);
        $('#private-d-alice').val(d);
        $('#public-n-alice').val(n);
        $('#public-e-alice').val(e);
    } else if(name=='bob'){
        [n,e,d]=rsaKey(key_size_bob);
        key_bob=[n,e,d];
        console.log(n,e,d);
        $('#private-n-bob').val(n);
        $('#private-d-bob').val(d);
        $('#public-n-bob').val(n);
        $('#public-e-bob').val(e);
    }
}

function select_key(number){
    selected_key=number;
    $('#key-'+number).addClass("border-dark bg-light");
    for(var i=0;i!=number,i<4;i++){
        if(i!=number){
            $('#key-'+i).removeClass("border-dark bg-light");
        }
    }
}

function msg2int_app(name){
    if(name=="alice"){
        var arr = msg2int($('#msg-alice').val(),4);
        $('#num-alice').val(arr)
    }
    if(name=="bob"){
        var arr = msg2int($('#msg-bob').val(),4);
        $('#num-bob').val(arr)
    }

}

function int2msg_app(name){
    if(name=="alice"){
        var arr= $('#num-alice').val().split(',');
        $('#msg-alice').val(int2msg(arr));
    }
    if(name=="bob"){
        var arr= $('#num-bob').val().split(',');
        $('#msg-bob').val(int2msg(arr));
    }
}


function use_key(name){
    if(name=='alice' && selected_key!=3){
        if(selected_key==0){        
            decMsg_app('alice',key_alice[0],key_alice[2]);
        } else if(selected_key==1) { 
            encMsg_app('alice',key_alice[0],key_alice[1]);
        } else if(selected_key==2){
            encMsg_app('alice',key_bob[0],key_bob[1]);
        }
    } else if(name=='alice' && selected_key==3) {
        alert("Dieser Schlüssel ist ein Geheimnis von Bob.")
    }

    if(name=='bob' && selected_key!=0){
        if(selected_key==1){        
            encMsg_app('bob',key_alice[0],key_alice[1]);
        } else if(selected_key==2) { 
            encMsg_app('bob',key_bob[0],key_bob[1]);
        } else if(selected_key==3){
            decMsg_app('bob',key_bob[0],key_bob[2]);
        }
    } else if(name=='bob' && selected_key==0){
        alert("Dieser Schlüssel ist ein Geheimnis von Alice.")
    }
}

function encMsg_app(name,key_val1,key_val2){
    var org= $('#num-'+name).val().split(',');
    for(var i=0;i<org.length;i++){
        org[i]=BigInt(org[i]);
    }
    var enc = encMsg(key_val1,key_val2,org);
    $('#msg-'+name).val(enc[1]);
    $('#num-'+name).val(enc[0]);
}

function decMsg_app(name,key_val1,key_val2){
    var org= $('#num-'+name).val().split(',');
    for(var i=0;i<org.length;i++){
        org[i]=BigInt(org[i]);
    }
    var dec=decMsg(key_val1,key_val2,org);
    $('#num-'+name).val(dec[0]);
    $('#msg-'+name).val(dec[1]);
}

function send_msg(name){
    if(name=='alice'){
        var msg = $('#num-alice').val();
        $('#inet').val(msg);
        $('#num-bob').val(msg);
        $('#msg-bob').val('');
    }
    if(name=='bob'){
        var msg = $('#num-bob').val();
        $('#inet').val(msg);
        $('#num-alice').val(msg);
        $('#msg-alice').val('');
    }
}


function update_modal_private_n_alice(){
    $("#modal-n-alice").val($("#private-n-alice").val());
}

var modal_n_alice = 0; //0=dezimal, 1=hex, 2=binär
function update_n_alice(){ 
    if(modal_n_alice==0){
        $("#private-n-alice").val($("#modal-n-alice").val());
        $("#public-n-alice").val($("#modal-n-alice").val());
    }
}

$("#private-n-alice").on("input", function() {
    $("#public-n-alice").val(this.value);
});

$("#public-n-alice").on("input", function() {
    $("#private-n-alice").val(this.value);
});
