using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NoteAppAPI.Models;

public class Note
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Title")]
    public string Title { get; set; } = null!;

    [BsonElement("Description")]
    public string Description { get; set; } = null!;
    
    [BsonElement("LastChangeDate")]
    public DateTime LastChangeDate { get; set; }
}