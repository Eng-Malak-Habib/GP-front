<template>
<div>
<div class="home_page" id="home_page">
    <div class="header2" >
            <div class="header2content">
                <div class="logo header2Image">
                    <i class="fa-solid fa-calendar color"></i>
                </div>

                <div class="caseList header2Text">
                    <a class="legislation_list">AGENDA</a>
                </div>

            </div>
        </div>
        <v-btn outlined style="width:50px;top:80px;left:100px;" class="mr-4" color="grey darken-2" @click="viewMonth"> Month </v-btn>
        <v-btn outlined style="width:50px;top:80px;left:100px;" @click="prev" class="mr-4" color="grey darken-2"> <i class="fa-solid fa-angle-left"></i> </v-btn>
        <v-btn outlined style="width:50px;top:80px;left:80px;" @click="next" class="mr-4" color="grey darken-2"> <i class="fa-solid fa-angle-right"></i> </v-btn>
        <v-toolbar-title v-if="$refs.calendar" style="top:82px;left:360px;position:absolute;">{{ $refs.calendar.title }}</v-toolbar-title>
  <v-app class="calender_container" id="calender_container">
<div class="calender">
<v-row>
    <v-col>
      <v-sheet height="500">
          <v-calendar
        ref="calendar"
        v-model="focus"
        :now="today"
        :value="today"
        color="primary"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        :dark="true"
        @click:date="viewDay"
        @click:event="edit_show"
        @change="allTasks"
      ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</div>



        <form class="inputs calender_form" @submit.prevent="searchTask">
          <input type="text" class="Task_search_bar" placeholder="Search" v-model="searchTerm">
            <div class="task_page_btns">

            <button type="submit" name="SEARCH" value="search" class="back"><i class="icon fa fa-search"></i> SEARCH</button>
            <br>
            <button type="button"  class="back" @click="add_show()"><i class="fa-solid fa-plus"></i> Add Task</button>

            </div>
        </form>

  </v-app>

  </div>
  <!-- add Task tap-->
<div class="task_tap" id="task_tap_add" style="display:none;color:black;">
    <form class="add" @submit.prevent="insertTask">
        <br><br><br><br>
        <label class="inputsName title_task">Title</label>
        <br>
        <input type="text" class="title_inpt" name="title" v-model="form.Title">

        <br><br>
        <label class="inputsName dec_task">Description</label>
        <br>
        <textarea type="text" class="description dec_inpt" name="description" v-model="form.Description"></textarea>

        <br><br>
        <label class="inputsName">Date</label>
        <br>
        <input type="date" class="date" name="date" v-model="form.Date">

        <br><br>
        <label class="inputsName">Start Time</label>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <label class="inputsName">End Time</label>
        <br>

        <input type="time" class="time_task" name="starttime" v-model="form.StartTime">
        &nbsp; &nbsp; &nbsp;
        <input type="time" class="time_task" name="endtime" v-model="form.EndTime">


        <br><br>
        <br><br><br>
    <button type="submit" class="back" onclick="">Save</button>&nbsp;
    <button type="button" class="back" @click="add_hide()"> Back </button>
    </form>

</div>
<!-- edit Task tap-->
<div class="task_tap" id="task_tap_edit" style="display:none;color:black;">
    <form class="add" @submit.prevent="updateTask">
        <br><br><br><br>
        <label class="inputsName title_task">Title</label>
        <br>
        <input type="text" class="title_inpt" name="title" v-model="form.Title">

        <br><br>
        <label class="inputsName dec_task">Description</label>
        <br>
        <textarea type="text" class="description dec_inpt" name="description" v-model="form.Description"></textarea>

        <br><br>
        <label class="inputsName">Date</label>
        <br>
        <input type="date" class="date" name="date" v-model="form.Date">

        <br><br>
        <label class="inputsName">Start Time</label>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <label class="inputsName">End Time</label>
        <br>

        <input type="time" class="time_task" name="starttime" v-model="form.StartTime">
        &nbsp; &nbsp; &nbsp;
        <input type="time" class="time_task" name="endtime" v-model="form.EndTime">


        <br><br>
        <br><br><br>
    <button type="submit" class="back" onclick="">Save</button>&nbsp;
    <button type="button" class="back" @click="edit_hide()"> Back </button>
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
    },
  name: 'App',
  components: {

  },
  methods:{
    add_show(){
              var task = document.getElementById("task_tap_add");
              var pos = document.getElementById("home_page");
              task.style.display="block";
              pos.style.opacity="30%";
              task.style.opacity="100%";

    },
    add_hide(){
              var task = document.getElementById("task_tap_add");
              var pos = document.getElementById("home_page");
              task.style.display="none";
              pos.style.opacity="100%";
    },

    edit_show({event}){
        axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/Tasks_search/'+event.name).then((response) =>{
                this.form=response.data.data[0];
                })
                .catch()
            var task = document.getElementById("task_tap_edit");
            var pos = document.getElementById("home_page");
            task.style.display="block";
            pos.style.opacity="30%";
            task.style.opacity="100%";
    },
    edit_hide(){
              var task = document.getElementById("task_tap_edit");
              var pos = document.getElementById("home_page");
              task.style.display="none";
              pos.style.opacity="100%";
    },
    insertTask(){
        axios.post('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/tasks',this.form)
                .then(() =>{
                location.reload();
                })
                .catch(error=>{
                    this.errors=error.response.data.errors;

                    })
    },
    updateTask(){
        axios.put('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/tasks/'+this.form.id,this.form).then(() =>{
                location.reload();
                }).catch(error=>{
                    this.errors=error.response.data.errors;
                    })
    },
    allTasks(){
                axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/tasks-originalFormat')
                .then((response) =>{this.tasks=response.data.data;
                this.getEvents();
                })
                .catch()
            },
    getEvents () {
        console.log(this.tasks)
        const events = []
        for (let i = 0; i < this.tasks.length; i++) {
        const allDay = this.rnd(0, 3) === 0
        const date=this.tasks[i].Date;
        const start=date.concat("T", this.tasks[i].StartTime);
        const end=date.concat("T", this.tasks[i].EndTime);
          events.push({
            name: this.tasks[i].Title,
            start: start,
            end: end,
            color: this.colors[this.tasks[i].id % 6 - 1],
            timed: !allDay,
          })
        }
        this.events = events
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      viewMonth({}){
        this.focus = ''
        this.type='month'
      },
      prev(){
          this.$refs.calendar.prev()
      },
    next(){
        this.$refs.calendar.next()
    },
    searchTask(){
        axios.get('https://ec2-54-196-138-182.compute-1.amazonaws.com/my_GP/api-passport/public/api/Tasks_search/'+this.searchTerm).then((response) =>{
                console.log(response);
                this.tasks=response.data.data;
                this.getEvents();
                })
                .catch()
    }
  },

    data: () => ({
        form:{
            Title:'',
            Date:'',
            StartTime:'',
            EndTime:'',
            Description:'',
        },
        focus:'',
        tasks:[],
        type: 'month',
        events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        searchTerm:'',
    }),
  };
</script>


<style>
body{
overflow: hidden;
}
.calender_container{
    width: 1000px;
    top: 90px;
    left: 65px;
}
.calender_form{
    top: 140px;
    position: absolute;
    left: 1040px;
}

.task_tap{
    z-index: 3;
    box-sizing: border-box;
    position: fixed;
    top: 165px;
    left: 571px;
    width: 419px;
    height: 526px;
    background-color: white;
    border-radius: 20px;
}
.task_tap input,.description{
    position: relative;
    top: -75px;
    left: 81px;
    border: none;
    background-color: #b1afaf;
    color: #0c0c0c;
    outline: none;
    font-weight: 700;
    font-size: large;
}
.task_tap label{
position: relative;
left: 88px;
top: -80px;
}
.task_tap .dec_task,.task_tap .title_task{
top: -50px;
}
.task_tap .dec_inpt,.task_tap .title_inpt{
    top: -55px;
}
.task_tap .dec_inpt{
    max-height: 111px;
    min-height: 111px;
    width: 250px;
}
.task_tap .time_task{
width: 110px;
}
.task_tap button{
    position: relative;
    top: -156px;
    left: 64px;
    height: 40px;
    width: 145px;
    margin:20px 0 0 0;
    box-sizing: border-box;
    background-color: #363636;
    border-radius: 2px;
    border:none;
    font-family: "Quicksand", sans-serif;
    font-size: 18px;
    color: #D8C690;
    padding: 0px;
    padding-bottom: 2px;
    text-align: center;
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    opacity: 90%;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
}
.home_page {
    background-color: #F4F4F4;
    top: 45px;
    position: relative;
    left: 53px;
    width: 1435px;
}
.Task_search_bar::placeholder{
    color: black
}
.task_page_btns button{
    position: relative;
    left: 50px;
}
</style>
