export class Flights {
    pilot: string;
    RPA: string;
    startTimeMinCount: number;
    endTimeMinCount: number;
    get duration() {
        return this.endTimeMinCount - this.startTimeMinCount};
    constructor(pilot: string, RPA: string, startTimeMinCount: number, endTimeMinCount: number) {
      this.pilot = pilot;
      this.RPA = RPA;
      this.startTimeMinCount = startTimeMinCount;
      this.endTimeMinCount = endTimeMinCount;
    }
  }
