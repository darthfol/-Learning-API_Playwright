import { test, expect} from "@playwright/test";
import { IErrorResponse, INewUser, IRegisterResponse, IResource, IResourceAPI, IUpdateUser, IUserAPIBody, IUserListAPI } from "./apiResponse.interface";
import { new_user, registerNewUser, registerWrongNewUser, resource_2, user2Update, user_2_data, user_7_data } from "./user.fixtures";
import { errorMsg } from "./variables.common";

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
    test('Test API - Test update(PUT)', async({request})=>{
        const response = await request.put(`${baseURL}/api/user/2`,{
            data: user2Update
        })
        const responseBody: IUpdateUser = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe(user2Update.name)
        expect(responseBody.job).toBe(user2Update.job)
        expect(responseBody.updatedAt).toBeTruthy()

    })
    test('Test API - Test update(POST)', async({request})=>{
        const response = await request.delete(`${baseURL}/api/users/2`)

        expect(response.status()).toBe(204)
    })

    test('Test API - Register succesfuly', async({request})=>{
        const response = await request.post(`${baseURL}/api/register`,{
            data: registerNewUser
        })
        const responseBody: IRegisterResponse = JSON.parse(await response.text())
        
        expect(response.status()).toBe(200)
        expect(responseBody.id).toBeGreaterThan(0)
        expect(responseBody.token).toBeTruthy()
    })

    test('Test API - Register unsuccesfuly', async({request})=>{
        const response = await request.post(`${baseURL}/api/register`,{
            data: registerWrongNewUser
        })
        const responseBody: IErrorResponse = JSON.parse(await response.text())

        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe(errorMsg.erMissingPwd)
    })



})