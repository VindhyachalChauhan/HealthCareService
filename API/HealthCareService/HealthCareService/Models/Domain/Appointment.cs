using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthCareService.Models.Domain
{
    public class Appointment
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