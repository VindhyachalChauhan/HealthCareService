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
        public async Task<IActionResult> ScheduleAppointment(
            [FromBody] ScheduleAppointmentRequestDto request
        )
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

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetAllAppointmentsByPatiendId([FromRoute] Guid id)
        {
            var appointments = await appointmentRepository.GetByPatientIdAsync(id);
            if(appointments is null)
                return NotFound();
            
            //map domain to dto
            var response = new List<AppointmentDto>();
            foreach (var appointment in appointments)
            {
                response.Add(new AppointmentDto
                {
                    bookingId = appointment.bookingId,
                    patientId = appointment.patientId,
                    disease = appointment.disease,
                    priority = appointment.priority,
                    bookingTime = appointment.bookingTime,
                    tentativeDate = appointment.tentativeDate,
                });
            }
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAppointments()
        {
            var appointments=await appointmentRepository.GetAllAsync(); 
            //map domain to dto
            var response=new List<AppointmentDto>();
            foreach(var appointment in appointments)
            {
                response.Add(new AppointmentDto
                {
                    bookingId=appointment.bookingId,
                    patientId=appointment.patientId,
                    disease=appointment.disease,
                    priority=appointment.priority,
                    bookingTime=appointment.bookingTime,
                    tentativeDate=appointment.tentativeDate,
                });
            }
            return Ok(response);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteAppointment([FromRoute]Guid id)
        {
            var appointment=await appointmentRepository.DeleteAsync(id);

            if (appointment is null)
                return NotFound();

            //convert domain to dto
            var response = new AppointmentDto
            {
                bookingId = appointment.bookingId,
                patientId = appointment.patientId,
                bookingTime = appointment.bookingTime,
                disease = appointment.disease,
                priority = appointment.priority,
                tentativeDate = appointment.tentativeDate,
            };
            return Ok(response);
        }

        [HttpGet]
        [Route("diseases")]
        public async Task<IActionResult> GetDiseasesAsync()
        {
           
            List<string> diseaseList =
            [
                "Influenza",
                "Diabetes",
                "Hypertension",
                "Asthma",
                "Cancer",
            ];

            return Ok(diseaseList);
        }
    }
}
