import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugelement: DebugElement;
  let htmlelememt: HTMLElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent 
      ],
      imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(HomeComponent);

      component = fixture.componentInstance;
      debugelement = fixture.debugElement.query(By.css('form'))
      htmlelememt = debugelement.nativeElement; 

    });
  }));

  it(`should call the sendMathOperation`, async(()=>{
    fixture.detectChanges();
    spyOn(component,'sendMathOperation');
    htmlelememt = fixture.debugElement.query(By.css('button')).nativeElement
    htmlelememt.click();
    expect(component.sendMathOperation).toHaveBeenCalledTimes(0);
  }))

  it(`form should be invalid`, async(()=>{
    component.math_operation_form.controls['number_one'].setValue('');
    component.math_operation_form.controls['number_two'].setValue('');
    component.math_operation_form.controls['math_operation'].setValue('');
    expect(component.math_operation_form.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(()=>{
    component.math_operation_form.controls['number_one'].setValue(1);
    component.math_operation_form.controls['number_two'].setValue(2);
    component.math_operation_form.controls['math_operation'].setValue('+');
    expect(component.math_operation_form.valid).toBeTruthy();
  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
