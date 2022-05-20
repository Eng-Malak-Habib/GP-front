<template>
<div class="add_record" id="parent">
        <div class="header2">
            <div class="header2content">
                <div class="child header2Image">
                    <i class="fa-solid fa-file-circle-plus"></i>
                </div>
                <div class="child header2Text">
                    View Record
                </div>

            </div>
        </div>

        <form class="inputs" id="inputs" enctype="multipart/form-data">
            <div class="topic">
                <h3>Topic</h3>
                <input type="text" id="topic" class="topics" placeholder="Topic" v-model="form.topic" disabled>
            </div>
            <div class="record_case">
                <h3>Case</h3>
                <select name="activity" class="inputsSelect" v-model="form.Case" disabled>
                    <option :value="_case.id" v-for="_case in cases" :key="_case.id" >{{_case.Title}}</option>
                </select>
            </div>

            <div class="attachments" >
                <i class="fa-solid fa-paperclip iconFilter"></i>
            <label for="contender_attachments" class="inputsName file" style="width: 170px;">Attachments</label>
            <br>
            <a :href="form.Attachment" target="_blank"><button type="button" class="view_attach" style="width: 200px;"><i class="fa-solid fa-paperclip"></i> View</button></a>
            </div>

            <div class="lawyername">
                <h3>Contender Name</h3>
                <input type="text" id="lawyer_name" class="lawyer_name" placeholder="Contender Name" v-model="form.Contender" disabled>
            </div>

            <div class="clientname">
                <h3>Client Name</h3>
                <input type="text" id="clientname" class="client_name" placeholder="Client Name" v-model="form.Client_name" disabled>
            </div>

            <div class="notes">
                <h3>Notes</h3>
                <textarea name="notes " class="Notes" cols="30" rows="10" v-model="form.Note" disabled></textarea >
            </div>

            <div class="id">
                <h3>ID</h3>
                <input type="text" class="ID" placeholder="ID" v-model="form.record_id" disabled>
            </div>

            <div class="addcourtrecord_buttons">

                    <br>
                    <router-link to="/records"><button class="back" id="back"> Back</button></router-link>

            </div></form>


    </div>
</template>
<script type="text/javascript">
export default {
    created() {
        if (!User.loggedIn()) {
            this.$router.push({ name: "/" });
        }
        this.viewRecord()

        axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/cases')
            .then(({data})=> {this.cases= data.data;})
            .catch();
    },
    data() {
        return {
            form: {
                record_id: '',
                topic: '',
                Client_name: '',
                Contender: '',
                Attachment: '',
                Lawyer_id: '',
                Note: '',
                Case:'',
            },
            cases:{},
            errors: {},
        };
    },
    methods: {
        viewRecord(){
            let id=this.$router.history.current.params.id;
                axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/records/'+id)
                .then(({data})=> {
                this.form= data.data[0];})
                .catch()
            },
    },
};
</script>
