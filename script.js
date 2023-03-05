var key_size_alice=4n
var key_size_bob=4n
var slice_size=1
var msg_num_table=1
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

function update_settings(){
    if(modus==0){
        $('#alice-learning-0').css('display','none')
        $('#alice-learning-1').css('display','none')
        $('#alice-learning-2').css('display','flex')
        $('#alice-learning-3').css('display','flex')
        $('#bob-learning-0').css('display','none')
        $('#bob-learning-1').css('display','none')
        $('#bob-learning-2').css('display','flex')
        $('#bob-learning-3').css('display','flex')
    } else if (modus==1){
        $('#alice-learning-0').css('display','flex')
        $('#alice-learning-1').css('display','none')
        $('#alice-learning-2').css('display','none')
        $('#alice-learning-3').css('display','flex')
        $('#bob-learning-0').css('display','flex')
        $('#bob-learning-1').css('display','none')
        $('#bob-learning-2').css('display','none')
        $('#bob-learning-3').css('display','flex')
    } else if (modus==2){
        $('#alice-learning-0').css('display','flex')
        $('#alice-learning-1').css('display','flex')
        $('#alice-learning-2').css('display','flex')
        $('#alice-learning-3').css('display','none')
        $('#bob-learning-0').css('display','flex')
        $('#bob-learning-1').css('display','flex')
        $('#bob-learning-2').css('display','flex')
        $('#bob-learning-3').css('display','none')
    }
    key_size_alice=BigInt($('#key-size-alice').val());
    key_size_bob=BigInt($('#key-size-alice').val());
    slice_size=parseInt($('#slice-size').val());
    msg_num_table=parseInt($('#msg_num_table').val());
    $('#modal-settings').modal('hide');
}

function close_settings(){
    $('#modal-settings').modal('hide');
}

function gen_key(name){
    if(name=='alice'){
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
    } else if(name=='bob'){
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
    }
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

function msg2int_app(name){
    if(name=="alice"){
        if(msg_num_table==1){
            var arr = msg2int($('#msg-alice').val(),slice_size,table_easy);
        } else if(msg_num_table==2){
            var arr = msg2int($('#msg-alice').val(),slice_size);
        } else if(msg_num_table==3){ 
            var arr = msg2int($('#msg-alice').val(),slice_size,table_user_defined);
        }
        $('#num-alice').val(arr)
    }
    if(name=="bob"){
        if(msg_num_table==1){
            var arr = msg2int($('#msg-bob').val(),slice_size,table_easy);
        } else if(msg_num_table==2){
            var arr = msg2int($('#msg-bob').val(),slice_size);
        } else if(msg_num_table==3){ 
            var arr = msg2int($('#msg-bob').val(),slice_size,table_user_defined);
        }
        $('#num-bob').val(arr)
    }

}

function int2msg_app(name){
    if(name=="alice"){
        var arr= $('#num-alice').val().split(',');
        if(msg_num_table==1){
            $('#msg-alice').val(int2msg(arr,table_easy));
        } else if(msg_num_table==2){
            $('#msg-alice').val(int2msg(arr));
        } else if(msg_num_table==3){ 
            $('#msg-alice').val(int2msg(arr,table_user_defined));
        }
    }
    if(name=="bob"){
        var arr= $('#num-bob').val().split(',');
        if(msg_num_table==1){
            $('#msg-bob').val(int2msg(arr,table_easy));
        } else if(msg_num_table==2){
            $('#msg-bob').val(int2msg(arr));
        } else if(msg_num_table==3){ 
            $('#msg-bob').val(int2msg(arr,table_user_defined));
        }
    }
}


function use_key(name){
    if(name=='alice' && selected_key!=3){
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
    } else if(name=='alice' && selected_key==3) {
        alert("Dieser Schlüssel ist ein Geheimnis von Bob.")
    }

    if(name=='bob' && selected_key!=0){
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
    } else if(name=='bob' && selected_key==0){
        alert("Dieser Schlüssel ist ein Geheimnis von Alice.")
    }
}

var table_easy=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',',','.','?','!',' '];
var table_user_defined=[];

function encMsg_app(name,key_val1,key_val2){
    var org= $('#num-'+name).val().split(',');
    for(var i=0;i<org.length;i++){
        org[i]=BigInt(org[i]);
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

function decMsg_app(name,key_val1,key_val2){
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

function send_msg(name){
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
    }
}

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


var modus=0;
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
