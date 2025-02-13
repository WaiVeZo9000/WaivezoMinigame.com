using MySql.Data.MySqlClient;

namespace game_api.DataAccess
{
    public class Game
    {
        public int GameId { get; set; }
        public string Name { get; set; }
        public decimal AverageRating { get; set; }
        public int numOfrate { get; set; }
        public int totalrate { get; set; }

        public Game()
        {
            numOfrate = 0;
            totalrate = 0;
            GameId = 0;
            Name = string.Empty;
            AverageRating = 0;
        }

        public Game (int gameId, string name, decimal averageRating, int numOfrate, int totalrate=0) : this() {
        
            GameId = gameId;
            Name = name;
            AverageRating = averageRating;
            this.numOfrate = numOfrate;
            this.totalrate = totalrate;
        }
    }
    public  class GameAccess
    {
        public static string ConnectionString = "server=localhost;database=gamesdatabase;port=3306;user=root;password=root;";

        public static void AddRating(int rating, int id)
        {
            if (rating == 0) {
                return;
            }

            MySqlConnection connection = new MySqlConnection(ConnectionString);
            var cmd = connection.CreateCommand();
            
            cmd.Parameters.AddWithValue("rate", rating);
            cmd.Parameters.AddWithValue ("id", id);

            string queryString = ("Update games set TotalRating = TotalRating + @rate, rateCount = rateCount + 1, AverageRating = TotalRating / rateCount  where GameId = @id");

            try
            {
                connection.Open();
                cmd.CommandText = queryString;
                int recAffected = cmd.ExecuteNonQuery();
                connection.Close();
                Console.WriteLine("{0} records inserted", recAffected);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close();
            }

        }

        public static List<Game> GetGamesRate()
        {
            MySqlConnection connection = new MySqlConnection (ConnectionString);
            var cmd = connection.CreateCommand();
            List<Game> list = new List<Game>();

            string queryString = ("Select * from games");

            try
            {
                connection.Open();
                cmd.CommandText = queryString;
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    string name = reader["GameName"].ToString();
                    int id = (int)reader["GameId"];
                    decimal avgRate = (decimal)reader["AverageRating"];
                    int RateCount = (int)reader["rateCount"];
                    list.Add(new Game(id, name, avgRate, RateCount));

                }
                connection.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close();
            }

            return list;
        }


    }
}
