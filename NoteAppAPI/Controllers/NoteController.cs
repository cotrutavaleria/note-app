using NoteAppAPI.Models;
using NoteAppAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace NoteAppAPI.Controllers;

[ApiController]
[Route("/api/notes")]
public class NoteController : ControllerBase {
    private readonly NoteService _noteService;
    public NoteController(NoteService noteService) =>
        _noteService = noteService;

    [HttpGet]
    public async Task<List<Note>> GetAll() =>
        await _noteService.GetNotes();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Note>> GetById(string id) {
        var note = await _noteService.GetNotesById(id);
        if (note is null) {
            return NotFound();
        }
        return note;
    }

    [HttpPost]
    public async Task<IActionResult> AddNote(Note newNote) {
        await _noteService.CreateNote(newNote);
        return CreatedAtAction(nameof(GetAll), new { id = newNote.Id }, newNote);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> UpdateNoteById(string id, Note updatedNote) {
        var note = await _noteService.GetNotesById(id);
        if (note is null) {
            return NotFound();
        }
        updatedNote.Id = note.Id;
        await _noteService.UpdateNote(id, updatedNote);
        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> DeleteNote(string id) {
        var note = await _noteService.GetNotesById(id);
        if (note is null) {
            return NotFound();
        }
        await _noteService.DeleteNote(id);
        return NoContent();
    }
}