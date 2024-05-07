export class Flights {
    person: string;
    RPA: string;
    startTimeMinCount: number;
    endTimeMinCount: number;
    get duration() {
        return this.endTimeMinCount - this.startTimeMinCount};
    constructor(person: string, RPA: string, startTimeMinCount: number, endTimeMinCount: number) {
      this.person = person;
      this.RPA = RPA;
      this.startTimeMinCount = startTimeMinCount;
      this.endTimeMinCount = endTimeMinCount;
    }
  }
