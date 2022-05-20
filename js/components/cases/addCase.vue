<template>
<div class="parent" id="parent">
        <div class="addcase_header2">
            <div class="addcase_header2content">
                <div class="addcase_child addcase_header2Image">
                    <i class="fa-solid fa-file-circle-plus"></i>
                </div>
                <div class="addcase_child addcase_header2Text">
                    ADD CASE
                </div>

            </div>
        </div>

        <form class="case_inputs" id="inputs" @submit.prevent="CaseInsert">
            <div class="pos" id="pos">
            <div class="circle">
                <i class="fa-solid fa-map-location-dot iconFilter"></i>
                <label for="circle" class="inputsName">Circle</label>
                <br>
                <input type="text" id="circle" class="inputsText" v-model="caseForm.Case_id">
            </div>
            <div class="case_type">
                <i class="fa-solid fa-file-archive iconFilter"></i>
                <label for="case_type" class="inputsName">Case Type</label>
                <br>
                <input type="text" id="case_type" class="inputsText" v-model="caseForm.Case_type">
            </div>
            <div class="contender_attachments">
                <i class="fa-solid fa-paperclip iconFilter"></i>
                <label for="contender_attachments" class="inputsName file">Case Attachment</label>
                <br>
                <input type="file" id="contender_attachments" class="case_attch" name="upload" @change="onFileSelected">

            </div>
            <div class="court">
                <i class="fa-solid fa-building-shield iconFilter"></i>
                <label for="court" class="inputsName">Court</label>
                <br>
                <select name="activity" class="inputsSelect" id="court" v-model="caseForm.Court_no">
                    <option :value="court.id" v-for="court in courts" :key="court.id" >{{court.name}}</option>

                </select>
            </div>
            <div class="contender">
                <i class="fa-solid fa-person-circle-xmark iconFilter"></i>
                <label for="contender" class="inputsName">Contender</label>
                <br>
                <input type="text" id="contender" class="inputsText" v-model="caseForm.contender">
            </div>

            <div class="title">
                <i class="fa-solid fa-person-circle-xmark iconFilter"></i>
                <label for="title" class="inputsName">Title</label>
                <br>
                <input type="text" id="title" class="inputsText" v-model="caseForm.Title">
            </div>


            <div class="session">

                <button  type="button" class="go_session" id="go_session" @click="session_show()" disabled><i class="fa fa-user"></i> Session</button>

            </div>
            <div class="expert_session">

                <button type="button" class="go_exsession" id="go_exsession" @click="expert_session_show()" disabled> <i class="fa fa-user-doctor"></i> Expert Session</button>
            </div>

            <div class="expenses" >
                <i class="fa-solid fa-money-bill-trend-up iconFilter"></i>
                <label for="expenses" class="inputsName">Expenses</label>
                <br>
                <input type="text" id="expenses" class="inputsText" @click="expense_show()" placeholder="you can add expenses in the edit page" disabled >
            </div>
            <div class="payment">
                <i class="fa-solid fa-money-check-dollar iconFilter"></i>
                <label for="payment" class="inputsName">Payment</label>
                <br>
                <input type="text" id="payment" class="inputsText" @click="payment_show()" placeholder="you can add payments in the edit page" disabled>
            </div>
            <div class="client">
                <i class="fa-solid fa-person-circle-check iconFilter"></i>
                <label for="client" class="inputsName">Client</label>
                <br>
                <select name="activity" id="client" class="inputsSelect" v-model="caseForm.client_name">
                    <option :value="client.name" v-for="client in clients" :key="client.id">{{client.name}}</option>
                </select>
            </div>

            <button type="button" class="button_add addcase_btn" @click="add_show()"> + </button>

            <div class="investigation">
                <button type="button" class="go_investigation" id="go_investigation" @click="investigationtan_show()" disabled ><i class="fa fa-user-secret "></i> Investigation</button>
            </div>
            <div class="content">
                <i class="fa-solid fa-note-sticky iconFilter"></i>
                <label for="content" class="inputsName">Content</label>
                <br>
                <textarea name="content" class="inputsText" id="content" cols="30" rows="10" v-model="caseForm.Content"></textarea>

            </div>
            <div class="notes">
                <i class="fa-solid fa-book-bookmark iconFilter"></i>
                <label for="notes" class="inputsName">Notes</label>
                <br>
                <textarea name="notes" class="inputsText" id="notes" cols="30" rows="10" v-model="caseForm.Note"></textarea>

            </div>

            <div class="addcase_buttons">
            <button type="submit" class="addcase_send addcase_btn" onclick=""><i class="fa fa-save" aria-hidden="true"></i> SAVE</button>
            <br>
            <router-link to="/cases"><button type="button" class="addcase_back addcase_btn" > <i class="fa fa-backward" aria-hidden="true"></i> BACK </button></router-link>
            </div>
        </div>

        </form>
</div>
</template>

<script>
export default {
        created(){
            if(!User.loggedIn()){
                this.$router.push({name:'/'})
            }
            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/clients')
            .then((response) =>{(this.clients=response.data.data);})
            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/courts')
            .then((response) =>{(this.courts=response.data.data);})

        },
        data(){
            return{
                cases:[],
                errors:{},
                clients:{
                    name:'',
                },
                courts:{
                    name:'',
                    id:'',
                },
                clientForm:{
                    name:null,
                    email:null,
                    phone:null,
                    address:null,
                    Client_National_Number:null,
                    Lawyer_id:null,
                },
                caseForm:{
                    Title:null,
                    Case_id:null,
                    contender:null,
                    Case_type:null,
                    Court_no:null,
                    Content:null,
                    client_name:null,
                    Note:null,
                    Attachment:null,
                    Lawyer_id:null,
                }
            }
        },

    methods:{
        clientInsert(){
                this.clientForm.Lawyer_id=localStorage.getItem("ID");
                axios.post('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/clients',this.clientForm)
                .then(()=>
                {
                    this.add_hide();
                    Toast.fire({ icon: 'success', title: 'Client Added Successfully',})
                    axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/clients')
                    .then((response) =>{(this.clients=response.data.data);})
                    })
                .catch(error=>{
                    this.errors=error.response.data.errors;
                    Toast.fire({ icon: 'error', title: this.errors.Client_National_Number[0],})
                    Toast.fire({ icon: 'error', title: this.errors.email[0],})
                    Toast.fire({ icon: 'error', title: this.errors.name[0],})
                    })},

        CaseInsert(){
                this.caseForm.Lawyer_id=localStorage.getItem("ID");
                axios.post('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/cases',this.caseForm)
                .then(()=>
                {
                    this.$router.push({name:'cases'})
                    Toast.fire({ icon: 'success', title: 'Client Added Successfully',})
                    })
                .catch(error=>{
                    this.errors=error.response.data.errors;
                    Toast.fire({ icon: 'error', title: this.errors.Title[0],})
                    Toast.fire({ icon: 'error', title: this.errors.client_name[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Court_no[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Case_id[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Case_type[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Content[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Note[0],})
                    Toast.fire({ icon: 'error', title: this.errors.contender[0],})
                    })},

        onFileSelected(event) {
            let file = event.target.files[0];
            if (file.size > 1048770) {
                Toast.fire({
                icon: 'error',
                title: 'attachment should be at most 1MB'})
            } else {
                let reader = new FileReader();
                reader.onload = (event) => {
                    this.caseForm.Attachment = event.target.result;
                    console.log(event.target.result);
                    let f=this.caseForm.Attachment.indexOf("/");
                    let l=this.caseForm.Attachment.indexOf(";") - f;
                    let ext = this.caseForm.Attachment.substr(f+1, l-1);
                    if(ext != "png" && ext != "jpeg" && ext != "jpg" && ext != "pdf"){
                Toast.fire({
                    icon: 'info',
                    title: 'Allowed Types(png,jpg,jpeg,pdf)'})
                this.caseForm.Attachment=null;
                    }
                };
                reader.readAsDataURL(file);
                }
        },

        //tabs
        payment_hide() {
            var paymenttap = document.getElementById("payment_tap");
            var pos = document.getElementById("pos");
            paymenttap.style.display="none";
            pos.style.opacity="100%";
                    },
        payment_show(){
                var paymenttap = document.getElementById("payment_tap");
                var pos = document.getElementById("pos");
                paymenttap.style.display="block";
                pos.style.opacity="20%";
            },
        expense_hide() {
            var expensetap = document.getElementById("expense_tap");
            var pos = document.getElementById("pos");
            expensetap.style.display="none";
            pos.style.opacity="100%";
                        },
        expense_show(){
                var expensetap = document.getElementById("expense_tap");
                var pos = document.getElementById("pos");
                expensetap.style.display="block";
                pos.style.opacity="20%";
            },
        add_hide(){
                        var addtap = document.getElementById("add_tap");
                        var pos = document.getElementById("pos");
                        addtap.style.display="none";
                        pos.style.opacity="100%";

                        document.getElementById('client list').value = null
                        document.getElementById('national nummber').value = null
                        document.getElementById('address').value = null
                        document.getElementById('Email').value = null
                        document.getElementById('phone nummber').value = null
                    },
        add_show(){
                var addtap = document.getElementById("add_tap");
                var pos = document.getElementById("pos");
                addtap.style.display="block";
                pos.style.opacity="20%";
            },
        session_show(){
                    var sessiontap = document.getElementById("session_tap");
                    var pos = document.getElementById("pos");
                    sessiontap.style.display="block";
                    pos.style.opacity="20%";
                    },
        session_hide(){
                    var sessiontap = document.getElementById("session_tap");
                    var pos = document.getElementById("pos");
                    sessiontap.style.display="none";
                    pos.style.opacity="100%";
                    },
        expert_session_show(){
                    var exsessiontap = document.getElementById("expertsession_tap");
                    var pos = document.getElementById("pos");
                    exsessiontap.style.display="block";
                    pos.style.opacity="20%";
                    },
        expert_session_hide(){
                    var exsessiontap = document.getElementById("expertsession_tap");
                    var pos = document.getElementById("pos");
                    exsessiontap.style.display="none";
                    pos.style.opacity="100%";
                    },
        investigationtan_show(){
                    var investigationtab = document.getElementById("investigation_tap");
                    var pos = document.getElementById("pos");
                    investigationtab.style.display="block";
                    pos.style.opacity="20%";
                    },
        investigationtan_hide(){
                    var investigationtab = document.getElementById("investigation_tap");
                    var pos = document.getElementById("pos");
                    investigationtab.style.display="none";
                    pos.style.opacity="100%";
                    },
    }
}
</script>

<style>
.title {
    top: 200px;
    position: relative;
    left: 920px;
}
.btn_active{
    background-color: #494949;
    color: #D8C690;
    font-family: "Quicksand", sans-serif;
    border: none;
}
.case_tabs_btn{
    margin: 20px 0 0 0;
    box-sizing: border-box;
    background-color: #494949;
    border-radius: 1px;
    border: none;
    font-family: "Quicksand", sans-serif;
    font-size: 18px;
    color: #D8C690;
    padding: 0px;
    margin-right: 17px;
    text-align: center;
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    opacity: 95%;
    -webkit-border-radius: 1px;
}
.payment_tap hr,.expense_tap hr{
    left: 85px;
}
.file{
    height: 42px;
}
textarea{
    border:groove;
}
.case_inputs textarea {
background-color: white;
max-height: 200px;
}
.case_attch{
    height: 42px;
    background-color:transparent;
}
.case_hr{

    box-sizing: border-box;
    position: relative;
    left: 0px;
    top: 50px;
    background-color: #D8C690;
    border: solid 0.5px;
    border-color: #D8C690;
    margin-top: -1%;
    opacity: 50%;
    width: 59%;
}

.addcase_save2,.addcase_save3, .addcase_back ,.addcase_save,.addcase_send,.go_session,.go_exsession,.go_investigation{
    margin:20px 0 0 0;
    box-sizing: border-box;
    background-color: #494949;
    border-radius: 1px;
    border:none;
    font-family: "Quicksand", sans-serif;
    font-size: 18px;
    color: #D8C690;
    padding: 0px;
    margin-right: 17px;
    text-align: center;
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    opacity: 95%;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    -ms-border-radius: 1px;
    -o-border-radius: 1px;
}

.addcase_save,.addcase_back,.addcase_save2,.addcase_save3,.addcase_send{
    height: 40px;
    width: 150px;
}


.addcase_buttons{
    position: absolute;
    left: 920px;
    top: 422px;
    display: flex;
    flex-direction: row;
}

.addcase_btn{
    border-radius: 1px;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    -ms-border-radius: 1px;
    -o-border-radius: 1px;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -ms-transition: 0.2s;
    -o-transition: 0.2s;
}

.addcase_btn:hover{
    background-color: #696969;
}
.addcase_btn:active{
    background-color: #313131;
    box-shadow: 3px 2px 20px 1px rgba(0, 0, 0, 0.24);
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -o-transform: scale(0.9);
}

.addcase_btn:hover{
    background-color: #696969;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -ms-transition: 0.2s;
    -o-transition: 0.2s;
}
.addcase_btn:active{
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -o-transform: scale(0.9);
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
}

.case_inputs ::placeholder{
    box-sizing: border-box;
    color: #363636;;
}

.addcase_header2{
    background-color: #5E5C5C;
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 0;
    color:#D8C690;
}

.addcase_header2content{
    display: flex;
    flex-direction: row;
    width: 50%;
}

.addcase_header2Image{
    height: 100%;
    width: 68px;
    margin-top: 5px;
    margin-left: 10px;
    position: relative;
    top: 14px;
    left: 20px;
    font-size: xx-large;

}

.addcase_header2Text{
    color: #D8C690;
    font-family: 'Saira Extra Condensed', sans-serif;
    font-size: 30px;
    font-weight: 00;
    margin-top: 14px;
    width: 27px;
    margin-left: -567px;
}

.addcase_child{
    flex: 1;
}

.addcase_child:first-child {
    margin-right: 0px;
}

.case_inputs{
    background-color:#F4F4F4;
    position: absolute;
    top: 86px;
    left: 33px;
    width: 1393px;
    height: 514px;
    padding-left: 10px;
}

input{
    margin-top: -5px;
    font-family: "Quicksand", sans-serif;
    height: 30px;
    width: 300px;
    font-size: 15px;
    line-height: 36px;
    opacity: 90%;
    width: 250px;
}

.inputsText{
    margin-top: 17px;
    height: 30px;
    width: 300px;
    padding-left: 10px;
    font-family: "Quicksand", sans-serif;
}

.inputsName{
    font-family: "Quicksand", sans-serif;
}

.iconFilter{
    filter: invert(0.7);
    -webkit-filter: invert(0.7);
}

h3{
    margin-bottom: 2%;

}
/*first row*/
.circle{
    position:absolute;
    top: 0px;
    left: 20px;
}
.court{
    position:absolute;
    top: 0px;
    left: 470px;
}

#court{
    width: 316px;
}

.case_type{
    position:absolute;
    top: 0px;
    left: 920px;
}

.contender_attachments input, .client_attachments input{
    border: none;
    color: #363636;
}
.contender_attachments{
    position:absolute;
    top: 90px;
    left: 920px;
}
.inputsSelect{
    margin-top: 15px;
    width: 281px;
    height: 36px;
    font-family: "Quicksand", sans-serif;
    padding-left: 10px;
}
/**/
/*second row*/
.contender{
    position:absolute;
    top: 90px;
    left: 470px;
}
.session{
    position:absolute;
    top: 295px;
    left: 920px;
}
.expert_session{
    position: absolute;
    top: 295px;
    left: 1087px;
}

.go_session{
    height: 40px;
    width: 150px;
    position: absolute;
}
.go_exsession{
    height: 40px;
    width: 150px;
    position: absolute;
}
.session input:hover ,.investigation input:hover,.expert_session input:hover{
    background-color: #ffffff;
}
.session input ,.investigation input,.expert_session input{
    color: #000000;
    font-weight: bold;
    cursor:pointer;

}

.expense_tap,.payment_tap{
    background-color: #5E5C5C;
    box-sizing: border-box;
    border-radius: 5%;
    position: fixed;
    top: 224px;
    left: 571px;
    width: 419px;
    height: 340px;
}
.label1{
    position: absolute;
    top: 160px;
    left: 63px;
}
.label2{
    position: absolute;
    top: 224px;
    left: 63px;
}
.label3{
    position: absolute;
    top: 99px;
    left: 80px;
}
.case_inputs table{
    text-align: center;
    font-family: "Quicksand", sans-serif;
    background-color: #cfcfcf;
    width: 100%;
    overflow-x: hidden;
}
.searchResult{
    position: relative;
    top: 32px;
    left: 11%;
    overflow-y: scroll;
    overflow-x: scroll;
    width: 80%;
    max-height: 112px;

}
.expense_tap input ,.payment_tap input{
    border: none;
    background-color: #5E5C5C;
    color: #D8C690;
    position: relative;
    left: 85px;
    top: 50px;
    text-align: center;
    outline: none;
}
.expense_tap input::placeholder ,.payment_tap input::placeholder,.add_tap input::placeholder{

    color: #D8C690;

}

.expense_tap button ,.payment_tap button{
    position: relative;
    left: 51px;
    bottom: -26px;
}
.expenses{
    position:absolute;
    top: 180px;
    left: 20px;
}
.payment{
    position:absolute;
    top: 180px;
    left: 470px;
}
.expenses input:hover ,.payment input:hover{
    background-color: #cfcfcf;
    cursor: pointer;
}
/**/
/*third row*/
.client{
    position:absolute;
    top: 90px;
    left: 20px;
}
.investigation{
    position:absolute;
    top: 203px;
    left: 400px;
}
.go_investigation{
    height: 40px;
    width: 317px;
    position: absolute;
    top: 156px;
    left: 520px;
}
.client_attachments{
    position:absolute;
    top: 180px;
    left: 920px;
}
.client_name{
    position:absolute;
    top: 200px;
    left: 1100px;
}
.button_add{
    background-color: #5E5C5C;
    position: absolute;
    top: 137px;
    left: 300px;
    width: 36px;
    height: 36px;
    border: none;
    text-decoration: none;
    display: block;
    color: #D8C690;
    font-size: 45px;
    align-content: center;
    flex-wrap: wrap-reverse;
    padding: 0px;
}

/**/
/*fourth row*/
.content{
    position:absolute;
    top: 270px;
    left: 20px;
    overflow-wrap:normal;
}
.content textarea{
    width: 300px;
    height: 180px;
    padding: 10px;
    font-size: 18px;
}
.notestext{
    overflow-wrap: break-word;
    text-overflow:ellipsis
}
.notes{
    position:absolute;
    top: 270px;
    left: 470px;
}
.notes textarea{
    width: 300px;
    height: 180px;
    padding: 10px;
    font-size:18px;
}
/**/
.pos{
    position: absolute;
    top: 0px;
    left: 33px;
}

.add_tap{
    box-sizing: border-box;
    border-radius: 5%;
    position: fixed;
    top: 174px;
    left: 571px;
    width: 419px;
    height: 526px;
    background-color: #5E5C5C;

}
.add_tap input{
    position: relative;
    top: 3px;
    left: 81px;
    border: none;
    background-color: #5E5C5C;
    color: #D8C690;
    outline: none;
}
.add_tap button{
    position: relative;
    top: -75px;
    left: 60px;

}
.add_tap hr{
    position: relative;
    top: 5px;
    left: 82px;
    background-color: #D8C690;
    border: solid 0.5px;
    border-color: #D8C690;
    margin-top: -2%;
    opacity: 50%;
}

/* session tap*/
.session_tap{
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 5%;
    position: fixed;
    top: 178px;
    left: 253px;
    width: 1000px;
    height: 480px;
}
.session_tap .add1{
    position: relative;
    top: 10%;
    left: 2%;
}
.session_tap input {
    border: none;
    background-color: #b1afaf;
    color: #0c0c0c;
    position: relative;
    left: 20px;
    top: 5px;
    text-align: left;
    outline: none;
    width: 80%;
}


.session_tap .session_date{
    position:absolute;
    top: 0px;
    left: 20px;
    height: 30px;
    width: 220px;
}
.session_tap .next_date{
    position:absolute;
    top: 0px;
    left: 380px;
    width: 220px;
}
.session_tap .session_attachments{
    position:absolute;
    top: 0px;
    left: 695px
}
.session_tap .session_attachments input{
    border: none;
    background-color: #ffffff;
}

.session_tap .role_number{
    position:absolute;
    top: 89px;
    left: 380px;
    width: 220px;
}
.session_tap .decision1{
    position:absolute;
    top: 89px;
    left: 20px;
    width: 220px;
}
.session_tap .session_reason{
    position:absolute;
    top: 180px;
    left: 20px;
}
.session_tap .session_requirements1{
    position:absolute;
    top: 180px;
    left: 380px;
}

.session_tap .sessionreason,.session_tap .sessionrequirements{
    width: 310px;
}
.session_tap .session_tap_buttons{
    position: absolute;
    top: 204px;
    left: 750px;
    height: 40px;
    width: 334px;
}
.session_tap_buttons button{
    width: 114px;
    height: 36px;
    font-size: 20px;
    margin: 5px;
}
/* expert session tap*/
.expertsession_tap{
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 5%;
    position: fixed;
    top: 178px;
    left: 253px;
    width: 1000px;
    height: 480px;
}
.expertsession_tap input{
    border: none;
    background-color: #b1afaf;
    color: #0c0c0c;
    position: relative;
    left: 20px;
    top: 5px;
    text-align: left;
    outline: none;
    width: 80%;
}
.expertsession_tap .office_addressDIV{
    position:absolute;
    top: 0px;
    left: 20px;
    height: 30px;
    width: 300px;
}
.expert_session_dateDIV{
    position:absolute;
    top: 0px;
    left: 350px;
    width: 300px;
}
.expertsession_tap .session_attachmentsDIV{
    position:absolute;
    top: 0px;
    left: 680px;
    width: 300px;
}
.expertsession_tap .session_attachmentsDIV input{
    border: none;
    background-color: #ffffff;
}

.expertsession_tap .expert_nameDIV{
    position:absolute;
    top: 89px;
    left: 350px;
    width: 300px;
}
.expertsession_tap .decisionDIV{
    position:absolute;
    top: 89px;
    left: 20px;
    width: 300px;
}
.expertsession_tap .session_requirementsDIV{
    position:absolute;
    top: 180px;
    left: 20px;
}
.expertsession_tap .session_requirements{
    width: 310px;
    top:22px;
    left: 0px;
}
.expertsession_tap .session_buttons3{
    position: absolute;
    top: 209px;
    left: 415px;
    height: 40px;
    width: 334px;
}
.session_buttons3 button{
    width: 114px;
    height: 36px;
    font-size: 20px;
    margin: 5px;
}
/*investigation tap*/
.investigation_tap{
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 5%;
    position: fixed;
    top: 178px;
    left: 253px;
    width: 1000px;
    height: 480px;
}
.investigation_tap .add2{
    position: relative;
    top: 10%;
    left: 2%;
}
.investigation_tap input{
    border: none;
    background-color: #b1afaf;
    color: #0c0c0c;
    position: relative;
    left: 20px;
    top: 6px;
    text-align: left;
    outline: none;
    width: 75%;
}
.investigation_tap .topic{
    position:absolute;
    top: 0px;
    left: 20px;
    height: 30px;
    width: 300px;
}
.investigation_tap .date{
    position:absolute;
    top: 89px;
    left: 20px;
    width: 300px;
}
.investigation_tap .contender2{
    position: absolute;
    top: 0px;
    left: 300px;
    width: 300px;
}
.investigation_tap .lawyer{
    position: absolute;
    top: 89px;
    left: 300px;
    width: 300px;
}
.investigation_tap .investigationPlace{
    position: absolute;
    top: 178px;
    left: 300px;
    width: 300px;
}
.investigation_tap .decision{
    position: absolute;
    top: 178px;
    left: 20px;
    width: 300px;
}
.investigation_tap .attachments{
    position: absolute;
    top: 0px;
    left: 580px;
}
.investigation_tap .attachments input{
    background-color: #ffffff;
}
.investigation_tap .notes2{
    position: absolute;
    left: 580px;
}
.investigation_tap .notes2_textbox{
    position: relative;
    top: 0px;
    width: 310px;
    height: 145px;
}
.investigation_tap .investigation_buttons{
    position: absolute;
    top: 255px;
    left: 415px;
    height: 40px;
    width: 334px;
}
.investigation_buttons button{
    width: 114px;
    height: 36px;
    font-size: 20px;
    margin: 5px;
    left: 170px;
    top: -60px;
    position: relative;
}
</style>

