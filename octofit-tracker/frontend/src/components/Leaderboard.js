import React, { useEffect, useState } from 'react';

const RANK_STYLES = [
  { badge: 'bg-warning text-dark', label: '🥇 1st' },
  { badge: 'bg-secondary text-white', label: '🥈 2nd' },
  { badge: 'bg-danger text-white', label: '🥉 3rd' },
];

const Leaderboard = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        setData(json.results || json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="card octofit-card">
      <div className="card-header bg-warning text-dark d-flex align-items-center gap-2">
        <i className="bi bi-trophy-fill"></i>
        <span>Leaderboard</span>
        <span className="badge bg-dark ms-auto">{data.length} teams</span>
      </div>
      <div className="card-body p-0">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped octofit-table mb-0">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Team</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-4">No leaderboard data.</td>
                  </tr>
                ) : (
                  data.map((item, idx) => {
                    const rank = RANK_STYLES[idx];
                    return (
                      <tr key={item._id || idx}>
                        <td>
                          {rank ? (
                            <span className={`badge ${rank.badge}`}>{rank.label}</span>
                          ) : (
                            <span className="text-muted">#{idx + 1}</span>
                          )}
                        </td>
                        <td><strong>{item.team}</strong></td>
                        <td><span className="badge bg-primary fs-6">{item.points} pts</span></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default Leaderboard;
