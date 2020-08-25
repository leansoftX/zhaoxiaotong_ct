using Domain.CodingTest;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.CodingTestApplication
{
    public interface ICodingTestApplication
    {
        Task<List<TblLeftOrRightInfo>> GetTblLeftInfos();
        Task<List<TblLeftOrRightInfo>> GetTblRightInfos();
        Task PullLeft(int id);
        Task PullRight(int id);
        void SyncDataToTblReposDetailFromGithub(List<ReposInfo> reposInfos);
    }
}
