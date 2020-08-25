﻿using Domain.CodingTest;
using Domain.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Infrastructure.Repository.RepositoryImplement
{
    public class EFContext : DbContext
    {
        public EFContext(DbContextOptions<EFContext> options) : base(options)
        {
            //Database.EnsureCreated();
        }

        public virtual DbSet<TblLeft> TblLeft { get; set; }
        public virtual DbSet<TblRight> TblRight { get; set; }
        public virtual DbSet<TblReposDetail> TblReposDetail { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges(); 
            var modifiedEntities = ChangeTracker
                .Entries()
                .Where(x => x.State == EntityState.Modified)
                .Select(x => x.Entity)
                .ToList();
            var addEntities = ChangeTracker
                .Entries()
                .Where(x => x.State == EntityState.Added)
                .Select(x => x.Entity)
                .ToList();
            foreach (var entity in modifiedEntities)
            {
                var baseEntity = entity as EntityBase<long>;
            }
            foreach (var entity in addEntities)
            {
                var baseEntity = entity as EntityBase<long>;
                if (baseEntity != null)
                {
                    baseEntity.CreatedOn = DateTime.Now;
                }
            }
            if (addEntities.Count > 0 || modifiedEntities.Count > 0)
                return base.SaveChanges();
            else
                return 0;
        }
    }
}
