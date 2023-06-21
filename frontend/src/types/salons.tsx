import SalonLocation from './location';

class Salon {
    id: number | undefined;
    name: string | undefined;
    phone_number: string | undefined;
    email_address: string | undefined;
    location: SalonLocation | undefined;
    services: string[] | undefined;

    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.phone_number = undefined;
        this.email_address = undefined;
        this.location = undefined;
        this.services = undefined;
    }
}

export default Salon;
