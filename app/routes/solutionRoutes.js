import express from 'express'
import { createSolution, getAdminAllSolution, getSolutionBySlug,editSolution, getAllSolution } from '../controllers/solutionController.js'
import isAdmin from '../middlewares/isAdmin.js'
import protect from '../middlewares/authMiddleWare.js'

const solutionRouter = express.Router()

solutionRouter.get('/', isAdmin, getAdminAllSolution)
solutionRouter.get('/all', protect, getAllSolution)
solutionRouter.get('/:slug',protect, getSolutionBySlug)
solutionRouter.post('/edit',isAdmin, editSolution)

solutionRouter.post('/newsolution', createSolution)

export default solutionRouter;