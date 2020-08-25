using Domain.Common;

namespace Domain.CodingTest
{
    public class TblLeft : EntityBase<int>
    {
        public int TblReposDetailId { get; set; }
        public bool IsDeleted { get; set; }
        public string DeletedDescription { get; set; }
    }
}
