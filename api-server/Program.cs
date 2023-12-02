using System;
using System.Text;

using api_server.Data;
using api_server.Data.Models;
using api_server.Extensions;
using api_server.Profiles;
using api_server.Services;
using api_server.Services.Interfaces;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace api_server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API Name", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Cookie,
                    Name = "accessToken",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    Description = "JWT Authorization header using the Bearer scheme",
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer",
                            },
                        },
                        Array.Empty<string>()
                    },
                });
            });

            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

            builder.Services.AddCors(options =>
            {
                string[]? corsOrigins = builder.Configuration.GetSection("CorsOrigins").Get<string[]>();
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(corsOrigins!)
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
            });

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DatabaseConnection"));
            });

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.User.RequireUniqueEmail = true;
                options.SignIn.RequireConfirmedEmail = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 4;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
              {
                  options.SaveToken = true;
                  options.RequireHttpsMetadata = false;
                  options.TokenValidationParameters = new TokenValidationParameters()
                  {
                      ValidateIssuer = true,
                      ValidateAudience = true,
                      ValidateLifetime = true,
                      ValidAudience = builder.Configuration["JWTKey:ValidAudience"],
                      ValidIssuer = builder.Configuration["JWTKey:ValidIssuer"],
                      ClockSkew = TimeSpan.Zero,
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTKey:Secret"]!))
                  };
                  options.Events = new JwtBearerEvents
                  {
                      OnMessageReceived = context =>
                      {
                          context.Token = context.Request.Cookies["accessToken"];
                          return Task.CompletedTask;
                      }
                  };
              });

            builder.Services.AddScoped<ApplicationDbContext>();

            builder.Services.AddTransient<IAuthService, AuthService>();
            builder.Services.AddTransient<IJWTService, JWTService>();
            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<IListingService, ListingService>();
            builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            WebApplication app = builder.Build();

            try
            {
                using (IServiceScope? serviceScope = app.Services.CreateScope())
                {
                    ApplicationDbContext? dbContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                    dbContext.Database.Migrate();
                }

                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

                app.UseCors();

                app.UseHttpsRedirection();

                app.UseStaticFiles();

                app.UseAuthentication();

                app.UseAuthorization();

                app.UseJwtAuthorization();

                app.MapControllers();

                app.Run();
            }
            catch (Exception e)
            {
                ILogger<Program>? logger = app.Services.GetRequiredService<ILogger<Program>>();
                logger.LogCritical(e, "An exception occurred during the service startup");
            }
        }
    }
}