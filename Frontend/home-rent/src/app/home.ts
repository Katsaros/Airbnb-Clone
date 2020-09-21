export class Home {
    id: number;
    ownerId: number;
    ownerUsername: string;
    reservations: [];
    openBooking: string;
    closeBooking: string;
    image: string[];
    price: number;
    address: string;
    latitude: string;
    longtitude: string;
    homeCategory: HomeCategory;
    description: string;
    squareMeters: number;
    overnightPrice: number;
    extraPersonPrice: number;
    maxPeople: number;
    minOvernights: number;
    beds: number;
    bathrooms: number;
    bedrooms: number;
    transport: string;
    neighborhood: string;
    houseRules: string;
    elevator: boolean;
    heating: boolean;
    kitchen: boolean;
    parking: boolean;
    tv: boolean;
    wifi: boolean;
    ac: boolean;
    smoking: boolean;
    pets: boolean;
    events: string;

}

export class NewHome {
    ownerId: number;
    ownerUsername: string;
    reservations: [];
    openBooking: string;
    closeBooking: string;
    image: [];
    price: number;
    address: string;
    latitude: string;
    longtitude: string;
    homeCategory: HomeCategory;
    description: string;
    squareMeters: number;
    overnightPrice: number;
    extraPersonPrice: number;
    maxPeople: number;
    minOvernights: number;
    beds: number;
    bathrooms: number;
    bedrooms: number;
    transport: string;
    neighborhood: string;
    houseRules: string;
    elevator: boolean;
    heating: boolean;
    kitchen: boolean;
    parking: boolean;
    tv: boolean;
    wifi: boolean;
    ac: boolean;
    smoking: boolean;
    pets: boolean;
    events: string;
}

export class HomeCategory {
    homeCategoryTitle: string;
}

export class Book {
    bookedHomeId: number;
    bookedDate: string;
    leaveDate: string;
    isBooked: number;
    userIdBooked: number;
    userNameBooked: string;
    hostReviewStars: number;
    hostReviewDescription: string;
    homeReviewStars: number;
    homeReviewDescription: string;
}

export class BookResp {
    reservationId: number;
    bookedHomeId: number;
    bookedDate: string;
    leaveDate: string;
    isBooked: number;
    userIdBooked: number;
    userNameBooked: string;
    hostReviewStars: number;
    hostReviewDescription: string;
    homeReviewStars: number;
    homeReviewDescription: string;
}
