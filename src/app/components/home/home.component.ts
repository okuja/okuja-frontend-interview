import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  new_math_operation:any;
  math_operation_form: FormGroup;
  all_math_operations: any

  constructor(
    private form_builder: FormBuilder,
  ) { }

  ngOnInit() {
    this.math_operation_form = this.form_builder.group({
      number_one:['',Validators.required],
      number_two:['',Validators.required],
      math_operation:['',Validators.required]

    });
  }

  sendMathOperation(form: FormGroup){
    // var form_number_one = form.value.number_one;
    // var form_number_teo = form.value.number_two;
    // var form_math_operation = form.value.math_operation;

    // switch(form_math_operation){
    //   case 'add':
    //       break
    //   case 'subtract':
    //       break
    //   case 'multiply':
    //       break
    //   case 'divide':
    //       break  
    // }


    this.new_math_operation = {
      "expr":"Send Operation"
    };
   
    
  }

}
