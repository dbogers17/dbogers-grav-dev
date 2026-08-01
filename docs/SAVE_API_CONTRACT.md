# Save API contract draft

Planned endpoints: create anonymous session, check globally unique explorer name, list three slots, create/update/delete slot, restore with recovery code, and list revisions.

The browser stores only a random HttpOnly session cookie when the API is introduced. Save payloads live server-side. Recovery codes are hashed by the server. Explorer names are globally unique using a case-insensitive database constraint.

Development starts with SQLite and short WAL transactions. PostgreSQL becomes mandatory before multiplayer or sustained concurrent writes.
