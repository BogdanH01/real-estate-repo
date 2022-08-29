using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
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
    public class OglasiController : ControllerBase
    {
        private readonly IOglasRepository or;
        private readonly IMapper mapper;

        public OglasiController(IOglasRepository or, IMapper mapper)
        {
            this.or = or;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(or.GetAll().ProjectTo<OglasDTO>(mapper.ConfigurationProvider));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Oglas o = or.GetById(id);

            if (o == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<OglasDTO>(o));
        }

        [HttpGet]
        [Route("trazi")]
        public IActionResult GetByTip([FromQuery] string tip)
        {
            return Ok(or.GetByTip(tip));
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Oglas o)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != o.Id)
            {
                return BadRequest();
            }

            try
            {
                or.Update(o);
            }
            catch
            {
                return BadRequest();
            }

            return Ok(o);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Create(Oglas o)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            or.Create(o);
            return CreatedAtAction("GetById", new { id = o.Id }, o);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var oglas = or.GetById(id);

            if (oglas == null)
            {
                return NotFound();
            }

            or.Delete(oglas);
            return NoContent();
        }

        [Authorize]
        [HttpPost]
        [Route("/api/pretraga")]
        public IActionResult GetByCena(searchDTO sDTO)
        {
            if(sDTO.min > sDTO.max)
            {
                return BadRequest();
            }

            return Ok(or.GetByCena(sDTO.min, sDTO.max).ProjectTo<OglasDTO>(mapper.ConfigurationProvider));
        }
    }
}
