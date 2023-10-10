export interface IUserData{
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export interface ISupportData{
    url: string,
    text: string
}

export interface IUserAPIBody{
    data: IUserData,
    support: ISupportData
   
}


export interface IUserListAPI{
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: IUserData[],
    support: ISupportData
}

export interface IResource{
    id: number,
    name: string,
    year: number,
    color: string,
    pantone_value: string
}
export interface IResourceAPI{
    data: IResource,
    support: ISupportData
}
export interface INewUser{
    name: string,
    job: string,
    id: string,
    createdAt: string
}

export interface IUser{
    name: string,
    job: string
}