import express, { Request, Response } from "express";
//usecases:
import UserUseCases from "../../application/usuarios.usecases";
//repository:
import UserRepository from "../../domain/user.repository";
import UserRepositoryPostgres from "../db/usuarios.repository.postgres"
//domain:
import User from "../../domain/User";
import Auth from "../../domain/Auth";
import Message from "../../../context/responses/Message";
import { createToken } from "../../../context/security/auth";
//implementation:
const userRepository: UserRepository = new UserRepositoryPostgres
const userUseCases: UserUseCases = new UserUseCases(userRepository)
//Router: 
const router = express.Router()
//Petitions:
router.get("/", async (req: Request, res: Response) => {
    try {
        const result: any[] = await userUseCases.getAll()
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
      lastName: req.body.lastName,
      email: req.body.email,
      bornDate: req.body.bornDate,
      sport: req.body.sport,
      description: req.body.description
    }
    const result: Auth | String = await userUseCases.create(user)
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
      password: req.body.password,
      lastName: req.body.lastName,
      email: req.body.email,
      bornDate: req.body.bornDate,
      sport: req.body.sport,
      description: req.body.description
    };
    const loginOK = await userUseCases.login(user)
    if (loginOK) {
      const token = createToken(loginOK)
      res.json({token})
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