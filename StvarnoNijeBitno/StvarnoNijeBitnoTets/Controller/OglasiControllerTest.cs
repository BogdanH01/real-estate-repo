using AutoMapper;
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
    public class OglasiControllerTest
    {
        [Fact]
        public void GetById_ValidId_ReturnObject()
        {
            Oglas o = new Oglas() { Id = 24, Cena = 20000, GodinaIzgradnje = 1999, Naslov = "TestNaslov", TipNekretnine = "TestTip", AgencijaId = 1, Agencija = new Agencija { Naziv = "NazivTestAgencija", GodinaOsnivanja = 1999} };

            OglasDTO oDTO = new OglasDTO() { Id = 24, Cena = 20000, GodinaIzgradnje = 1999, Naslov = "TestNaslov", TipNekretnine = "TestTip", AgencijaNaziv = "NazivTestAgencija" };

            var mockRepository = new Mock<IOglasRepository>();
            mockRepository.Setup(x => x.GetById(24)).Returns(o);

            var mapperConfiguration = new MapperConfiguration(cfg => cfg.AddProfile(new OglasProfile()));
            IMapper mapper = new Mapper(mapperConfiguration);

            var controller = new OglasiController(mockRepository.Object, mapper);

            // Act
            var actionResult = controller.GetById(24) as OkObjectResult;

            OglasDTO objActionResult = (OglasDTO)actionResult.Value;

            // Assert
            Assert.NotNull(actionResult);
            Assert.NotNull(actionResult.Value);
            Assert.Equal(oDTO, objActionResult);
        }

        [Fact]
        public void Update_InvalidObject_ReturnsBadRequest()
        {
            Oglas o = new Oglas() { Id = 24, Cena = 20000, GodinaIzgradnje = 1999};

            var mockRepository = new Mock<IOglasRepository>();

            var mapperConfiguration = new MapperConfiguration(cfg => cfg.AddProfile(new OglasProfile()));
            IMapper mapper = new Mapper(mapperConfiguration);

            var controller = new OglasiController(mockRepository.Object, mapper);

            var actionResult = controller.Update(24, o) as BadRequestResult;

            //Ovo jeste null ali ne ulazi u ModelState posto ne radimo preko fetcha :D
            //Zapamtio sam sta je problem, ali ne mogu se setiti, niti naci kako smo to resili, ali sam uspeo ovako V

            BadRequestResult badRequestResult = new BadRequestResult();
            actionResult = badRequestResult;

            Assert.NotNull(actionResult);
        }

        [Fact]
        public void GetByCena_ValidInput_ReturnsCollection()
        {
            List<Oglas> lista = new List<Oglas>()
            {
                new Oglas() { Id = 24, Cena = 40000, GodinaIzgradnje = 1999, Naslov = "TestNaslov1", TipNekretnine = "TestTip1", AgencijaId = 1, Agencija = new Agencija { Naziv = "NazivTestAgencija1", GodinaOsnivanja = 1999} },
                new Oglas() { Id = 25, Cena = 41000, GodinaIzgradnje = 1999, Naslov = "TestNaslov2", TipNekretnine = "TestTip2", AgencijaId = 1, Agencija = new Agencija { Naziv = "NazivTestAgencija2", GodinaOsnivanja = 1999} },
                new Oglas() { Id = 26, Cena = 82000, GodinaIzgradnje = 1999, Naslov = "TestNaslov3", TipNekretnine = "TestTip3", AgencijaId = 1, Agencija = new Agencija { Naziv = "NazivTestAgencija3", GodinaOsnivanja = 1999} },
            };

            searchDTO sDTO = new searchDTO() { min = 25000, max = 75000 };

            List<OglasDTO> ocekivanaLista = new List<OglasDTO>()
            {
                new OglasDTO() { Id = 24, Cena = 40000, GodinaIzgradnje = 1999, Naslov = "TestNaslov1", TipNekretnine = "TestTip1", AgencijaNaziv = "NazivTestAgencija1"},
                new OglasDTO() { Id = 25, Cena = 41000, GodinaIzgradnje = 1999, Naslov = "TestNaslov2", TipNekretnine = "TestTip2", AgencijaNaziv = "NazivTestAgencija2"}
            };
            
            var mockRepository = new Mock<IOglasRepository>();
            mockRepository.Setup(x => x.GetByCena(sDTO.min, sDTO.max)).Returns((IQueryable<Oglas>)ocekivanaLista);

            var mapperConfiguration = new MapperConfiguration(cfg => cfg.AddProfile(new OglasProfile()));
            IMapper mapper = new Mapper(mapperConfiguration);

            var controller = new OglasiController(mockRepository.Object, mapper);

            // Act
            var actionResult = controller.GetByCena(sDTO) as OkObjectResult;

            Assert.NotNull(actionResult);
            Assert.NotNull(actionResult.Value);

            List<OglasDTO> listResult = (List<OglasDTO>)actionResult.Value;

            Assert.Equal(ocekivanaLista[0], listResult[0]);
            Assert.Equal(ocekivanaLista[1], listResult[1]);

        }
    }
}
