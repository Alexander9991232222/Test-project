using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using WebApplication2.Models.Interfaces;

namespace WebApplication2.Models
{
    [DataContract]
    public class EntryResult<T> : IEntryResult<T>
    {
        [DataMember]
        public string message { get; set; }
        [DataMember]
        public T data { get; set; }
        [DataMember]
        public EStatus statusRequest { get; set; }
    }
}