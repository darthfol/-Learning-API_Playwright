import { test, expect} from "@playwright/test";
import { INewUser, IResource, IResourceAPI, IUserAPIBody, IUserListAPI } from "./apiResponse.interface";
import { new_user, resource_2, user_2_data, user_7_data } from "./user.fixtures";

test.describe.parallel("API Trening",()=>{
    const baseURL = 'https://reqres.in'
    test('Test API - Get User 2',async ({request}) => {
        const response = await request.get(`${baseURL}/api/users/2`);
        const responseBody: IUserAPIBody = JSON.parse(await response.text())
        
        expect( response.status()).toBe(200)
        expect(responseBody.data).toEqual(user_2_data)
    })

    test('Test API - Get List user p.2', async ({request})=>{
        const response = await request.get(`${baseURL}/api/users?page=2`)
        const responseBody: IUserListAPI = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.page).toBe(2)
        expect(responseBody.total).toBeGreaterThan(0)
        expect(responseBody.total_pages).toBeGreaterThan(0)
        expect(responseBody.data[1]).toEqual(user_7_data)
    })
    test('Test API - Get List user p.999', async({request})=>{
        const response = await request.get(`${baseURL}/api/users?page=999`)
        const responseBody: IUserListAPI = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.page).toBe(999)
        expect(responseBody.data.length).toBe(0)
    })
    test('Test API - Single user not found',async ({request}) => {
        const response = await request.get(`${baseURL}/api/users/23`)
        
        expect(response.status()).toBe(404)
    })
    test('Test API - Test single resource', async({request})=>{
        const response = await request.get(`${baseURL}/api/unknown/2`)
        const responseBody:IResourceAPI = JSON.parse(await response.text())
        
        expect(response.status()).toBe(200)
        expect(responseBody.data).toEqual(resource_2)
    })
    test('Test API - Test resoure not found', async({request})=>{
        const response = await request.get(`${baseURL}/api/unknown/23`)

        expect(response.status()).toBe(404)
    })

    test('Test API - Test post create', async({request})=>{
        const response = await request
            .post(`${baseURL}/api/users`,{
                data: new_user
            })
        const responseBody: INewUser = JSON.parse(await response.text())

        expect(response.status()).toBe(201)
        expect(responseBody.name).toEqual(new_user.name)
        expect(responseBody.job).toEqual(new_user.job)
        expect(parseInt(responseBody.id)).toBeGreaterThan(0)
        expect(responseBody.createdAt).toBeTruthy()
    })
})