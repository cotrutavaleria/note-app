namespace NoteAppAPI.Models;

public class DatabaseConfiguration
{
    public string MongoDBConnectionString { get; set; } = null!;

    public string MongoDBDatabaseName { get; set; } = null!;

    public string MongoDBCollectionName { get; set; } = null!;
}