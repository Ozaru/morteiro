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
  
  public alvos: Alvo[] = []
  public alvo = new Alvo()

  obterDistancia(alvo: Alvo) {
    const dx = Math.abs(alvo.x - this.x1)
    const dy = Math.abs(alvo.y - this.y1)
    const result = Math.sqrt(dx ** 2 + dy ** 2)
    return result.toFixed(0)
  }

  obterAngulo(alvo: Alvo) {
  const deltaX = alvo.x - this.x1;
  const deltaY = alvo.y - this.y1;
  const anguloRad = Math.atan2(deltaX, deltaY);
  let anguloGraus = anguloRad * (180 / Math.PI);
  if (anguloGraus < 0) {
    anguloGraus += 360;
  }
  return anguloGraus.toFixed(0);
}

  salvar() {
    this.alvos.push(this.alvo)
    this.alvo = new Alvo()
  }

  editar(alvo: Alvo) {
    this.alvo = alvo
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
  nome = `alvo-${this.id}`
  x = 0
  y = 0
}