using Microsoft.EntityFrameworkCore;
using StvarnoNijeBitno.Interfaces;
using StvarnoNijeBitno.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StvarnoNijeBitno.Repositories
{
    public class OglasRepository : IOglasRepository
    {
        private readonly AppDbContext context;

        public OglasRepository(AppDbContext context)
        {
            this.context = context;
        }

        public void Create(Oglas oglas)
        {
            context.Oglasi.Add(oglas);
            context.SaveChanges();
        }

        public void Delete(Oglas oglas)
        {
            context.Oglasi.Remove(oglas);
            context.SaveChanges();
        }

        public IQueryable<Oglas> GetAll()
        {
            return context.Oglasi;
        }

        public IQueryable<Oglas> GetByCena(int min, int max)
        {
            return context.Oglasi.Where(o => o.Cena > min && o.Cena < max).OrderBy(o => o.Cena);
        }

        public Oglas GetById(int id)
        {
            return context.Oglasi.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Oglas> GetByTip(string tip)
        {
            return context.Oglasi.Where(o => o.TipNekretnine.Contains(tip)).OrderBy(o => o.Cena);
        }

        public void Update(Oglas oglas)
        {
            context.Entry(oglas).State = EntityState.Modified;

            try
            {
                context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }
    }
}
