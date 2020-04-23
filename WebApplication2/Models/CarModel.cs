using System.Runtime.Serialization;

namespace WebApplication2.Models
{
    [DataContract]
    public class CarModel : Entry
    {
        [DataMember]
        public string carName { get; set; }
        [DataMember]
        public string carModel { get; set; }
    }
}