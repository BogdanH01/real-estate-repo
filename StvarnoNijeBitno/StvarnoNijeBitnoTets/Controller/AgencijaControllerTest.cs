using Microsoft.AspNetCore.Mvc;
using Moq;
using StvarnoNijeBitno.Controllers;
using StvarnoNijeBitno.Interfaces;
using StvarnoNijeBitno.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace StvarnoNijeBitnoTest.Controller
{
    public class AgencijaControllerTest
    {
        [Fact]
        public void GetById_InvalidId_ReturnObject()
        {
            var mockRepository = new Mock<IAgencijaRepository>();

            var controller = new AgencijeController(mockRepository.Object);

            var actionResult = controller.GetById(24) as NotFoundResult;

            Assert.NotNull(actionResult);
        }
    }
}
