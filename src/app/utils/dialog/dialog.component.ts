import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../utils';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  nameFormControl: FormControl;
  matcher: ErrorStateMatcher;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.nameFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]+[a-zA-Z0-9 ]+'),
    ]);

    this.matcher = new ErrorStateMatcher();
  }
}
