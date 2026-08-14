// src/pages/Users.jsx
// This is the Users page that Playwright will automate.
// Notice: every interactive/important element has a `data-testid` attribute.

const mockUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "Viewer" },
  { id: 4, name: "David Lee", email: "david@example.com", role: "Admin" },
  { id: 5, name: "Eva Martinez", email: "eva@example.com", role: "Editor" },
];

export default function Users() {
  return (
    <>
    <title>Users</title>
    <div
      data-testid="users-page"
      style={{ padding: "24px" }}
    >
      <h1
        data-testid="users-title"
        style={{ marginBottom: "16px" }}
      >
        Users
      </h1>

      <table
        data-testid="users-table"
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th
              data-testid="table-header-name"
              style={{ borderBottom: "2px solid #ddd", padding: "8px" }}
            >
              Name
            </th>
            <th
              data-testid="table-header-email"
              style={{ borderBottom: "2px solid #ddd", padding: "8px" }}
            >
              Email
            </th>
            <th
              data-testid="table-header-role"
              style={{ borderBottom: "2px solid #ddd", padding: "8px" }}
            >
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user, index) => (
            <tr
              key={user.id}
              data-testid={`user-row-${index}`}
              style={{ borderBottom: "1px solid #eee" }}
            >
              <td
                data-testid={`user-name-${index}`}
                style={{ padding: "8px" }}
              >
                {user.name}
              </td>
              <td
                data-testid={`user-email-${index}`}
                style={{ padding: "8px" }}
              >
                {user.email}
              </td>
              <td
                data-testid={`user-role-${index}`}
                style={{ padding: "8px" }}
              >
                {user.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}