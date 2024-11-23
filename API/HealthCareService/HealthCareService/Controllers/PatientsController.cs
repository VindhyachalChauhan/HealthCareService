using HealthCareService.Data;
using HealthCareService.Models.Domain;
using HealthCareService.Models.DTO;
using HealthCareService.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthCareService.Controllers
{   // https://localhost : XXXX/api/categories
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientRepository patientRepository;

        public PatientsController(IPatientRepository patientRepository)
        {
            this.patientRepository = patientRepository;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterPatient([FromBody] RegisterPatientRequestDto request)
        {
            // Map DTO to Domain Model
            var patient = new Patient
            {
                //Id = request.Id,
                patient_name = request.patient_name,
                patient_email = request.patient_email,
                patient_dob = request.patient_dob,
                patient_gender = request.patient_gender,
                patient_mobile = request.patient_mobile,
                registeredDate = DateTime.Now
            };

            await patientRepository.CreateAsync(patient);

            //Domain model to DTO
            var response = new PatientDto
            {
                userId = patient.Id,
                patient_dob = patient.patient_dob,
                patient_gender = patient.patient_gender,
                patient_mobile = patient.patient_mobile,
                regTime = patient.registeredDate,
                patient_email = patient.patient_email,
                patient_name = patient.patient_name

            };

            return Ok(response);

        }

        //GET /api/patients
        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await patientRepository.GetAllAsync();

            //Map domain model to DTO
            var response = new List<PatientDto>();
            foreach (var patient in patients)
            {
                response.Add(new PatientDto
                {
                    userId = patient.Id,
                    patient_name = patient.patient_name,
                    patient_dob = patient.patient_dob,
                    patient_email = patient.patient_email,
                    patient_gender = patient.patient_gender,
                    patient_mobile = patient.patient_mobile,
                    regTime = patient.registeredDate,
                });
            }
            return Ok(response);
        }

        //GET /api/patients/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetPatientById([FromRoute] Guid id)
        {
            var existingPatient= await patientRepository.GetByIdAsync(id);
            if (existingPatient is null)
            {
                return NotFound();
            }

            var response = new PatientDto
            {
                userId = existingPatient.Id,
                patient_dob = existingPatient.patient_dob,
                patient_email = existingPatient.patient_email,
                patient_gender = existingPatient.patient_gender,
                regTime = existingPatient.registeredDate,
                patient_mobile = existingPatient.patient_mobile,
                patient_name = existingPatient.patient_name,
            };

            return Ok(response);


        }
    }
}
