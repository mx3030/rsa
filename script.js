var key_size_alice=32n
var key_size_bob=32n
var key_alice=[]
var key_bob=[]
var selected_key=-1
var selected_view=-1

function change_view(name){
    if(name=='alice' && selected_view!=0){ 
        $('#button-alice').addClass('btn-dark text-white');
        $('#button-bob').removeClass('btn-dark text-white');
        $('#button-bob').addClass('btn-outline-dark text-dark');
        $('#button-oscar').removeClass('btn-dark text-white');
        $('#button-oscar').addClass('btn-outline-dark text-dark');
        $('#key-3').css('visibility','hidden');
        $('#key-0').css('visibility','visible');
        $('#col-bob').css('visibility','hidden');
        $('#col-oscar').css('visibility','hidden');
        $('#col-alice').css('visibility','visible');
        selected_view=0;
    } else if(name=='bob' && selected_view!=1){
        $('#button-bob').addClass('btn-dark text-white');
        $('#button-alice').removeClass('btn-dark text-white');
        $('#button-alice').addClass('btn-outline-dark text-dark');
        $('#button-oscar').removeClass('btn-dark text-white');
        $('#button-oscar').addClass('btn-outline-dark text-dark');
        $('#key-0').css('visibility','hidden');
        $('#key-3').css('visibility','visible');
        $('#col-alice').css('visibility','hidden');
        $('#col-oscar').css('visibility','hidden');
        $('#col-bob').css('visibility','visible');
        selected_view=1;
    } else if(name=='oscar' && selected_view!=2){
        $('#button-oscar').addClass('btn-dark text-white');
        $('#button-alice').removeClass('btn-dark text-white');
        $('#button-alice').addClass('btn-outline-dark text-dark');
        $('#button-bob').removeClass('btn-dark text-white');
        $('#button-bob').addClass('btn-outline-dark text-dark');
        $('#key-0').css('visibility','hidden');
        $('#key-3').css('visibility','hidden');
        $('#col-alice').css('visibility','hidden');
        $('#col-bob').css('visibility','hidden');
        $('#col-oscar').css('visibility','visible');
        selected_view=2;
    } else {
        $('#button-alice').removeClass('btn-outline-dark text-dark');
        $('#button-alice').addClass('btn-dark text-white');
        $('#button-bob').removeClass('btn-outline-dark text-dark');
        $('#button-bob').addClass('btn-dark text-white');
        $('#button-oscar').removeClass('btn-outline-dark text-dark');
        $('#button-oscar').addClass('btn-dark text-white');
        $('#col-alice').css('visibility','visible');
        $('#col-bob').css('visibility','visible');
        $('#col-oscar').css('visibility','visible');
        $('#key-0').css('visibility','visible');
        $('#key-3').css('visibility','visible');
        selected_view=-1;
    }
}

function update_settings_alice(){
    key_size_alice=BigInt($('#key-size-alice').val())
}

function gen_key(name){
    if(name=='alice'){
        [n,e,d]=rsaKey(key_size_alice);
        key_alice=[n,e,d];
        $('#private-n-alice').val(n);
        $('#private-d-alice').val(d);
        $('#public-n-alice').val(n);
        $('#public-e-alice').val(e);
    } else if(name=='bob'){
        [n,e,d]=rsaKey(key_size_bob);
        key_bob=[n,e,d];
        $('#private-n-bob').val(n);
        $('#private-d-bob').val(d);
        $('#public-n-bob').val(n);
        $('#public-e-bob').val(e);
    }
}

function select_key(number){
    selected_key=number;
    //$('#key-'+number).addClass("border-dark bg-light");
    if(selected_key==1 || selected_key==2){
        $('#key-'+number).addClass("border-warning border-3 bg-light");
    } else{ 
        $('#key-'+number).addClass("border-success border-3 bg-light");
    }
    for(var i=0;i!=number,i<4;i++){
        if(i!=number){
            $('#key-'+i).removeClass("border-dark bg-light border-3 border-warning border-success");
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
