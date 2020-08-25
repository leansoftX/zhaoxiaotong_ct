using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.CodingTest
{
    public class TblLeftOrRightInfo
    {
        public int Id { get; set; }
        public int TblReposDetailId { get; set; }
        public string ReposId { get; set; }
        public string ReposName { get; set; }
        public string CloneUrl { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
    }
}
