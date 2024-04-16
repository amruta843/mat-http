import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../model/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
postsUrl : string=`${environment.baseUrl}/post.json`;
private newPostSub$: Subject<Ipost>=new Subject<Ipost>()
private updatePostSub$: Subject<Ipost>=new Subject<Ipost>()

newPostSubObs$:Observable<Ipost>=this.newPostSub$.asObservable();
updatePostSubObs$:Observable<Ipost>=this.updatePostSub$.asObservable();
  constructor(private _http : HttpClient) { }
  

  getAllPosts():Observable <Array<Ipost>>{
    return this._http.get(this.postsUrl)
                        .pipe(
                               map((res : any )=>{
                               let postsArray: Array<Ipost>=[];
                             
                               for (const key in res) {
                                postsArray.push({...res[key], id : key})
 
                                };
                                return postsArray;
                               }))

  }
  
  createPost(post :Ipost): Observable<any>{
    return this._http.post<any>(this.postsUrl, post)
    .pipe(
      catchError(err=>{
        alert("something went wrong")
        return of(err)
      })
    )
  }
  sendNewPost(post:Ipost){
    this.newPostSub$.next(post)
  }

  sendUpdatedPost(post:Ipost){
    this.updatePostSub$.next(post)
  }

  updatePost(post:Ipost):Observable<any>{
    let updateUrl= `${environment.baseUrl}/post/${post.id}.json`;
    return this._http.patch(updateUrl, post)
  }

  removePost(postId : string):Observable<any>{
    let updateUrl= `${environment.baseUrl}/post/${postId}.json`;
    return this._http.delete(updateUrl)
  }
}
