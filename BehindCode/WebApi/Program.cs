using Application.CodingTestApplication;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Serilog;
using System;
using System.Collections.Generic;
using System.Net.Http;

namespace WebApi
{
    public class Program
    {
        public static async System.Threading.Tasks.Task Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day)
            .CreateLogger();
            Log.Information("Starting up");
            var webHost = CreateWebHostBuilder(args).Build();
            using (var scope = webHost.Services.CreateScope())
            {
                var codingTestApplication = scope.ServiceProvider.GetRequiredService<ICodingTestApplication>();
                var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();
                var path = configuration["GithubApiAddress"];
                var result = string.Empty;
                using (HttpClient httpClient = new HttpClient())
                {
                    httpClient.DefaultRequestHeaders.Add("Accept", "*/*");
                    httpClient.DefaultRequestHeaders.Add("User-Agent", "PostmanRuntime/7.26.3");
                    httpClient.DefaultRequestHeaders.Add("Connection", "keep-alive");
                    var res = await httpClient.GetAsync(path);
                    result = res.Content.ReadAsStringAsync().Result;
                }
                var finalData = JsonConvert.DeserializeObject<List<ReposInfo>>(result);
                codingTestApplication.SyncDataToTblReposDetailFromGithub(finalData);
            }
            webHost.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .UseSerilog()
            .UseStartup<Startup>();
    }
}
