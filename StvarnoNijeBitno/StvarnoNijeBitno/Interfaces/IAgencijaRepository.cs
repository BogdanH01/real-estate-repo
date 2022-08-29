using StvarnoNijeBitno.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StvarnoNijeBitno.Interfaces
{
    public interface IAgencijaRepository
    {
        IEnumerable<Agencija> GetAll();
        Agencija GetById(int id);
        IEnumerable<statDTO> GetByPrice(double price);
        IEnumerable<groupDTO> GetByOglas();
        IEnumerable<Agencija> GetByNaziv(string naziv);
    }
}
