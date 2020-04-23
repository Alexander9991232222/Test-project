using System.Runtime.Serialization;

namespace WebApplication2.Models
{
    [DataContract]
    public class Car : Entry
    {
        [DataMember]
        public string carNumber { get; set; }
        [DataMember]
        public int personId { get; set; }
        [DataMember]
        public int carModelId { get; set; }
    }
}