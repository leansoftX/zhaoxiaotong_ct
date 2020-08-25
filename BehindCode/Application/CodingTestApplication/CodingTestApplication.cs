using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.CodingTest;
using Domain.CodingTest.Service;
using Microsoft.EntityFrameworkCore;

namespace Application.CodingTestApplication
{
    public class CodingTestApplication : ICodingTestApplication
    {
        private readonly ICodingTestService codingTestService;

        public CodingTestApplication(ICodingTestService codingTestService)
        {
            this.codingTestService = codingTestService;
        }

        public async Task<List<TblLeftOrRightInfo>> GetTblLeftInfos()
        {
            var res = await codingTestService.GetTblLeftInfos().ToListAsync();
            return res;
        }

        public async Task<List<TblLeftOrRightInfo>> GetTblRightInfos()
        {
            var res = await codingTestService.GetTblRightInfos().ToListAsync();
            return res;
        }

        public async Task PullLeft(int tblReposDetailId)
        {
            await codingTestService.PullLeft(tblReposDetailId);
        }

        public async Task PullRight(int tblReposDetailId)
        {
            await codingTestService.PullRight(tblReposDetailId);
        }

        public void SyncDataToTblReposDetailFromGithub(List<ReposInfo> reposInfos)
        {
            var tblReposDetails = new List<TblReposDetail>();
            reposInfos.ForEach(reposInfo => 
            {
                var tblReposDetail = new TblReposDetail()
                {
                    ReposId = reposInfo.Id,
                    ReposName = reposInfo.Name,
                    CloneUrl = reposInfo.Clone_Url,
                    Language = reposInfo.Language,
                    Description = reposInfo.Description
                };
                tblReposDetails.Add(tblReposDetail);
            });
            codingTestService.SyncDataToTblReposDetailFromGithub(tblReposDetails);
        }
    }
}
