/*----------------------------------------------------------------------------------------*/
/*---------------------------------------Settings-----------------------------------------*/
/*----------------------------------------------------------------------------------------*/

/*align message box heights*/
$( document ).ready( function(){
    update_settings();   
    }
);

function sync_height(){
    var s1 = $('#alice-key-container').height();
    var s2 = $('#oscar-image').height();
    if (s1 > s2)
        $('#oscar-image').css('height', (s1) + "px");
}

/*size of auto generated prime numbers*/
var key_size_alice=8n
var key_size_bob=8n
/*sets the value for the block size to cut strings*/
var slice_size=1
/*which table is used for rsa*/
var msg_num_table=1
/*rsa keys for alice and bob*/
var key_alice=[]
var key_bob=[]
/*caesar keys for alice and bob*/
var key_alice_ceasar=-1;
var key_bob_ceasar=-1;
/*which key is selected*/
var selected_key=-1
/*which view is selected*/
var selected_view=-1
/*which representation of message boxes*/
var modus=1;
/* symmetric ceasar or asymmetric rsa*/
var sym_or_rsa = 0;
/*detects whick send key was pressed last for symmetric enc or dec*/
var send_direction=-1;

function activate_rsa(){
    $('#rsa-settings').css('display','block');
    $('#rsa').addClass('btn-secondary');
    $('#rsa').removeClass('btn-outline-secondary');
    $('#ceasar').addClass('btn-outline-secondary');
    $('#ceasar').removeClass('btn-secondary');
    sym_or_rsa = 1;
}

function activate_ceasar(){
    $('#rsa-settings').css('display','none');
    $('#ceasar').addClass('btn-secondary');
    $('#ceasar').removeClass('btn-outline-secondary');
    $('#rsa').addClass('btn-outline-secondary');
    $('#rsa').removeClass('btn-secondary');
    sym_or_rsa=0;
}

function activate_modus(val){
    if(val==0){
        $('#modus-12-settings').css('display','none');
        $('#modus-0').addClass('btn-secondary');
        $('#modus-1').addClass('btn-outline-secondary');
        $('#modus-2').addClass('btn-outline-secondary');
        $('#modus-0').removeClass('btn-outline-secondary');
        $('#modus-1').removeClass('btn-secondary');
        $('#modus-2').removeClass('btn-secondary');
        modus=0;
    } else if (val==1){
        $('#modus-12-settings').css('display','block');
        $('#modus-1').addClass('btn-secondary');
        $('#modus-0').addClass('btn-outline-secondary');
        $('#modus-2').addClass('btn-outline-secondary');
        $('#modus-1').removeClass('btn-outline-secondary');
        $('#modus-0').removeClass('btn-secondary');
        $('#modus-2').removeClass('btn-secondary');
        modus=1;
    } else if (val==2){
        $('#modus-12-settings').css('display','block');
        $('#modus-2').addClass('btn-secondary');
        $('#modus-0').addClass('btn-outline-secondary');
        $('#modus-1').addClass('btn-outline-secondary');
        $('#modus-2').removeClass('btn-outline-secondary');
        $('#modus-0').removeClass('btn-secondary');
        $('#modus-1').removeClass('btn-secondary');
        modus=2
    }
}

function change_view(name){
    if(name=='alice' && selected_view!=0){ 
        $('#button-alice').addClass('btn-dark text-white');
        $('#button-bob').removeClass('btn-dark text-white');
        $('#button-bob').addClass('btn-outline-dark text-dark');
        $('#button-oscar').removeClass('btn-dark text-white');
        $('#button-oscar').addClass('btn-outline-dark text-dark');
        $('#key-3').css('visibility','hidden');
        $('#key-0').css('visibility','visible');
        $('#bob-msg-container').css('visibility','hidden');
        $('#oscar-msg-container').css('visibility','hidden');
        $('#alice-msg-container').css('visibility','visible');
        selected_view=0;
    } else if(name=='bob' && selected_view!=1){
        $('#button-bob').addClass('btn-dark text-white');
        $('#button-alice').removeClass('btn-dark text-white');
        $('#button-alice').addClass('btn-outline-dark text-dark');
        $('#button-oscar').removeClass('btn-dark text-white');
        $('#button-oscar').addClass('btn-outline-dark text-dark');
        $('#key-0').css('visibility','hidden');
        $('#key-3').css('visibility','visible');
        $('#alice-msg-container').css('visibility','hidden');
        $('#oscar-msg-container').css('visibility','hidden');
        $('#bob-msg-container').css('visibility','visible');
        selected_view=1;
    } else if(name=='oscar' && selected_view!=2){
        $('#button-oscar').addClass('btn-dark text-white');
        $('#button-alice').removeClass('btn-dark text-white');
        $('#button-alice').addClass('btn-outline-dark text-dark');
        $('#button-bob').removeClass('btn-dark text-white');
        $('#button-bob').addClass('btn-outline-dark text-dark');
        $('#key-0').css('visibility','hidden');
        $('#key-3').css('visibility','hidden');
        $('#alice-msg-container').css('visibility','hidden');
        $('#bob-msg-container').css('visibility','hidden');
        $('#oscar-msg-container').css('visibility','visible');
        selected_view=2;
    } else {
        $('#button-alice').removeClass('btn-outline-dark text-dark');
        $('#button-alice').addClass('btn-dark text-white');
        $('#button-bob').removeClass('btn-outline-dark text-dark');
        $('#button-bob').addClass('btn-dark text-white');
        $('#button-oscar').removeClass('btn-outline-dark text-dark');
        $('#button-oscar').addClass('btn-dark text-white');
        $('#alice-msg-container').css('visibility','visible');
        $('#bob-msg-container').css('visibility','visible');
        $('#oscar-msg-container').css('visibility','visible');
        $('#key-0').css('visibility','visible');
        $('#key-3').css('visibility','visible');
        selected_view=-1;
    }
}

var table_easy=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',',','.','?','!',' '];
var table_user_defined=[];


function update_settings(){
    if(modus==0 && sym_or_rsa==1){
        /*change msg view*/
        $('#alice-msg-0').css('display','none')
        $('#alice-msg-1').css('display','none')
        $('#alice-msg-2').css('display','flex')
        $('#alice-msg-3').css('display','flex')
        $('#bob-msg-0').css('display','none')
        $('#bob-msg-1').css('display','none')
        $('#bob-msg-2').css('display','flex')
        $('#bob-msg-3').css('display','flex')
        /*change key view*/
        $('#key-0').removeClass("d-none");
        $('#key-1').removeClass("d-none");
        $('#key-2').removeClass('d-none');
        $('#key-3').removeClass('d-none');
        $('#key-sym-alice').addClass('d-none');
        $('#key-sym-bob').addClass('d-none');
    } else if (modus==1 && sym_or_rsa==1){
        $('#alice-msg-0').css('display','flex')
        $('#alice-msg-1').css('display','none')
        $('#alice-msg-2').css('display','none')
        $('#alice-msg-3').css('display','flex')
        $('#bob-msg-0').css('display','flex')
        $('#bob-msg-1').css('display','none')
        $('#bob-msg-2').css('display','none')
        $('#bob-msg-3').css('display','flex')
        /*change key view*/
        $('#key-0').removeClass("d-none");
        $('#key-1').removeClass("d-none");
        $('#key-2').removeClass('d-none');
        $('#key-3').removeClass('d-none');
        $('#key-sym-alice').addClass('d-none');
        $('#key-sym-bob').addClass('d-none');
    } else if (modus==2 && sym_or_rsa==1){
        $('#alice-msg-0').css('display','flex')
        $('#alice-msg-1').css('display','flex')
        $('#alice-msg-2').css('display','flex')
        $('#alice-msg-3').css('display','none')
        $('#bob-msg-0').css('display','flex')
        $('#bob-msg-1').css('display','flex')
        $('#bob-msg-2').css('display','flex')
        $('#bob-msg-3').css('display','none')
        /*change key view*/
        $('#key-0').removeClass("d-none");
        $('#key-1').removeClass("d-none");
        $('#key-2').removeClass('d-none');
        $('#key-3').removeClass('d-none');
        $('#key-sym-alice').addClass('d-none');
        $('#key-sym-bob').addClass('d-none');
    } else if (modus==0 && sym_or_rsa==0){
        $('#alice-msg-0').css('display','none')
        $('#alice-msg-1').css('display','none')
        $('#alice-msg-2').css('display','flex')
        $('#alice-msg-3').css('display','flex')
        $('#bob-msg-0').css('display','none')
        $('#bob-msg-1').css('display','none')
        $('#bob-msg-2').css('display','flex')
        $('#bob-msg-3').css('display','flex')
        /*change key view*/
        $('#key-0').addClass("d-none");
        $('#key-1').addClass("d-none");
        $('#key-2').addClass("d-none")
        $('#key-3').addClass("d-none");
        $('#key-sym-alice').removeClass("d-none");
        $('#key-sym-bob').removeClass("d-none");
    } else if (modus==1 && sym_or_rsa==0){
        $('#alice-msg-0').css('display','flex')
        $('#alice-msg-1').css('display','none')
        $('#alice-msg-2').css('display','none')
        $('#alice-msg-3').css('display','flex')
        $('#bob-msg-0').css('display','flex')
        $('#bob-msg-1').css('display','none')
        $('#bob-msg-2').css('display','none')
        $('#bob-msg-3').css('display','flex')
        /*change key view*/
        $('#key-0').addClass("d-none");
        $('#key-1').addClass("d-none");
        $('#key-2').addClass("d-none")
        $('#key-3').addClass("d-none");
        $('#key-sym-alice').removeClass("d-none");
        $('#key-sym-bob').removeClass("d-none");
    } else if (modus==2 && sym_or_rsa==0){
        $('#alice-msg-0').css('display','flex')
        $('#alice-msg-1').css('display','flex')
        $('#alice-msg-2').css('display','flex')
        $('#alice-msg-3').css('display','none')
        $('#bob-msg-0').css('display','flex')
        $('#bob-msg-1').css('display','flex')
        $('#bob-msg-2').css('display','flex')
        $('#bob-msg-3').css('display','none')
        /*change key view*/
        $('#key-0').addClass("d-none");
        $('#key-1').addClass("d-none");
        $('#key-2').addClass("d-none")
        $('#key-3').addClass("d-none");
        $('#key-sym-alice').removeClass("d-none");
        $('#key-sym-bob').removeClass("d-none");
    }
    key_size_alice=BigInt($('#key-size-alice').val());
    key_size_bob=BigInt($('#key-size-alice').val());
    slice_size=parseInt($('#slice-size').val());
    msg_num_table=parseInt($('#msg_num_table').val());
    $('#modal-settings').modal('hide');
    sync_height();
}

function close_settings(){
    $('#modal-settings').modal('hide');
}

function select_key(number){
    selected_key=number;
    //$('#key-'+number).addClass("border-dark bg-light");
    if(selected_key==1 || selected_key==2){
        $('#key-'+number).addClass("border-warning border-4 bg-light");
    } else{ 
        $('#key-'+number).addClass("border-success border-4 bg-light");
    }
    for(var i=0;i!=number,i<4;i++){
        if(i!=number){
            $('#key-'+i).removeClass("border-dark bg-light border-4 border-warning border-success");
        }
    }
}

/*-------------------------SYNC VALUES----------------------------------------*/


/*sync n alice*/
function update_modal_n_alice(){
    $("#modal-n-alice-textfield").val($("#private-n-alice").val());
}

$("#private-n-alice").on("input", function() {
    $("#public-n-alice").val(this.value);
});

$("#public-n-alice").on("input", function() {
    $("#private-n-alice").val(this.value);
});

$("#modal-n-alice-textfield").on("input", function() {
    $("#private-n-alice").val(this.value);
    $("#public-n-alice").val(this.value);
});

/*sync d alice*/
function update_modal_private_d_alice(){
    $("#modal-private-d-alice-textfield").val($("#private-d-alice").val());
}

$("#modal-private-d-alice-textfield").on("input", function() {
    $("#private-d-alice").val(this.value);
});

/*sync e alice*/
function update_modal_public_e_alice(){
    $("#modal-public-e-alice-textfield").val($("#public-e-alice").val());
}

$("#modal-public-e-alice-textfield").on("input", function() {
    $("#public-e-alice").val(this.value);
});

/*sync n bob*/
function update_modal_n_bob(){
    $("#modal-n-bob-textfield").val($("#private-n-bob").val());
}

$("#private-n-bob").on("input", function() {
    $("#public-n-bob").val(this.value);
});

$("#public-n-bob").on("input", function() {
    $("#private-n-bob").val(this.value);
});

$("#modal-n-bob-textfield").on("input", function() {
    $("#private-n-bob").val(this.value);
    $("#public-n-bob").val(this.value);
});

/*sync d bob*/
function update_modal_private_d_bob(){
    $("#modal-private-d-bob-textfield").val($("#private-d-bob").val());
}

$("#modal-private-d-bob-textfield").on("input", function() {
    $("#private-d-bob").val(this.value);
});

/*sync e bob*/
function update_modal_public_e_bob(){
    $("#modal-public-e-bob-textfield").val($("#public-e-bob").val());
}

$("#modal-public-e-bob-textfield").on("input", function() {
    $("#public-e-bob").val(this.value);
});



/*----------------------------------------------------------------------------------------*/
/*---------------------------------------App----------------------------------------------*/
/*----------------------------------------------------------------------------------------*/

function gen_key(name){
    /*input: alice or bob --> generate key pair with prime number size from settings (standard = 8bit)*/
    if(name=='alice' && sym_or_rsa==1){
        [n,e,d]=rsaKey(key_size_alice);
        key_alice=[n,e,d];
        $('#private-n-alice').val(n);
        $('#private-d-alice').val(d);
        $('#public-n-alice').val(n);
        $('#public-e-alice').val(e);
        if(msg_num_table==1 && slice_size==1 && modus!=0){
            if(n<=table_easy.length){
                console.log("n to small")
                $('#private-n-alice').addClass('is-invalid') 
                $('#public-n-alice').addClass('is-invalid') 
            } else {
                $('#private-n-alice').removeClass('is-invalid') 
                $('#public-n-alice').removeClass('is-invalid') 
            }
        } else {
            $('#private-n-alice').removeClass('is-invalid') 
            $('#public-n-alice').removeClass('is-invalid') 
        }    
    } else if(name=='bob' && sym_or_rsa==1){
        [n,e,d]=rsaKey(key_size_bob);
        key_bob=[n,e,d];
        $('#private-n-bob').val(n);
        $('#private-d-bob').val(d);
        $('#public-n-bob').val(n);
        $('#public-e-bob').val(e);
        if(msg_num_table==1 && slice_size==1 && (modus!=0)){
            if(n<=table_easy.length){
                $('#private-n-bob').addClass('is-invalid') 
                $('#public-n-bob').addClass('is-invalid') 
            } else {
                $('#private-n-bob').removeClass('is-invalid') 
                $('#public-n-bob').removeClass('is-invalid') 
            }
        } else {
            $('#private-n-bob').removeClass('is-invalid') 
            $('#public-n-bob').removeClass('is-invalid') 
        }
    } else if(sym_or_rsa==0){
        var k = Math.ceil(Math.random()*25);
        $('#secret-key-'+name).val(k);
        if(name=='alice'){
            key_alice_ceasar=k;
        } else {
            key_bob_ceasar=k;
        }
    }
}

function check_key_pairs(){
    /*todo: check if user entrys for key is correct*/
    if(sym_or_rsa==1){
        key_alice=[parseInt($('#private-n-alice').val()),parseInt($('#public-e-alice').val()),parseInt($('#private-d-alice').val())];
        key_bob=[parseInt($('#private-n-bob').val()),parseInt($('#public-e-bob').val()),parseInt($('#private-d-bob').val())];
    } else {
        key_alice_ceasar=parseInt($('#secret-key-alice').val());
        key_bob_ceasar=parseInt($('#secret-key-bob').val());
        if(key_alice_ceasar!=key_bob_ceasar){
            $('#secret-key-alice').addClass("is-invalid");
            $('#secret-key-bob').addClass("is-invalid");
        } else { 
            $('#secret-key-alice').removeClass("is-invalid");
            $('#secret-key-bob').removeClass("is-invalid");
        }
    }
}

function use_key(name){
    /*check for correct key pair (function above)*/
    check_key_pairs();
    /*use selected key on integer array*/
    if(name=='alice' && selected_key!=3 && sym_or_rsa==1){
        if(selected_key==0){        
            decMsg_app('alice',key_alice[0],key_alice[2]);
        } else if(selected_key==1) { 
            if(modus==1){
               msg2int_app('alice') 
            }
            encMsg_app('alice',key_alice[0],key_alice[1]);
        } else if(selected_key==2){
            if(modus==1){
               msg2int_app('alice') 
            }
            encMsg_app('alice',key_bob[0],key_bob[1]);
        }
    } else if(name=='alice' && selected_key==3 && sym_or_rsa==1) {
        alert("Dieser Schlüssel ist ein Geheimnis von Bob.")
    } else if(name=='alice' && sym_or_rsa==0){
        if(modus==1){
            msg2int_app('alice');
        }
        if(send_direction==0 || send_direction==-1){
            encMsg_ceasar_app('alice',key_alice_ceasar);
        } else {
            decMsg_ceasar_app('alice',key_alice_ceasar);
            send_direction=-1;
        }
    }

    if(name=='bob' && selected_key!=0 && sym_or_rsa==1){
        if(selected_key==1){        
            if(modus==1){
               msg2int_app('bob') 
            }
            encMsg_app('bob',key_alice[0],key_alice[1]);
        } else if(selected_key==2) { 
            if(modus==1){
               msg2int_app('bob') 
            }
            encMsg_app('bob',key_bob[0],key_bob[1]);
        } else if(selected_key==3){
            decMsg_app('bob',key_bob[0],key_bob[2]);
        }
    } else if(name=='bob' && selected_key==0 && sym_or_rsa==1){
        alert("Dieser Schlüssel ist ein Geheimnis von Alice.")
    } else if(name=='bob' && sym_or_rsa==0){
        if(modus==1){
            msg2int_app('bob');
        }
        if(send_direction==1 || send_direction==-1){
            encMsg_ceasar_app('bob',key_bob_ceasar);
        } else {
            decMsg_ceasar_app('bob',key_bob_ceasar);
            send_direction=-1;
        }
    }
}



function msg2int_app(name){
    /*convert message to ints, from settings use table and slice size*/
    if(name=="alice" && sym_or_rsa == 1){
        if(msg_num_table==1){
            var arr = msg2int($('#msg-alice').val(),slice_size,table_easy);
        } else if(msg_num_table==2){
            var arr = msg2int($('#msg-alice').val(),slice_size);
        } else if(msg_num_table==3){ 
            var arr = msg2int($('#msg-alice').val(),slice_size,table_user_defined);
        }
        $('#num-alice').val(arr)
    } else {
        /*use ceasar mapping*/
        var arr = msg2int_ceasar($('#msg-alice').val());
        $('#num-alice').val(arr);
    }
    if(name=="bob" && sym_or_rsa == 1){
        if(msg_num_table==1){
            var arr = msg2int($('#msg-bob').val(),slice_size,table_easy);
        } else if(msg_num_table==2){
            var arr = msg2int($('#msg-bob').val(),slice_size);
        } else if(msg_num_table==3){ 
            var arr = msg2int($('#msg-bob').val(),slice_size,table_user_defined);
        }
        $('#num-bob').val(arr)
    } else {
        /*use ceasar mapping*/
        var arr = msg2int_ceasar($('#msg-bob').val());
        $('#num-bob').val(arr);
    }
}

function int2msg_app(name){
    /*convert ints seperated by comma to message --> use table from settings*/
    if(name=="alice" && sym_or_rsa == 1){
        var arr= $('#num-alice').val().split(',');
        if(msg_num_table==1){
            $('#msg-alice').val(int2msg(arr,table_easy));
        } else if(msg_num_table==2){
            $('#msg-alice').val(int2msg(arr));
        } else if(msg_num_table==3){ 
            $('#msg-alice').val(int2msg(arr,table_user_defined));
        }
    } else { 
            var arr= $('#num-alice').val().split(',');
            $('#msg-alice').val(int2msg_ceasar(arr));
    }
    if(name=="bob" && sym_or_rsa == 1){
        var arr= $('#num-bob').val().split(',');
        if(msg_num_table==1){
            $('#msg-bob').val(int2msg(arr,table_easy));
        } else if(msg_num_table==2){
            $('#msg-bob').val(int2msg(arr));
        } else if(msg_num_table==3){ 
            $('#msg-bob').val(int2msg(arr,table_user_defined));
        }
    } else {
            var arr= $('#num-bob').val().split(',');
            $('#msg-bob').val(int2msg_ceasar(arr));
    }
}

function encMsg_app(name,key_val1,key_val2){
    /*gets int value from app -> encMsg in rsa.js -> ...*/
    var org= $('#num-'+name).val().split(',');
    for(var i=0;i<org.length;i++){
        org[i]=BigInt(org[i]);
        /*check if input ist correct org[i]<n*/
        if(key_val1<=org[i]){
            $('#num-'+name).addClass('is-invalid');
        } else { 
            $('#num-'+name).removeClass('is-invalid');
        }
    }
    if(msg_num_table==1){
        var enc = encMsg(key_val1,key_val2,org,table_easy);
    } else if(msg_num_table==2){
        var enc = encMsg(key_val1,key_val2,org);
    } else if(msg_num_table==3){ 
        var enc = encMsg(key_val1,key_val2,org,table_user_defined);
    }
    $('#msg-'+name).val(enc[1]);
    $('#num-'+name).val(enc[0]);
}

function encMsg_ceasar_app(name,key){ 
    var org= $('#num-'+name).val().split(',');
    for(var i=0;i<org.length;i++){
        org[i]=parseInt(org[i]);
    }
    var enc = encMsg_ceasar(org,key);
    $('#msg-'+name).val(enc[1]);
    $('#num-'+name).val(enc[0]);
}

function decMsg_app(name,key_val1,key_val2){
    /*gets int value from app -> decMsg in rsa.js -> ...*/
    var org= $('#num-'+name).val().split(',');
    for(var i=0;i<org.length;i++){
        org[i]=BigInt(org[i]);
    }
    if(msg_num_table==1){
        var dec = decMsg(key_val1,key_val2,org,table_easy);
    } else if(msg_num_table==2){
        var dec = decMsg(key_val1,key_val2,org);
    } else if(msg_num_table==3){ 
        var dec = decMsg(key_val1,key_val2,org,table_user_defined);
    }
    $('#num-'+name).val(dec[0]);
    $('#msg-'+name).val(dec[1]);
}

function decMsg_ceasar_app(name,key){
    var org= $('#num-'+name).val().split(',');
    for(var i=0;i<org.length;i++){
        org[i]=parseInt(org[i]);
    }
    var dec = decMsg_ceasar(org,key);
    $('#msg-'+name).val(dec[1]);
    $('#num-'+name).val(dec[0]);

}

function send_msg(name){
    /*send message between alice and bob*/
    if(name=='alice'){
        var msg = $('#msg-alice').val();
        var num = $('#num-alice').val();
        if(modus==0){
            $('#inet').val(num);
            $('#num-bob').val(num);
        } else if (modus==1){
            $('#inet').val(msg);
            $('#msg-bob').val(msg);
            $('#num-bob').val(num);
        } else if (modus==2){
            $('#inet').val(num);
            $('#num-bob').val(num);
            $('#msg-bob').val('');
        }
        send_direction=0;
    }
    if(name=='bob'){
        var msg = $('#msg-bob').val();
        var num = $('#num-bob').val();
        if(modus==0){
            $('#inet').val(num);
            $('#num-alice').val(num);
        } else if (modus==1){
            $('#inet').val(msg);
            $('#msg-alice').val(msg);
            $('#num-alice').val(num);
        } else if (modus==2){
            $('#inet').val(num);
            $('#num-alice').val(num);
            $('#msg-alice').val('');
        }
        send_direction=1;
    }
}



