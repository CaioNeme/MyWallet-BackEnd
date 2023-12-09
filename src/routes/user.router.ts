import { Router } from 'express';
import { createNewUser, login } from '@/controllers/user.controllers';
import { validateBody } from '@/middlewares/validationSchema';
import { loginSchema, registerSchema } from '@/schema/users.schemas';

const userRouter = Router();

userRouter.post('/cadastro', validateBody(registerSchema), createNewUser);
userRouter.post('/', validateBody(loginSchema), login);

export default userRouter;
