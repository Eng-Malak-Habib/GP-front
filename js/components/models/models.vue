<template>
<div>
<div class="parent" id="parent">
        <div class="header2">
            <div class="header2content">

                <div class="logo header2Image">
                    <i class="fa-solid fa-file-contract color"></i>
                </div>

                <div class="caseList header2Text">
                    <a class="legislation_list">Models</a>
                </div>
                <div class="search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input v-model="searchTerm" class="case_search_bar" type="text" name="search_bar">
                </div>
            </div>
        </div>

    <div class="table-responsive">
        <table class="case_table">
            <thead class="thead-light">
            <tr>
            <th class="table_head">Model Name</th>
            <th class="table_head">Action</th>
            </tr>
            </thead>
        <tbody>
            <tr v-for="model in filtersearch" :key="model.id" class="btn_padd">
                <td>{{ model.name }}</td>
                <td>
                <div>
                    <a :href="model.Attachment" target="_blank"><button type="button" class="view btns_model">view</button></a>
                    <button type="button" class="edit btns_model" @click="modelShow(model.id)">edit</button>
                    <button type="button" class="delete btns_model" @click="DeleteModels(model.id)" >delete</button>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
    <button type="button" class="add_case" @click="add()"> + </button>
</div>
<!-- add model tap -->
<div class="add_page" id="add_page" style="display:none;" >
            <form class="add" @submit.prevent="modelInsert" enctype="multipart/form-data">
		        <br><br><br><br>
		        <input class="leg_inpts" type="text" id="name" name="name" placeholder="Model Name" v-model="form.name">
                <hr class="leg_hr">
                <br><br>
                <input class="leg_file file" type="file" name="upload" @change="onFileSelected">
                <br><br><br>
            <button type="submit" class="send leg_btns" >save</button>
            <button type="button" class="back leg_btns" @click="back()" > back </button>
            </form>

        </div>
    <!-- edit model tap -->
<div class="add_page" id="edit_page" style="display:none;" >
            <form class="add" @submit.prevent="modelUpdate" enctype="multipart/form-data">
		        <br><br><br><br>
		        <input class="leg_inpts" type="text" id="name" name="name" placeholder="Model Name" v-model="filterModel.name">
                <hr class="leg_hr">
                <br><br>
                <input class="leg_file file" type="file" name="upload" @change="onNewFileSelected">
                <br><br><br>
            <button type="submit" class="send leg_btns" >save</button>
            <button type="button" class="back leg_btns" @click="hide()" > back </button>
            </form>

        </div>
        </div>
</template>

<script>

export default {
    created(){
        if(!User.loggedIn()){
                this.$router.push({name:'/'})
            }
        this.allModels();
    },
        data(){
            return{
                filterModel:{
                    name:'',
                    Attachment:'',
                    newAttachment:'',
                    Lawyer_id:'',
                },
                models:[],
                searchTerm:'',
                form:{
                    name:null,
                    Attachment:null,
                    Lawyer_id:null,
                },
                errors:{},
            }
        },
        computed:{
      filtersearch(){
      return this.models.filter(model => {
         return model.name.match(this.searchTerm)
      })
      }
    },
methods:{
    allModels(){
                axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/models')
                .then((response) =>{(this.models=response.data.data)})
                .catch()
            },
    DeleteModels(id){
                Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/models/'+id)
                    .then(() => {
                        this.models=this.models.filter(model => {return model.id !=id})

                        Swal.fire(
                            'Deleted!',
                            'model has been deleted.',
                            'success'
                    )
                    })
                    .catch(() => {this.$router.push({name : 'models'})})
                    }
                })
            },
    modelInsert(){
                this.form.Lawyer_id=localStorage.getItem("ID");
                axios.post('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/models',this.form)
                .then(()=>
                {
                    location.reload();
                    // this.$router.push({name:'home'})
                    })
                .catch(error=>{
                    this.errors=error.response.data.errors;
                    Toast.fire({ icon: 'error', title: this.errors.Attachment[0],})
                    Toast.fire({ icon: 'error', title: this.errors.name[0],})

                    })},
    modelShow(id){
        axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/models/'+id).then((response) =>{(this.filterModel=response.data.data[0])}).catch()
        this.editPage();
    },
    modelUpdate(){
        axios.patch('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/models/'+this.filterModel.id,this.filterModel)
                .then(()=> {
                location.reload();
                })
                .catch(error=>{
                    this.errors=error.response.data.errors;
                        Toast.fire({ icon: 'error', title: this.errors.Attachment[0]})
                        Toast.fire({ icon: 'error', title: this.errors.name[0]})
                });
    },

    onFileSelected(event) {
            let file = event.target.files[0];
            if (file.size > 1048770) {
                Toast.fire({
                icon: 'error',
                title: 'attachment should be at most 1MB'})
            } else {
                let reader = new FileReader();
                reader.onload = (event) => {
                    this.form.Attachment = event.target.result;
                    console.log(event.target.result);
                    let f=this.form.Attachment.indexOf("/");
                    let l=this.form.Attachment.indexOf(";") - f;
                    let ext = this.form.Attachment.substr(f+1, l-1);
                    if(ext != "png" && ext != "jpeg" && ext != "jpg" && ext != "pdf"){
                Toast.fire({
                    icon: 'info',
                    title: 'Allowed Types(png,jpg,jpeg,pdf)'})
                this.form.Attachment=null;
                    }
                };
                reader.readAsDataURL(file);
                }
        },
    onNewFileSelected(event) {
            let file = event.target.files[0];
            if (file.size > 1048770) {
                Toast.fire({
                icon: 'error',
                title: 'attachment should be at most 1MB'})
            } else {
                let reader = new FileReader();
                reader.onload = (event) => {
                    this.filterModel.newAttachment = event.target.result;
                    console.log(event.target.result);
                    let f=this.filterModel.newAttachment.indexOf("/");
                    let l=this.filterModel.newAttachment.indexOf(";") - f;
                    let ext = this.filterModel.newAttachment.substr(f+1, l-1);
                    if(ext != "png" && ext != "jpeg" && ext != "jpg" && ext != "pdf"){
                Toast.fire({
                    icon: 'info',
                    title: 'Allowed Types(png,jpg,jpeg,pdf)'})
                this.filterModel.newAttachment=null;
                    }
                };
                reader.readAsDataURL(file);
                }
        },
    back(){
            var hidden = document.getElementById("parent")
            var showen = document.getElementById("add_page")
            showen.style.display="none";
            hidden.style.opacity="100%";
    },
    add(){
            var hidden = document.getElementById("parent")
            var showen = document.getElementById("add_page")
            showen.style.display="block";
            hidden.style.opacity="30%";
			showen.style.opacity="100%";
        },
    editPage(){
            var hidden = document.getElementById("parent")
            var showen = document.getElementById("edit_page")
            showen.style.display="block";
            hidden.style.opacity="30%";
			showen.style.opacity="100%";
        },
    hide(){
            var hidden = document.getElementById("parent")
            var showen = document.getElementById("edit_page")
            showen.style.display="none";
            hidden.style.opacity="100%";
            this.filterModel.newAttachment=null;
    },
}
}
</script>

<style>
.btns_model{
    left: 0;
}
</style>

