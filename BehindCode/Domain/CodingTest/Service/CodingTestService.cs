using Domain.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.CodingTest.Service
{
    public class CodingTestService : ICodingTestService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<TblLeft, int> tblLeftRepository;
        private readonly IRepository<TblRight, int> tblRightRepository;
        private readonly IRepository<TblReposDetail, int> tblReposDetailRepository;


        public CodingTestService(IUnitOfWork unitOfWork, IRepository<TblRight, int> tblRightRepository, IRepository<TblLeft, int> tblLeftRepository, IRepository<TblReposDetail, int> tblReposDetailRepository)
        {
            this.unitOfWork = unitOfWork;
            this.tblLeftRepository = tblLeftRepository;
            this.tblRightRepository = tblRightRepository;
            this.tblReposDetailRepository = tblReposDetailRepository;
        }

        public IQueryable<TblLeftOrRightInfo> GetTblLeftInfos()
        {
            var res = tblLeftRepository.GetAll().Where(a => !a.IsDeleted)
                .Join(tblReposDetailRepository.GetAll(), left => left.TblReposDetailId, right => right.Id, (left, right) => new { left, right })
                .Select(a => new TblLeftOrRightInfo
                {
                    Id = a.left.Id,
                    TblReposDetailId = a.right.Id,
                    ReposId = a.right.ReposId,
                    ReposName = a.right.ReposName,
                    CloneUrl = a.right.CloneUrl,
                    Language = a.right.Language,
                    Description = a.right.Description
                });
            return res;
        }

        public IQueryable<TblLeftOrRightInfo> GetTblRightInfos()
        {
            var res = tblRightRepository.GetAll().Where(a => !a.IsDeleted)
                .Join(tblReposDetailRepository.GetAll(), left => left.TblReposDetailId, right => right.Id, (left, right) => new { left, right })
               .Select(a => new TblLeftOrRightInfo
               {
                   Id = a.left.Id,
                   TblReposDetailId = a.right.Id,
                   ReposId = a.right.ReposId,
                   ReposName = a.right.ReposName,
                   CloneUrl = a.right.CloneUrl,
                   Language = a.right.Language,
                   Description = a.right.Description
               });
            return res;
        }

        public async Task PullLeft(int tblReposDetailId)
        {
            var tblRight = tblRightRepository.GetAll().FirstOrDefault(a => a.TblReposDetailId == tblReposDetailId);
            tblRight.IsDeleted = true;
            if (tblLeftRepository.GetAll().Any(a => a.TblReposDetailId == tblReposDetailId))
            {
                var tblLeft = tblLeftRepository.GetAll().FirstOrDefault(a => a.TblReposDetailId == tblReposDetailId);
                tblLeft.IsDeleted = false;
            }
            else
            {
                var tblLeft = new TblLeft()
                {
                    TblReposDetailId = tblReposDetailId
                };
                await tblLeftRepository.AddAsync(tblLeft);
            }
        }

        public async Task PullRight(int tblReposDetailId)
        {
            var tblLeft = tblLeftRepository.GetAll().FirstOrDefault(a => a.TblReposDetailId == tblReposDetailId);
            tblLeft.IsDeleted = true;
            if (tblRightRepository.GetAll().Any(a => a.TblReposDetailId == tblReposDetailId))
            {
                var tblRight = tblRightRepository.GetAll().FirstOrDefault(a => a.TblReposDetailId == tblReposDetailId);
                tblRight.IsDeleted = false;
            }
            else
            {
                var tblRight = new TblRight()
                {
                    TblReposDetailId = tblReposDetailId
                };
                await tblRightRepository.AddAsync(tblRight);
            }
        }

        public void SyncDataToTblReposDetailFromGithub(List<TblReposDetail> tblReposDetails)
        {
            tblReposDetails.ForEach(tblReposDetail =>
            {
                if (tblReposDetailRepository.GetAll().Any(a => a.ReposId == tblReposDetail.ReposId))
                {
                    var tblReposDetailTemp = tblReposDetailRepository.GetAll().FirstOrDefault(a => a.ReposId == tblReposDetail.ReposId);
                    tblReposDetailTemp.Language = tblReposDetail.Language;
                    tblReposDetailTemp.ReposName = tblReposDetail.ReposName;
                    tblReposDetailTemp.Description = tblReposDetail.Description;
                    tblReposDetailTemp.ModifiedOn = DateTime.Now;
                }
                else
                {
                    tblReposDetailRepository.Add(tblReposDetail);
                }
            });
            unitOfWork.Commit();
            tblReposDetails = tblReposDetailRepository.GetAll().ToList();
            tblReposDetails.ForEach(tblReposDetail =>
            {
                if (!tblLeftRepository.GetAll().Any(a => a.TblReposDetailId == tblReposDetail.Id))
                {
                    var tblLeft = new TblLeft()
                    {
                        TblReposDetailId = tblReposDetail.Id
                    };
                    tblLeftRepository.Add(tblLeft);
                }
            });
            var tbLefts = tblLeftRepository.GetAll().ToList();
            var tbRights = tblRightRepository.GetAll().ToList();
            tbLefts.ForEach(tblLeft =>
            {
                if (!tblReposDetails.Any(a => a.Id == tblLeft.TblReposDetailId))
                {
                    tblLeft.IsDeleted = true;
                    tblLeft.DeletedDescription = "数据源不存在,同步删除";
                }
            });
            tbRights.ForEach(tbRight =>
            {
                if (!tblReposDetails.Any(a => a.Id == tbRight.TblReposDetailId))
                {
                    tbRight.IsDeleted = true;
                    tbRight.DeletedDescription = "数据源不存在,同步删除";
                }
            });
        }
    }
}
