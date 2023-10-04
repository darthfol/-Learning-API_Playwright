import { test, expect} from "@playwright/test";
import { IUserAPIBody } from "./apiResponse.interface";
import { user_2_data } from "./user.fixtures";

test.describe.parallel("API Trening",()=>{
    const baseURL = 'https://reqres.in'
    test('Test API - Get User 2',async ({request}) => {
        const response = await request.get(`${baseURL}/api/users/2`);
        const responseBody: IUserAPIBody = JSON.parse(await response.text())
        
        expect( response.status()).toBe(200)
        expect(responseBody.data).toEqual(user_2_data)
    })
   
})