<template>
<div>
<div class="parent" id="parent">
        <div class="header2">
            <div class="header2content">

                <div class="logo header2Image">
                    <i class="fa-solid fa-newspaper color"></i>
                </div>

                <div class="caseList header2Text">
                    <a class="legislation_list">Legislations</a>
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
            <th class="table_head">Legislation Name</th>
            <th class="table_head">Action</th>
            </tr>
            </thead>
        <tbody>
            <tr v-for="legislation in filtersearch" :key="legislation.id" class="btn_padd">
                <td>{{ legislation.name }}</td>
                <td>
                    <div>
                    <a :href="legislation.Attachment" target="_blank"><button type="button" class="view btns_model" >view</button></a>
                    <button type="button" class="edit btns_model" @click="legislationShow(legislation.id)">edit</button>
                    <button type="button" class="delete btns_model" @click="Deletelegislation(legislation.id)" >delete</button>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
    <button type="button" class="add_case Btn" @click="add()" > + </button>
</div>
<!-- add legislation -->
<div class="add_page" id="add_page" style="display:none;" >
            <form class="add" @submit.prevent="legislationInsert" enctype="multipart/form-data">
		        <br><br><br>
		        <input class="leg_inpts" type="text" id="name" name="name" placeholder="NAME OF LEGISLATION" v-model="form.name">
                <hr class="leg_hr">
                <br><br>
                <input class="leg_file file" type="file" name="upload" @change="onFileSelected">
                <br><br><br>
            <button type="submit" class="send leg_btns" >save</button>
            <button type="button" class="back leg_btns" @click="back()" > back </button>
            </form>
        </div>

<!-- edit legislation -->
<div class="add_page" id="edit_page" style="display:none;" >
            <form class="add" @submit.prevent="legislationUpdate" enctype="multipart/form-data">
		        <br><br><br>
		        <input class="leg_inpts" type="text" id="name" name="name" placeholder="NAME OF LEGISLATION" v-model="filterLegislation.name">
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
        this.allLegislations();
    },
        data(){
            return{
                filterLegislation:{
                    name:'',
                    Attachment:'',
                    newAttachment:'',
                    Lawyer_id:'',
                },
                legislations:[],
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
      return this.legislations.filter(legislation => {
         return legislation.name.match(this.searchTerm)
      })
      }
    },
methods:{
    allLegislations(){
                axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/legislations')
                .then((response) =>{(this.legislations=response.data.data)})
                .catch()
            },
    Deletelegislation(id){
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
                        axios.delete('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/legislations/'+id)
                    .then(() => {
                        this.legislations=this.legislations.filter(legislation => {return legislation.id !=id})

                        Swal.fire(
                            'Deleted!',
                            'legislation has been deleted.',
                            'success'
                    )
                    })
                    .catch(() => {this.$router.push({name : 'legislations'})})
                    }
                })
            },
    legislationInsert(){
                this.form.Lawyer_id=localStorage.getItem("ID");
                axios.post('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/legislations',this.form)
                .then(()=>
                {
                    location.reload();
                    })
                .catch(error=>{
                    this.errors=error.response.errors})},

    legislationShow(id){
        axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/legislations/'+id).then((response) =>{(this.filterLegislation=response.data.data[0])}).catch()
        this.editPage();
    },
    legislationUpdate(){
        axios.patch('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/legislations/'+this.filterLegislation.id,this.filterLegislation)
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
                    this.filterLegislation.newAttachment = event.target.result;
                    console.log(event.target.result);
                    let f=this.filterLegislation.newAttachment.indexOf("/");
                    let l=this.filterLegislation.newAttachment.indexOf(";") - f;
                    let ext = this.filterLegislation.newAttachment.substr(f+1, l-1);
                    if(ext != "png" && ext != "jpeg" && ext != "jpg" && ext != "pdf"){
                Toast.fire({
                    icon: 'info',
                    title: 'Allowed Types(png,jpg,jpeg,pdf)'})
                this.filterLegislation.newAttachment=null;
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
            this.filterLegislation.newAttachment=null;
    },
},
}
</script>

<style>
.legislation_list{
    position: absolute;
    left: 107px;
    height: 70px;
    padding-top: 18px;
    padding-left: 16px;
    padding-right: 16px;
}
.add_page {
    position: absolute;
    top: 183px;
    left: 200px;
    overflow: hidden;
    margin-left: 309px;
    margin-top: 36px;
    box-sizing: border-box;
    background-color: #5E5C5C;
    width: 529px;
    height: 415px;
    border-radius: 10%;
    z-index: 20;
}

.leg_inpts{
    color: #D8C690;
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 450;
    font-size: 17px;
    line-height: 42px;
    opacity: 90%;
    width: 250px;
    left:150px;
    position: relative;
}
.leg_hr{
    box-sizing: border-box;
    position: relative;
    left: -136px;
    background-color: #D8C690;
    border: solid 0.5px;
    border-color: #D8C690;
    margin-top: -2%;
    opacity: 50%;
    width: 47%;
    left: 150px;
    top: 3px;
}
.leg_btns{
    box-sizing: border-box;
    position: relative;
    background-color: #494949;
    border: none;
    font-size: 28px;
    color: #D8C690;
    padding: 10px;
    text-align: center;
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    width: 29%;
    opacity: 90%;
    left: -103px;
    bottom: 53px;
    height: 65px;
    border-radius: 5px;
}
.leg_file{
        left: 170px;
    top: -20px;
    position: relative;
    width: 251px;
    color: #D8C690;
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 450;
    font-size: 17px;
    line-height: 42px;
    opacity: 90%;
    width: 250px;
}
.btn_padd td div{
    padding: 3px
}
</style>
