import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MascaraDecimalDirective } from './utils/mascara-decimal';

@Component({
  imports: [FormsModule, MascaraDecimalDirective],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  public x1 = 0
  public y1 = 0
  public x2 = 0
  public y2 = 0

  get distancia() {
    const dx = Math.abs(this.x2 - this.x1)
    const dy = Math.abs(this.y2 - this.y1)
    const result = Math.sqrt(dx ** 2 + dy ** 2)
    return result.toFixed(0)
  }

}
