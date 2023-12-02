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
MarketMingle is a project designed to connect buyers with sellers. It aims to solve [specific problems] and serves the purpose of [its intended use].
The project was created as a project assignment for [ReactJS - октомври 2023](https://softuni.bg/trainings/4238/reactjs-october-2023).

## Technologies Used
- ASP.NET Core 8.0
- Auto Mapper
- JWT
- Entity Framework Core
- MS SQL Server


## Features
- Awesome feature 1
- Awesome feature 2
- Awesome feature 3

## Screenshots
![Example screenshot](./img/screenshot.png)

## Setup
### Backend
1. **Clone the Repository**
2. **Open a terminal in the *api-server* folder and run the following commands:**
   ``` bash
   dotnet user-secrets init
   dotnet user-secrets set "JWTKey:ValidIssuer" "https://localhost:5001"
   dotnet user-secrets set "JWTKey:ValidAudience" "https://localhost:5001"
   dotnet user-secrets set "JWTKey:TokenExpiryTimeInHour" "10"
   dotnet user-secrets set "JWTKey:Secret" "{YOUR SECRET}"
   dotnet user-secrets set "ConnectionStrings:DatabaseConnection" "Server={YOUR SERVER NAME};Database=MarketMingle;Trusted_Connection=True;MultipleActiveResultSets=True;TrustServerCertificate=True;"
   dotnet user-secrets set "CorsOrigins:AllowedOrigins" "https://localhost:5173"
  *Please change the values in **{ }** with your own.*
  
3. **Run Backend:**
   1. Open the solution in Visual Studio or your preferred IDE.
   3. Build and run the solution.
  
### Frontend     
1. **Open a terminal in the *react-client* folder and run the following commands:**
   ```bash
   npm install
   npm run dev
### Notes
- Make sure the the Backend API url is *https://localhost:5001* and the Frontend URL is *https://localhost:5173* because of some hardcoded values in the code. :(
