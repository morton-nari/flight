import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RpaList } from './flights/rpa';
import { PersonList } from './flights/person';
import { Flights } from './flights/data';

export class AppData implements InMemoryDbService {

  createDb(): { rpaList: RpaList[], personList: PersonList[]} {
    const rpaList = Flights.rpaList;
    const personList = Flights.personList;
    return { rpaList, personList };
  }
}
