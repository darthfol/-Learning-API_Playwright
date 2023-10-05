export interface IUserAPIBody{
    data: IUserAPIBodyData,
    support: IAPIBodySupport
   
}

export interface IUserAPIBodyData{
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export interface IAPIBodySupport{
    url: string,
    text: string
}
export interface IUserListAPI{
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: IUserAPIBodyData[],
    support: IAPIBodySupport
}