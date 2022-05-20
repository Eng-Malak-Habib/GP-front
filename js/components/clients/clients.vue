<template>
<div>
<div class="parent" id="parent">
        <div class="header2">
            <div class="header2content">

                <div class="logo header2Image">
                    <i class="fas fa-fw fa-columns"></i>
                </div>

                <div class="caseList header2Text">
                    <a class="legislation_list">Clients</a>
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
            <th class="table_head">Client Name</th>
            <th class="table_head">Action</th>
            </tr>
            </thead>
        <tbody>
            <tr v-for="client in filtersearch" :key="client.id" class="btn_padd">
                <td>{{ client.name }}</td>
                <td>
                    <div>
                    <router-link :to="{name: 'viewclient', params:{id:client.id}}"><button type="button" class="view btns_model" >view</button></router-link>
                    <router-link :to="{name: 'editclient', params:{id:client.id}}"><button type="button" class="edit btns_model" >edit</button></router-link>
                    <button type="button" class="delete btns_model" @click="DeleteClient(client.id)" >delete</button>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
    <router-link to="/addclient"><button type="button" class="add_case" > + </button></router-link>
</div>

</div>
</template>

<script>
export default {
    created(){
            if(!User.loggedIn()){
                this.$router.push({name:'/'})
            }
            this.allclients();
        },
        data(){
            return{
                clients:[],
                searchTerm:'',
                form:{
                    name:null,
                    Lawyer_id:null,
                },
                errors:{},
            }
        },
        computed:{
      filtersearch(){
      return this.clients.filter(legislation => {
         return legislation.name.match(this.searchTerm)
      })
      }
    },
methods:{
    allclients(){
                axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/clients')
                .then((response) =>{(this.clients=response.data.data)})
                .catch()
            },
    DeleteClient(id){
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
                        axios.delete('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/clients/'+id)
                    .then(() => {
                        this.clients=this.clients.filter(client => {return client.id !=id})

                        Swal.fire(
                            'Deleted!',
                            'Client has been deleted.',
                            'success'
                    )
                    })
                    .catch(() => {this.$router.push({name : 'home'})})
                    }
                })
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
        }
},

}
</script>

<style>
.btns_client{
    left:90px;
}
</style>
