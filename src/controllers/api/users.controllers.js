import { userRepository } from "../../repositories/index.js"
import { userService } from "../../services/user.service.js"

export async function postUserController(req, res, next) {
    try {
        await userService.create(req.body);
        res.sendStatus(201);
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error);
    }
}


export async function getUsersController(req, res, next) {
    try {
        const users = await userRepository.readDTO({})
        res.status(200).json(users)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
    
}

export async function putPasswordUsersController(req,res,next){
    try {
        const token = req.params.token
        const filter = {email: req.body.email}
        const updatedData = req.body
        const actualizado = await userService.updatePassword(filter, updatedData, token)
        res.status(200).json(actualizado)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}

export async function putRolUserController(req,res,next){
    try {
        const uid = req.params.uid
        const filter = {_id: uid}
        const updatedData = {rol: "user"}
        const actualizado = await userService.rolUpdate(filter, updatedData)
        res.status(200).json(actualizado)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}


export async function postMulterUserController(req, res, next) {
    try {
        const uid = req.params.uid
        const filter = {_id: uid}
        await userService.documentsUpdate(filter, req.files)
        res.sendStatus(200)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error);
    }
}

export async function deleteUserController(req, res, next) {
    try {
        await userService.deletetwoDaysAgo()
        // const uid = req.params.uid
        // const filter = {_id: uid}
        // await userService.documentsUpdate(filter, req.files)
        // res.sendStatus(200)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error);
    }
}