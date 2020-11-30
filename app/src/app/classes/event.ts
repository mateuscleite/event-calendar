export class Event {
    owner: string;    
    guests: Array<string>;
    description: string;
    start: string;
    end: string;

    constructor(){
        this.owner = ''
        this.guests = []
        this.description = ''
        this.start = ''
        this.end = ''
    }
}
