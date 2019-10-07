import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private httpOptions: any;
  private commonUrl: any = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {
    this.setHttpOptions();
  }
  
  private setHttpOptions(){
   this.httpOptions = {
       headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
   };
  }

  public getElement(url: string){
    return this.httpClient.get(this.commonUrl + url, this.httpOptions).subscribe(
        error =>{
            console.log('--Error: ',error);
        }
    )
  }

  public putElement(url: string, params: any) {

    return this.httpClient.put(this.commonUrl + url,params,this.httpOptions).subscribe(
    error =>{
        console.log('--Error: ',error);
    })
  }
}
