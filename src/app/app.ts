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

  public alvos: Alvo[] = []

  get distancia() {
    return this.obterDistancia(this.x2, this.y2)
  }

  get angulo() {
    return this.obterAngulo(this.x2, this.y2)
  }

  obterDistancia(x: number, y: number) {
    const dx = Math.abs(x - this.x1)
    const dy = Math.abs(y - this.y1)
    const result = Math.sqrt(dx ** 2 + dy ** 2)
    return result.toFixed(0)
  }

  obterAngulo(x: number, y: number) {
  const deltaX = x - this.x1;
  const deltaY = y - this.y1;
  const anguloRad = Math.atan2(deltaX, deltaY);
  let anguloGraus = anguloRad * (180 / Math.PI);
  if (anguloGraus < 0) {
    anguloGraus += 360;
  }
  return anguloGraus;
}

  adicionar() {
    const alvo = new Alvo()
    alvo.nome = `alvo-${alvo.id}`
    alvo.x2 = this.x2
    alvo.y2 = this.y2
    this.alvos.push(alvo)
    this.x2 = 0
    this.y2 = 0
  }

  remover(id: string) {
    this.alvos = this.alvos.filter(alvo => alvo.id != id)
  }

  renomear(alvo: Alvo) {
    alvo.nome = prompt("Nome do alvo:") || alvo.nome
  }

}

export class Alvo {
  id = `${crypto.randomUUID().substring(0,8)}`
  nome!: string
  x2!: number
  y2!: number
}