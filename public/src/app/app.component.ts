import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  tasks = [];
  newTask: any;
  // show: object;
  show = { _id: "", title: "", description: "" };
  editTask: {_id: '', title: '', description: ''};
  loadEdit=false;
  _id: '';

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.newTask = { title: "", description: "" }
  }
  onButtonClick() {
    let observable = this._httpService.getTasks()
    observable.subscribe(data => {
      console.log("Got our data!", data)
      this.tasks = data;
      // this.tasks.push(data)
      console.log(`Click event is working, first button- tasks:!`, this.tasks)
    })
  }
  //choose ONE task
  showData(task) {
    console.log(task);
    this.show = task;
  }
  getOneTask(task) {    
    this.loadEdit=true;
    this.editTask={_id: task._id, title: task.title, description: task.description};
    console.log("Success at getone task- edit ")
  }

  getAllTasks() {
    let observable = this._httpService.getAllTasks();
    observable.subscribe(data => {
      console.log("successful route", data);
      // this.tasks.push(data)
      this.tasks = data;
    })
  }

  onSubmitAdd(newTask) {
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {

      // console.log("Data from on submit add", data);
      this.newTask = { title: "", description: "" };
      this.tasks.push(data)
      ///could also say this.getAllTasks() instead of pushing to the array
    })
  }

  onSubmitEdit() {
    let observable = this._httpService.editTask(this.editTask);
    observable.subscribe(data => {
      console.log("Data from EDIT ", data);
      this.editTask = {_id: "", title: "", description: "" };
      this.getAllTasks()
    })
  }

  removeTask(_id) {
    let observable = this._httpService.removeTask(_id);
    observable.subscribe(data => {
      this.getAllTasks()
    })
  }


}




// export class AppComponent implements OnInit{
  // snacks: string[];
  // loggedIn: boolean;

  // num: number;
  // randNum: number;
  // str: string;
  // first_name: string;
  // title = 'app';
  // task = [];
  // tasks = [];
  // tasks = ["Learn Angular- understand services", "Manipulate the DOM- use the 'for of' loop", "Bind events- parentheses indicate events"]
  // id = '';
  // newTask: any;
  // editTask = [];
  // self = this;
  // _httpService: any;

  // constructor(private _httpService: HttpService){}
  //   ngOnInit(){
      // this.num = 7;
      // this.randNum = Math.floor( (Math.random()  * 2 ) + 1);
      // this.str = 'Hello Angular Developer!';
      // this.first_name = '';da
      // this.snacks = ["vanilla latte with skim milk", "brushed suede", "cookie"];
      // this.loggedIn = true;

      // this.newTask = {title: "", description: ""};

      // this.tasks = this._httpService.getTasks();
      // this.tasks = data['tasks'];

    // this.getTasksFromService();


  //   getTasksFromService(){
  //     let observable = this._httpService.getTasks();
  //     observable.subscribe(data => {
  //       console.log("Got our tasks!", data);
  //     this.tasks = data['tasks'];
  //   });
  // }




    // getAllTasks(){
    //   const observable = this._taskService.getAllTasks();
    //   observable.subscribe(data => {
    //     for (let task in data) {
    //       if(data.hasOwnProperty(task)){
    //         this.tasks.push(data[task])
    //       }
    //     }
    //   })
    // }