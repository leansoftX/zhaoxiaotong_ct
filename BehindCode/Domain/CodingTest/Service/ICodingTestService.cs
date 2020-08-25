using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.CodingTest.Service
{
    public interface ICodingTestService
    {
        IQueryable<TblLeftOrRightInfo> GetTblLeftInfos();
        IQueryable<TblLeftOrRightInfo> GetTblRightInfos();
        Task PullLeft(int tblReposDetailId);
        Task PullRight(int tblReposDetailId);
        void SyncDataToTblReposDetailFromGithub(List<TblReposDetail> tblReposDetails);
    }
}
