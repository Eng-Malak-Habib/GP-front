<template>
    <div class="addclient" id="parent">
        <div class="header2">
            <div class="header2content">
                <div class="child header2Image">
                    <i class="fa-solid fa-user-plus"></i>
                </div>
                <div class="child header2Text">
                    ADD Lawyer
                </div>

            </div>
        </div>

        <form class="inputs" id="inputs" @submit.prevent="lawyerUpdate">
            <div class="pos" id="pos">
            <div class="client_name">
                <i class="fa-solid fa-user-alt iconFilter"></i>
                <label for="name" class="inputsName">Lawyer Name</label>
                <br>
                <input type="text" id="name" class="inputsText" v-model="form.name">
            </div>

            <div class="client_email">
                <i class="fa-solid fa-mail-bulk iconFilter"></i>
                <label for="email" class="inputsName">Email</label>
                <br>
                <input type="email" id="email" class="inputsText" v-model="form.email">
            </div>

            <div class="client_phone">
                <i class="fa-solid fa-phone iconFilter"></i>
                <label for="number" class="inputsName">Phone Number</label>
                <br>
                <input type="text" id="number" class="inputsText" v-model="form.phone">
            </div>

            <div class="address">
                <i class="fa-solid fa-map-location-dot iconFilter"></i>
                <label for="address" class="inputsName">Address</label>
                <br>
                <input type="text" id="address" class="inputsText" v-model="form.address">
            </div>

            <div class="id_number">
                <i class="fa-solid fa-id-badge iconFilter"></i>
                <label for="id_number" class="inputsName">National Number</label>
                <br>
                <input type="text" id="id_number" class="inputsText" v-model="form.Lawyer_National_Number">
            </div>

            <div class="category">
                <i class="fa-solid fa-sort-amount-asc iconFilter"></i>
                <label for="category" class="inputsName">Role</label>
                <br>
                <select class="gender_inpt" v-model="form.Role">
                    <option selected value="Lawyer">Lawyer</option>
			        <option value="Admin">Admin</option>
                </select>
            </div>

            <div class="city">
                <i class="fa-solid fa-city iconFilter"></i>
                <label for="city" class="inputsName">Date of Birth</label>
                <br>
                <input type="date" id="city" class="inputsText" v-model="form.DOB">
            </div>

            <div class="nationality">
                <i class="fa-solid fa-flag iconFilter"></i>
                <label for="nationality" class="inputsName">Gender</label>
                <br>
                <select class="gender_inpt" v-model="form.Gender">
                    <option selected value="Male">Male</option>
			        <option value="Female">Female</option>
                </select>
            </div>


            <div class="buttons">
            <button type="submit" class="save" onclick=""><i class="fa fa-save" aria-hidden="true"></i> SAVE</button>
            <br>
            <router-link to="/profile"><button class="back"> <i class="fa fa-backward" aria-hidden="true"></i> Back </button></router-link>
            </div>
        </div>
        </form>
    </div>
</template>

<script type="text/javascript">
    export default{
        created(){
        if(!User.loggedIn()){
                this.$router.push({name:'/'})
            }
        let id=this.$router.history.current.params.id;
        axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/lawyers/'+id).then(({data})=> {this.form= data.data[0];}).catch();


    },
    data(){
        return{
            form:{
                name:'',
                email:'',
                phone:'',
                DOB:'',
                Gender:'',
                address:'',
                Lawyer_National_Number:'',
                Role:'',
            },
            errors:{},
        }
    },
    methods:{
        lawyerUpdate(){
                let id=this.$router.history.current.params.id;
                axios.put('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/lawyers/'+id,this.form)
                .then(()=>
                {
                    this.$router.push({name:'profile'})
                    Toast.fire({ icon: 'success', title: 'Lawyer updated Successfully',})
                    })
                .catch(error=>{
                    this.errors=error.response.data.errors;
                    Toast.fire({ icon: 'error', title: this.errors.Lawyer_National_Number[0],})
                    Toast.fire({ icon: 'error', title: this.errors.email[0],})
                    Toast.fire({ icon: 'error', title: this.errors.name[0],})
                    })},
    }
    }
</script>

<style type="text/css">

</style>
