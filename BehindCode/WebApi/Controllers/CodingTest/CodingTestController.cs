using Application.CodingTestApplication;
using Domain.CodingTest;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace WebApi.Controllers.CodingTest
{
    [Route("api/[controller]")]
    [ApiController]
    public class CodingTestController : ControllerBase
    {
        private readonly ICodingTestApplication codingTestApplication;
        private readonly IConfiguration configuration;
        public CodingTestController(IConfiguration configuration, ICodingTestApplication codingTestApplication)
        {
            this.configuration = configuration;
            this.codingTestApplication = codingTestApplication;
        }

        [HttpPost]
        [Route("GetTblLeftInfos")]
        public async Task<List<TblLeftOrRightInfo>> GetTblLeftInfos()
        {
            var res = await codingTestApplication.GetTblLeftInfos();
            return res;
        }

        [HttpPost]
        [Route("GetTblRightInfos")]
        public async Task<List<TblLeftOrRightInfo>> GetTblRightInfos()
        {
            var res = await codingTestApplication.GetTblRightInfos();
            return res;
        }

        [HttpPost]
        [Route("PullLeft")]
        public async Task PullLeft(int tblReposDetailId)
        {
            await codingTestApplication.PullLeft(tblReposDetailId);
        }

        [HttpPost]
        [Route("PullRight")]
        public async Task PullRight(int tblReposDetailId)
        {
            await codingTestApplication.PullRight(tblReposDetailId);
        }

        [HttpGet]
        [Route("SyncDataToTblReposDetailFromGithub")]
        public async Task<List<ReposInfo>> SyncDataToTblReposDetailFromGithub()
        {
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
            return finalData;
        }

    }
}
