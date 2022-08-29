using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StvarnoNijeBitno.Models
{
    public class OglasDTO
    {
        public int Id { get; set; }
        public string Naslov { get; set; }
        public string TipNekretnine { get; set; }
        public int GodinaIzgradnje { get; set; }
        public double Cena { get; set; }
        public string AgencijaNaziv { get; set; }

        public override bool Equals(object obj)
        {
            return obj is OglasDTO dTO &&
                   Id == dTO.Id &&
                   Naslov == dTO.Naslov &&
                   TipNekretnine == dTO.TipNekretnine &&
                   GodinaIzgradnje == dTO.GodinaIzgradnje &&
                   Cena == dTO.Cena &&
                   AgencijaNaziv == dTO.AgencijaNaziv;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Naslov, TipNekretnine, GodinaIzgradnje, Cena, AgencijaNaziv);
        }
    }
}
