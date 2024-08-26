using NoteAppAPI.Models;
using NoteAppAPI.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.Configure<DatabaseConfiguration>(
    builder.Configuration.GetSection("NoteAppDatabase"));

builder.Services.AddSingleton<NoteService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("NoteAppUI", policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:4200");
        policyBuilder.AllowAnyHeader();
        policyBuilder.AllowAnyMethod();
        policyBuilder.AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors("NoteAppUI");
app.Run();