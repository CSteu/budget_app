using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BudgetApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedTransfers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "sendingAccountId",
                table: "Transfers",
                newName: "SendingAccountId");

            migrationBuilder.RenameColumn(
                name: "recievingAccountId",
                table: "Transfers",
                newName: "RecievingAccountId");

            migrationBuilder.RenameColumn(
                name: "isChecking",
                table: "Accounts",
                newName: "IsChecking");

            migrationBuilder.InsertData(
                table: "Transfers",
                columns: new[] { "Id", "Amount", "Date", "RecievingAccountId", "SendingAccountId" },
                values: new object[,]
                {
                    { 1, 500.0, new DateTime(2024, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 1 },
                    { 2, 617.5, new DateTime(2024, 12, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Transfers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Transfers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.RenameColumn(
                name: "SendingAccountId",
                table: "Transfers",
                newName: "sendingAccountId");

            migrationBuilder.RenameColumn(
                name: "RecievingAccountId",
                table: "Transfers",
                newName: "recievingAccountId");

            migrationBuilder.RenameColumn(
                name: "IsChecking",
                table: "Accounts",
                newName: "isChecking");
        }
    }
}
