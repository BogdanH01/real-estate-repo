using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StvarnoNijeBitno.Models
{
    public class Agencija
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        [Range(1980, 2022)]
        public int GodinaOsnivanja { get; set; }

    }
}
