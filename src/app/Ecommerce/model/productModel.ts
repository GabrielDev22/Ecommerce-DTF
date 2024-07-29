export interface ProductCreateForUser{
    productName : string;
    productDescription : string;
    productPrice : number;
    productImagen : string;
    productCategory : string;
    productSellerName : string;
}

export enum isValidProductCategory{
    CATEGORY_TECNOLOGY = 'T',
    CATEGORY_VEHICULES = 'V',
    CATEGORY_HOME = 'F',
    CATEGORY_FASHION = 'F',
    CATEGORY_VIDEO_GAMES = 'G',
    CATEGORY_HOME_APPLIANCES = 'A'
}

export interface ProductDTO{
    productName : string;
    productDescription : string;
    productPrice : number;
    productImagen : string;
    productCategory : string;
    productSellerName : string;
    userId : string;
}
