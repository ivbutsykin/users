export function getUserById(id) {
  return fetch(`http://localhost:8080/users/${id}`);
}

export function updateUser(id, body) {
  return fetch(`http://localhost:8080/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
