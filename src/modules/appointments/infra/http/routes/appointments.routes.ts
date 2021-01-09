import {Router} from 'express';
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/EnsureAuthenticated";
import AppointmentsController from "@modules/appointments/infra/http/controllers/AppointmentsController";

const appointmentsRouter = Router();
const appointmentsControler = new AppointmentsController();
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();
//     return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsControler.create);

export default appointmentsRouter;
