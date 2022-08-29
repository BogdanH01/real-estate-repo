using Microsoft.EntityFrameworkCore;
using StvarnoNijeBitno.Interfaces;
using StvarnoNijeBitno.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StvarnoNijeBitno.Repositories
{
    public class AgencijaRepository : IAgencijaRepository
    {
        private readonly AppDbContext context;

        public AgencijaRepository(AppDbContext context)
        {
            this.context = context;
        }

        public IEnumerable<Agencija> GetAll()
        {
            return context.Agencije;
        }

        public Agencija GetById(int id)
        {
            return context.Agencije.FirstOrDefault(a => a.Id == id);
        }

        public IEnumerable<Agencija> GetByNaziv(string naziv)
        {
            return context.Agencije.Where(a => a.Naziv == naziv).OrderBy(a => a.GodinaOsnivanja).OrderByDescending(a => a.Naziv);
        }

        public IEnumerable<groupDTO> GetByOglas()
        {
            return context.Oglasi.Include("Agencija").GroupBy(o => o.Agencija.Id)
                .Select(r => new groupDTO
                {
                    Naziv = context.Agencije.Where(a => a.Id == r.Key).Select(a => a.Naziv).Single(),
                    Count = r.Count()
                });
        }

        public IEnumerable<statDTO> GetByPrice(double price)
        {
            return context.Oglasi.Include("Agencija").GroupBy(o => o.Agencija.Id)
                .Select(r => new statDTO
                {
                    Naziv = context.Agencije.Where(a => a.Id == r.Key).Select(a => a.Naziv).Single(),
                    Sum = context.Oglasi.Where(a => a.Agencija.Id == r.Key).Sum(o => o.Cena)
                });
        }
    }
}
