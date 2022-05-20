<template>
    <div class="addclient" id="parent">
        <div class="header2">
            <div class="header2content">
                <div class="child header2Image">
                    <i class="fa-solid fa-user-plus"></i>
                </div>
                <div class="child header2Text">
                    VIEW CLIENT
                </div>

            </div>
        </div>

        <form class="inputs" id="inputs" @submit.prevent="clientedit">
            <div class="pos" id="pos">
            <div class="client_name">
                <i class="fa-solid fa-user-alt iconFilter"></i>
                <label for="name" class="inputsName">Client Name</label>
                <br>
                <input type="text" id="name" class="inputsText" v-model="form.name" disabled>
            </div>

            <div class="client_email">
                <i class="fa-solid fa-mail-bulk iconFilter"></i>
                <label for="email" class="inputsName">Email</label>
                <br>
                <input type="email" id="email" class="inputsText" v-model="form.email" disabled>
            </div>

            <div class="client_phone">
                <i class="fa-solid fa-phone iconFilter"></i>
                <label for="number" class="inputsName">Phone Number</label>
                <br>
                <input type="text" id="number" class="inputsText" v-model="form.phone" disabled>
            </div>

            <div class="address">
                <i class="fa-solid fa-map-location-dot iconFilter"></i>
                <label for="address" class="inputsName">Address</label>
                <br>
                <input type="text" id="address" class="inputsText" v-model="form.address" disabled>
            </div>

            <div class="id_number">
                <i class="fa-solid fa-id-badge iconFilter"></i>
                <label for="id_number" class="inputsName">ID Number</label>
                <br>
                <input type="text" id="id_number" class="inputsText" v-model="form.Client_National_Number" disabled>
            </div>

            <div class="buttons">
            <router-link to="/clients"><button class="back"> <i class="fa fa-backward" aria-hidden="true"></i> Back </button></router-link>
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
            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/clients/'+id)
            .then(({data})=> {
                this.form= data.data[0];
                }
            )
            .catch()
    },
    data(){
        return {
            form:{
                name:'',
                email:'',
                phone:'',
                address:'',
                Client_National_Number:'',
                Lawyer_id:'',
            },
        }
    },

}
</script>

<style >

</style>
