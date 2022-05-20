<template>
<div class="parent" id="parent">
        <div class="addcase_header2">
            <div class="addcase_header2content">
                <div class="addcase_child addcase_header2Image">
                    <i class="fa-solid fa-file-circle-plus"></i>
                </div>
                <div class="addcase_child addcase_header2Text">
                    VIEW CASE
                </div>

            </div>
        </div>

        <form class="case_inputs" id="inputs">
            <div class="pos" id="pos">
            <div class="circle">
                <i class="fa-solid fa-map-location-dot iconFilter"></i>
                <label for="circle" class="inputsName">Circle</label>
                <br>
                <input type="text" id="circle" class="inputsText" disabled v-model="form.Case_id">
            </div>
            <div class="case_type">
                <i class="fa-solid fa-file-archive iconFilter"></i>
                <label for="case_type" class="inputsName">Case Type</label>
                <br>
                <input type="text" id="case_type" class="inputsText" disabled v-model="form.Case_type">
            </div>
            <div class="contender_attachments">
                <i class="fa-solid fa-paperclip iconFilter"></i>
                <label for="contender_attachments" class="inputsName file" style="width: 170px;">Case Attachments</label>
                <br>
                <a :href="form.Attachment" target="_blank"><button type="button" class="view_attach"><i class="fa-solid fa-paperclip"></i> View</button></a>

            </div>
            <div class="court">
                <i class="fa-solid fa-building-shield iconFilter"></i>
                <label for="court" class="inputsName">Court</label>
                <br>
                <select name="activity" class="inputsSelect" id="court" disabled >
                    <option >{{court_name}}</option>
                </select>
            </div>
            <div class="contender">
                <i class="fa-solid fa-person-circle-xmark iconFilter"></i>
                <label for="contender" class="inputsName">Contender</label>
                <br>
                <input type="text" id="contender" class="inputsText" disabled v-model="form.contender">
            </div>
            <div class="title">
                <i class="fa-solid fa-person-circle-xmark iconFilter"></i>
                <label for="title" class="inputsName">Title</label>
                <br>
                <input type="text" id="title" class="inputsText" disabled v-model="form.Title">
            </div>

            <div class="session">

                <button  type="button" class="go_session" id="go_session"><i class="fa fa-user"></i> Session</button>

            </div>
            <div class="expert_session">

                <button type="button" class="go_exsession" id="go_exsession"> <i class="fa fa-user-doctor"></i> Expert Session</button>
            </div>

            <div class="expenses">
                <i class="fa-solid fa-money-bill-trend-up iconFilter"></i>
                <label for="expenses" class="inputsName">Expenses</label>
                <br>
                <input type="text" id="expenses" class="inputsText" @click="expense_show()" readonly="">
            </div>
            <div class="payment">
                <i class="fa-solid fa-money-check-dollar iconFilter"></i>
                <label for="payment" class="inputsName">Payment</label>
                <br>
                <input type="text" id="payment" class="inputsText" @click="payment_show()" readonly="">
            </div>
            <div class="client">
                <i class="fa-solid fa-person-circle-check iconFilter"></i>
                <label for="client" class="inputsName">Client</label>
                <br>
                <select name="activity" id="client" class="inputsSelect" disabled>
                    <option >{{form.client_name}}</option>
                </select>
            </div>

            <div class="investigation">
                <button type="button" class="go_investigation" id="go_investigation" ><i class="fa fa-user-secret "></i> Investigation</button>
            </div>
            <div class="content">
                <i class="fa-solid fa-note-sticky iconFilter"></i>
                <label for="content" class="inputsName">Content</label>
                <br>
                <textarea name="content" class="inputsText" id="content" cols="30" rows="10" disabled v-model="form.Content"></textarea>

            </div>
            <div class="notes">
                <i class="fa-solid fa-book-bookmark iconFilter"></i>
                <label for="notes" class="inputsName">Notes</label>
                <br>
                <textarea name="notes" class="inputsText" id="notes" cols="30" rows="10" disabled v-model="form.Note"></textarea>

            </div>

            <div class="addcase_buttons">
            <br>
            <router-link to="/cases"><button type="button" class="addcase_back addcase_btn" > <i class="fa fa-backward" aria-hidden="true"></i> BACK </button></router-link>
            </div>
        </div>
                    <!-- the expense tap-->

                    <div class="expense_tap" id="expense_tap" style="display:none;">
                        <div class="searchResult" style="max-height: 230px;">
                            <table class="table-sort" style="height: 230px;">
                                <thead>
                                    <tr>
                                        <th scope="col">Expense</th>
                                        <th scope="col">Expense Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr v-for="expense in expenses" :key="expense.id">
                                        <td>{{expense.Amount}}</td>
                                        <td>{{expense.name}}</td>
                                        </tr>

                                </tbody>
                             </table>
                         </div>

                            <div class="session_buttons1">
                                <button type="button" class="back" id="back" @click="expense_hide()" style="left: 140px;"> Back</button>
                            </div>
                    </div>

                    <!-- the payment tap -->
            <div class="payment_tap" id="payment_tap" style="display:none;">
                <div class="searchResult" style="max-height: 230px;">
                    <table class="table-sort" style="height: 230px;">
                        <thead>
                            <tr>
                                <th scope="col">Payment</th>
                                <th scope="col">payment Name</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr v-for="payment in payments" :key="payment.id">
                                <td>{{payment.Amount}}</td>
                                <td>{{payment.name}}</td>
                                </tr>
                        </tbody>
                     </table>
                 </div>

                    <div class="session_buttons2">
                        <button type="button" class="back" id="back" @click="payment_hide()" style="left: 140px;"> Back</button>
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
        let id=this.$router.history.current.params.id;
            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/cases/'+id)
            .then(({data})=> {
                this.form= data.data[0];
                console.log(this.form.Court_no);
                    axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/courts/'+this.form.Court_no).then(({data})=> {this.court_name= data.data[0].name;}).catch();})
            .catch();

            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/payments_foriegn/'+id).then(({data})=> {this.payments= data.data;}).catch();
            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/expenses_foriegn/'+id).then(({data})=> {this.expenses= data.data;}).catch();
    },
        data(){
            return{
                court_name:'',
                payments:{},
                expenses:{},
                form:{
                    Title:'',
                    Case_id:'',
                    contender:'',
                    Case_type:'',
                    Court_no:'',
                    Content:'',
                    client_name:'',
                    Note:'',
                    Attachment:'',
                }
            }
        },

    methods:{



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
    }
}
</script>

<style >
.view_attach{
    height: 40px;
    width: 317px;
    position: absolute;
    top: 35px;
    left: 0px;
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
}
</style>
