import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../services/home/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  new_math_operation:any;
  math_operation_form: FormGroup;
  all_math_operations: any[] = [];
  response: any;
  math_response_operations: any;
  isLoading: boolean;
  isError: boolean
  error_message:any

  constructor(
    private form_builder: FormBuilder,
    private _homeService: HomeService
  ) { }

  ngOnInit() {
    this.math_operation_form = this.form_builder.group({
      number_one:['',[Validators.required,Validators.maxLength(10)]],
      number_two:['',[Validators.required,Validators.maxLength(10)]],
      math_operation:["+" ? "+":'',Validators.required]

    });
  }

  sendMathOperation(form: FormGroup){
    this.isLoading = true;
   
    var form_number_one = form.value.number_one;
    var form_number_two = form.value.number_two;
    var form_math_operation = form.value.math_operation;
    var expression = form_number_one + form_math_operation + form_number_two

    this.new_math_operation = {
      "expr":expression,
      "precision": 14
    };
    
    this._homeService.post_math_operation(this.new_math_operation).subscribe(
      res =>{
      this.isLoading = false;
      this.isError = false;
      this.response = res;
      var status:any
      var rounded_number = Math.round(Math.random());
      var final_response:any

      if (rounded_number == 1){
        var second_random_number = (Math.random())*4000;
        var ceiling_number = Math.ceil(second_random_number)
        final_response = ceiling_number        
      }
      else{
        final_response = this.response.result
      }
      if (final_response == eval(expression)){
        status = "yes"
      }
      else{
        status = "no"
      }

      
      this.math_response_operations = {
        number_one:form_number_one,
        number_two:form_number_two,
        response:final_response,
        expected:eval(expression),
        passed: status
      }

      this.all_math_operations.push(this.math_response_operations)
      
      },
      err => {
        this.isLoading = false
        this.isError =true
        this.error_message = "Please check your internet connection"
        console.log(err);
      });  

  }

  deleteItem(i)
 {  
    this.all_math_operations.splice(i,1);  
 }

}
