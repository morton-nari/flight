
import { RpaList } from '../flights/rpa';
import { PersonList } from '../flights/person';

export class Flights {

  static rpaList: RpaList[] = [
    {
      name: 'P4P-1',
      id: 1
  },
  {
      name: 'M300-RTK',
      id: 2
  },
  {
      name: 'DJI Spark',
      id: 3
  },
  {
      name: 'FPV - 1',
      id: 4
  }
  ];
  static personList: PersonList[] = [
    {
      name: 'Test Student',
      id: 1
  },
  {
      name: 'Test Planner',
      id: 2
  },
  {
      name: 'Test Pilot',
      id: 3
  },
  {
      name: 'Test Observer',
      id: 4
  }
  ];
}
