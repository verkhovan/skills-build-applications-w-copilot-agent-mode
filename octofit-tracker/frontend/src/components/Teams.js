import React, { useEffect, useState } from 'react';

const EMPTY_FORM = { name: '' };

const Teams = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchData = () => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => { setData(json.results || json); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [endpoint]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(JSON.stringify(err));
      } else {
        setForm(EMPTY_FORM);
        setShowModal(false);
        fetchData();
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="card octofit-card">
        <div className="card-header bg-success text-white d-flex align-items-center gap-2">
          <span>Teams</span>
          <span className="badge bg-light text-success ms-auto">{data.length}</span>
          <button className="btn btn-sm btn-light ms-2" onClick={() => { setShowModal(true); setError(''); }}>
            + Add Team
          </button>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading…</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped octofit-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team Name</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="text-center text-muted py-4">No teams found.</td>
                    </tr>
                  ) : (
                    data.map((item, idx) => (
                      <tr key={item._id || idx}>
                        <td className="text-muted">{idx + 1}</td>
                        <td><strong>{item.name}</strong></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Team Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title">Add Team</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  {error && <div className="alert alert-danger py-2">{error}</div>}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Team Name</label>
                    <input className="form-control" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Alpha Squad" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success" disabled={saving}>
                    {saving ? 'Saving…' : 'Save Team'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Teams;
