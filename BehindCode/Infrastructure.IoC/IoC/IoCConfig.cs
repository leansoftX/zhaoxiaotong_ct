﻿using System;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Autofac;
using AutoMapper;
using Autofac.Extensions.DependencyInjection;
using Domain.Common;
using Infrastructure.Config.MapperConfig;
using Infrastructure.Repository.RepositoryImplement;

namespace Infrastructure.Config.IoC
{
    public class IoCConfig
    {
        public static AutofacServiceProvider ImplementDI(IServiceCollection services, IConfiguration Configuration)
        {
            services.AddAutoMapper(typeof(AutoMapperConfiguration));
            services.AddDbContext<EFContext>(options => options.UseMySql(Configuration.GetConnectionString("DBConnection")));
            ContainerBuilder builder = new ContainerBuilder();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(Repository<,>)).As(typeof(IRepository<,>)).InstancePerLifetimeScope();

            Assembly servicesRepository = Assembly.Load("Infrastructure.Repository");
            Type[] servicesRepositorytypes = servicesRepository.GetTypes();
            builder.RegisterTypes(servicesRepositorytypes).AsImplementedInterfaces().InstancePerLifetimeScope();

            Assembly servicesCommon = Assembly.Load("Infrastructure.Common");
            Type[] servicesCommontypes = servicesCommon.GetTypes();
            builder.RegisterTypes(servicesCommontypes).AsImplementedInterfaces().InstancePerLifetimeScope();

            Assembly servicesDomain = Assembly.Load("Domain");
            Type[] servicesDomainRepositorytypes = servicesDomain.GetTypes();
            builder.RegisterTypes(servicesDomainRepositorytypes).AsImplementedInterfaces().InstancePerLifetimeScope();

            Assembly servicesApplication = Assembly.Load("Application");
            Type[] servicesApplicationtypes = servicesApplication.GetTypes();
            builder.RegisterTypes(servicesApplicationtypes).AsImplementedInterfaces().InstancePerLifetimeScope();

            builder.Populate(services);
            IContainer container = builder.Build();
            return new AutofacServiceProvider(container);
        }
    }
}
