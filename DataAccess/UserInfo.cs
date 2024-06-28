using System.Linq.Expressions;
using System.Security.Policy;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Tls;

namespace game_api.DataAccess
{
    public class User
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int rowKey {  get; set; }
        public int score { get; set; }
        public int memPoint { get; set; }
        public int rpsPoint { get; set; }

        public IFormFile? picuture { get; set; }
        public string coverPic { get; set; }
        public User() 
        { 
            Name = string.Empty;
            Email = string.Empty;
            Password = string.Empty;
            rowKey = 0;
            score = 0;
            memPoint = 0;
            rpsPoint = 0;
            coverPic = string.Empty;
            picuture = null;
        }

        public User(string name, string email, string password, int rowNum = 0, int score = 0, int mPoint = 0, int rPoint = 0, string profile = "", string pic = "")
        {
            Name = name;
            Email = email;
            Password = password;
            rowKey = rowNum;
            this.score = score;
            memPoint = mPoint;
            rpsPoint = rPoint;
            coverPic = profile;
            
        }
    }


    public class UserInfo
    {
        public static string ConnectionString = "server=localhost;database=gamesdatabase;port=3306;user=root;password=root;";
        public static void UserSignUp(string userName, string password, string email)
        {
            MySqlConnection connection = new MySqlConnection(ConnectionString);
            int score = 0;
            int memPoint = 0;
            int rpsPoint = 0;
            var cmd = connection.CreateCommand();

            cmd.Parameters.AddWithValue("username", userName);
            cmd.Parameters.AddWithValue("password", password);
            cmd.Parameters.AddWithValue("email", email);
            cmd.Parameters.AddWithValue("score", score);
            cmd.Parameters.AddWithValue("memPoint", memPoint);
            cmd.Parameters.AddWithValue("rpsPoint", rpsPoint);

            string queryString = ("Insert into userinfo (username, email, password, score, memPoint, rpsPoint)" +
                " value (@username, @email, @password, @score, @memPoint, @rpsPoint);");

            try
            {
                connection.Open();
                cmd.CommandText = queryString;
                int recAffected = cmd.ExecuteNonQuery();
                connection.Close();
                Console.WriteLine("{0} records inserted", recAffected);
            }
            catch (Exception ex) {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close() ;
            }
        }

        public static List<User> GetUserInfo()
        {
            MySqlConnection conn = new MySqlConnection(ConnectionString);
            List<User> list = new List<User>();

            var cmd = conn.CreateCommand();

            string queryString = "Select * from userinfo";

            try
            {
                conn.Open();
                cmd.CommandText = queryString;
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    string Name = reader["username"].ToString();
                    string Password = reader["password"].ToString();
                    string Email = reader["email"].ToString();
                    int rowNum = (int) reader["row"];
                    int score = reader["score"] != DBNull.Value ? (int) reader["score"] : 0;
                    int memPoint = reader["memPoint"] != DBNull.Value ? (int) reader["memPoint"] : 0;
                    int rpsPoint = reader["rpsPoint"] != DBNull.Value ? (int) reader["rpsPoint"] : 0;
                    //string bookName = reader["BookName"] != DBNull.Value ? reader["BookName"].ToString() : string.Empty;
                    list.Add(new User(Name, Email, Password, rowNum, score, memPoint, rpsPoint));
                }
                conn.Close();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                conn.Close() ;
            }

            return list;
        }

        public static User LoginCheck (string email)
        {
            MySqlConnection connection = new MySqlConnection(ConnectionString);
            User user = null;

            var cmd = connection.CreateCommand();

            cmd.Parameters.AddWithValue("Email", email);
            //cmd.Parameters.AddWithValue("Password", password);

            string queryString = "Select * from userinfo where email = @Email";

            try
            {
                connection.Open();
                cmd.CommandText = queryString;
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    string UserName = reader["username"].ToString();
                    string Password = reader["password"].ToString();
                    string Email = reader["email"].ToString();
                    user = new User(UserName, Email, Password);
                }
               
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close();
            }

            return user;
        }

        public static void UpdateScore (string name, int rpsPoint = 0, int memPoint = 0)
        {
            MySqlConnection conn = new MySqlConnection(ConnectionString);

            var cmd = conn.CreateCommand();

           // cmd.Parameters.AddWithValue("Score", score);
            cmd.Parameters.AddWithValue("name", name);
            cmd.Parameters.AddWithValue("rpsPoint", rpsPoint);
            cmd.Parameters.AddWithValue("memPoint", memPoint);
          

            string queryString = "SET SQL_SAFE_UPDATES = 0;\r\nUpdate userinfo set score = score + @memPoint + @rpsPoint , memPoint = memPoint + @memPoint, rpsPoint = rpsPoint + @rpsPoint where username = @name;\r\nSET SQL_SAFE_UPDATES = 1;";

            try
            {
                conn.Open();
                cmd.CommandText = queryString;
                int recAffected = cmd.ExecuteNonQuery();
                conn.Close();
                Console.WriteLine("{0} records updated", recAffected);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                conn.Close();
            }

        }

        public static User GetUserByName(string name)
        {
            MySqlConnection connection = new MySqlConnection(ConnectionString);
            User user = null;

            var cmd = connection.CreateCommand();

            cmd.Parameters.AddWithValue("Name", name);
            //cmd.Parameters.AddWithValue("Password", password);

            string queryString = "Select * from userinfo where username = @Name";

            try
            {
                connection.Open();
                cmd.CommandText = queryString;
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    string UserName = reader["username"].ToString();
                    string Password = reader["password"].ToString();
                    string Email = reader["email"].ToString();
                    int rowId = (int)reader["row"];
                    string coverPic = reader["profilePic"] != DBNull.Value ? reader["profilePic"].ToString() : string.Empty;
                    user = new User(UserName, Email, Password, rowId, 0, 0, 0, coverPic);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close();
            }

            return user;
        }

        public static void UpdateUser (string username, string email, int rowId, string picture)
        {
            MySqlConnection conn = new MySqlConnection(ConnectionString);
            var cmd = conn.CreateCommand();

            cmd.Parameters.AddWithValue ("username", username);
            cmd.Parameters.AddWithValue ("email", email);
            cmd.Parameters.AddWithValue("row", rowId);
            cmd.Parameters.AddWithValue("picture", picture);

            string queryString = ("Update userinfo set username = @username, email = @email, profilePic = @picture where `row` = @row;");

            try
            {
                conn.Open();
                cmd.CommandText = queryString;
                int recAffected = cmd.ExecuteNonQuery();
                conn.Close();
                Console.WriteLine("{0} records updated", recAffected);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                conn.Close();
            }
        }

        public static User GetUserById(int id)
        {
            MySqlConnection connection = new MySqlConnection(ConnectionString);
            User user = null;

            var cmd = connection.CreateCommand();

            cmd.Parameters.AddWithValue("Id", id);
            //cmd.Parameters.AddWithValue("Password", password);

            string queryString = "Select * from userinfo where `row` = @Id";

            try
            {
                connection.Open();
                cmd.CommandText = queryString;
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    string UserName = reader["username"].ToString();
                    string Password = reader["password"].ToString();
                    string Email = reader["email"].ToString();
                    int rowId = (int)reader["row"];
                    string coverPic = reader["profilePic"] != DBNull.Value ? reader["profilePic"].ToString() : string.Empty;
                    user = new User(UserName, Email, Password, rowId, 0, 0, 0, coverPic);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close();
            }

            return user;
        }

        public static void UpdatePassword (int id, string password)
        {
            MySqlConnection conn = new MySqlConnection(ConnectionString);
            var cmd = conn.CreateCommand();

            cmd.Parameters.AddWithValue ("Id", id);
            cmd.Parameters.AddWithValue("Password", password);

            string queryString = ("Update userinfo set password = @Password where `row` = @Id");

            try
            {
                conn.Open();
                cmd.CommandText = queryString;
                int recAffected = cmd.ExecuteNonQuery();
                conn.Close();
                Console.WriteLine("{0} records updated", recAffected);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                conn.Close();
            }

        }


    }
}
