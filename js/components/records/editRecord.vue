<template>
<div class="add_record" id="parent">
        <div class="header2">
            <div class="header2content">
                <div class="child header2Image">
                    <i class="fa-solid fa-file-circle-plus"></i>
                </div>
                <div class="child header2Text">
                    Edit Record
                </div>

            </div>
        </div>

        <form class="inputs" id="inputs" @submit.prevent="updateRecord"  enctype="multipart/form-data">
            <div class="topic">
                <h3>Topic</h3>
                <input type="text" id="topic" class="topics" placeholder="Topic" v-model="form.topic" >
            </div>
            <div class="record_case">
                <h3>Case</h3>
                <select name="activity" class="inputsSelect" v-model="form.Case" >
                    <option :value="_case.id" v-for="_case in cases" :key="_case.id" >{{_case.Title}}</option>
                </select>
            </div>

            <div class="attachments">
                <h3>Attachments</h3>
                <input type="file" id="attachments" class="attachments" placeholder="Attachments" @change="onFileSelected">
            </div>

            <div class="lawyername">
                <h3>Contender Name</h3>
                <input type="text" id="lawyer_name" class="lawyer_name" placeholder="Contender Name" v-model="form.Contender" >
            </div>

            <div class="clientname">
                <h3>Client Name</h3>
                <input type="text" id="clientname" class="client_name" placeholder="Client Name" v-model="form.Client_name" >
            </div>

            <div class="notes">
                <h3>Notes</h3>
                <textarea name="notes " class="Notes" cols="30" rows="10" v-model="form.Note" ></textarea >
            </div>

            <div class="id">
                <h3>ID</h3>
                <input type="text" class="ID" placeholder="ID" v-model="form.record_id" >
            </div>

            <div class="addcourtrecord_buttons">

                    <button type="submit" class="save">Save </button>
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
                newAttachment: '',
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
        updateRecord(){
            let id=this.$router.history.current.params.id;
                axios.put('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/records/'+id,this.form)
                .then(()=> {
                this.$router.push({ name: "records" });
                Toast.fire({icon: 'success',title: 'record Updated Successfully'})
                })
                .catch(error=>{
                    this.errors=error.response.data.errors
                        Toast.fire({ icon: 'error', title: this.errors.record_id[0],})
                        Toast.fire({ icon: 'error', title: this.errors.Contender[0],})
                        Toast.fire({ icon: 'error', title: this.errors.Client_name[0],})
                        Toast.fire({ icon: 'error', title: this.errors.topic[0],})
                        Toast.fire({ icon: 'error', title: this.errors.Attachment[0],})
                    })
        },
        onFileSelected(event) {
            let file = event.target.files[0];
            if (file.size > 1048770) {
            Toast.fire({icon: 'info',title: 'attachment should be at most 1MB'})
            } else {
                let reader = new FileReader();
                reader.onload = (event) => {
                    this.form.newAttachment = event.target.result;
                    let f=this.form.newAttachment.indexOf("/");
                    let l=this.form.newAttachment.indexOf(";") - f;
                    let ext = this.form.newAttachment.substr(f+1, l-1);
                    if(ext != "png" && ext != "jpeg" && ext != "jpg" && ext != "pdf"){
                Toast.fire({icon: 'info',title: 'Allowed Types(png,jpg,jpeg,pdf)'})
                this.form.newAttachment=null;
                    }
                };
                reader.readAsDataURL(file);
            }
        },
    },
};
</script>
