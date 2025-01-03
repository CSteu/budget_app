using BudgetApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BudgetDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAll", policyBuilder =>
	{
		policyBuilder.AllowAnyOrigin()
					 .AllowAnyMethod()
					 .AllowAnyHeader();
	});
});

builder.WebHost.ConfigureKestrel(options =>
{
	options.ListenAnyIP(5000);
	options.ListenAnyIP(5001, listenOptions => listenOptions.UseHttps());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI(c =>
	{
		c.SwaggerEndpoint("/swagger/v1/swagger.json", "Spending/Income Tracker API v1");
	});
}

app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
	ContentTypeProvider = new FileExtensionContentTypeProvider
	{
		Mappings =
		{
			[".vue"] = "application/javascript"
		}
	}
});

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthorization();

app.MapFallbackToFile("index.html");
app.MapControllers();

app.Run();