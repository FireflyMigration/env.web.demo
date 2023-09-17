using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENV.Web
{
    public static class FromJson
    {
        public static DataItem ItemFromJson(string s)
        {
            if (string.IsNullOrEmpty(s))
                throw new InvalidOperationException("Empty JSON Content - did you forget settings the ContentType:application/json");
            var di = new DataItem();
            foreach (var pair in JObject.Parse(s))
            {
                object value = pair.Value.ToObject<object>();
                if (value is JArray)
                    value = ListFromJson(value.ToString());
                else if (value != null)
                    value = value.ToString();
                di.Set(pair.Key, value);
            }

            return di;
        }
        public static DataList ListFromJson(string s)
        {
            var result = new DataList();

            var jArr = JArray.Parse(s);
            foreach (var jObj in jArr.Children<JObject>())
            {
                var di = ItemFromJson(jObj.ToString());
                result.AddItem(di);
            }

            return result;
        }
    }
}
