import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirmation',
  templateUrl: './get-confirmation.component.html',
  styleUrls: ['./get-confirmation.component.scss']
})
export class GetConfirmationComponent implements OnInit {

  constructor(
    private _dialogRef : MatDialogRef <GetConfirmationComponent>
  ) { }

  ngOnInit(): void {
  }
  confirm(){
    this._dialogRef.close(true);
  }
  cancel(){
    this._dialogRef.close(false);
  }
}
