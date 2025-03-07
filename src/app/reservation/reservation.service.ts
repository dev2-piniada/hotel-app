import { Injectable } from '@angular/core'
import { Reservation } from '../models/reservation'

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = []

  constructor() {
    let reservations = localStorage.getItem('reservations')
    if (reservations) {
      this.reservations = JSON.parse(reservations)
    } else {
      this.reservations = []
    }
  }

  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation)
    localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }

  getReservations(): Reservation[] {
    return this.reservations
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(
      (reservation) => reservation.id === id,
    )
    this.reservations.splice(index, 1)
    localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id)
  }

  updateReservation(id: string, reservation: Reservation): void {
    let index = this.reservations.findIndex(
      (reservation) => reservation.id === id,
    )
    this.reservations[index] = reservation
    localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }
}
