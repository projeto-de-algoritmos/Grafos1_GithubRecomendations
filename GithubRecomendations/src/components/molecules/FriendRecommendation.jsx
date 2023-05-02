import React from 'react';

function FriendRecommendation({ friendRecommendations }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Login</th>
          <th>Score</th>
          <th>Connections</th>
        </tr>
      </thead>
      <tbody>
        {friendRecommendations.map(({ login, score, connections }) => (
          <tr key={login}>
            <td>{login}</td>
            <td>{score}</td>
            <td>{connections}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FriendRecommendation;