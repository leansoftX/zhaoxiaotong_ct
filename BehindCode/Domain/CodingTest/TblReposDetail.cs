using Domain.Common;
using System;

namespace Domain.CodingTest
{
    public class TblReposDetail : EntityBase<int>
    {
        public string ReposId { get; set; }
        public string ReposName { get; set; }
        public string CloneUrl { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
