import { INewUser, IResource, IUser, IUserData } from "./apiResponse.interface"

export const user_2_data :IUserData = {
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
}
export const user_7_data: IUserData = {
    id: 8,
    email: "lindsay.ferguson@reqres.in",
    first_name: "Lindsay",
    last_name: "Ferguson",
    avatar: "https://reqres.in/img/faces/8-image.jpg"
}
export const resource_2: IResource = {
    id: 2,
    name: "fuchsia rose",
    year: 2001,
    color: "#C74375",
    pantone_value: "17-2031"
}

export const new_user: IUser = {
    name: "Andżej",
    job: "tank driver"
}