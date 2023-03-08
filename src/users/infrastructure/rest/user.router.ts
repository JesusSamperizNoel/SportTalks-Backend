//express:
import express, { Request, Response } from "express";
//usecases:
import UserUseCases from "../../application/user.usecases";
//repository:
import UserRepository from "../../domain/user.repository";
import UserRepositoryPostgres from "../db/user.repository.postgres"
//domain:
import User from "../../domain/User";
//context:
import Auth from "../../domain/Auth";
import { createToken } from "../../../context/security/auth";
//Router: 
const router = express.Router()
//Implementation:
const userRepository: UserRepository = new UserRepositoryPostgres
const userUseCases: UserUseCases = new UserUseCases(userRepository)
//Petitions:
router.get("/:userid", async (req: Request ,res: Response) => {
  try {
    const user = req.params.userid
    const result = await userUseCases.getUser(Number(user))
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  }
})

router.get("/", async (res: Response) => {
    try {
      const result: any[] = await userUseCases.getAll()
      res.json(result)
    } catch (error) {
      const stringResp: String = String(error)
      res.status(500).send(stringResp)
    }
})

router.get("/talks/:userid", async (req: Request ,res: Response) => {
  try {
    const user = req.params.userid
    const result: any[] = await userUseCases.getTalks(Number(user))
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  }
})

router.post("/create", async (req: Request, res: Response) => {
  try {
    const user: User = {
      name: req.body.name,
      password: req.body.password,
      surname: req.body.surname,
      username: req.body.username,
      email: req.body.email,
      bornDate: req.body.bornDate,
      sports: req.body.sports,
      description: req.body.description
    }
    console.log(req.body.sports);
    
    const result: Auth | String = await userUseCases.create(user)
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  }
})

router.post("/usertalkuser", async (req: Request, res: Response) => {
  try {
    const user1 = req.body.user1
    const user2 = req.body.user2
    const result: String = await userUseCases.addUserTalkUser(user1, user2)
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  }
})

router.post("/login", async (req: Request, res: Response) => {
  try {
    const user: User = {
      name: req.body.name,
      password: req.body.password
    };
    const loginOK = await userUseCases.login(user)
    if (loginOK) {      
      const token = createToken(loginOK)
      res.json(
        {
          id: loginOK.id,
          token: token
        }
      )
    } else {
      res.status(404).send('user not registered on the platform')
    }
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  }
})

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const pass = req.body.password
    const result: String = await userUseCases.update(req.params.id, pass)// id in endpoint, password in body
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  } 
})

export { router as routerUser }