using HealthCareService.Models.Domain;
using HealthCareService.Models.DTO;
using HealthCareService.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthCareService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointmentRepository appointmentRepository;

        public AppointmentsController(IAppointmentRepository appointmentRepository)
        {
            this.appointmentRepository = appointmentRepository;
        }
        [HttpPost]
        public async Task<IActionResult> ScheduleAppointment([FromBody] ScheduleAppointmentRequestDto request)
        {
            //Map DTO to Domain Model
            var appointment = new Appointment
            {
                bookingId = request.bookingId,
                bookingTime = request.bookingTime,
                disease = request.disease,
                tentativeDate = request.tentativeDate,
                patientId = request.patientId,
                priority = request.priority,
            };

            await appointmentRepository.CreateAsync(appointment);

            //Domain to dto
            var response = new AppointmentDto
            {
                priority = appointment.priority,
                patientId = appointment.patientId,
                tentativeDate = appointment.tentativeDate,
                disease = appointment.disease,
                bookingId = appointment.bookingId,
                bookingTime = appointment.bookingTime,

            };

            return Ok(response);
        }
    }
}
