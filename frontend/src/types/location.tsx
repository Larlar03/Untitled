class Location {
	address: string | undefined;
	post_code: string | undefined;
	city: string | undefined;
	region: string | undefined;
	country: string | undefined;
	constructor() {
		this.address = undefined;
		this.post_code = undefined;
		this.city = undefined;
		this.region = undefined;
		this.country = undefined;
	}
}

export default Location;
