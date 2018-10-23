import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
//   providedIn: 'root'
export class HttpService { 

  constructor(private _http: HttpClient) {
    // this.getTasksFromService();
    console.log("Entered http service file");
  }
  getTasks() {
    return this._http.get('/task');
  }

  getAllTasks(){
    return this._http.get('/task');
  }

  getOneTask(_id){
    return this._http.get(`/${_id}`);
  }

  onButtonClick(tasks): void {
    console.log(`Click event is working with event: ${tasks}`);
  }

  addTask(newTask){
    return this._http.post('/task', newTask);
  }

  editTask(editTask) {
    return this._http.put(`/task/${editTask._id}`, editTask);
  }

  removeTask(_id){
    return this._http.delete(`/task/${_id}`);
  }

}