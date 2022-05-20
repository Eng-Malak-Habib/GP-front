//Authentication section
let login = require("./components/auth/login.vue").default;
let register = require("./components/auth/register.vue").default;
let forgot = require("./components/auth/forgot.vue").default;
let logout = require("./components/auth/logout.vue").default;
//Lawyer section
let addLawyer = require("./components/Lawyers/addLawyer.vue").default;
let editLawyer = require("./components/Lawyers/editLawyer.vue").default;
//record section
let addrecord = require("./components/records/addrecord.vue").default;
let records = require("./components/records/records.vue").default;
let editRecord = require("./components/records/editRecord.vue").default;
let viewRecord = require("./components/records/viewRecord.vue").default;
//case section
let cases = require("./components/cases/cases.vue").default;
let addcase = require("./components/cases/addCase.vue").default;
let viewCase = require("./components/cases/viewCase.vue").default;
let editCase = require("./components/cases/editCase.vue").default;

//model section
let models = require("./components/models/models.vue").default;

//legislation section
let legislations =
  require("./components/Legislations/legislations.vue").default;

//client section
let clients = require("./components/clients/clients.vue").default;
let addclient = require("./components/clients/addclient.vue").default;
let editclient = require("./components/clients/editclient.vue").default;
let viewclient = require("./components/clients/viewclient.vue").default;

//home section
let home = require("./components/home.vue").default;

//profile section
let profile = require("./components/profile.vue").default;

//About us section
let aboutUs = require("./components/aboutus.vue").default;

export const routes = [
  { path: "/", component: login, name: "/" },
  { path: "/public/", component: login },
  { path: "/register", component: register, name: "register" },
  { path: "/forgot", component: forgot, name: "forgot" },
  { path: "/logout", component: logout, name: "logout" },

  { path: "/addLawyer", component: addLawyer, name: "addLawyer" },
  { path: "/editLawyer/:id", component: editLawyer, name: "editLawyer" },

  { path: "/addrecord", component: addrecord, name: "addrecord" },
  { path: "/records", component: records, name: "records" },
  { path: "/editRecord/:id", component: editRecord, name: "editRecord" },
  { path: "/viewRecord/:id", component: viewRecord, name: "viewRecord" },

  { path: "/cases", component: cases, name: "cases" },
  { path: "/addcase", component: addcase, name: "addcase" },
  { path: "/editCase/:id", component: editCase, name: "editCase" },
  { path: "/viewCase/:id", component: viewCase, name: "viewCase" },

  { path: "/models", component: models, name: "models" },

  { path: "/legislations", component: legislations, name: "legislations" },

  { path: "/clients", component: clients, name: "clients" },
  { path: "/addclient", component: addclient, name: "addclient" },
  {
    path: "/editclient/:id",
    component: editclient,
    name: "editclient",
  },
  { path: "/viewclient/:id", component: viewclient, name: "viewclient" },

  { path: "/home", component: home, name: "home" },
  { path: "/profile", component: profile, name: "profile" },
  { path: "/aboutUs", component: aboutUs, name: "aboutUs" },
];
