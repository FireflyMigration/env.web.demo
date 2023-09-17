using ENV.Printing;
using Firefly.Box;
using Firefly.Box.Data.Advanced;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml;
using System.Collections;
using ENV.Utilities;
using Newtonsoft.Json.Linq;
using System.Diagnostics;
using ENV.Web;
using ENV;
using System.Runtime.CompilerServices;

namespace ENV.Web
{
    public class DataItem : ISerializedObject
    {
        List<Val> _value = new List<Val>();
        Dictionary<string, Val> _vals = new Dictionary<string, Val>();
        public string ObjectType = "Object";
        public void Set(params ColumnBase[] cols)
        {
            Set((IEnumerable<ColumnBase>)cols);
        }
        public bool ContainsKey(string key)
        {
            return _vals.ContainsKey(key);
        }
        public string[] Keys { get { return _vals.Keys.ToArray<string>(); } }
        public void Set(IEnumerable<ColumnBase> cols)
        {
            foreach (var c in cols)
            {
                Set(c.Name, c.Value);
            }

        }
        public void Set(string name, object value)
        {
            value = FixValueTypes(value);

            Val result;
            if (_vals.TryGetValue(name, out result))
            {
                result.Value = value;
            }
            else
            {
                result = new Val { Name = name, Value = value };
                _value.Add(result);
                _vals.Add(name, result);
            }



        }

        internal static object FixValueTypes(object value)
        {
            if (value == null)
                return null;
            Text txt;
            Number n;
            Date d;
            Time t;
            Bool b;
            if (Text.TryCast(value, out txt))
            {

                value = (txt ?? "").TrimEnd().ToString();
            }
            else if (Number.TryCast(value, out n))
            {
                var dec = n.ToDecimal();
                var lng = (long)dec;
                if (dec != lng)
                    value = dec;
                else value = lng;

            }
            else if (Date.TryCast(value, out d))
            {
                if (d == Date.Empty)
                    value = null;
                else
                {
                    value = d.ToString("YYYY-MM-DD");
                }
            }
            else if (Time.TryCast(value, out t))
            {
                value = t.ToString("HH:MM:SS");
            }
            else if (Bool.TryCast(value, out b))
                value = b.ToBoolean();
            return value;
        }

        public string ToJson()
        {
            using (var sw = new StringWriter())
            {
                ToWriter(new JsonISerializedObjectWriter(sw));
                return sw.ToString();
            }
        }

        class Val
        {
            public string Name { get; set; }
            public object Value { get; set; }
        }


        public void ToWriter(ISerializedObjectWriter writer)
        {
            writer.WriteStartObject(ObjectType);
            foreach (var item in _value)
            {
                writer.WriteName(item.Name);
                var v = item.Value as ISerializedObject;
                if (v != null)
                    writer.WriteIserializedObject(v);
                else
                    writer.WriteValue(item.Value);
            }
            writer.WriteEndObject();
        }
        internal DataList GetList(object name)
        {
            return (DataList)Get(name);
        }
        internal object Get(object name)
        {

            foreach (var item in _value)
            {
                if (item.Name == (string)name)
                    return item.Value;
            }
            return null;
        }
        public DataItemValue this[string key]
        {
            get
            {
                return new DataItemValue(Get(key));
            }
        }
    }
    public class DataItemValue
    {
        object _o;
        public DataItemValue(object o)
        {
            _o = o;
        }

        public Number Number
        {

            get
            {
                Number r;
                if (Number.TryCast(_o, out r))
                    return r;
                return Number.Parse(_o.ToString());
            }
        }

        public Text Text
        {
            get
            {
                if (_o == null)
                    return null;
                return _o.ToString();
            }
        }
        public Date Date
        {
            get
            {
                Date r;
                if (Date.TryCast(_o, out r))
                    return r;
                return Date.Parse(_o.ToString(), ("YYYY-MM-DD"));
            }
        }
        public Time Time
        {
            get
            {
                Time r;
                if (Time.TryCast(_o, out r))
                    return r;
                if (_o == null)
                    return null;
                return Time.Parse(_o.ToString(), ("HH:MM:SS"));
            }
        }
        public Bool Bool
        {
            get
            {
                Bool r;
                if (Bool.TryCast(_o, out r))
                    return r;
                return _o.ToString().ToLower() == "true";
            }
        }
        public DataList DataList
        {
            get
            {
                return _o as DataList;
            }
        }
        public DataItem DataItem
        {
            get
            {
                return _o as DataItem;
            }
        }

        internal T GetValue<T>()
        {
            if (typeof(T) == typeof(Text))
                return (T)(object)this.Text;
            if (typeof(T) == typeof(Number))
                return (T)(object)this.Number;
            if (typeof(T) == typeof(Date))
                return (T)(object)this.Date;
            if (typeof(T) == typeof(Time))
                return (T)(object)this.Time;
            if (typeof(T) == typeof(Bool))
                return (T)(object)this.Bool;
            throw new Exception("Unknown stuff");
        }
    }
    public interface ISerializedObject
    {
        void ToWriter(ISerializedObjectWriter writer);
    }
    public interface ISerializedObjectWriter : IDisposable
    {
        void WriteStartArray();
        void WriteName(string name);
        void WriteValue(object value);
        void WriteIserializedObject(ISerializedObject value);
        void WriteEndArray();
        void WriteStartObject(string type);
        void WriteEndObject();

    }
    public class XmlISerializedObjectWriter : ISerializedObjectWriter
    {
        XmlTextWriter _writer;
        public XmlISerializedObjectWriter(XmlTextWriter writer)
        {
            _writer = writer;
            WriteStartObject("root");
        }

        public void Dispose()
        {
            WriteEndObject();
        }

        public void WriteEndArray()
        {

        }

        public void WriteEndObject()
        {
            _writer.WriteEndElement();
        }

        public void WriteIserializedObject(ISerializedObject value)
        {
            value.ToWriter(this);
            _writer.WriteEndElement();
        }

        public void WriteName(string name)
        {
            _writer.WriteStartElement(name);
        }

        public void WriteStartArray()
        {
        }

        public void WriteStartObject(string type)
        {
            _writer.WriteStartElement(type);
        }

        public void WriteValue(object value)
        {
            if (value == null)
                value = "";
            _writer.WriteString(value.ToString());
            _writer.WriteEndElement();
        }
    }
    public class JsonISerializedObjectWriter : ISerializedObjectWriter
    {
        public static bool Condensed = false;
        TextWriter _writer;
        public JsonISerializedObjectWriter(TextWriter writer, int indent = 0)
        {
            _writer = writer;
            _indent = indent;
        }
        int _indent = 0;
        string NewLine
        {
            get
            {
                if (Condensed)
                    return "";
                return "\n" + new string(' ', _indent * 2);
            }
        }
        string Space
        {
            get
            {

                if (Condensed)
                    return "";
                return " ";
            }
        }
        string Indent()
        {
            _indent++;
            return NewLine;
        }
        string UnIndent()
        {
            _indent--;
            return NewLine;
        }
        public void WriteEndArray()
        {
            _writer.Write(UnIndent() + "]");
        }

        public void WriteEndObject()
        {
            _writer.Write(UnIndent() + "}");
        }
        bool _firstObjectInArray = true;
        bool _firstValueInObject = true;
        public void WriteIserializedObject(ISerializedObject value)
        {
            value.ToWriter(new JsonISerializedObjectWriter(_writer, _indent));
        }

        public void WriteName(string name)
        {
            if (_firstValueInObject)
                _firstValueInObject = false;
            else
                _writer.Write("," + NewLine);
            _writer.Write("\"" + name.Replace("\"", "\\\"") + "\":" + Space);
        }

        public void WriteStartArray()
        {
            _writer.Write("[" + Indent());
            _firstObjectInArray = true;
        }

        public void WriteStartObject(string type)
        {
            _firstValueInObject = true;
            if (_firstObjectInArray)
                _firstObjectInArray = false;
            else
                _writer.Write("," + NewLine);
            _writer.Write("{" + Indent());
        }

        public void WriteValue(object value)
        {
            if (value == null)
                _writer.Write("null");
            else if (value is int || value is long)

                _writer.Write(value.ToString());
            else if (value is double)
            {
                _writer.Write(((double)value).ToString(System.Globalization.CultureInfo.InvariantCulture));
            }
            else if (value is decimal)
            {
                _writer.Write(((decimal)value).ToString(System.Globalization.CultureInfo.InvariantCulture));
            }
            else if (value is bool)
                _writer.Write(value.ToString().ToLower());
            else if (value is string[])
            {
                WriteStartArray();
                int i = 0;
                foreach (var item in (string[])value)
                {
                    if (i++ > 0)
                        _writer.Write(", ");
                    WriteValue(item);
                }
                WriteEndArray();
            }
            else
                _writer.Write("\"" + value.ToString().Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\n", "\\n").Replace("\r", "\\r").Replace("\t", "\\t") + "\"");
        }

        public void Dispose()
        {

        }
    }


    public class CSVISerializedObjectWriter : ISerializedObjectWriter
    {
        TextWriter _writer;
        public CSVISerializedObjectWriter(TextWriter writer)
        {
            _writer = writer;
        }
        public void WriteEndArray()
        {

        }

        public void WriteEndObject()
        {
            if (_firstLine)
            {
                _writer.WriteLine(_titleLine);
                _firstLine = false;
            }
            _writer.WriteLine(_dataLine);
        }
        public void WriteIserializedObject(ISerializedObject value)
        {
            if (!_inValue)
                value.ToWriter(this);
            else
            {
                using (var sw = new StringWriter())
                {
                    value.ToWriter(new CSVISerializedObjectWriter(sw));
                    WriteValue(sw.ToString());
                }
            }
            //value.ToWriter(new CSVISerializedObjectWriter(_writer));
        }
        bool _firstLine = true;

        string _titleLine = "";
        string _dataLine = "";
        bool _inValue = false;
        public void WriteName(string name)
        {
            if (_firstLine)
            {
                if (_titleLine.Length > 0)
                    _titleLine += ",";
                _titleLine += name;
            }
            _inValue = true;
        }

        public void WriteStartArray()
        {
        }

        public void WriteStartObject(string type)
        {
            _dataLine = "";
        }

        public void WriteValue(object value)
        {
            if (_dataLine.Length > 0)
                _dataLine += ",";
            if (value == null)
                value = "";
            var val = value.ToString();
            if (val.Contains(",") || val.Contains("\r\n"))
                val = "\"" + val.ToString().Replace("\"", "\"\"") + "\"";
            _dataLine += val;
            _inValue = false;
        }

        public void Dispose()
        {

        }
    }
    public class HTMLISerializedObjectWriter : ISerializedObjectWriter
    {
        internal static string HTMLPageHeader = @"
<!DOCTYPE html>
<html lang=""en"">
<head>
     <meta name=""viewport"" content=""width=device-width, initial-scale=1"">
<style>" + StoredStuff.BootstrapCss + @"
</style>
     
</head>
<body>";

        TextWriter _writer;
        public HTMLISerializedObjectWriter(TextWriter writer, string title = null, bool root = true)
        {

            _writer = writer;
            if (root)
            {
                _writer.WriteLine(HTMLPageHeader);
                if (!string.IsNullOrEmpty(title))
                    _writer.WriteLine("<h1>" + title + "</h1>");
            }
        }
        bool _inArray = false;
        public void WriteEndArray()
        {
            _writer.WriteLine(" </table>");
        }

        public void WriteEndObject()
        {
            if (!_inArray)
                WriteTableStart();
            if (_firstLine)
            {
                _writer.WriteLine("<tr>" + _titleLine + "</tr");
                _firstLine = false;
            }
            _writer.WriteLine("<tr>" + _dataLine + "</tr>");
            if (!_inArray)
                _writer.WriteLine("</table>");
        }
        public void WriteIserializedObject(ISerializedObject value)
        {
            if (!_inValue)
                value.ToWriter(this);
            else
            {
                using (var sw = new StringWriter())
                {
                    value.ToWriter(new HTMLISerializedObjectWriter(sw));
                    WriteValue(sw.ToString());
                }
            }
            //value.ToWriter(new CSVISerializedObjectWriter(_writer));
        }
        bool _firstLine = true;

        string _titleLine = "";
        string _dataLine = "";
        bool _inValue = false;
        public void WriteName(string name)
        {
            if (_firstLine)
            {

                _titleLine += "<th>" + name + "</th>";
            }
            _inValue = true;
        }

        public void WriteStartArray()
        {
            _inArray = true;
            WriteTableStart();
        }

        private void WriteTableStart()
        {
            _writer.WriteLine(@"<table class=""table table-responsive table-striped table-bordered table-hover table-condensed table-responsive"">");
        }

        public void WriteStartObject(string type)
        {
            _dataLine = "";
        }

        public void WriteValue(object value)
        {
            if (value == null)
                value = "";
            var val = value.ToString();

            _dataLine += "<td>" + val + "</td>";
            _inValue = false;
        }
        public string BodyAddition = null;
        public void Dispose()
        {
            if (!string.IsNullOrEmpty(BodyAddition))
                _writer.WriteLine(BodyAddition);
            _writer.WriteLine(@"</body>
    <script >" + StoredStuff.JQuery + @"</script>
    <script >" + StoredStuff.BootstrapJs + @"</script>
</html>");
        }
    }
    public class DataList : ISerializedObject, IEnumerable<DataItem>
    {
        List<DataItem> _list = new List<DataItem>();
        public DataItem AddItem(IEnumerable<ColumnBase> columns)
        {
            var r = new DataItem();
            r.Set(columns);
            _list.Add(r);
            return r;
        }
        public void AddItem(DataItem item)
        {
            _list.Add(item);
        }
        public DataItem AddItem(ENV.Data.Entity e)
        {
            return AddItem(e.Columns);
        }
        public DataItem AddItem(params ColumnBase[] columns)
        {
            return AddItem((IEnumerable<ColumnBase>)columns);
        }

        public string ToJson()
        {
            using (var sw = new StringWriter())
            {
                ToWriter(new JsonISerializedObjectWriter(sw, 0));
                return sw.ToString();
            }
        }



        public void ToWriter(ISerializedObjectWriter writer)
        {
            writer.WriteStartArray();
            foreach (var item in _list)
            {
                item.ToWriter(writer);
            }
            writer.WriteEndArray();
        }

        public string ToXml()
        {
            using (var sw = new StringWriter())
            {
                ToWriter(new XmlISerializedObjectWriter(new XmlTextWriter(sw)));
                return sw.ToString();
            }
        }
        public string ToCsv()
        {

            using (var sw = new StringWriter())
            {
                ToWriter(new CSVISerializedObjectWriter(sw));
                return sw.ToString();
            }
        }
        public string ToHTML()
        {

            using (var sw = new StringWriter())
            {

                ToWriter(new HTMLISerializedObjectWriter(sw));
                sw.WriteLine("</body></html>");
                return sw.ToString();
            }
        }

        internal void SortBy(string name)
        {
            _list.Sort((a, b) =>
            {
                return Firefly.Box.Advanced.Comparer.Compare(a.Get(name), b.Get(name));
            });
        }

        public IEnumerator<DataItem> GetEnumerator()
        {
            return _list.GetEnumerator();
        }


        IEnumerator IEnumerable.GetEnumerator()
        {
            return _list.GetEnumerator();
        }
        public int Count { get { return _list.Count; } }
        public DataItem this[int i] { get { return _list[i]; } }
    }
    public class DataCollector
    {

        static ContextStatic<bool> enabled = new ContextStatic<bool>();
        public static bool Enabled { get { return enabled.Value; } set { enabled.Value = value; } }


        public static string ToJson()
        {
            using (var sw = new StringWriter())
            {
                var r = instance.Value.getResult();
                if (r != null)
                    r.ToWriter(new JsonISerializedObjectWriter(sw));
                return sw.ToString();
            }
        }


        public static IDisposable StartItem()
        {
            return instance.Value.StartItem();
        }
        public static IDisposable StartItem(string name)
        {
            var member = StartMember(name);
            var item = StartItem();
            return new Disposable(() => { item.Dispose(); member.Dispose(); });
        }
        public static IDisposable StartArray(string name)
        {
            var member = StartMember(name);
            var item = StartArray();
            return new Disposable(() => { item.Dispose(); member.Dispose(); });
        }
        public static IDisposable StartArray()
        {
            return instance.Value.StartArray();
        }
        public static IDisposable StartMember(string name)
        {
            return instance.Value.StartMember(name);
        }
        public static void Set(string name, object value)
        {
            instance.Value.Set(name, value);
        }


        static ContextStatic<State> instance = new ContextStatic<State>(() => new RootState());

        class ItemState : State
        {
            class ObjectMapper
            {
                public string Key;
                public Dictionary<ColumnBase, string> Columns = new Dictionary<ColumnBase, string>();
                public ObjectMapper(string key, object entity)
                {
                    Key = key;
                    foreach (var item in entity.GetType().GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic))
                    {
                        if (typeof(ColumnBase).IsAssignableFrom(item.FieldType))
                        {
                            Columns.Add(item.GetValue(entity) as ColumnBase, item.Name);
                        }
                    }
                }
            }
            Dictionary<Firefly.Box.Data.Entity, ObjectMapper> _entityKey = new Dictionary<Firefly.Box.Data.Entity, ObjectMapper>();
            ObjectMapper _localColumns;
            Dictionary<string, ItemState> _members = new Dictionary<string, ItemState>();
            public DataItem item = new DataItem();
            public override void Set(string name, object value)
            {
                item.Set(name, value);
            }
            internal override void Set(ColumnBase col)
            {
                var name = col.Name;
                ObjectMapper o = null;
                if (col.Entity != null)
                    _entityKey.TryGetValue(col.Entity, out o);
                else o = _localColumns;
                if (o != null)
                {
                    if (o.Columns.TryGetValue(col, out name))
                    {
                        GetMember(o.Key)
                            //.GetMember(name)
                            .Set(name, col.Value);
                        return;
                    }
                }

                Set(name, col.Value);
            }
            internal ItemState GetMember(string key)
            {
                if (key == "")
                    return this;
                ItemState member;
                if (!_members.TryGetValue(key, out member))
                {
                    member = new ItemState();
                    _members.Add(key, member);
                    item.Set(key, member.item);
                }
                return member;
            }
            internal override void MapEntity(Firefly.Box.Data.Entity entity, string key)
            {
                this._entityKey.Add(entity, new ObjectMapper(key, entity));
            }
            internal override void Map(object controller)
            {
                _localColumns = new ObjectMapper("", controller);
                foreach (var item in controller.GetType().GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic))
                {
                    if (typeof(Firefly.Box.Data.Entity).IsAssignableFrom(item.FieldType))
                    {
                        var e = item.GetValue(controller) as Firefly.Box.Data.Entity;
                        _entityKey.Add(e, new ObjectMapper(item.Name, e));
                    }
                }


                foreach (var item in controller.GetType().GetMethods(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic))
                {
                    if ((item.IsPublic || item.IsAssembly) && item.DeclaringType == controller.GetType() && item.GetParameters().Length == 0 && item.ReturnType != typeof(void))
                    {
                        Set(item.Name, item.Invoke(controller, new object[0]));
                    }
                }
            }

            public override IDisposable StartMember(string name)
            {
                var member = new RootState();
                var state = SetState(member);
                return new Disposable(() =>
                {
                    item.Set(name, member.getResult());
                    state.Dispose();
                });
            }
            public override ISerializedObject getResult()
            {
                return item;
            }
            
        }

        class State
        {
            public virtual ISerializedObject getResult()
            {
                throw new InvalidException();
            }

            class InvalidException : System.InvalidOperationException
            {

                public InvalidException() : base("Not valid For " + instance.Value.ToString())
                {
                }
            }


            public virtual IDisposable StartItem()
            {
                throw new InvalidException();
            }
            public virtual IDisposable StartArray()
            {
                throw new InvalidException();
            }
            public virtual IDisposable StartMember(string name)
            {
                throw new InvalidException();
            }
            public virtual void Set(string name, object value)
            {
                throw new InvalidException();
            }

            internal virtual void MapEntity(Firefly.Box.Data.Entity entity, string key)
            {
                throw new InvalidException();
            }

            internal virtual void Set(ColumnBase col)
            {
                throw new InvalidException();
            }

            internal virtual void Map(object controller)
            {
                throw new InvalidException();
            }
        }

        class RootState : State
        {
            public State _myRoot;
            public override IDisposable StartItem()
            {
                if (_myRoot != null)
                    throw new Exception("There is already a root item");
                _myRoot = new ItemState();
                return SetState(_myRoot);
            }
            public override IDisposable StartArray()
            {
                if (_myRoot != null)
                    throw new Exception("There is already a root item");
                _myRoot = new ArrayState();
                return SetState(_myRoot);
            }

            public override ISerializedObject getResult()
            {
                if (_myRoot != null)
                    return _myRoot.getResult();
                return null;
            }

        }



        class ArrayState : State
        {
            DataList _array = new DataList();
            public override IDisposable StartItem()
            {
                var result = new ItemState();
                _array.AddItem(result.item);
                return SetState(result);

            }
            public override ISerializedObject getResult()
            {
                return _array;
            }

        }



        static IDisposable SetState(State state)
        {
            var prev = instance.Value;
            instance.Value = state;
            return new Disposable(() => instance.Value = prev);
        }

        public static void Set(params ColumnBase[] columns)
        {
            foreach (var col in columns)
            {
                instance.Value.Set(col);
            }
        }

        public static void MapEntity(Firefly.Box.Data.Entity entity, string key)
        {
            instance.Value.MapEntity(entity, key);
        }

        public static void Map(object controller)
        {
            instance.Value.Map(controller);
        }
        //public static void Controls(System.Windows.Forms.Control view)
        //{
        //    foreach (System.Windows.Forms.Control c in view.Controls)
        //    {
        //        var ic = c as Firefly.Box.UI.Advanced.InputControlBase;
        //        if (ic != null)
        //        {
        //            var col = Common.GetColumn(ic);
        //            if (col != null)
        //            {
        //                Set(col);
        //            }

        //        }
        //        Controls(c);
        //    }
        //}

        public static void SetControl(string key, ColumnBase Column = null, string Format = null, object Exp = null)
        {
            using (StartItem(key))
            {
                if (Column != null)
                {
                    Set("value", Column);
                    Set("text", Column.ToString(Format));
                }
                if (Exp != null)
                {
                    Set("value", Exp);
                    {
                        var d = Exp as Date; ;
                        if (d != null)
                        {
                            Set("text", d.ToString(Format));
                        }
                    }
                    {
                        var d = Exp as Number;
                        if (d != null)
                        {
                            Set("text", d.ToString(Format));
                        }
                    }
                    {
                        var d = Exp as Time;
                        if (d != null)
                        {
                            Set("text", d.ToString(Format));
                        }
                    }
                }


            }
        }

        internal static ISerializedObject GetResult()
        {
            return instance.Value.getResult();
        }

        class Disposable : IDisposable
        {
            Action _dispose;
            public Disposable(Action dispose)
            {
                _dispose = dispose;
            }
            public void Dispose()
            {
                _dispose();
            }
        }

    }

}


