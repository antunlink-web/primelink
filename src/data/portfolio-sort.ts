type PortfolioSortFields = {
  pinned?: boolean;
  completedAt?: string;
  sortOrder?: number;
};

/** Pinned projects first, then completion date, then manual/declaration order. */
export function sortPortfolioProjects<T extends PortfolioSortFields>(projects: T[]) {
  return projects
    .map((project, index) => ({ ...project, sortOrder: project.sortOrder ?? index }))
    .sort((a, b) => {
      if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
      if (a.completedAt && b.completedAt && a.completedAt !== b.completedAt) {
        return a.completedAt < b.completedAt ? 1 : -1;
      }
      if (!!a.completedAt !== !!b.completedAt) return a.completedAt ? -1 : 1;
      return a.sortOrder - b.sortOrder;
    });
}
