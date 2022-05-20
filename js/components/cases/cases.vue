<template>
<div class="parent" id="parent">
        <div class="header2">
            <div class="header2content">

                <div class="logo header2Image">
                    <i class="fa-solid fa-box-archive"></i>
                </div>

                <div class="caseList header2Text">
                    <a class="caselist">Case List</a>
                    <a href="/records" class="recordlist_btn">RECORD LIST</a>
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
            <tr class="table_row">
            <th class="table_head">Case Number</th>
            <th class="table_head">Case type</th>
            <th class="table_head">Client Name</th>
            <th class="table_head">Case Status</th>
            <th class="table_head">Action</th>
            </tr>
            </thead>
        <tbody>
            <tr v-for="_case in filtersearch" :key="_case.id" class="btn_padd">
                <td>{{_case.Case_id}}</td>
                <td>{{_case.Case_type}}</td>
                <td>{{_case.client_name}}</td>
                <td>
                    <span class="badge badge-success" v-if="_case.status=='open'">{{_case.status}}</span>
                    <span class="badge badge-danger" v-if="_case.status=='closed'">{{_case.status}}</span>
                    </td>
                <td>
                <div class="caselist_btns">
                    <router-link :to="{name: 'viewCase', params:{id:_case.id}}"><button type="button" class="view">view</button></router-link>
                    <router-link :to="{name: 'editCase', params:{id:_case.id}}"><button type="button" class="edit">edit</button></router-link>
                    <button type="button" class="edit" @click="DeleteCase(_case.id)">Delete</button>

                    </div>
                </td>
            </tr>

        </tbody>
        </table>
    </div>
    <router-link to="/addcase"><button type="button" class="add_case" > + </button></router-link>



        </div>
</template>

<script>
export default {
    created(){
            if(!User.loggedIn()){
                this.$router.push({name:'/'})
            }
        this.allCases()
        },
        data(){
            return{
                cases:[],
                searchTerm:'',
            }
        },
        computed:{
      filtersearch(){
      return this.cases.filter(_case => {
         return _case.Case_id.match(this.searchTerm)
      })
      }
    },
        methods:{
            allCases(){
                axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/cases')
                .then((response) =>{(this.cases=response.data.data);})
                .catch()
            },
            DeleteCase(id){
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
                        axios.delete('api/cases/'+id)
                    .then(() => {
                        this.cases=this.cases.filter(_case => {return _case.id !=id})

                        Swal.fire(
                            'Deleted!',
                            'Case has been deleted.',
                            'success'
                    )
                    })
                    .catch(() => {this.$router.push({name : 'cases'})})
                    }
                })
            }
        },
}
</script>

<style>
.parent{
    background-color: #F4F4F4;
    height: 1vh;
}

.header2{
    background-color: #5E5C5C;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 0;
    position: relative;
    color: #D8C690;
}
.add_case{
    background-color: #5E5C5C;
    position: absolute;
    width: 73px;
    height: 73px;
    left: 1300px;
    top: 530px;
    color: #D8C690;
    font-size: 45px;
    border-radius: 50%;
    border: 10px;
}

.edit,.delete,.view{
        position: relative;
    left: 90px;
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
    cursor: pointer;
}

::placeholder{
    box-sizing: border-box;
    color: #D8C690;
}

.header2content{
    display: flex;
    flex-direction: row;
    width: 50%;
}

.header2Image{
    height: 100%;
    width: 68px;
    margin-left: 10px;

}
.caselist{
    position: absolute;
    left: 107px;
    height: 70px;
    background-color: #F4F4F4;
    padding-top: 18px;
    padding-left: 16px;
    padding-right: 16px;
}
#header2image{
    width: 38px;
    margin: 16px;
}
.lname{
    text-overflow: ellipsis;

}
.Lname{
    position: relative;
    font-size: xx-large;
    top: 24px;
    left: 10px;
    margin: 0%;
    padding: 0%;
    max-width: 61%;

}
.header2Text{
    font-family: 'Courier New', Courier, monospace;
    font-size: 25px;
}

.logo,.caseList{
    flex: 1;
}

.logo:first-child,.caseList:first-child {
    margin-right: 0px;
}
.search{
    position: relative;
    left: 600px;
    top: 13px;
}
.case_search_bar{
    background-color: #F4F4F4;
    border: 1px solid grey;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 17px;
    line-height: 42px;
    opacity: 90%;
    width: 250px;
}
.fa-magnifying-glass{
    width: 40px;
    font-size: x-large;
}
.header2Image{
    position: relative;
    top: 20px;
    left: 20px;
    font-size: xx-large;
}
.table-responsive {
    overflow-y: scroll;
    position: absolute;
    top: 12%;
    left: 1%;
    width: 97.5%;
    border-collapse: collapse;
    height: 70%;
}
.case_table{
    position: absolute;
    top: 3%;
    left: 1%;
    width: 97.5%;
    border-collapse: collapse;
    height: 25%;
    text-align: center;
    border-collapse: collapse;
    font-family: 'Quicksand', sans-serif;
}

.table_head {
    background-color: #5E5C5C;
    height: 70px;
    font-size: 25px;
    color: #D8C690;
    letter-spacing: 2px;
}
.caselist_btns{
    left: -90px;
    position: relative;
}
.recordlist_btn{
    text-decoration: none;
    position: absolute;
    left: 275px;
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
.recordlist_btn:hover{
    text-decoration: none;
    background-color: #757575;
    color: #D8C690;
}
.table_row:hover{
    background-color: #5E5C5C
}
</style>

