import { Component, OnInit } from '@angular/core';
import{ FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm : FormGroup = new FormGroup({})
 
  constructor(
    private formBuilder: FormBuilder, 
    private reservationService: ReservationService) {

     } 

  ngOnInit(){
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.reservationForm.invalid){
      return;
    }
    let reservation = this.reservationForm.value;
    reservation.id = Date.now().toString();
    this.reservationService.addReservation(reservation);
    this.reservationForm.reset();
  }
 
}
