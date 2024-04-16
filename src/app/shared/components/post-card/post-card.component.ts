import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ipost } from '../../model/posts';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';
import { GetConfirmationComponent } from '../get-confirmation/get-confirmation.component';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() postObj !:Ipost;
  @Output() emitPost:EventEmitter<Ipost>=new EventEmitter<Ipost>();
  @Output() emitDeleteId:EventEmitter<string>=new EventEmitter<string>()
  constructor(
    private _matDialog : MatDialog,
    private _postService: PostsService
  ) { }

  ngOnInit(): void {
   
  }
  onPostEdit(){
    
  this.emitPost.emit(this.postObj)
  }
  ondelete(){
   let dialogConf= this._matDialog.open(GetConfirmationComponent)
    //API yes/no
    dialogConf.afterClosed()
    .subscribe((getconfirm : boolean)=>{
      console.log(getconfirm);
      
      if(getconfirm){
        this._postService.removePost(this.postObj.id)
        .subscribe((res)=>{
          this.emitDeleteId.emit(this.postObj.id)
        })

      }
    
    }
      
    )

  }

}
