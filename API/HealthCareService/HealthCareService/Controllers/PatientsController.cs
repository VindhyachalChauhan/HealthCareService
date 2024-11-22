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
        public async Task<IActionResult>RegisterPatient(RegisterPatientRequestDto request)
        {
            // Map DTO to Domain Model
            var patient = new Patient
            {
                //Id = request.Id,
                patient_name= request.patient_name,
                patient_email=request.patient_email,
                patient_dob=request.patient_dob,
                patient_gender=request.patient_gender,
                patient_mobile=request.patient_mobile,
                registeredDate=DateTime.Now            
            };

            await patientRepository.CreateAsync(patient);   

            //Domain model to DTO
            var response = new PatientDto
            {
                Id = patient.Id,
                patient_dob = patient.patient_dob,
                patient_gender = patient.patient_gender,
                patient_mobile = patient.patient_mobile,
                registeredDate = patient.registeredDate,
                patient_email = patient.patient_email,
                patient_name = patient.patient_name

            };

            return Ok(response);

        }

        //GET /api/categories
        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients=await patientRepository.GetAllAsync();

            //Map domain model to DTO
            var response = new List<PatientDto>();
            foreach (var patient in patients)
            {
                response.Add(new PatientDto
                {
                    Id= patient.Id,
                    patient_name= patient.patient_name,
                    patient_dob=patient.patient_dob,
                    patient_email=patient.patient_email,
                    patient_gender=patient.patient_gender,
                    patient_mobile=patient.patient_mobile,
                    registeredDate=patient.registeredDate,
                });
            }
            return Ok(response);
        }
    }
}
