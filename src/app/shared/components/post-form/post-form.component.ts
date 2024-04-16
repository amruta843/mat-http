import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostsService } from '../../services/posts.service';
import { Ipost } from '../../model/posts';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
postForm!:FormGroup;
getPost!:Ipost
  isInUpdateMode: boolean=false;
  constructor( @Inject (MAT_DIALOG_DATA)editPost : any,
  private _dialogRef : MatDialogRef<PostFormComponent>,
private _postsService: PostsService) 
  { 
    this.createPostForm()
   console.log(editPost);
   if(editPost){
    this.getPost = editPost;
    this.isInUpdateMode = true;
    this.postForm.patchValue(editPost)
   }
  }

  ngOnInit(): void {
    
   
  }
  createPostForm(){
    this.postForm= new FormGroup({
      title: new FormControl(null,[Validators.required] ),
      body: new FormControl(null,[Validators.required] ),
      userId: new FormControl(null,[Validators.required] )
    })
  }
  onPostSubmit(){
    if(this.postForm.valid){
      //loader will start
      let obj=this.postForm.value;
      console.log(obj);
      this._postsService.createPost(obj)
      .subscribe( res=>{
        console.log(res);
        this._postsService.sendNewPost({...obj, id : res.name});
        this.postForm.reset();
        this._dialogRef.close();}
      
      //loader will stop
      )
    }
  }

  onUpdate(){
    let updatedObj= {...this.postForm.value, id : this.getPost.id};
    this._postsService.updatePost(updatedObj)
    .subscribe(res=>{
      console.log(res);
      this._postsService.sendUpdatedPost(res)
      
      this.postForm.reset();
      this._dialogRef.close();
    }
      
    )

  }
}
