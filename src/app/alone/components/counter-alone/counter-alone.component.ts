import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'counter-alone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-alone.component.html',
  styleUrls: ['./counter-alone.component.scss']
})
export class CounterAloneComponent {

  public counter: number = 10;

  addOne(){
    this.counter = this.counter + 1;
    console.log(this.counter)
  }

}
