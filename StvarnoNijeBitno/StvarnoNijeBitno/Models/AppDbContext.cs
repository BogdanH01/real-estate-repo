using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StvarnoNijeBitno.Models
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Agencija> Agencije { get; set; }
        public DbSet<Oglas> Oglasi { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            mb.Entity<Agencija>().HasData(
                    new Agencija() { Id = 1, Naziv = "Naj Nekretnine", GodinaOsnivanja = 2005},
                    new Agencija() { Id = 2, Naziv = "Dupleks Nekretnine", GodinaOsnivanja = 2010},
                    new Agencija() { Id = 3, Naziv = "Fast Nekretnine", GodinaOsnivanja = 2005}
                );
            
            mb.Entity<Oglas>().HasData(
                    new Oglas() { Id = 1, Naslov = "Komforna porodicna kuca", TipNekretnine = "Kuca", GodinaIzgradnje = 1987, Cena = 110000, AgencijaId = 3},
                    new Oglas() { Id = 2, Naslov = "Stan na ekstra lokaciji", TipNekretnine = "Stan", GodinaIzgradnje = 1979, Cena = 80000, AgencijaId = 1},
                    new Oglas() { Id = 3, Naslov = "Moderan dupleks", TipNekretnine = "Dupleks stan", GodinaIzgradnje = 2020, Cena = 220000, AgencijaId = 2},
                    new Oglas() { Id = 4, Naslov = "Povoljna vikendica", TipNekretnine = "Vikendica", GodinaIzgradnje = 1971, Cena = 50000, AgencijaId = 1},
                    new Oglas() { Id = 5, Naslov = "Stan u sirem centru", TipNekretnine = "Stan", GodinaIzgradnje = 1995, Cena = 90000, AgencijaId = 3}
                );
            
            base.OnModelCreating(mb);
        }
    }
}
