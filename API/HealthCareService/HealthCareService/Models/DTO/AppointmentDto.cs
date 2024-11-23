using System.ComponentModel.DataAnnotations;

namespace HealthCareService.Models.DTO
{
    public class AppointmentDto
    {
        [Key]
        public Guid bookingId { get; set; }
        [Required]
        public string disease { get; set; }
        [Required]
        public DateTime tentativeDate { get; set; }
        [Required]
        public string priority { get; set; }
        [Required]
        public DateTime bookingTime { get; set; }
        // [Required]
        // public string timings{get;set;}
        // [Required]
        // public string description{get;set;}
        [Required]
        public Guid patientId { get; set; }


    }
}
