import axios from "axios"

export const commonAPI = async(httpMethod, url, reqBody) => {
    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody,
        header: {
            "Content-Type":"application/json"
        }
    }
    return await axios(reqConfig).then(
        (result) => {
            return result
        }
    )

    .catch((err) => {
        return err
    })
}