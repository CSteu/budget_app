using Projects;

var builder = DistributedApplication.CreateBuilder(args);

var budgetApi = builder.AddProject<Projects.BudgetApi>("budgetapi")
	.WithExternalHttpEndpoints();

builder.AddNpmApp("vue", "../BudgetApp.Vue", "dev")
	.WithReference(budgetApi)
	.WaitFor(budgetApi)
	.WithHttpEndpoint(port: 5173, isProxied: false)
	.PublishAsDockerFile();

builder.Build().Run();
