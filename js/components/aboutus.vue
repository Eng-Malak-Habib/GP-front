<template>
    <div class="about" id="parent">
        <div class="header2">
            <div class="header2content">
                <div class="child header2Image">
                    <i class="fa-solid fa-file-circle-plus"></i>
                </div>
                <div class="child header2Text">
                    About Us
                </div>

            </div>
        </div>

        <form class="inputs" id="inputs" action="">
            <h1>the team</h1>
        <span>
            <h1 class="dev_title">The Developers</h1>
                <br><br>
            <span class="names">
                <h4>Omar Shawky <br><br> <img class="shawky" src="https://avocado-cloud.s3.amazonaws.com/team_photos/shawky.jpeg" ></h4>
                <h4>Malak Habib  <br><br> <img class="malak" src="https://avocado-cloud.s3.amazonaws.com/team_photos/malak.jpeg" ></h4>
                <h4>Mohamed Amr <br><br> <img class="amr" src="https://avocado-cloud.s3.amazonaws.com/team_photos/mohamedAmr.jpeg" ></h4>
                <h4>Abdelrahman  Attia <br><br> <img class="attia" src="https://avocado-cloud.s3.amazonaws.com/team_photos/attia.jpeg" ></h4>
                <h4>Ezz-eldeen Khairy<br><br> <img class="ezz" src="https://avocado-cloud.s3.amazonaws.com/team_photos/ezz.jpeg" ></h4>
                <h4>Mohamed Abdelghany <br><br> <img class="ab8any" src="https://avocado-cloud.s3.amazonaws.com/team_photos/3bghany.jpeg" ></h4>
                <h4>Mostafa said <br><br> <img class="mostafa" src="https://avocado-cloud.s3.amazonaws.com/team_photos/mostafa.jpeg" ></h4>
                <h4>Omar Sheriff <br><br> <img class="sherif" src="https://avocado-cloud.s3.amazonaws.com/team_photos/sheriff.jpeg" ></h4>
            </span>
        </span>
            <span class="about">
                <h1>Our Mission </h1>
                <h4>the Law Office Management Information System purpose is to digitize  the legal firm’s everyday operations , such as <br><br>storing records , and managing client records, attorney records, service records, payment records, and other <br> <br>firm-related activities , and after that the lawyer can check on his activities(case list,<br> <br>court record list ,legislations,models,...) using the mobile application.</h4>
            </span>
            <span class="contactus">
                <h1>Contact us </h1>
                <h4> By Email</h4> <h3>avocadoteam@gmail.com</h3>
                <h4> By phone</h4> <h3> 20 1137008486 </h3>
            </span>

        </form>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.about{
    background-color: #F4F4F4;
    position:absolute;
    top: 85px;
    left: 65px;
    width: 1436px;
    height: 618px;
    padding: 0;


}
.about .header2{
    background-color: #5E5C5C;
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 0;
}


.about .header2{
    background-color: #5E5C5C;
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 0;
    color:#D8C690;
}
.about .header2Image{
    height: 100%;
    width: 68px;
    margin-left: 10px;
    position: relative;
    top: 14px;
    left: 20px;
    font-size: xx-large;

}

.about .header2content{
    display: flex;
    flex-direction: row;
    width: 50%;
    position: absolute;
    top: 1px;
    left: -11px;

}


.about .header2Text {
    color: #D8C690;
    font-family: 'Courier New', Courier, monospace;
    font-size: 25px;
    font-weight: 500;
    width: 27px;
    margin-top: 22px;
    margin-left: -541px;

}
.about .contactus{
    position: absolute;
    top: 60%;
    left: 79%;
}
.about .about h1 ,.about .dev_title ,.about .contactus h1{
    color: #363636;
    font-family: 'Courier New', Courier, monospace;
    font-size: 25px;
    font-weight: 800;
    width: 250px;
}
.about .contactus h4{
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    font-weight: 700;
    word-spacing: 6px;

}
.about .names h4 ,.about .contactus h3,.about .about h4{
    font-family: 'Courier New', Courier, monospace;
    font-size: 15px;
    font-weight: 700;
}

.about .child{
    flex: 1;
}

.about .child:first-child {
    margin-right: 0px;
}


.about .login_toast{
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
.about .dev_title{
    position: absolute;
    left: 3%;
    top: 17%;
}
.about .names{
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    text-align: center;
    position: absolute;
    top: 23%;
    left: 1%;
}
.about .about{
    position: absolute;
    top: 60%;
    height: 0;
    left: 3%;
}
.about .names h4{
    width: 156px;
}
.about .names img{
    height: 100px;
    width: 100px;
    border-radius: 50%;
}
</style>
