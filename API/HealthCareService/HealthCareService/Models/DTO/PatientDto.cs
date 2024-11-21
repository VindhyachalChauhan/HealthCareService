namespace HealthCareService.Models.DTO
{
    public class PatientDto
    {
        public Guid Id { get; set; }
        public string patient_name { get; set; }
        public string patient_email { get; set; }
        public string patient_gender { get; set; }
        // public string password{get;set;}
        public string patient_dob { get; set; }
        public DateTime registeredDate { get; set; }
        public long patient_mobile { get; set; }
    }
}
