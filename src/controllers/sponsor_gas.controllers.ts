import express from "express"
import { config as dotenvConfig } from "dotenv"
import { resolve } from "path"

dotenvConfig({ path: resolve(__dirname, "./../../../../../.env") })

const applicationName = (_req: express.Request, _res: express.Response) => {
    try {
        _res.setHeader("Content-Type", "application/json")
        _res.status(200).end(JSON.stringify({ app_name: "SPONSOR GAS BACKEND" }))
    } catch (error: any) {
        console.error(error)

        _res.status(500).end()
    }
}
export = {
    applicationName,
   
}