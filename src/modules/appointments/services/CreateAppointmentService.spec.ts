import 'reflect-metadata';
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";
import FakeAppointmentsRepository from "@modules/appointments/repositories/fakes/FakeAppointmentsRepository";
import AppError from "@shared/errors/AppError";


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () =>{
    beforeEach(() =>{
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
    })
    it('should be able to create a new appointment', async () => {

        const appointment = await createAppointment.execute({date: new Date(), provider_id: '12312'})

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('12312');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date(2021, 4, 10, 11);
        const appointment = await createAppointment.execute({date: appointmentDate, provider_id: '12312'});

        expect(createAppointment.execute({date: appointmentDate, provider_id: '12312'})).rejects.toBeInstanceOf(AppError);

    });
})
