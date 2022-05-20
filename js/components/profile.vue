<template>
<div>
<div class="parent" id="parent">
        <div class="header2">
            <div class="header2content">

                <div class="logo header2Image">
                    <i class="fa-solid fa-user-edit fa"></i>
                </div>

                <div class="caseList header2Text">
                    <a class="legislation_list">Profile</a>
                </div>
            </div>
        </div>
    <form class="profile_form" @submit.prevent="profileEdit">

            <div class="prof_name">
                <i class="fa-solid fa-user iconFilter "></i>
                <label for="name" class="inputsName">Name</label>
                <br>
                <input type="text" name="name" class="" id="name" v-model="form.name">
                <br>
            </div>

            <div class="prof_phone">
                <i class="fa-solid fa-phone iconFilter"></i>
                <label for="mobileNumber" class="inputsName">Phone Number</label>
                <br>
                <input type="tel" placeholder="Ex: 01X XXXX XXXX" maxlength="13" name="mobileNumber" class="" id="number" v-model="form.phone">
                <br>
            </div>
            <div class="prof_gender">
                <i class="fa-solid fa-male iconFilter"></i>
                <label for="content" class="inputsName">Gender</label>
                <br>
                <select type="text" name="content" class="gender_inpt" v-model="form.Gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <br>
            </div>

            <div class="prof_email">
                <i class="fa-solid fa-mail-bulk iconFilter"></i>
                <label for="emailAddresss" class="inputsName">Email Address</label>
                <br>
                <input type="email" name="emailAddresss" class="" id="email" v-model="form.email">
                <br>
            </div>

            <div class="prof_verf">
                <i class="fa-solid fa-check iconFilter"></i>
                <label for="verification" class="inputsName">Verification</label>
                <br>
                <input placeholder="Not Verified" readonly="" type="text" name="verification" class="" id="verification">
                <a class="verificationbutton " style="color: #D8C690;">Verify</a>
                <br>
            </div>

            <div class="prof_DOB">
                <i class="fa-solid fa-calendar-check iconFilter"></i>
                <label for="dateOfBirth" class="inputsName">Date of Birth</label>
                <br>
                <input type="date" id="dateOfBirth" v-model="form.DOB">
                <br>
            </div>

            <div class="prof_btns">
            <button type="submit" name="SAVE" value="save" class="save button Btn"><i class="fa fa-save" ></i> SAVE</button>
            <button type="button" name="changepass" class="change_button Btn" @click="show()" style="width:200px;"><i class="icon fa fa-refresh"></i> Change Password</button>
            </div>
        </form>

        <div class="lawyersList" v-if="my_Role=='Admin'">
            <table class="lawyersListTable table-sort" id="lawyersListTable" style="max-height:200px;">
                <thead style="cursor: pointer;" class="lawyersListT-head"><tr>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
                </tr></thead>
                <tbody>
                <tr v-for="lawyer in lawyers" :key="lawyer.id">
                    <td>{{lawyer.id}}</td>
                    <td>{{lawyer.name}}</td>
                    <td>{{lawyer.email}}</td>
                    <td>{{lawyer.phone}}</td>
                    <td>{{lawyer.Role}}</td>
                    <td>
                    <span class="badge badge-success" v-if="lawyer.status=='online'">{{lawyer.status}}</span>
                    <span class="badge badge-danger" v-if="lawyer.status=='offline'">{{lawyer.status}}</span>
                    </td>
                    <td>
                        <router-link :to="{name: 'editLawyer', params:{id:lawyer.id}}"><input type="button" value="Edit" class="edit_list Btn" style="margin:2px;" v-if="lawyer.Role == 'Lawyer'"></router-link>
                        <input type="button" value="Delete" class="delete_list Btn" @click="DeleteLawyer(lawyer.id)" v-if="lawyer.Role == 'Lawyer'">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><router-link to="/addLawyer"><input type="button" class="add Btn" value="Add Lawyer" style="margin:2px;"></router-link></td>
                </tr>

            </tbody></table>

            </div>

</div>
<!-- change password tap-->
<div class="change_tap" id="change_tap" style="display: none;">
        <form class="change" @submit.prevent="changePassword">
            <br><br><br>
            <input type="text" id="old_password" placeholder="Old Password" v-model="changePasswordForm.oldPassword">
            <hr>
            <br>
            <input type="text" id="new_password" placeholder="New Password" v-model="changePasswordForm.newPassword">
            <hr>
            <br>
            <input type="text" id="confirm_password" placeholder="Confirm Password" v-model="changePasswordForm.newPassword_confirmation">
            <hr>
            <br><br>

        <button type="submit" class="back">Save</button>
        <button type="button" class="back" @click="hide()"> Back </button>
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
        let id=localStorage.getItem("ID");
            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/lawyers/'+id)
            .then(({data})=> {
                this.form= data.data[0];
                }
            )
            axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/lawyers')
            .then((response) =>{(this.lawyers=response.data.data);})

    },
    data(){
        return{
            changePasswordForm:{
                oldPassword:'',
                newPassword:'',
                newPassword_confirmation:'',
            },
            my_Role:localStorage.getItem('Role'),
            form:{
                name:'',
                email:'',
                phone:'',
                DOB:'',
                Gender:'',
            },
            lawyers:{},
            errors:{},
        }
    },
    methods:{
        profileEdit(){
                let id=localStorage.getItem("ID");
                axios.put('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/lawyers/'+id,this.form)
                .then(()=>
                {
                    this.$router.push({name:'home'})
                    Toast.fire({ icon: 'success', title: 'profile Edited Successfully',})
                    })
                .catch(error=>{
                    this.errors=error.response.data.errors;
                    Toast.fire({ icon: 'error', title: this.errors.email[0],})
                    Toast.fire({ icon: 'error', title: this.errors.name[0],})
                    })},
        changePassword(){
            let id=localStorage.getItem("ID");
            axios.post('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/changePassword/'+id,this.changePasswordForm)
            .then(()=>{
                this.$router.push({name:'logout'})
            })
            .catch(error=>{
                let err=error.response.data.oldPasswordError;
                if(err){
                    Notification.error(err);
                    }
                this.errors=error.response.data.errors;
                    if(this.errors.newPassword[0]){
                    Notification.error(this.errors.newPassword[0]);
                    }if(this.errors.oldPassword[0]){
                    Notification.error(this.errors.oldPassword[0]);
                    }
            })
        },
        DeleteLawyer(id){
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
                        axios.delete('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/lawyers/'+id)
                    .then(() => {
                        this.lawyers=this.lawyers.filter(lawyer => {return lawyer.id !=id})

                        Swal.fire(
                            'Deleted!',
                            'Lawyer has been deleted.',
                            'success'
                    )
                    })
                    .catch(() => {this.$router.push({name : 'home'})})
                    }
                })
            },
        show(){
            var hidden = document.getElementById("parent")
            var showen = document.getElementById("change_tap")
            showen.style.display="block";
            hidden.style.opacity="30%";
			showen.style.opacity="100%";
        },
        hide(){
            var hidden = document.getElementById("parent")
            var showen = document.getElementById("change_tap")
            showen.style.display="none";
            hidden.style.opacity="100%";
    },

    },


}
</script>
<style>
.profile_form ::placeholder{
    color: #5E5C5C;
}
.prof_name{
    position: relative;
    top: 100px;
    font-size: 20px;
    left: 20px;
}
.prof_email{
    position: relative;
    top: -110px;
    font-size: 20px;
    left: 500px;
}
.prof_DOB{
    position: relative;
    top: -278px;
    font-size: 20px;
    left: 1000px;
}
.prof_phone{
    position: relative;
    top: 120px;
    font-size: 20px;
    left: 20px;
}
.prof_gender{
    position: relative;
    top: 50px;
    font-size: 20px;
    left: 1000px;
}
.prof_verf{
    position: relative;
    top: -91px;
    font-size: 20px;
    left: 500px;
        width: 300px;
}
.verificationbutton{
    box-sizing: border-box;
    background-color: #494949;
    border-radius: 0;
    border: none;
    font-size: 16px;
    color: #D8C690;
    padding: 0px;
    margin-right: 5px;
    text-align: center;
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    opacity: 95%;
    padding: 6px;
    left: 250px;
    top: -30px;
    position: relative;
    border-radius: 5px;
}
.prof_btns button{
    height: 40px;
    width: 145px;
    margin: 20px 0 0 0;
    margin-right: 24px;
    box-sizing: border-box;
    background-color: #363636;
    border-radius: 1px;
    border: none;
    font-family: "Quicksand", sans-serif;
    font-size: 18px;
    color: #D8C690;
    padding-bottom: 2px;
    text-align: center;
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    opacity: 90%;
    -webkit-border-radius: 1px;
}
.prof_btns{
    left: 1000px;
    position: relative;
    top: -125px;
}
input,select{
    background-color: white;
    border-style: inset;
}
.gender_inpt{
    width: 250px;
}

.lawyersList{
    position: absolute;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    top: 400px;
    left: 86px;
    text-align: center;

}
    .lawyersListTable{
        width: 1200px;
    }


.lawyersList thead th{
    background-color: #5E5C5C;
    color: #D8C690;
    font-weight: 400;
    font-size: 19px;
    line-height: 40px;
    border: none;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -ms-transition: 0.2s;
    -o-transition: 0.2s;
}

.lawyersList thead th:hover{
    background-color: #868686;
}

.lawyersList tbody td{
    background-color: #ffffff;
    line-height: 30px;
    border: 1px solid;
    border-color: #5E5C5C;
    padding: 2px;
}

.table,th,td{
    font-family: "Quicksand", sans-serif;
}

.Btn{
    background-color: #5E5C5C;
    color: #D8C690;
    font-family: "Quicksand", sans-serif;
    border: none;
    cursor: pointer;
}

.Btn:active{
    background-color: #313131;
    box-shadow: 3px 2px 20px 1px rgba(0, 0, 0, 0.24);
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -o-transform: scale(0.9);
}

.Btn:hover{
    background-color: #696969;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -ms-transition: 0.2s;
    -o-transition: 0.2s;
}

.tableLastCol{
    background-color: #5E5C5C;
}

.tableInput{
    width: 97%;
    height: 100%;
    border: none;
    outline: none;
    text-align: center;
    font-family: "Quicksand", sans-serif;
}
.lawyersListT-head{
    height: 40px;

}
.profile_form div input,.profile_form div select{
    border-radius: 5px;
}
.delete_list,.edit_list{
    width: 45px;
    font-size: 15px;
    text-align: center;
    color: #D8C690;
    background-color: #5E5C5C;
    border: none;
}
.change_tap{

    position: absolute;
    z-index: 2;
    background-color: #5E5C5C;
    box-sizing: border-box;
    border-radius: 5%;
    position: fixed;
    top: 224px;
    left: 571px;
    width: 419px;
    height: 320px;
}

.change_tap input{
    border: none;
    background-color: #5E5C5C;
    color: #D8C690;
    position: relative;
    left: 85px;
    top: 0px;
    text-align: center;
    outline: none;
}
.change_tap input::placeholder {

    color: #D8C690;

}

.change_tap button {
    position: relative;
    left: 55px;
    bottom: 7px;
}
.change_tap hr{
    position: relative;
    top: 0%;
    left: 23%;
    width: 55%;
}
.change_tap button{
    top: -50px;
}
</style>
