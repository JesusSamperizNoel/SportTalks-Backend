import express, { Request, Response } from "express";
const router = express.Router();

//usecases
import PedidosUseCases from "../../application/pedidos.usecases";
//repository
import PedidosRepository from "../../domain/pedido.repository";
import PedidosRepositoryPostgres from "../db/pedidos.repository.postgres";
//domain
import Pedido from "../../domain/Pedido";
import Message from "../../../context/responses/Message";
import { createToken, isAuth } from "../../../context/security/auth";
import Usuario from "../../../usuarios/domain/Usuario";
//implementation
const pedidosRepository: PedidosRepository = new PedidosRepositoryPostgres();
const pedidosUseCases: PedidosUseCases = new PedidosUseCases(pedidosRepository);

router.get("/carrito", isAuth, async (req: Request, res: Response) => {
  try {
      const result: any = await pedidosUseCases.getCarrito(req.body.auth.nombre);
      res.json(result);
  } catch (error) {
      const message: Message = {
        text: String(error)
      };
      res.status(500).send(message);
    }
});

router.get("/pedidos", isAuth, async (req: Request, res: Response) => {
  try {
      const result: any = await pedidosUseCases.getPedidos(req.body.auth.nombre);
      res.json(result);
  } catch (error) {
      const message: Message = {
        text: String(error)
      };
      res.status(500).send(message);
    }
});

router.post("/pedidos/crear", isAuth, async (req: Request, res: Response) => {
  try {
    const usuario: String = req.body.auth.nombre;
    console.log(usuario);
    
    const result: Message = await pedidosUseCases.create(usuario);
    res.json(result);
  } catch (error) {
    const message: Message = {
      text: String(error)
    };
    res.status(500).send(message);
  }
});

router.put("/pedidos/add/:videojuego", isAuth, async (req: Request, res: Response) => {
  const usuario = req.body.auth.id;
  console.log(typeof usuario);
  
  try {
      const result: Message = await pedidosUseCases.addVideojuego(usuario, req.params.videojuego);
      res.json(result);
    } catch (error) {
      const message: Message = {
        text: String(error),
      };
      res.status(500).send(message);
    }
});

router.delete("/pedidos/delete/:videojuego", isAuth, async (req: Request, res: Response) => {
  const usuario = req.body.auth.id;
  try {
    const result: Message = await pedidosUseCases.deleteVideojuego(usuario, req.params.videojuego);
    res.json(result);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

router.put("/pedidos/finalizar", isAuth,async (req: Request, res: Response) => {
  try {
    const result: Message = await pedidosUseCases.finalizar(req.body.auth.nombre)
    res.json(result);
  } catch (error) {
    const message: Message = {
      text: String(error)
    }
    res.status(500).send(message)
  }
});

export { router as routerPedidos };