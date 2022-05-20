<template>
<div class="parent" id="parent">
        <div class="addcase_header2">
            <div class="addcase_header2content">
                <div class="addcase_child addcase_header2Image">
                    <i class="fa-solid fa-file-circle-plus"></i>
                </div>
                <div class="addcase_child addcase_header2Text">
                    EDIT CASE
                </div>
                            <div  style="position:absolute;left:1300px;top:10px;">
                    <div>
                        <input id="status" value="open" type="radio" name="status" class="case_status" :checked="cases.status == 'open'" @change="onStatusChecked($event)">
                        <label for="status">open</label>
                    </div>
                    <div>
                        <input id="status" value="closed" type="radio" name="status" class="case_status" :checked="cases.status == 'closed'" @change="onStatusChecked($event)">
                        <label for="status">closed</label>
                    </div>
                </div>
            </div>
        </div>

        <form class="case_inputs" id="inputs" @submit.prevent="caseUpdate" enctype="multipart/form-data">
            <div class="pos" id="pos">
            <div class="circle">
                <i class="fa-solid fa-map-location-dot iconFilter"></i>
                <label for="circle" class="inputsName">Circle</label>
                <br>
                <input type="text" id="circle" class="inputsText" v-model="cases.Case_id">
            </div>
            <div class="case_type">
                <i class="fa-solid fa-file-archive iconFilter"></i>
                <label for="case_type" class="inputsName">Case Type</label>
                <br>
                <input type="text" id="case_type" class="inputsText" v-model="cases.Case_type">
            </div>
            <div class="contender_attachments">
                <i class="fa-solid fa-paperclip iconFilter"></i>
                <label for="contender_attachments" class="inputsName file">Case Attachments</label>
                <br>
                <input type="file" id="contender_attachments" class="case_attch" name="upload" @change="onFileSelected_case">

            </div>
            <div class="court">
                <i class="fa-solid fa-building-shield iconFilter"></i>
                <label for="court" class="inputsName">Court</label>
                <br>
                <select name="activity" class="inputsSelect" id="court" v-model="cases.Court_no">
                    <option :value="court.id" v-for="court in courts" :key="court.id" >{{court.name}}</option>
                </select>
            </div>
            <div class="contender">
                <i class="fa-solid fa-person-circle-xmark iconFilter"></i>
                <label for="contender" class="inputsName">Contender</label>
                <br>
                <input type="text" id="contender" class="inputsText" v-model="cases.contender">
            </div>
            <div class="title">
                <i class="fa-solid fa-person-circle-xmark iconFilter"></i>
                <label for="title" class="inputsName">Title</label>
                <br>
                <input type="text" id="title" class="inputsText" v-model="cases.Title">
            </div>

            <div class="session">

                <button  type="button" class="go_session" id="go_session" @click="session_show()"><i class="fa fa-user"></i> Session</button>

            </div>
            <div class="expert_session">

                <button type="button" class="go_exsession" id="go_exsession" @click="expert_session_show()"> <i class="fa fa-user-doctor"></i> Expert Session</button>
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
                <select name="activity" id="client" class="inputsSelect" v-model="cases.client_name">
                    <option :value="client.name" v-for="client in clients" :key="client.id">{{client.name}}</option>
                </select>
            </div>

            <button type="button" class="button_add addcase_btn" @click="add_show()"> + </button>

            <div class="investigation">
                <button type="button" class="go_investigation" id="go_investigation" @click="investigationtan_show()" ><i class="fa fa-user-secret "></i> Investigation</button>
            </div>
            <div class="content">
                <i class="fa-solid fa-note-sticky iconFilter"></i>
                <label for="content" class="inputsName">Content</label>
                <br>
                <textarea name="content" class="inputsText" id="content" cols="30" rows="10" v-model="cases.Case_id"></textarea>

            </div>
            <div class="notes">
                <i class="fa-solid fa-book-bookmark iconFilter"></i>
                <label for="notes" class="inputsName">Notes</label>
                <br>
                <textarea name="notes" class="inputsText" id="notes" cols="30" rows="10" v-model="cases.Note"></textarea>

            </div>

            <div class="addcase_buttons">
            <button type="submit" class="addcase_send addcase_btn"><i class="fa fa-save" aria-hidden="true"></i> SAVE</button>
            <br>
            <router-link to="/cases"><button type="button" class="addcase_back addcase_btn" > <i class="fa fa-backward" aria-hidden="true"></i> BACK </button></router-link>
            </div>
        </div>
                    <!-- the expense tap-->

                    <div class="expense_tap" id="expense_tap" style="display:none;">
                        <div class="searchResult">
                            <table class="table-sort">
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
                        <form @submit.prevent="expenseInsert">
                            <input type="text" id="expense" class="expense" placeholder="Expense" v-model="expenseForm.Amount">
                            <hr class="hr1"><br>

                            <input type="text" id="expense_name" class="expense_name"  placeholder="Expense Name" v-model="expenseForm.name">
                            <hr class="hr1"><br>

                            <div class="session_buttons1">
                                <button type="submit" class="back addcase_btn">Save</button>
                                <button type="button" class="back addcase_btn" id="back" @click="expense_hide()"> Back</button>

                            </div>
                        </form>
                    </div>

                    <!-- the payment tap -->
            <div class="payment_tap" id="payment_tap" style="display:none;">
                <div class="searchResult">
                    <table class="table-sort">
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
                <form @submit.prevent="paymentInsert">
                    <input type="text" id="payment" class="payment" placeholder="Payment" v-model="paymentForm.Amount">
                    <hr class="hr1"><br>

                    <input type="text" id="payment_name" class="payment_name"  placeholder="Payment Name" v-model="paymentForm.name">
                    <hr class="hr1"><br>

                    <div class="session_buttons2">
                        <button type="submit" class="back addcase_btn">Save</button>
                        <button type="button" class="back addcase_btn" id="back" @click="payment_hide()"> Back</button>

                    </div>
                </form>
            </div>

            <!-- session tap-->

            <div class="session_tap" id="session_tap" style="display:none;">
            <form class="add1" @submit.prevent="seasionInsert" enctype="multipart/form-data">

            <div class="session_date">
                <i class="fa-solid fa-calendar iconFilter"></i>
                <label for="session_date" class="inputsName">Session Date</label>
                <br>
                <input type="date" id="session_date" class="Session_date"  placeholder="Session Date" v-model="sessionForm.Session_date">
            </div>

            <div class="next_date">
                <i class="fa-solid fa-calendar-plus iconFilter"></i>
                <label for="next_date" class="inputsName">Next Date</label>
                <br>
                <input type="date" id="next_date" class="Nnext_date"  placeholder="Next Date" v-model="sessionForm.Next_date">
            </div>

            <div class="session_attachments">
                <i class="fa-solid fa-paperclip iconFilter"></i>
                <label for="session_Attachments" class="inputsName">Session Attachments</label>
                <br>
                <input type = "file" id="session_Attachments" class="session_Attachments file" placeholder="Session_attachments" @change="onFileSelected_session">
            </div>

            <div class="role_number">
                <i class="fa-solid fa-list-numeric iconFilter"></i>
                <label for="role_number" class="inputsName">Role Number</label>
                <br>
                <input type="text" id="role_number" class="Role_number" placeholder="Role Number" v-model="sessionForm.Role_no">
            </div>

            <div class="presentLawyer">
                <i class="fa-solid fa-list-numeric iconFilter"></i>
                <label for="role_number" class="inputsName">Present Lawyer</label>
                <br>
                <input type="text" id="role_number" class="Role_number" placeholder="Present Lawyer" v-model="sessionForm.present_Lawyer_name">
            </div>

            <div class="decision1">
                <i class="fa-solid fa-signature iconFilter"></i>
                <label for="decision" class="inputsName">Decision</label>
                <br>
                <input type="text" id="decision" class="Decision" placeholder="Decision" v-model="sessionForm.Desicion">
            </div>

            <div class="session_requirements1">
                <i class="fa-solid fa-note-sticky iconFilter"></i>
                <label for="session_requirements" class="inputsName">Session Requirements</label>
                <br>
                <textarea name="session_requirements" id="session_requirements" class="sessionrequirements" cols="30" rows="10" v-model="sessionForm.Session_Requirements"></textarea>
            </div>

            <div class="session_reason">
                <i class="fa-solid fa-notes-medical iconFilter"></i>
                <label for="session_reason" class="inputsName">Session Reason</label>
                <br>
                <textarea name="session_reason" id="session_reason" class="sessionreason" cols="30" rows="10" v-model="sessionForm.Session_Reason"></textarea>
            </div>


            <div class="session_tap_buttons">
                    <button type="submit" class="Btn"><i class="fa fa-save"></i> SAVE</button>
                    <br>
                    <button type="button" class="Btn" @click="session_hide()"><i class="fa fa-backward"></i> BACK</button>
            </div>
        </form>
        </div>

          <!-- the expert session tap-->

          <div class="session_tap" id="expertsession_tap" style="display:none;">
                <form class="add1" @submit.prevent="expertSeasionInsert"  enctype="multipart/form-data">

            <div class="session_date">
                <i class="fa-solid fa-calendar iconFilter"></i>
                <label for="session_date" class="inputsName">Expert Session Date</label>
                <br>
                <input type="date" id="session_date" class="Session_date"  placeholder="Session Date" v-model="expertSessionForm.Session_date">
            </div>

            <div class="next_date">
                <i class="fa-solid fa-calendar-plus iconFilter"></i>
                <label for="next_date" class="inputsName">Next Date</label>
                <br>
                <input type="date" id="next_date" class="Nnext_date"  placeholder="Next Date" v-model="expertSessionForm.Next_date">
            </div>

            <div class="session_attachments">
                <i class="fa-solid fa-paperclip iconFilter"></i>
                <label for="session_Attachments" class="inputsName">Expert Session Attachment</label>
                <br>
                <input type = "file" id="session_Attachments" class="session_Attachments file" placeholder="Session_attachments" @change="onFileSelected_E_session">
            </div>

            <div class="role_number">
                <i class="fa-solid fa-list-numeric iconFilter"></i>
                <label for="role_number" class="inputsName">Office Address</label>
                <br>
                <input type="text" id="role_number" class="Role_number" placeholder="Office Address" v-model="expertSessionForm.Office_address">
            </div>

            <div class="presentLawyer">
                <i class="fa-solid fa-list-numeric iconFilter"></i>
                <label for="role_number" class="inputsName">Present Lawyer</label>
                <br>
                <input type="text" id="role_number" class="Role_number" placeholder="Present Lawyer" v-model="expertSessionForm.present_Lawyer_name">
            </div>

            <div class="decision1">
                <i class="fa-solid fa-signature iconFilter"></i>
                <label for="decision" class="inputsName">Decision</label>
                <br>
                <input type="text" id="decision" class="Decision" placeholder="Decision" v-model="expertSessionForm.Desicion">
            </div>

            <div class="session_requirements1">
                <i class="fa-solid fa-note-sticky iconFilter"></i>
                <label for="session_requirements" class="inputsName">Expert Name</label>
                <br>
                <input type="text" id="decision" style="width:180px;" class="Decision" placeholder="Expert Name" v-model="expertSessionForm.Expert_name">
            </div>

            <div class="session_reason">
                <i class="fa-solid fa-notes-medical iconFilter"></i>
                <label for="session_reason" class="inputsName">Session Reason</label>
                <br>
                <textarea name="session_reason" id="session_reason" class="sessionreason" cols="30" rows="10" v-model="expertSessionForm.Session_Reason"></textarea>
            </div>


            <div class="session_tap_buttons">
                    <button type="submit" class="Btn"><i class="fa fa-save"></i> SAVE</button>
                    <br>
                    <button type="button" class="Btn" @click="expert_session_hide()"><i class="fa fa-backward"></i> BACK</button>
            </div>
        </form>
        </div>
        <!-- investigation tap -->
        <div class="investigation_tap" id="investigation_tap" style="display:none;">

        <form class="add2" @submit.prevent="investigationInsert">

            <div class="topic">
                <label for="topic" class="inputsName"><i class="fa fa-file-text iconFilter"></i> ID</label>
                <br>
                <input type="text" class="topic_name" placeholder="ID" v-model="investigationForm.investigation_id">
                <br>
            </div>

            <div class="date">
                <label for="date" class="inputsName"><i class="fa fa-calendar iconFilter"></i> Date</label>
                <br>
                <input type="date" class="investigation_date" v-model="investigationForm.in_Date">
                <br>
            </div>

            <div class="decision">
                <label for="decision" class="inputsName"><i class="fa fa-arrow-right-to-file iconFilter"></i> Decision</label>
                <br>
                <input type="text"  class="decision_made" placeholder="Decision" v-model="investigationForm.Decision">
                <br>
            </div>

            <div class="notes2">
                <label for="notes2" class="inputsName2"><i class="fa fa-note-sticky iconFilter"></i> Notes</label>
                <br>
                <textarea name="notes2" class="notes2_textbox" v-model="investigationForm.Note"></textarea>
                <br>
            </div>

            <div class="inv_client">
                <label for="notes2" class="inputsName2"><i class="fa fa-note-sticky iconFilter"></i> Client </label>
                <br>
                <select name="activity" id="client" class="investigationPlace_name" v-model="investigationForm.client">
                    <option :value="client.name" v-for="client in clients" :key="client.id">{{client.name}}</option>
                </select>
                <br>
            </div>

            <div class="contender2">
                <label for="contender" class="inputsName"><i class="fa fa-person-circle-xmark iconFilter" ></i> Topic</label>
                <br>
                <input type="text" class="contender2_name" placeholder="Topic" v-model="investigationForm.topic">
                <br>
            </div>

            <div class="lawyer">
                <label for="lawyer" class="inputsName"><i class="fa fa-person-half-dress iconFilter"></i> Contender</label>
                <br>
                <input type="text" class="lawyer_name" placeholder="Contender" v-model="investigationForm.contender">
                <br>
            </div>

            <div class="investigationPlace">
                <label for="investigationPlace" class="inputsName"><i class="fa fa-building-shield iconFilter"></i> Investigation Place</label>
                <br>
                <select name="activity" id="client" class="investigationPlace_name" v-model="investigationForm.investigation_place_No">
                    <option :value="inv_place.id" v-for="inv_place in investigationPlaces" :key="inv_place.id">{{inv_place.name}}</option>
                </select>
                <br>
            </div>

            <div class="investigation_buttons">
                <button type="submit" class="Btn"><i class="fa fa-save"></i> SAVE</button>
                <br>
                <button type="button" class="Btn" id="back" @click="investigationtan_hide()"><i class="fa fa-backward"></i> BACK</button>
            </div>

        </form>
    </div>
            <!-- add client tap-->
            <div class="add_tap" id="add_tap" style="display:none;">
                <form class="add">
                    <br><br><br><br>
                    <input type="text" id="national nummber" name="national nummber" placeholder="National Number">
                    <hr>
                    <br>
                    <input type="text" id="client list" name="client list" placeholder="Client NAME">
                    <hr>
                    <br>
                    <input type="email" id="Email" name="Email" placeholder="Email">
                    <hr>
                    <br>
                    <input type="text" id="address" name="address" placeholder="Address">
                    <hr>
                    <br>
                    <input type="text" id="phone nummber" name="phone nummber" placeholder="Phone Number">
                    <hr>
                    <br>
                    <br><br><br>
                <button type="button" class="back addcase_btn">Save</button>
                <button type="button" class="back addcase_btn" @click="add_hide()"> Back </button>
                </form>

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
                this.cases= data.data[0];
                    axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/courts/'+this.cases.Court_no).then(({data})=> {this.court_name= data.data[0].name;}).catch();})
            .catch();

            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/payments_foriegn/'+id).then(({data})=> {this.payments= data.data;}).catch();
            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/expenses_foriegn/'+id).then(({data})=> {this.expenses= data.data;}).catch();
            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/clients').then((response) =>{(this.clients=response.data.data);}).catch();
            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/courts').then((response) =>{(this.courts=response.data.data);}).catch();
            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/investigation_places').then((response) =>{(this.investigationPlaces=response.data.data);}).catch();
        },
        data(){
            return{
                cases:{
                    Title:'',
                    Case_id:'',
                    contender:'',
                    Case_type:'',
                    Court_no:'',
                    Content:'',
                    client_name:'',
                    Note:'',
                    status:'',
                    Attachment:'',
                    newAttachment:'',
                },
                expenseForm:{
                    name:null,
                    Amount:null,
                    Case_id:null,
                },
                paymentForm:{
                    name:null,
                    Amount:null,
                    Case_id:null,
                },
                sessionForm:{
                    Role_no:null,
                    present_Lawyer_name:null,
                    Session_Reason:null,
                    Session_date:null,
                    Session_Requirements:null,
                    Next_date:null,
                    Desicion:null,
                    Case_id:null,
                    Attachment:null,
                },
                expertSessionForm:{
                    Office_address:null,
                    present_Lawyer_name:null,
                    Session_Reason:null,
                    Session_date:null,
                    Expert_name:null,
                    Next_date:null,
                    Desicion:null,
                    Case_id:null,
                    Attachment:null,
                },
                investigationForm:{
                    investigation_id:null,
                    topic:null,
                    in_Date:null,
                    contender:null,
                    client:null,
                    Decision:null,
                    Lawyer_id:null,
                    Case_id:null,
                    investigation_place_No:null,
                    Note:null,
                },
                clients:{},
                courts:{},
                investigationPlaces:{},
                court_name:'',
                payments:{},
                expenses:{},
                errors:{},
            }
        },

    methods:{
        caseUpdate(){
            let id=this.$router.history.current.params.id;
                axios.patch('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/cases/'+id,this.cases)
                .then((response)=> {
                    this.$router.push({name:'cases'})
                Toast.fire({icon: 'success',title: 'case Edited Successfully'})
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
                });
            },
        expenseInsert(){
            this.expenseForm.Case_id=this.$router.history.current.params.id;
            axios.post('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/expenses',this.expenseForm)
                .then(()=>
                {
                    location.reload();
                    Toast.fire({ icon: 'success', title: 'Expense Inserted Successfully',})
                    })
                .catch(error=>{
                    this.errors=error.response.data.errors;
                    Toast.fire({ icon: 'error', title: this.errors.Amount[0],})
                    Toast.fire({ icon: 'error', title: this.errors.name[0],})
                    });
                    },

        paymentInsert(){
            this.paymentForm.Case_id=this.$router.history.current.params.id;
            axios.post('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/payments',this.paymentForm)
                .then(()=>
                {
                    location.reload();
                    Toast.fire({ icon: 'success', title: 'payment Inserted Successfully',})
                    })
                .catch(error=>{
                    this.errors=error.response.data.errors;
                    Toast.fire({ icon: 'error', title: this.errors.Amount[0],})
                    Toast.fire({ icon: 'error', title: this.errors.name[0],})
                    })
        },
        seasionInsert(){
        this.sessionForm.Case_id=this.$router.history.current.params.id;
        axios.post('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/sessions',this.sessionForm)
                .then(()=>
                {
                    location.reload();
                    Toast.fire({ icon: 'success', title: 'Session Inserted Successfully',})
                    })
                .catch(error=>{
                    this.errors=error.response.data.errors;
                    Toast.fire({ icon: 'error', title: this.errors.Role_no[0],})
                    Toast.fire({ icon: 'error', title: this.errors.present_Lawyer_name[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Session_Reason[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Session_date[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Session_Requirements[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Next_date[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Desicion[0],})
                    });
        },
        expertSeasionInsert(){
        this.expertSessionForm.Case_id=this.$router.history.current.params.id;
        axios.post('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/expert_sessions',this.expertSessionForm)
                .then(()=>
                {
                    location.reload();
                    Toast.fire({ icon: 'success', title: 'Expert Session Inserted Successfully',})
                    })
                .catch(error=>{
                    this.errors=error.response.data.errors;
                    Toast.fire({ icon: 'error', title: this.errors.Office_address[0],})
                    Toast.fire({ icon: 'error', title: this.errors.present_Lawyer_name[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Session_Reason[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Session_date[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Expert_name[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Next_date[0],})
                    Toast.fire({ icon: 'error', title: this.errors.Desicion[0],})
                    });
        },
        investigationInsert(){
        this.investigationForm.Case_id=this.$router.history.current.params.id;
        this.investigationForm.Lawyer_id=localStorage.getItem('ID');
        axios.post('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/investigations',this.investigationForm)
                .then(()=>
                {
                    location.reload();
                    Toast.fire({ icon: 'success', title: 'Investigation Inserted Successfully',})
                    })
                .catch(error=>{
                    this.errors=error.response.data.errors;
                    Toast.fire({ icon: 'error', title: this.errors.Decision[0],})
                    Toast.fire({ icon: 'error', title: this.errors.client[0],})
                    Toast.fire({ icon: 'error', title: this.errors.contender[0],})
                    Toast.fire({ icon: 'error', title: this.errors.in_Date[0],})
                    Toast.fire({ icon: 'error', title: this.errors.topic[0],})
                    Toast.fire({ icon: 'error', title: this.errors.investigation_id[0],})
                    });
        },
        onFileSelected_E_session(event) {
            let file = event.target.files[0];
            if (file.size > 1048770) {
                Toast.fire({
                icon: 'error',
                title: 'attachment should be at most 1MB'})
            } else {
                let reader = new FileReader();
                reader.onload = (event) => {
                    this.expertSessionForm.Attachment = event.target.result;
                    console.log(event.target.result);
                    let f=this.expertSessionForm.Attachment.indexOf("/");
                    let l=this.expertSessionForm.Attachment.indexOf(";") - f;
                    let ext = this.expertSessionForm.Attachment.substr(f+1, l-1);
                    if(ext != "png" && ext != "jpeg" && ext != "jpg" && ext != "pdf"){
                Toast.fire({
                    icon: 'info',
                    title: 'Allowed Types(png,jpg,jpeg,pdf)'})
                this.expertSessionForm.Attachment=null;
                    }
                };
                reader.readAsDataURL(file);
                }
        },
        onFileSelected_session(event) {
            let file = event.target.files[0];
            if (file.size > 1048770) {
                Toast.fire({
                icon: 'error',
                title: 'attachment should be at most 1MB'})
            } else {
                let reader = new FileReader();
                reader.onload = (event) => {
                    this.sessionForm.Attachment = event.target.result;
                    console.log(event.target.result);
                    let f=this.sessionForm.Attachment.indexOf("/");
                    let l=this.sessionForm.Attachment.indexOf(";") - f;
                    let ext = this.sessionForm.Attachment.substr(f+1, l-1);
                    if(ext != "png" && ext != "jpeg" && ext != "jpg" && ext != "pdf"){
                Toast.fire({
                    icon: 'info',
                    title: 'Allowed Types(png,jpg,jpeg,pdf)'})
                this.sessionForm.Attachment=null;
                    }
                };
                reader.readAsDataURL(file);
                }
        },
        onFileSelected_case(event) {
            let file = event.target.files[0];
            if (file.size > 1048770) {
            Toast.fire({icon: 'info',title: 'attachment should be at most 1MB'})
            } else {
                let reader = new FileReader();
                reader.onload = (event) => {
                    this.cases.newAttachment = event.target.result;
                    let f=this.cases.newAttachment.indexOf("/");
                    let l=this.cases.newAttachment.indexOf(";") - f;
                    let ext = this.cases.newAttachment.substr(f+1, l-1);
                    if(ext != "png" && ext != "jpeg" && ext != "jpg" && ext != "pdf"){
                Toast.fire({icon: 'info',title: 'Allowed Types(png,jpg,jpeg,pdf)'})
                this.cases.newAttachment=null;
                    }
                };
                reader.readAsDataURL(file);
            }
        },
        onStatusChecked(event) {
            this.cases.status=event.target.value;
            console.log(event.target.value);
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
.case_status{
    margin-top: -5px;
    font-family: "Quicksand", sans-serif;
    height:15px;
    width: 15px;
    font-size: 15px;
    line-height: 36px;
    opacity: 90%;
}
.presentLawyer{
    position: relative;
    left: 700px;
    width: 220px;
    top: 89px;
}
.investigationPlace_name{
    background-color: white;
     border-style: none;
    background-color: #b1afaf;
    color: #0c0c0c;
    width: 225px;
    position: relative;
    left: 16px;
    height: 33px;
}
.inv_client{
    position: absolute;
    left: 24px;
    top: 265px;
}
</style>
