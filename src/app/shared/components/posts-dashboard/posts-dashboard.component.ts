import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Ipost } from '../../model/posts';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.scss']
})
export class PostsDashboardComponent implements OnInit {
postsArray : Array<Ipost>=[];

  constructor(private _postsService:PostsService,
    private _matDialog : MatDialog  //inject the instance
  ) { }

  ngOnInit(): void {
    
    this._postsService.getAllPosts()
    .subscribe(res=>{
      this.postsArray = res;
      })

    this._postsService.newPostSubObs$
    .subscribe((post:Ipost)=>
    {
      this.postsArray.push(post)
    })


    this._postsService.updatePostSubObs$
    .subscribe( (updatedPost : Ipost)=>{
      let getIndex= this.postsArray.findIndex(post=>{
        return post.id === updatedPost.id
      })
      this.postsArray[getIndex] = updatedPost;
    })
  }


  onAddPost(){
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose=true;//to disable autoclose of form on side click
    dialogConf.width="400px";
    //dialogConf.data="Sending ID to Post Form Component";
    const dialogref= this._matDialog.open(PostFormComponent, dialogConf);
  }

  patchEditValue(editPost : Ipost){
    console.log(editPost);
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose=true;//to disable autoclose of form on side click
    dialogConf.width="400px";
    dialogConf.data=editPost;
    const dialogref= this._matDialog.open(PostFormComponent, dialogConf);
  }

  onRemovePost(id:string){
    let getIndex = this.postsArray.findIndex(post=> post.id===id);
    this.postsArray.splice(getIndex, 1)

  }
}
