using StvarnoNijeBitno.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StvarnoNijeBitno.Interfaces
{
    public interface IOglasRepository
    {
        IQueryable<Oglas> GetAll();
        Oglas GetById(int id);
        IEnumerable<Oglas> GetByTip(string tip);
        void Create(Oglas oglas);
        void Delete(Oglas oglas);
        void Update(Oglas oglas);
        IQueryable<Oglas> GetByCena(int min, int max);
    }
}
