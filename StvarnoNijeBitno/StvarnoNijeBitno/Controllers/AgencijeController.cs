using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StvarnoNijeBitno.Interfaces;
using StvarnoNijeBitno.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StvarnoNijeBitno.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgencijeController : ControllerBase
    {
        private readonly IAgencijaRepository ar;

        public AgencijeController(IAgencijaRepository ar)
        {
            this.ar = ar;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(ar.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Agencija a = ar.GetById(id);
            
            if(a == null)
            {
                return NotFound();
            }

            return Ok(a);
        }

        [HttpGet]
        [Route("/api/prodaja")]
        public IActionResult GetBySumCena([FromQuery] double granica)
        {
            return Ok(ar.GetByPrice(granica));
        }

        [HttpGet]
        [Route("/api/brojnost")]
        public IActionResult GetByOglas()
        {
            return Ok(ar.GetByOglas());
        }
    }
}
