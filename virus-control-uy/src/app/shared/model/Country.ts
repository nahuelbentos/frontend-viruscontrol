export interface Country {
    currencies: Currency[];
    name: string;
    alpha2Code: string;
    alpha3Code: string;
    capital: string;
}


export interface Currency {
    code: string;
    name: string;
    symbol: string;
}
