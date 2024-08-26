using NoteAppAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace NoteAppAPI.Services;

public class NoteService {
    private readonly IMongoCollection<Note> _notesCollection;
    public NoteService(
        IOptions<DatabaseConfiguration> databaseConfigurations)
    {
        var mongoClient = new MongoClient(
            databaseConfigurations.Value.MongoDBConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            databaseConfigurations.Value.MongoDBDatabaseName);

        _notesCollection = mongoDatabase.GetCollection<Note>(
            databaseConfigurations.Value.MongoDBCollectionName);
    }

    public async Task<List<Note>> GetNotes() =>
        await _notesCollection.Find(_ => true).ToListAsync();

    public async Task<Note?> GetNotesById(string id) =>
        await _notesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateNote(Note newNote) =>
        await _notesCollection.InsertOneAsync(newNote);

    public async Task UpdateNote(string id, Note updatedNote) =>
        await _notesCollection.ReplaceOneAsync(x => x.Id == id, updatedNote);

    public async Task DeleteNote(string id) =>
        await _notesCollection.DeleteOneAsync(x => x.Id == id);
}