import Location from './location';
import SocialLinks from './social-links';

class Studio {
    id?: number | undefined;
    name: string | undefined;
    phone_number: string | undefined;
    email_address: string | undefined;
    location: Location | undefined;
    social_links: SocialLinks | undefined;
    logo: string | undefined;
    services: string[] | undefined;

    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.phone_number = undefined;
        this.email_address = undefined;
        this.location = undefined;
        this.logo = undefined;
        this.services = undefined;
    }
}

export default Studio;
