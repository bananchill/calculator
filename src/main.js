import * as Vue from 'vue'

import Application from "@/infrastructure/app/application";

import appViewModule from "@/modules/appView/appViewModule";
import apiPack from "@/apis/apiPack"


import './styles/total.scss'


Window.Vue = Vue

// монтирование и  создание


const app = new Application()

// логер
const appLogUngroup = app.log.groupCollapsed('configure');

app.use(new appViewModule())



app.use(new apiPack())

appLogUngroup();

setTimeout(async () => await app.runAsync(), 0)
