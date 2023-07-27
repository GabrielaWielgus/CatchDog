import { isTokenValid } from "../../utils/auth";
import * as jwt from "jsonwebtoken"
import { JWTPayload } from "../../controllers/auth/signin";
import { SECRET_KEY } from "../../config/secret";
import { getDataFromToken } from "../../utils/auth";

describe("Tests auth utility functions", () => {
    let validToken

    beforeAll(() => {
        const payload : JWTPayload = {
            userID: 5,
            email: "joedoe@gmail.com"
        }
        validToken = jwt.sign(payload, SECRET_KEY)
    })

    it("should return true", () => {
        const isValid = isTokenValid(validToken)
        expect(isValid).toBe(true)
    })

    it("should return false on malformed token", () => {
        const token = validToken + "malformingString"
        const isValid = isTokenValid(token)
        expect(isValid).toBe(false)
    })

    it("should return token payload", () => {
        const data = getDataFromToken(validToken)
        expect(data.email).toBeDefined()
        expect(data.userID).toBeDefined()
    })
})