import { test, expect} from "@playwright/test";

test.describe.parallel("API Trening",()=>{
    const baseURL = 'https://reqres.in'
    test('Simple API Test - Assert response status - correct endPoint',async ({request}) => {
        const response = request.get(`${baseURL}/api/users/2`)
        expect((await response).status()).toBe(200)
    })
    test('Simple API Test - Assert response status - incorrect endPoint',async ({request}) => {
        const response = request.get(`${baseURL}/api/users/2Bambucha`)
        expect((await response).status()).toBe(404)
    })
})