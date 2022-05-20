<template>
<div class="add_record" id="parent">
        <div class="header2">
            <div class="header2content">
                <div class="child header2Image">
                    <i class="fa-solid fa-file-circle-plus"></i>
                </div>
                <div class="child header2Text">
                    Add Court Record
                </div>

            </div>
        </div>

        <form class="inputs" id="inputs" @submit.prevent="recordInsert" enctype="multipart/form-data">
            <div class="topic">
                <h3>Topic</h3>
                <input type="text" id="topic" class="topics" placeholder="Topic" v-model="form.topic">
            </div>
            <div class="record_case">
                <h3>Case</h3>
                <select name="activity" class="inputsSelect" v-model="form.Case">
                    <option :value="_case.id" v-for="_case in cases" :key="_case.id" >{{_case.Title}}</option>
                </select>
            </div>

            <div class="attachments">
                <h3>Attachments</h3>
                <input type="file" id="attachments" class="attachments" placeholder="Attachments" @change="onFileSelected">
            </div>

            <div class="lawyername">
                <h3>Contender Name</h3>
                <input type="text" id="lawyer_name" class="lawyer_name" placeholder="Contender Name" v-model="form.Contender">
            </div>

            <div class="clientname">
                <h3>Client Name</h3>
                <input type="text" id="clientname" class="client_name" placeholder="Client Name" v-model="form.Client_name">
            </div>

            <div class="notes">
                <h3>Notes</h3>
                <textarea name="notes " class="Notes" cols="30" rows="10" v-model="form.Note"></textarea >
            </div>

            <div class="id">
                <h3>ID</h3>
                <input type="text" class="ID" placeholder="ID" v-model="form.record_id">
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
        axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/cases')
            .then(({data})=> {this.cases= data.data;})
            .catch();
    },
    data() {
        return {
            form: {
                record_id: null,
                topic: null,
                Client_name: null,
                Contender: null,
                Attachment: null,
                Lawyer_id: null,
                Case: null,
                Note: null,
            },
            cases:{},
            errors: {},
        };
    },
    methods: {
        recordInsert() {
            this.form.Lawyer_id = localStorage.getItem("ID");
            axios
                .post("https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/records", this.form)
                .then((response) => {
                    this.$router.push({ name: "records" });
                Toast.fire({icon: 'success',title: 'record Inserted Successfully'})
                })
                .catch(error=>{
                    this.errors=error.response.data.errors
                        Toast.fire({ icon: 'error', title: this.errors.record_id[0],})
                        Toast.fire({ icon: 'error', title: this.errors.Contender[0],})
                        Toast.fire({ icon: 'error', title: this.errors.Client_name[0],})
                        Toast.fire({ icon: 'error', title: this.errors.topic[0],})
                        Toast.fire({ icon: 'error', title: this.errors.Attachment[0],})
                    });
        },
        onFileSelected(event) {
            let file = event.target.files[0];
            if (file.size > 1048770) {
            Toast.fire({icon: 'info',title: 'attachment should be at most 1MB'})

            } else {
                let reader = new FileReader();
                reader.onload = (event) => {
                    this.form.Attachment = event.target.result;
                    console.log(event.target.result);
                    let f=this.form.Attachment.indexOf("/");
                    let l=this.form.Attachment.indexOf(";") - f;
                    let ext = this.form.Attachment.substr(f+1, l-1);
                    if(ext != "png" && ext != "jpeg" && ext != "jpg" && ext != "pdf"){
                Toast.fire({icon: 'info',title: 'Allowed Types(png,jpg,jpeg,pdf)'})
                this.form.Attachment=null;
                    }
                };
                reader.readAsDataURL(file);
                }
        },
    },
};
</script>

<style type="text/css">

.add_record{
    background-color: #F4F4F4;
    position:absolute;
    top: 85px;
    left: 65px;
    width: 1436px;
    height: 618px;
    padding: 0;


}
.add_record .header2{
    background-color: #5E5C5C;
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 0;
}

.add_record .view{

    position: relative;
    left: 155px;
    top: 0px;
    width: 116px;
    height: 50px;
    background-color: #494949;
    border:none;
    font-size: 20px;
    color: #D8C690;
    padding: 10px;
    text-align: center;
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    margin: 0%;
    padding: 0%;
}
.add_record .edit{
    position:relative;
    left: 253px;
    top: 0px;
    width: 116px;
    height: 50px;
    background-color: #494949;
    border:none;
    font-size: 20px;
    color: #D8C690;
    padding: 10px;
    text-align: center;
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    margin: 0%;
    padding: 0%;
}

.add_record input{
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
    height: 50px;

}
.add_record .client_name{
    left: 0;
    top: 42px;
}

.add_record .save,.back{

    height: 40px;
    width: 150px;
    margin:20px 0 0 0;
    box-sizing: border-box;
    background-color: #494949;
    border-radius: 0;
    border:none;
    font-family: "Quicksand", sans-serif;
    font-size: 18px;
    color: #D8C690;
    padding: 0px;
    margin-right: 5px;
    text-align: center;
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    opacity: 95%;
}


.add_record ::placeholder{
    box-sizing: border-box;
    color: #363636;;
}

.add_record .header2{
    background-color: #5E5C5C;
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 0;
    color:#D8C690;
}
.add_record .header2Image{
    height: 100%;
    width: 68px;
    margin-left: 10px;
    position: relative;
    top: 14px;
    left: 20px;
    font-size: xx-large;

}

.add_record .header2content{
    display: flex;
    flex-direction: row;
    width: 50%;
    position: absolute;
    top: 1px;
    left: -11px;

}


.add_record .header2Text{
    color: #D8C690;
    font-family: 'Courier New', Courier, monospace;
    font-size: 25px;
    font-weight: 500;
    width: 27px;
    margin-top: 22px;
    margin-left: -541px;

}

.add_record .child{
    flex: 1;
}

.add_record .child:first-child {
    margin-right: 0px;
}

.add_record .inputs{
    background-color:#F4F4F4;
    position: absolute;
    top: 70px;
    left: 1px;
    width: 1434px;
    height: 492px;
}
.add_record input{
    margin-top: -5px;
    padding: 0%;
    border:#7e7b7b;
    border-style:ridge;
    border-radius: 5%;
    color: #363636;
    padding-left: 2%;
}
.add_record h3{
    margin-bottom: 2%;
    color: black;
    font-size: 21px;
}
.add_record .court{
    position:absolute;
    top: 0px;
    left: 20px;
}
.add_record .inputsSelect{
    width: 248px;
    height: 48px;
}
.add_record .topic{
    position:absolute;
    top: 15px;
    left: 380px;
}
.add_record .attachments{
    position:absolute;
    top: 0px;
    left: 740px;
    height: 50px;
}
.add_record .attachments input{
    position: absolute;
    left: -2px;
    top: 55px;
    border: none;
}

.add_record .lawyername{
    position:absolute;
    top: 15px;
    left: 1100px;
}
.add_record .clientname{
    position:absolute;
    top: 9px;
    left: 20px;
}
.add_record .id{
    position:absolute;
    top: 105px;
    left: 20px;
}
.add_record .notes{
    position: absolute;
    top: 194px;
    left: 20px;

}
.add_record .Notes{
    width: 750px;
    background-color: white;
}


.add_record .addcourtrecord_buttons{
    position: absolute;
    top: 250px;
    left: 807px;
}

.add_record .login_toast{
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
.add_record .prof{cursor: pointer;}
.add_record .a1,.add_record .a2,.add_record .a3{
    position: relative;
    padding-top: 2%;
    padding-bottom: 3%;
    padding-left: 10%;
    color: rgb(40, 40, 40);
}

.add_record .a1{
    top: 3%;
    padding-right: 33%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

}
.add_record .a1:hover ,.add_record .a2:hover,.add_record .a3:hover{
    background-color:#999898 ;
}
.add_record .a2{
    top: 9%;
    padding-right: 34%;


}
.add_record .a3{
    top:17%;
    padding-right: 53%;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.add_record .record_case{
position: absolute;
    top: 100px;
    left: 380px;
}
.add_record .record_case select{
    margin-top: 0;
    padding: 0%;
    border: #7e7b7b;
    border-style: ridge;
    border-radius: 5%;
    color: #363636;
    padding-left: 2%;
    width: 254px;
    background-color: transparent;
}
</style>
