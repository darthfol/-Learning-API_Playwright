export interface IUserAPIBody{
    data: IUserAPIBodyData,
    support: IUserAPIBodySupport
   
}

export interface IUserAPIBodyData{
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export interface IUserAPIBodySupport{
    url: string,
    text: string
}