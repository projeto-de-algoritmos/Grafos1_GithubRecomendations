import React from 'react';

function FriendRecommendation({ friendRecommendations }) {

    // Order friend recommendations by score and connections
    friendRecommendations.sort((a, b) => {
        if (a.score === b.score) {
            return a.connections - b.connections;
        }
        return a.score - b.score;
    }
    );

  return (
      <>
      <h3>Follow Recomendations</h3>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {friendRecommendations.slice(-6).map(({ login, score, connections }) => (
          <tr key={login}>
            <td>{login}</td>
            <td>{score}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </>
  );
}

export default FriendRecommendation;