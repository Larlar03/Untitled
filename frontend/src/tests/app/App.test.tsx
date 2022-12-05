import Salon from "../../types/salons";
import { mockFilterSalonsInCity } from "./mock-app-functions";
const mockSalons = require("./mock-salons.json");

describe("Filter salons by services", () => {
    test("Given one service is selected, and one salon has that service, that salon should be returned", () => {
        // arrange
        const mockServices = ["Braids"];

        // act
        const results = mockFilterSalonsInCity(mockSalons, mockServices);

        // assert
        expect(results).toEqual([
            {
                id: 3,
                name: "Hairfyx",
                phone_number: "07786068698",
                email_address: "hairfyx.contact@gmail.com",
                location: {
                    address: "27 Acfold Rd",
                    post_code: "B20 1HD",
                    city: "Birmingham",
                    region: "West Midlands",
                    country: "England",
                },
                services: ["Braids", "Trims", "Extensions"],
            },
        ]);
    });

    test("Given one service is selected, and two salons have that service, both salons should be returned", () => {
        // arrange
        const mockServices = ["Trims"];

        // act
        const results = mockFilterSalonsInCity(mockSalons, mockServices);

        // assert
        expect(results).toEqual([
            {
                id: 2,
                name: "DD Empire",
                phone_number: "01214291772",
                email_address: "ddempire@hotmail.com",
                location: {
                    address: "592 Bearwood Rd",
                    post_code: "B66 4BW",
                    city: "Birmingham",
                    region: "West Midlands",
                    country: "England",
                },
                services: ["Trims", "Extensions"],
            },
            {
                id: 3,
                name: "Hairfyx",
                phone_number: "07786068698",
                email_address: "hairfyx.contact@gmail.com",
                location: {
                    address: "27 Acfold Rd",
                    post_code: "B20 1HD",
                    city: "Birmingham",
                    region: "West Midlands",
                    country: "England",
                },
                services: ["Braids", "Trims", "Extensions"],
            },
        ]);
    });

    test("Given multiple services are selected, salons with any selected service should be returned", () => {
        // arrange

        const mockServices = ["Keratin", "Colour"];

        // act
        const results = mockFilterSalonsInCity(mockSalons, mockServices);

        // assert
        expect(results).toEqual([
            {
                id: 1,
                name: "Redcoco Hair Studio",
                phone_number: "07920401832",
                email_address: "redcoco@live.co.uk",
                location: {
                    address: "146 Wallows Ln",
                    post_code: "WS1 4LZ",
                    city: "Walsall",
                    region: "West Midlands",
                    country: "England",
                },
                services: ["Colour"],
            },
            {
                id: 5,
                name: "SG Hair",
                phone_number: "01216475000",
                email_address: "appointments@sghair.uk",
                location: {
                    address: "297A Walsall Rd",
                    post_code: "B42 1TY",
                    city: "Birmingham",
                    region: "West Midlands",
                    country: "England",
                },
                services: ["Keratin"],
            },
        ]);
    });

    test("Given multiple services are selected, and only one salon has these services, that salon should be returned", () => {
        // arrange

        const mockServices = ["Curl Set", "Twist Out"];

        // act
        const results = mockFilterSalonsInCity(mockSalons, mockServices);

        // assert
        expect(results).toEqual([
            {
                id: 6,
                name: "Tia's Hair Salon",
                phone_number: "01213778255",
                email_address: "tia@tiahairsalon.com",
                location: {
                    address: "15 York Rd",
                    post_code: "B23 6TE",
                    city: "Birmingham",
                    region: "West Midlands",
                    country: "England",
                },
                services: ["Curl Set", "Twist Out"],
            },
        ]);
    });

    test("Given the service 'any' is selected, all salons should be returned", () => {
        // arrange

        const mockServices = ["Any", "Braids"];

        // act
        const results = mockFilterSalonsInCity(mockSalons, mockServices);

        // assert
        expect(results).toEqual(mockSalons);
    });
});
