<template>
<div class="parent" id="parent">
        <div class="header2">
            <div class="header2content">

                <div class="logo header2Image">
                    <i class="fa-solid fa-box-archive"></i>
                </div>

                <div class="caseList header2Text">
                    <a href="/cases" class="caselist_btn">Case LIST</a>
                    <a class="recordlist">Records List</a>
                </div>
                <div class="search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input class="case_search_bar" type="text" name="search_bar" v-model="searchTerm">
                </div>
            </div>
        </div>

    <div class="table-responsive">
        <table class="case_table">
            <thead class="thead-light">
            <tr>
            <th class="table_head">Record ID</th>
            <th class="table_head">Topic</th>
            <th class="table_head">Client Name</th>
            <th class="table_head">Lawyer ID</th>
            <th class="table_head">Action</th>
            </tr>
            </thead>
        <tbody>
            <tr v-for="record in filtersearch" :key="record.id" class="btn_padd">
                <td>{{record.record_id}}</td>
                <td>{{record.topic}}</td>
                <td>{{record.Client_name}}</td>
                <td>{{record.Lawyer_id}}</td>
                <td>
                <div>
                    <router-link :to="{name: 'viewRecord', params:{id:record.id}}"><button type="button" class="view_btn">view</button></router-link>
                    <router-link :to="{name: 'editRecord', params:{id:record.id}}"><button type="button" class="edit_btn" >edit</button></router-link>
                    <button type="button" class="delete_btn" @click="DeleteRecord(record.id)" >delete</button>
                    </div>
                </td>
            </tr>

        </tbody>
        </table>
    </div>
    <router-link to="/addrecord"><button type="button" class="add_case" > + </button></router-link>



        </div>
</template>

<script type="text/javascript">
    export default{
        created(){
            if(!User.loggedIn()){
                this.$router.push({name:'/'})
            }
        this.allRecords()
        },
        data(){
            return{
                records:[],
                searchTerm:'',
            }
        },
        computed:{
      filtersearch(){
      return this.records.filter(record => {
         return record.record_id.match(this.searchTerm)
      })
      }
    },
        methods:{
            allRecords(){
                axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/records')
                .then((response) =>{(this.records=response.data.data);})
                .catch()
            },
            DeleteRecord(id){
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
                        axios.delete('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/records/'+id)
                    .then(() => {
                        this.records=this.records.filter(record => {return record.id !=id})

                        Swal.fire(
                            'Deleted!',
                            'Record has been deleted.',
                            'success'
                    )
                    })
                    .catch(() => {this.$router.push({name : 'record'})})
                    }
                })
            }
        },
    }
</script>

<style type="text/css">
.recordlist{
    position: absolute;
    left: 312px;
    height: 70px;
    background-color: white;
    padding-top: 18px;
    padding-left: 16px;
    padding-right: 16px;
}
.caselist_btn{
    text-decoration: none;
    position: absolute;
    left: 120px;
    top: 0px;
    background-color: #5E5C5C;
    height: 70px;
    width: 201px;
    padding-top: 20px;
    padding-left: 16px;
    padding-right: 16px;
    text-align: center;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    cursor: pointer;
}
.caselist_btn:hover{
    text-decoration: none;
    background-color: #757575;
    color: #D8C690;
}
.view_btn,.delete_btn,.edit_btn{
    position: relative;
    top: 1px;
    width: 116px;
    height: 50px;
    background-color: #494949;
    border: none;
    font-size: 20px;
    color: #D8C690;
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
}
</style>
