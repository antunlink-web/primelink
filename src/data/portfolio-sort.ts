type PortfolioSortFields = {
  id: string;
  pinned?: boolean;
  publishedAt?: string;
  completedAt?: string;
  sortOrder?: number;
};

/** Reserved leading positions, independent of dates and future pinned additions. */
export const pinnedPortfolioIds = ["luxurysecondhand", "trazilica", "chairs"] as const;

/** Reserved projects first; remaining pins, publication/completion date, then declaration order. */
export function sortPortfolioProjects<T extends PortfolioSortFields>(projects: T[]) {
  return projects
    .map((project, index) => ({ ...project, sortOrder: project.sortOrder ?? index }))
    .sort((a, b) => {
      const aPriority = pinnedPortfolioIds.findIndex((id) => id === a.id);
      const bPriority = pinnedPortfolioIds.findIndex((id) => id === b.id);
      if (aPriority !== bPriority) {
        if (aPriority < 0) return 1;
        if (bPriority < 0) return -1;
        return aPriority - bPriority;
      }
      if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
      const aDate = a.publishedAt ?? a.completedAt;
      const bDate = b.publishedAt ?? b.completedAt;
      if (aDate && bDate && aDate !== bDate) {
        return aDate < bDate ? 1 : -1;
      }
      if (!!aDate !== !!bDate) return aDate ? -1 : 1;
      return a.sortOrder - b.sortOrder;
    });
}
