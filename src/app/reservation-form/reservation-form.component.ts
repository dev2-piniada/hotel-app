import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ReservationService } from '../reservation/reservation.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({})

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      let reservation = this.reservationService.getReservation(id)
      if (reservation) {
        this.reservationForm.patchValue(reservation)
      }
    }
  }

  onSubmit() {
    if (this.reservationForm.invalid) {
      return
    }
    let reservation = this.reservationForm.value

    let id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.reservationService.updateReservation(id, this.reservationForm.value)
      this.reservationForm.reset()
    } else {
      reservation.id = Date.now().toString()
      this.reservationService.addReservation(reservation)
    }

    this.reservationForm.reset()
  }
}
