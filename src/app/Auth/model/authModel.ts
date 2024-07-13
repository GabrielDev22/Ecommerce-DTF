export interface CreateUser{
     name: string;
     lastName: string;
     correo: string;
     username: string;
     password: string;
     rolesApp: string[];
}

export enum RolesApp{
     COMPRADOR = 'COMPRADOR',
     VENDEDOR = 'VENDEDOR'
}

export interface LoginRequest{
     username: string;
     password: string;
}

export interface TokenRefreshRequest{
     refreshToken: string;
}