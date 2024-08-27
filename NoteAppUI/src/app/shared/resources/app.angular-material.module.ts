import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogClose } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {CdkDropList, CdkDrag} from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [],
    imports: [CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatLabel,
        MatCardModule,
        MatRippleModule,
        MatDialogClose,
        HttpClientModule,
        MatFormFieldModule, 
        MatInputModule, 
        FormsModule, 
        ReactiveFormsModule,
        CdkDrag,
        CdkDropList
    ],
    exports: [CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatLabel,
        MatCardModule,
        MatRippleModule,
        MatDialogClose,
        HttpClientModule, 
        MatFormFieldModule, 
        MatInputModule, 
        FormsModule, 
        ReactiveFormsModule,
        CdkDrag,
        CdkDropList
    ]
})
export class AngularMaterialsModule { }