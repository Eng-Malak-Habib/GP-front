<template>
    <div class="addclient" id="parent">
        <div class="header2">
            <div class="header2content">
                <div class="child header2Image">
                    <i class="fa-solid fa-user-plus"></i>
                </div>
                <div class="child header2Text">
                    ADD CLIENT
                </div>

            </div>
        </div>

        <form class="inputs" id="inputs" @submit.prevent="clientInsert">
            <div class="pos" id="pos">
            <div class="client_name">
                <i class="fa-solid fa-user-alt iconFilter"></i>
                <label for="name" class="inputsName">Client Name</label>
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
                <label for="id_number" class="inputsName">ID Number</label>
                <br>
                <input type="text" id="id_number" class="inputsText" v-model="form.Client_National_Number">
            </div>

            <div class="buttons">
            <button type="submit" class="save" onclick=""><i class="fa fa-save" aria-hidden="true"></i> SAVE</button>
            <br>
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
    },
    data(){
        return {
            form:{
                name:null,
                email:null,
                phone:null,
                address:null,
                Client_National_Number:null,
                Lawyer_id:null,
            },
            errors:{},
        }
    },
methods: {
    clientInsert(){
                this.form.Lawyer_id=localStorage.getItem("ID");
                axios.post('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/clients',this.form)
                .then(()=>
                {
                    this.$router.push({name:'clients'})
                    Toast.fire({ icon: 'success', title: 'Client Added Successfully',})
                    })
                .catch(error=>{
                    this.errors=error.response.data.errors;
                    Toast.fire({ icon: 'error', title: this.errors.Client_National_Number[0],})
                    Toast.fire({ icon: 'error', title: this.errors.email[0],})
                    Toast.fire({ icon: 'error', title: this.errors.name[0],})
                    })},
}

}
</script>

<style >
.addclient{
    background-color: #F4F4F4;
    position:absolute;
    top: 85px;
    left: 65px;
    width: 1436px;
    height: 622px;
    padding: 0;


}
.addclient .header2{
    background-color: #5E5C5C;
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 0;
}
.addclient hr{

    box-sizing: border-box;
    position: relative;
    left: 0px;
    top: 79px;
    background-color: #D8C690;
    border: solid 0.5px;
    border-color: #D8C690;
    margin-top: -1%;
    opacity: 50%;
    width: 59%;
}

.addclient .save,.addclient .back{
    margin:20px 0 0 0;
    box-sizing: border-box;
    background-color: #494949;
    border-radius: 1px;
    border:none;
    font-family: "Quicksand", sans-serif;
    font-size: 18px;
    color: #D8C690;
    padding: 0px;
    margin-right: 17px;
    text-align: center;
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    opacity: 95%;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    -ms-border-radius: 1px;
    -o-border-radius: 1px;
}

.addclient .back,.addclient .save{
    height: 40px;
    width: 150px;
}


.addclient .buttons{
    position: absolute;
    left: 920px;
    top: 250px;
    display: flex;
    flex-direction: row;
}

.addclient button{
    border-radius: 1px;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    -ms-border-radius: 1px;
    -o-border-radius: 1px;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -ms-transition: 0.2s;
    -o-transition: 0.2s;
}

.addclient button:hover{
    background-color: #696969;
}

.addclient button:active{
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -o-transform: scale(0.9);
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
}

.addclient ::placeholder{
    box-sizing: border-box;
    color: #363636;;
}

.addclient .header2{
    background-color: #5E5C5C;
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 0;
    color:#D8C690;
}

.addclient .header2content{
    display: flex;
    flex-direction: row;
    width: 50%;
}

.addclient .header2Image{
    height: 100%;
    width: 68px;
    margin-top: 5px;
    margin-left: 10px;
    position: relative;
    top: 14px;
    left: 20px;
    font-size: xx-large;

}

.addclient .header2Text{
    color: #D8C690;
    font-family: 'Saira Extra Condensed', sans-serif;
    font-size: 30px;
    font-weight: 00;
    margin-top: 14px;
    width: 27px;
    margin-left: -567px;
}

.addclient .child{
    flex: 1;
}

.addclient .child:first-child {
    margin-right: 0px;
}

.addclient .inputs{
    background-color:#F4F4F4;
    position: absolute;
    top: 110px;
    left: 33px;
    width: 1393px;
    height: 464px;
    padding-left: 10px;
}

.addclient input{
    margin-top: -5px;
    font-family: "Quicksand", sans-serif;
    height: 30px;
    width: 300px;
    font-size: 15px;
    line-height: 36px;
    opacity: 90%;
    width: 250px;
}

.addclient .inputsText{
    margin-top: 17px;
    height: 30px;
    width: 300px;
    padding-left: 10px;
    font-family: "Quicksand", sans-serif;
}

.addclient .inputsName{
    font-family: "Quicksand", sans-serif;
}

.addclient .iconFilter{
    filter: invert(0.7);
    -webkit-filter: invert(0.7);
}

.addclient .inputsSelect{
    margin-top: 15px;
    width: 281px;
    height: 36px;
    font-family: "Quicksand", sans-serif;
    padding-left: 10px;
}

.addclient .client_name{
    position:absolute;
    top: 0px;
    left: 20px;
}

.addclient .client_email{
    position:absolute;
    top: 0px;
    left: 470px;
}

.addclient .client_phone{
    position:absolute;
    top: 0px;
    left: 920px;
}

.addclient .address{
    position:absolute;
    top: 90px;
    left: 20px;
}

.addclient .id_number{
    position:absolute;
    top: 90px;
    left: 470px;
}

.addclient .category{
    position:absolute;
    top: 90px;
    left: 920px;
}

.addclient .city{
    position:absolute;
    top: 180px;
    left: 20px;
}
.addclient .nationality{
    position:absolute;
    top: 180px;
    left: 470px;
}

.addclient .tax_id{
    position:absolute;
    top: 180px;
    left: 920px;
}

.addclient .individual_company{
    position: absolute;
    display:inline-flex;
    top: 370px;
    left: 32px;
    width: 317px;
    font-family: 'Quicksand', sans-serif;
    font-size: 18px;
}

/**/
.addclient .pos{
    position: absolute;
    top: 0px;
    left: 33px;
}

.addclient .login_toast{
    background-image: linear-gradient(to right,rgb(32, 32, 32),#363636);
    border-radius: 7%;
    position: absolute;
    z-index: 1;
    top: 108%;
    left: 56%;
    width: 125px;
    height: 68px;
    font-size:small ;
}

.addclient .prof{cursor: pointer;}

.addclient .a1,.addclient .a2,.addclient .a3{
    position: relative;
    padding-top: 2%;
    padding-bottom: 3%;
    padding-left: 10%;
    color: rgb(40, 40, 40);
}

.addclient .a1{
    top: 3%;
    padding-right: 33%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

}
.addclient .a1:hover ,.addclient .a2:hover,.addclient .a3:hover{
    background-color:#999898 ;
}
.addclient .a2{
    top: 9%;
    padding-right: 34%;


}
.addclient .a3{
    top:17%;
    padding-right: 53%;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>
