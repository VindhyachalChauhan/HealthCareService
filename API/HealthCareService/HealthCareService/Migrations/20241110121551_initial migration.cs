using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthCareService.Migrations
{
    /// <inheritdoc />
    public partial class initialmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    bookingId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    disease = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tentativeDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    priority = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    bookingTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    patientId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.bookingId);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    patient_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    patient_email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    patient_gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    patient_dob = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    registeredDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    patient_mobile = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    user_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    user_email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    user_mobile = table.Column<long>(type: "bigint", nullable: false),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
