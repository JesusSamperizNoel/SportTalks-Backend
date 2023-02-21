//express:
import express, { Request, Response } from "express";
//usecases:
import MessageUseCases from "../../application/message.usecases";
//repository:
import MessageRepository from "../../domain/message.repository";
import MessageRepositoryPostgres from "../db/message.repository.postgres";
import Message from "../../domain/Message";
//domain:


//Router:
const router = express.Router()
//Implementation:
const messageRepository: MessageRepository = new MessageRepositoryPostgres()
const messageUseCases: MessageUseCases = new MessageUseCases(messageRepository)
//Petitions:
router.post("/create",async (req: Request, res: Response) => {
    try {
        //seting a new current date application set format in the repository of postgres to the SQL script:
        const currentDate = new Date()
        //seting message data:
        const message: Message = {
            date: currentDate,
            text: req.body.text
        }
        const result: undefined = await messageUseCases.create(message)
        res.json(result)
    } catch (error) {
        const stringResp: String = String(error)
        res.status(500).send(stringResp)
    }
})

router.get("/user",async (req: Request, res: Response) => {
    try {
        const transmitter: String = req.body.transmitter
        const receiver: String = req.body.receiver
        //This petition function request is in the body 
        const result: any[] = await messageUseCases.getUserMessages(transmitter, receiver)
        res.json(result)
    } catch (error) {
        const stringResp: String = String(error)
      res.status(500).send(stringResp)
    }
})

router.get("/group:alias",async (req: Request, res: Response) => {
    try {
        const alias: String = req.params.alias
        //This petition function request is in the params of the url 
        const result: any[] = await messageUseCases.getGroupMessages(alias)
        res.json(result)
    } catch (error) {
        const stringResp: String = String(error)
      res.status(500).send(stringResp)
    }
})