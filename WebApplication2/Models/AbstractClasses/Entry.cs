using System.Runtime.Serialization;
using WebApplication2.Models.Interfaces;

namespace WebApplication2.Models
{
    [DataContract]
    public abstract class Entry : IEntry
    {
        [DataMember]
        public int id { get; set; }
    }
}