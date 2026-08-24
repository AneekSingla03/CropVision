import React from 'react';

function DashboardActivities() {
  const activitiesList = [
    {
      id: 'act-1',
      title: 'Irrigation',
      icon: '💧',
      target: 'Wheat Field (Plot A)',
      date: 'Tomorrow, 07:00 AM',
      status: 'Scheduled',
      badgeClass: 'badge-primary',
      description: 'Scheduled light surface irrigation ahead of warm afternoon temperatures.',
    },
    {
      id: 'act-2',
      title: 'Field Inspection',
      icon: '🔬',
      target: 'Cotton Field (Plot C)',
      date: 'Feb 25, 2026',
      status: 'Planned',
      badgeClass: 'badge-neutral',
      description: 'Routine visual inspection of lower foliage for potential pest activity.',
    },
    {
      id: 'act-3',
      title: 'Fertilizer Application',
      icon: '🌱',
      target: 'Mustard Field (Plot B)',
      date: 'Feb 27, 2026',
      status: 'Pending Window',
      badgeClass: 'badge-warning',
      description: 'Top-dressing application of micronutrients and organic compost.',
    },
    {
      id: 'act-4',
      title: 'Harvest Planning',
      icon: '🚜',
      target: 'Mustard Field (Plot B)',
      date: 'Mar 15, 2026',
      status: 'Upcoming',
      badgeClass: 'badge-success',
      description: 'Arranging threshing machinery and storage grain bags for harvest window.',
    },
  ];

  return (
    <div className="dashboard-activities-view">
      <div className="card dash-section-card">
        <div className="dash-card-header flex flex-between">
          <div>
            <h3 className="dash-card-title">Upcoming Farm Activities</h3>
            <p className="text-xs text-muted">
              Scheduled agricultural operations, watering windows, and field tasks
            </p>
          </div>
          <span className="badge badge-neutral text-xs">4 Activities</span>
        </div>

        <div className="activities-list-detailed">
          {activitiesList.map((item) => (
            <div key={item.id} className="card activity-detailed-card" style={{ marginBottom: '1rem', padding: '1.25rem' }}>
              <div className="flex flex-between" style={{ marginBottom: '0.4rem' }}>
                <div className="flex align-center gap-md">
                  <span className="activity-icon" style={{ fontSize: '1.6rem' }}>{item.icon}</span>
                  <div>
                    <strong style={{ color: 'var(--color-primary-deep)', fontSize: '1.05rem' }}>{item.title}</strong>
                    <span className="text-xs text-muted block">{item.target} • {item.date}</span>
                  </div>
                </div>
                <span className={`badge ${item.badgeClass} text-xs`}>{item.status}</span>
              </div>
              <p className="text-sm text-muted" style={{ margin: '0.5rem 0 0', lineHeight: '1.5' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardActivities;
