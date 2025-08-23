export interface FeatureFlags {
  showExams: boolean;
  showFees: boolean;
  showAttendance: boolean;
  showGrading: boolean;
  showPayments: boolean;
  showMessaging: boolean;
  showCalendar: boolean;
  showReports: boolean;
}

export const defaultFeatureFlags: FeatureFlags = {
  showExams: false, // Exam system is in development
  showFees: false, // Fee management coming soon
  showAttendance: false, // Attendance tracking coming soon
  showGrading: false, // Grading system coming soon
  showPayments: false, // Payment system coming soon
  showMessaging: false, // Messaging system coming soon
  showCalendar: true, // Calendar is available
  showReports: false, // Reporting system coming soon
};

export class FeatureService {
  private static instance: FeatureService;
  private flags: FeatureFlags;

  private constructor() {
    // Load from localStorage or use defaults
    const savedFlags = localStorage.getItem("treasure-home-features");
    this.flags = savedFlags 
      ? { ...defaultFeatureFlags, ...JSON.parse(savedFlags) }
      : { ...defaultFeatureFlags };
  }

  public static getInstance(): FeatureService {
    if (!FeatureService.instance) {
      FeatureService.instance = new FeatureService();
    }
    return FeatureService.instance;
  }

  public getFlags(): FeatureFlags {
    return { ...this.flags };
  }

  public isEnabled(feature: keyof FeatureFlags): boolean {
    return this.flags[feature];
  }

  public setFlag(feature: keyof FeatureFlags, enabled: boolean): void {
    this.flags[feature] = enabled;
    this.saveFlags();
  }

  public setFlags(flags: Partial<FeatureFlags>): void {
    this.flags = { ...this.flags, ...flags };
    this.saveFlags();
  }

  private saveFlags(): void {
    localStorage.setItem("treasure-home-features", JSON.stringify(this.flags));
  }

  public resetToDefaults(): void {
    this.flags = { ...defaultFeatureFlags };
    this.saveFlags();
  }
}

// Hook for React components
export const useFeatureFlags = () => {
  const featureService = FeatureService.getInstance();
  return {
    flags: featureService.getFlags(),
    isEnabled: (feature: keyof FeatureFlags) => featureService.isEnabled(feature),
    setFlag: (feature: keyof FeatureFlags, enabled: boolean) => featureService.setFlag(feature, enabled),
    setFlags: (flags: Partial<FeatureFlags>) => featureService.setFlags(flags),
    resetToDefaults: () => featureService.resetToDefaults()
  };
};
