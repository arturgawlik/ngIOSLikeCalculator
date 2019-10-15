import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  state: number = 0;
  statePrevious: number = 0;
  operation: OperationType;
  operationLastSelected: boolean;

  acClick() {
    this.state = 0;
    this.statePrevious = 0;
  }

  numberClick(n: number) {
    if (this.operationLastSelected) {
      this.operationLastSelected = false;
      this.statePrevious = this.state;
      this.state = n;
    } else {
      this.state = this.state * 10 + n;
    }
  }

  operationClick(operation: OperationType) {
    if (operation == OperationType.Equal) {
      this.state = this.evaluateState();
    }
    else if (this.state && this.statePrevious) {
      this.state = this.evaluateState();
    } else
    this.operation = operation;
    this.operationLastSelected = true;
  }

  negateState() {
    this.state *= -1;
  }

  percent() {
    this.state *= 0.01;
  }

  point() {
    // TODO
  }

  private evaluateState(): number {
    switch (this.operation) {
      case OperationType.Division:
        return this.statePrevious / this.state;
      case OperationType.Multiplication:
        return this.statePrevious * this.state;
      case OperationType.Subtraction:
        return this.statePrevious - this.state;
      case OperationType.Addition:
        return this.statePrevious + this.state;
      default:
        return 0;
    }
  }

}


enum OperationType {
  Division = 1,
  Multiplication,
  Subtraction,
  Addition,
  Equal
}