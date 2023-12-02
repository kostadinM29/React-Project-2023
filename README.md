# MarketMingle

> A React project with a .NET backend.

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Room for Improvement](#room-for-improvement)

## General Information
MarketMingle is a project designed to [provide brief project overview]. It aims to solve [specific problems] and serves the purpose of [its intended use]. The project was undertaken to [mention reasons behind starting the project].

## Technologies Used
- AutoMapper
- JWT
- EntityFrameworkCore
- SqlServer


## Features
- Awesome feature 1
- Awesome feature 2
- Awesome feature 3

## Screenshots
![Example screenshot](./img/screenshot.png)

## Setup
### Backend (ASP.NET Core 8.0)

1. **Clone the Repository**
2. **Open a terminal in the *api-server* folder and run the following commands:**
   ``` bash
   dotnet user-secrets init
   dotnet user-secrets set "JWTKey:ValidIssuer" "your-api-url"
   dotnet user-secrets set "JWTKey:ValidAudience" "your-api-url"
   dotnet user-secrets set "JWTKey:TokenExpiryTimeInHour" "your desired hours"
   dotnet user-secrets set "JWTKey:Secret" "your-secret"
   dotnet user-secrets set "ConnectionStrings:DatabaseConnection" "your-db-connection-string"
   dotnet user-secrets set "CorsOrigins:AllowedOrigins" "your-client-url"
  Please change the values with your own.
3. Run Backend:
   1. Open the solution in Visual Studio or your preferred IDE.
   3. Build and run the solution.
4. **Open a terminal in the *react-client* folder and run the following commands:**
   ```bash
   npm install
   npm run dev
5. You are ready to browse the project.
