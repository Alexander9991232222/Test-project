using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace WebApplication2.Models
{
    [DataContract]
    public class Person : Entry
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string surname { get; set; }
        [DataMember]
        public string patronymic { get; set; }
        [DataMember]
        public string carModelId { get; set; }
    }
}